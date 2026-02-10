import json
import random
import string
from http.server import BaseHTTPRequestHandler

# In-memory store (demo purpose)
url_db = {}

def generate_code(length=6):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        data = json.loads(body)

        long_url = data.get("url")
        if not long_url:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"URL required")
            return

        code = generate_code()
        url_db[code] = long_url

        short_url = f"https://{self.headers['host']}/{code}"

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({
            "shortUrl": short_url
        }).encode())
