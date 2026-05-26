import zipfile
import re

def read_docx_regex(file_path):
    try:
        with zipfile.ZipFile(file_path) as doc:
            xml_content = doc.read('word/document.xml').decode('utf-8', errors='ignore')
            
            # Use regex to find all <w:t>...</w:t> tags
            # We also look for paragraph tags <w:p> to introduce linebreaks
            paragraphs = []
            
            # Split the document XML by paragraph tags to preserve paragraphs
            p_blocks = xml_content.split('<w:p ')
            for block in p_blocks:
                # Find all text segments within this paragraph
                texts = re.findall(r'<w:t[^>]*>(.*?)</w:t>', block)
                if texts:
                    # Clean up HTML/XML entities if any (like &amp;)
                    clean_text = "".join(texts)
                    clean_text = clean_text.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
                    paragraphs.append(clean_text.strip())
            
            return "\n\n".join(filter(None, paragraphs))
    except Exception as e:
        print(f"Regex text extraction failed: {e}")
        return None

import os
from pathlib import Path

try:
    # Get the directory of this script (c:/siloo/portfolio/backend)
    script_dir = Path(__file__).resolve().parent
    # The portfolio folder is the parent of backend (c:/siloo/portfolio)
    portfolio_dir = script_dir.parent

    cv_path = os.path.join(portfolio_dir, "Silas_Ngetich_Complete_Portfolio.docx")
    text = read_docx_regex(cv_path)
    if text:
        print(f"Extracted CV length: {len(text)} characters")
        output_path = os.path.join(portfolio_dir, "Silas_CV_Extracted.txt")
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Successfully saved extracted text to {output_path}")
    else:
        print("Failed to extract text.")
except Exception as e:
    print(f"Error parsing CV: {e}")
