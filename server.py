import http.server
import socketserver
import ssl
import threading

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

class ThreadingTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    daemon_threads = True
    allow_reuse_address = True

def run_http(port=8080):
    with ThreadingTCPServer(("0.0.0.0", port), NoCacheHandler) as httpd:
        print(f"HTTP Server active at http://127.0.0.1:{port}")
        httpd.serve_forever()

def run_https(port=8443):
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(certfile="cert.pem", keyfile="key.pem")
    with ThreadingTCPServer(("0.0.0.0", port), NoCacheHandler) as httpd:
        httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
        print(f"HTTPS Server active at https://127.0.0.1:{port}")
        httpd.serve_forever()

if __name__ == '__main__':
    t1 = threading.Thread(target=run_http, args=(8080,), daemon=True)
    t2 = threading.Thread(target=run_https, args=(8443,), daemon=True)
    t1.start()
    t2.start()
    t1.join()
    t2.join()
