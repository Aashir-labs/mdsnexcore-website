"""
MDSNEXCORE — Local Development & Preview Server
Run this script to launch a local HTTP server and view the corporate website.
Usage: python server.py [port]
"""

import http.server
import socketserver
import webbrowser
import sys
import os

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable caching-free local preview
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print(f"  MDSNEXCORE Corporate Profile Web Server")
        print(f"  Status: Active & Serving")
        print(f"  URL:    {url}")
        print("=" * 60)
        print("  Press Ctrl+C to terminate the server.\n")
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server. Goodbye!")

if __name__ == "__main__":
    run()
