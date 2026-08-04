import http.server
import socketserver

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

class ThreadingTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    daemon_threads = True
    allow_reuse_address = True

if __name__ == '__main__':
    PORT = 8080
    with ThreadingTCPServer(("0.0.0.0", PORT), NoCacheHandler) as httpd:
        print(f"Serving at port {PORT} with multithreading & no-cache headers")
        httpd.serve_forever()

