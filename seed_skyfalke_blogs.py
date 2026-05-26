import os
import django
import sys
import urllib.request
from django.core.files import File

# Set up Django environment
sys.path.append(os.getcwd())
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth import get_user_model
from blog.models import BlogPost, Tag

User = get_user_model()

def download_and_save_cover(post, img_url, filename):
    temp_filename = f"temp_{filename}"
    try:
        print(f"Downloading cover image for: {post.title}...")
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        req = urllib.request.Request(img_url, headers=headers)
        
        with urllib.request.urlopen(req) as response:
            with open(temp_filename, 'wb') as out_file:
                out_file.write(response.read())
        
        with open(temp_filename, 'rb') as img_file:
            post.cover_image.save(filename, File(img_file), save=True)
            print(f"Successfully saved cover image: {filename}")
            
    except Exception as e:
        print(f"Failed to download/save cover image for {post.title}: {e}")
    finally:
        if os.path.exists(temp_filename):
            try:
                os.remove(temp_filename)
            except Exception:
                pass

def seed_skyfalke_blogs():
    print("Seeding Skyfalke blog posts...")
    user = User.objects.first()
    if not user:
        print("No user found. Creating admin superuser...")
        user = User.objects.create_superuser('admin', 'admin@example.com', 'admin123')

    # Create Tags
    tag_tech, _ = Tag.objects.get_or_create(name="Tech & AI", slug="tech-ai")
    tag_sustainability, _ = Tag.objects.get_or_create(name="Sustainability", slug="sustainability")
    tag_business, _ = Tag.objects.get_or_create(name="Business Growth", slug="business-growth")
    tag_cloud, _ = Tag.objects.get_or_create(name="Cloud & Workplace", slug="cloud-workplace")

    # Clear existing posts
    BlogPost.objects.all().delete()
    print("Cleared existing blog posts.")

    blogs_data = [
        {
            "title": "Should I Hire a Custom Software Company or a Freelancer?",
            "slug": "should-i-hire-a-custom-software-company-or-a-freelancer",
            "img_url": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
            "content": """Software development is rarely solo work. When requirements shift and scale explodes, companies have the bench strength to respond. Freelancers often cannot support long-term scaling, fail-safe backups, or comprehensive quality assurance pipelines.

### Why Bench Strength Matters
When a freelancer gets sick, goes on vacation, or changes jobs, your project stops. A custom software firm operates as a multi-disciplinary team with designers, backend architects, and test engineers. If one team member is unavailable, another slides in without missing a beat.

### Security and Maintenance
Custom software requires continuous security patches, data isolation checks, and dependency upgrades. Custom firms establish structured code handovers, soft-delete safety layers, and automated backups. Choosing a firm is an investment in long-term platform stability and data confidentiality.""",
            "meta_description": "Why does this matter? Software development is rarely solo work. When requirements shift and scale explodes, companies have bench strength to respond.",
            "tags": [tag_business]
        },
        {
            "title": "Is Hiring a Digital Marketing Agency Worth the Cost?",
            "slug": "is-hiring-a-digital-marketing-agency-worth-the-cost",
            "img_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
            "content": """Wondering if hiring a digital marketing agency is worth the cost? Discover the real ROI, honest tradeoffs, and how modern digital strategies help Kenyan businesses grow smarter.

### The Value of Modern Strategy
An agency brings specialists in conversion rate optimization, search ranking, and acquisition funnels. Rather than hiring a full-time in-house marketer with a single skill set, you gain access to a full team of copywriters, designers, and web developers.

### Integrating Tech with Growth
A digital agency helps align frontend UI with analytical dashboards, ensuring data flows securely and pages load fast. High-performing campaigns depend on fast loading times, responsive mobile rendering, and rock-solid conversion paths.""",
            "meta_description": "Wondering if hiring a digital marketing agency is worth the cost? Discover the real ROI, honest tradeoffs, and how we help businesses grow.",
            "tags": [tag_business]
        },
        {
            "title": "How to Choose the Right Web Development Firm",
            "slug": "how-to-choose-the-right-web-development-firm",
            "img_url": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
            "content": """Choosing the right web development firm is one of the most consequential decisions a business decision-maker can make in today's digital-first world.

### What to Look For
1. **Security Focus**: Does the firm support modern data isolation, rate-limiting, and token-based protection?
2. **Horizontal Scaling**: Are their database schemas optimized with appropriate indexes and query planning?
3. **Core Web Vitals**: Do their frontends render fast, avoid layout shifts, and offer smooth micro-animations?

A professional firm works with clear documentation, structured codebases, and provides full system audits before launch.""",
            "meta_description": "Choosing the right web development firm is one of the most consequential decisions a business decision-maker can make.",
            "tags": [tag_cloud]
        },
        {
            "title": "Why Smart Kenyan Businesses Are Moving to Google Workspace Now",
            "slug": "why-smart-kenyan-businesses-are-moving-to-google-workspace-now",
            "img_url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
            "content": """Google Workspace is not just a productivity tool, it is the digital infrastructure backbone that enables Kenyan SMEs and startups to compete, collaborate, and scale with confidence.

### Modernizing Operations
Startups need to securely share data without risking internal leaks. Moving to a central cloud workspace helps control permissions, prevent unauthorized files sharing, and keep all email communications secured under your corporate domain.

### Cost-Efficiency
Maintaining local mail servers or basic host-provided email accounts is risky. Google Workspace provides redundant backups, spam filtering, and instant uptime guarantees that eliminate downtime costs for growing businesses.""",
            "meta_description": "Google Workspace is not just a productivity tool, it is the digital infrastructure backbone that enables startups to scale.",
            "tags": [tag_cloud]
        },
        {
            "title": "How Technology Firms in Kenya Are Transforming Businesses in 2026",
            "slug": "how-technology-firms-in-kenya-are-transforming-businesses-in-2026",
            "img_url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
            "content": """Technology firms are no longer a nice-to-have for Kenyan businesses, they are the engine behind the most competitive, resilient, and scalable companies operating today.

### Systems Over Sites
Businesses are moving away from simple landing pages to interactive web systems. Modern platforms handle booking schedules, rating reviews, client portals, and secure API handshakes.

### Future-Proofing
A tech partner sets up automated system checks, secure database migrations, and modern web services that let your platform adapt as the market evolves.""",
            "meta_description": "Technology firms are the engine behind the most competitive, resilient, and scalable companies operating in Kenya.",
            "tags": [tag_tech, tag_sustainability]
        },
        {
            "title": "GEO Best Practices: Optimize for AI Search in 2026",
            "slug": "geo-best-practices-optimize-for-ai-search-in-2026",
            "img_url": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
            "content": """Generative Engine Optimisation or GEO is the discipline of structuring content so that AI search systems can extract, cite, and surface it as a trusted answer.

### The Shift from SEO to GEO
In 2026, search traffic is increasingly dominated by large language models summarizing web content. If your website is not structured in a way that AI crawlers can understand, your brand will not be recommended.

### How to Prepare
- **Structured Data**: Use clean HTML5 tags and precise schema markups.
- **Direct Authoritative Text**: State answers clearly without excessive promotional fluff.
- **Cite Sources**: Link to trusted reference data to establish credibility with generative crawlers.""",
            "meta_description": "Generative Engine Optimisation (GEO) is the discipline of structuring content so that AI search engines recommend you.",
            "tags": [tag_tech]
        }
    ]

    for blog in blogs_data:
        post = BlogPost.objects.create(
            title=blog["title"],
            slug=blog["slug"],
            content=blog["content"],
            meta_description=blog["meta_description"],
            author=user,
            is_published=True
        )
        post.tags.add(*blog["tags"])
        
        # Download and save cover image
        filename = f"{blog['slug']}.jpg"
        download_and_save_cover(post, blog["img_url"], filename)

    print("All Skyfalke blogs and images seeded successfully!")

if __name__ == "__main__":
    seed_skyfalke_blogs()
