"use client";

import { useState } from "react";
import { generateContent } from "./action";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function GeminiPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");
    try {
      const result = await generateContent(prompt);
      setResponse(result);
    } catch (error: any) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Gemini AI Playground</CardTitle>
          <CardDescription>
            Test out the Gemini Flash model by entering a prompt below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Explain how AI works in a few words..."
                className="min-h-[120px]"
                disabled={loading}
              />
            </div>
            
            <Button type="submit" disabled={loading || !prompt.trim()} className="w-full sm:w-auto">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Generating..." : "Generate Content"}
            </Button>
          </form>

          {response && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Response:</h3>
              <div className="p-4 bg-muted rounded-md whitespace-pre-wrap text-sm leading-relaxed border">
                {response}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
