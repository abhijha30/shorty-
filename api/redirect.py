from http.server import BaseHTTPRequestHandler

# SAME memory (demo)
url_db = {}

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        code = self.path.strip("/")

        if code in url_db:
            self.send_response(302)
            self.send_header("Location", url_db[code])
            self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Short link not found")
