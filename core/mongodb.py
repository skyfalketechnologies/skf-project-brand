import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

# Read MONGODB_URI from environment (.env)
MONGODB_URI = os.getenv("MONGODB_URI")

_mongo_client = None
_db = None

def get_mongodb_db():
    global _mongo_client, _db
    if _db is not None:
        return _db
        
    if not MONGODB_URI:
        return None
        
    try:
        # Establish connection with a 5-second timeout and SSL/TLS bypass for compatibility
        _mongo_client = MongoClient(
            MONGODB_URI,
            serverSelectionTimeoutMS=5000,
            tlsAllowInvalidCertificates=True
        )
        # Verify connection is live
        _mongo_client.admin.command('ping')
        
        # Parse database name from connection string or default to 'sila_portfolio'
        db_name = "sila_portfolio"
        if "/" in MONGODB_URI.replace("mongodb+srv://", "").replace("mongodb://", ""):
            db_parts = MONGODB_URI.split("/")
            if db_parts[-1] and "?" not in db_parts[-1]:
                db_name = db_parts[-1]
            elif db_parts[-1] and "?" in db_parts[-1]:
                db_name = db_parts[-1].split("?")[0]
                
        _db = _mongo_client[db_name]
        print(f"Successfully connected to MongoDB database: {db_name}")
        return _db
    except (ConnectionFailure, Exception) as e:
        print(f"MongoDB connection failed: {e}")
        return None

def sync_projects_to_mongodb():
    db = get_mongodb_db()
    if db is None:
        return
        
    try:
        from portfolio.models import Project
        projects = Project.objects.all()
        
        projects_collection = db["projects"]
        # Clear existing to synchronize fresh
        projects_collection.delete_many({})
        
        for p in projects:
            projects_collection.insert_one({
                "id": p.id,
                "title": p.title,
                "description": p.description,
                "technologies": p.technologies,
                "github_link": p.github_link,
                "live_link": p.live_link,
                "slug": p.slug,
                "content": p.content,
                "created_at": p.created_at.isoformat() if p.created_at else None
            })
        print(f"Successfully synchronized {projects.count()} projects to MongoDB!")
    except Exception as e:
        print(f"Failed to sync projects to MongoDB: {e}")
