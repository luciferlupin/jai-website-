import http.server
import socketserver
import ssl
import sys
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

def run_http(port=4000):
    with ThreadingTCPServer(("0.0.0.0", port), NoCacheHandler) as httpd:
        print(f"HTTP Server active at http://127.0.0.1:{port}")
        httpd.serve_forever()

def run_https(port=4443):
    try:
        context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        context.load_cert_chain(certfile="cert.pem", keyfile="key.pem")
        with ThreadingTCPServer(("0.0.0.0", port), NoCacheHandler) as httpd:
            httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
            print(f"HTTPS Server active at https://127.0.0.1:{port}")
            httpd.serve_forever()
    except Exception as e:
        print(f"HTTPS server could not start: {e}")

if __name__ == '__main__':
    http_port = int(sys.argv[1]) if len(sys.argv) > 1 else 4000
    https_port = int(sys.argv[2]) if len(sys.argv) > 2 else http_port + 443
    t1 = threading.Thread(target=run_http, args=(http_port,), daemon=True)
    t2 = threading.Thread(target=run_https, args=(https_port,), daemon=True)
    t1.start()
    t2.start()
    t1.join()
    t2.join()

