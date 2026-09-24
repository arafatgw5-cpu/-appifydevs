import { openDB, DBSchema } from 'idb';
import type { ChatMessage } from '@/types/chat';

export interface ConversationMeta {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface ChatDB extends DBSchema {
  conversations_meta: {
    key: string;
    value: ConversationMeta;
    indexes: { 'by-updatedAt': string };
  };
  conversations_messages: {
    key: string;
    value: { id: string; messages: ChatMessage[] };
  };
}

// Lazy init the DB to avoid SSR issues
let dbPromise: ReturnType<typeof openDB<ChatDB>> | null = null;
if (typeof window !== 'undefined') {
  dbPromise = openDB<ChatDB>('chat-store', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('conversations_meta')) {
        const metaStore = db.createObjectStore('conversations_meta', { keyPath: 'id' });
        metaStore.createIndex('by-updatedAt', 'updatedAt');
      }
      if (!db.objectStoreNames.contains('conversations_messages')) {
        db.createObjectStore('conversations_messages', { keyPath: 'id' });
      }
    },
  });
}

export const ChatStorage = {
  async getConversations(): Promise<ConversationMeta[]> {
    if (!dbPromise) return [];
    try {
      const db = await dbPromise;
      const tx = db.transaction('conversations_meta', 'readonly');
      const index = tx.store.index('by-updatedAt');
      // idb openCursor prev will sort by descending
      let cursor = await index.openCursor(null, 'prev');
      const results: ConversationMeta[] = [];
      while (cursor) {
        results.push(cursor.value);
        cursor = await cursor.continue();
      }
      return results;
    } catch (e) {
      console.error('Failed to get conversations', e);
      return [];
    }
  },
  
  async getMessages(id: string): Promise<ChatMessage[]> {
    if (!dbPromise) return [];
    try {
      const db = await dbPromise;
      const data = await db.get('conversations_messages', id);
      return data?.messages || [];
    } catch (e) {
      console.error('Failed to get messages', e);
      return [];
    }
  },

  async createConversation(meta: ConversationMeta): Promise<void> {
    if (!dbPromise) return;
    try {
      const db = await dbPromise;
      const tx = db.transaction(['conversations_meta', 'conversations_messages'], 'readwrite');
      await tx.objectStore('conversations_meta').put(meta);
      await tx.objectStore('conversations_messages').put({ id: meta.id, messages: [] });
      await tx.done;
    } catch (e) {
      console.error('Failed to create conversation', e);
      throw new Error('Storage quota exceeded or error occurred.');
    }
  },

  async updateConversationMeta(meta: ConversationMeta): Promise<void> {
    if (!dbPromise) return;
    try {
      const db = await dbPromise;
      await db.put('conversations_meta', meta);
    } catch (e) {
      console.error('Failed to update meta', e);
      throw new Error('Failed to update conversation metadata.');
    }
  },

  async appendMessage(id: string, message: ChatMessage, titleToUpdate?: string): Promise<void> {
    if (!dbPromise) return;
    try {
      const db = await dbPromise;
      const tx = db.transaction(['conversations_meta', 'conversations_messages'], 'readwrite');
      
      const metaStore = tx.objectStore('conversations_meta');
      const meta = await metaStore.get(id);
      if (meta) {
        meta.updatedAt = new Date().toISOString();
        if (titleToUpdate && meta.title === 'New Chat') {
          meta.title = titleToUpdate.slice(0, 40) + (titleToUpdate.length > 40 ? '...' : '');
        }
        await metaStore.put(meta);
      }

      const msgStore = tx.objectStore('conversations_messages');
      const data = await msgStore.get(id);
      if (data) {
        data.messages.push(message);
        await msgStore.put(data);
      } else {
        // Recover from missing data edge case
        await msgStore.put({ id, messages: [message] });
      }
      
      await tx.done;
    } catch (e) {
      console.error('Failed to append message', e);
      throw new Error('Failed to save message to local storage.');
    }
  },

  async deleteConversation(id: string): Promise<void> {
    if (!dbPromise) return;
    try {
      const db = await dbPromise;
      const tx = db.transaction(['conversations_meta', 'conversations_messages'], 'readwrite');
      await tx.objectStore('conversations_meta').delete(id);
      await tx.objectStore('conversations_messages').delete(id);
      await tx.done;
    } catch (e) {
      console.error('Failed to delete conversation', e);
      throw new Error('Failed to delete conversation.');
    }
  },
  
  async clearAll(): Promise<void> {
    if (!dbPromise) return;
    try {
      const db = await dbPromise;
      const tx = db.transaction(['conversations_meta', 'conversations_messages'], 'readwrite');
      await tx.objectStore('conversations_meta').clear();
      await tx.objectStore('conversations_messages').clear();
      await tx.done;
    } catch(e) {
      console.error('Failed to clear all conversations', e);
      throw new Error('Failed to clear storage.');
    }
  }
};
