import re

def process_match(m):
    dark_str = m.group(1)
    light_str = m.group(2)
    
    # split by spaces and prefix with dark:
    dark_classes = [f"dark:{c}" for c in dark_str.split() if c.strip()]
    light_classes = [c for c in light_str.split() if c.strip()]
    
    combined = " ".join(light_classes + dark_classes)
    return combined

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match ${isDarkMode ? '...' : '...'}
    # Assumes no escaped quotes inside the strings.
    pattern = r"\$\{isDarkMode \? '([^']*)' : '([^']*)'\}"
    
    new_content = re.sub(pattern, process_match, content)
    
    # There are also some with inverted logic or variables?
    # Let's check for isDarkMode being passed to Ambient3D
    # <Ambient3D isDarkMode={isDarkMode} /> -> wait, Ambient3D needs a boolean.
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
fix_file('src/components/landing/LandingPage.tsx')
