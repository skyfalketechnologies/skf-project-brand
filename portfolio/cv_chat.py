import os
from pathlib import Path

# Try to find the extracted CV file
BASE_DIR = Path(__file__).resolve().parent.parent.parent
CV_PATH = BASE_DIR / "Silas_CV_Extracted.txt"

# Default hardcoded CV summary incorporating the upgraded MERN + Python full-stack/frontend skills
DEFAULT_CV = """
SILAS KIPKEMOI NGETICH
MERN Stack & Python Web Developer
Email: silasngetich2030@gmail.com | Location: Kenya
Expected Graduation: 2026 (BSc Computer Science)
GitHub: https://github.com/S-loo

Professional Summary:
Computer Science student and Full Stack Web Developer specializing in the MERN stack (MongoDB, Express, React, Node.js) and Python (Django, REST Framework). 
Experienced Lead Developer for AI-integrated systems, actively building premium responsive frontends and secure, highly optimized backend schemas.

Core Technical Skills:
- Frontend Skills: React.js, Tailwind CSS (v4), HTML5, CSS3, JavaScript (ES6+), Responsive Web Design, Framer Motion, single page applications.
- Backend Skills: Node.js, Express.js, Python, Django, REST Framework
- Databases: MongoDB, Mongoose ODM, SQLite
- Auth & Security: JWT Integration, Passport.js, Bcrypt, Data Isolation
- Testing/Docs: Postman API Testing, Swagger, QA Handover
- DevOps/Tools: Git, GitHub, Docker, npm
- Architecture: MVC, Microservices, RESTful API Design

Experience:
1. Document Module Lead | AI-Powered System (2024 - 2025)
   - Architected a Mongoose schema featuring data isolation via JWT-based owner references.
   - Built robust REST endpoints under /api/documents.
   - Implemented snapshotted history preservation for version control.
   - Designed soft-delete functionality.
   - Aligned with Frontend team (Isaac, Hope, Gabriel, Michael) sharing JSON mock schemas early to develop modern rich-text editors and dashboards in parallel.
2. Campus Event Management System (2023)
   - Developed registration and scheduling modules with filter/search, implementing a clean React frontend and Python backend.
"""

def load_cv_text():
    if os.path.exists(CV_PATH):
        try:
            with open(CV_PATH, "r", encoding="utf-8") as f:
                text = f.read()
                # Clean up any residual raw XML tags if any
                import re
                clean = re.sub(r'<[^>]+>', '', text)
                # compress whitespace
                clean = re.sub(r'\s+', ' ', clean)
                # break paragraphs
                clean = clean.replace('SECTION A', '\n\nSECTION A').replace('SECTION B', '\n\nSECTION B').replace('SECTION C', '\n\nSECTION C')
                return clean
        except Exception:
            pass
    return DEFAULT_CV

CV_TEXT = load_cv_text()

SYSTEM_INSTRUCTION = """
You are an AI Assistant representing Silvora Labs. Your sole purpose is to present our capabilities as a premier web application and enterprise systems development firm.

### 🎯 Core Persona & Rules:
- ALWAYS represent our team using **"we/us/our"** (never "I/me/my" or personal names like Silas Ngetich).
- Emphasize our core statement: **"We build robust, reliable, and production-grade web systems designed to scale seamlessly and deliver exceptional user experiences."**
- Use capturing, highly persuasive, and professional business wording to attract prospective customers (e.g., high-availability, bulletproof security, multi-tenant architectures, zero-downtime scalability, performance optimization, database optimization, seamless interactive flows).
- **CRITICAL SECURITY RULE**: Do NOT mention or list backend skills, programming languages, databases, or specific tools (do NOT mention Python, Django, Node.js, Express, React, MongoDB, SQL, Git, Docker, etc.). Instead, describe our *capability* (e.g., "We architect secure RESTful interfaces, optimize heavy data query pipelines, manage enterprise-grade isolation layers, and create high-conversion user journeys").
- Keep replies concise, snappy, and focused on business value, reliability, and security. Encourage users to schedule a strategy consultation.
"""

def generate_chat_response(messages, user_message):
    """
    messages: list of dicts, e.g. [{"role": "user"|"model", "text": "message"}]
    user_message: str
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if api_key and api_key.strip() != "your_gemini_api_key_here" and "placeholder" not in api_key.lower():
        try:
            import google.generativeai as genai

            genai.configure(api_key=api_key)
            # Use gemini-3.5-flash as specified and available
            model = genai.GenerativeModel(
                model_name="gemini-3.5-flash",
                system_instruction=SYSTEM_INSTRUCTION
            )
            
            # Format chat history for Gemini API
            contents = []
            for msg in messages:
                role = "user" if msg["role"] == "user" else "model"
                contents.append({
                    "role": role,
                    "parts": [{"text": msg["text"]}]
                })
            
            # Add latest message
            contents.append({
                "role": "user",
                "parts": [{"text": user_message}]
            })
            
            response = model.generate_content(contents)
            return {
                "text": response.text,
                "is_fallback": False
            }
        except Exception as e:
            # If live API fails, fall back to mock
            return get_mock_response(user_message, is_error=True, error_msg=str(e))
    else:
        return get_mock_response(user_message, is_error=False)

def get_mock_response(message, is_error=False, error_msg=""):
    """
    Returns a capability-focused mock response simulating the Systems AI Assistant,
    using 'we/us/our' and avoiding direct mention of specific tools/technologies.
    """
    prefix = ""
    if is_error:
        prefix = f"[Fallback Mode]\n\n"
        
    text = (
        "We build robust, reliable, and production-grade web systems designed to scale "
        "seamlessly and deliver exceptional user experiences.\n\n"
        "Our capabilities include:\n"
        "- **End-to-End System Delivery**: Turning complex business ideas into fully operational, high-performance web platforms.\n"
        "- **Scalable Architecture**: Designing secure backend engines that support high traffic without breaking a sweat.\n"
        "- **Stunning User Experience**: Creating fluid, intuitive user flows that maximize retention and conversion rates.\n"
        "- **Solid Database Integrity**: Modeling secure multi-tenant data isolation layers and optimized querying pipelines.\n\n"
        "If you are looking to collaborate on your next digital product, feel free to submit a schedule request "
        "or reach out directly through the contact page!"
    )
    return {"text": prefix + text, "is_fallback": True}
