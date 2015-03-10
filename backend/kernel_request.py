import os
import re
import sys
import json
import urllib
import socket             
import subprocess

from urllib.parse import urlparse
from http.server import BaseHTTPRequestHandler,HTTPServer

#http://178.62.51.54:13930/event=CREATE&login_name=henrik&pathway_name=test_commit.pml
EXECUTION_PATH = "../peos/os/kernel/"
MODEL_PATH = "../../models/"
MAX_CONNECTION_REQUEST_QUEUE = 5

os.chdir(EXECUTION_PATH)
sampleJSON = '{ "event": "GETLIST", "login_name": "henrik", "pathway_name": "test_commit.pml" }'

class KernelRequest(BaseHTTPRequestHandler):
    def do_GET(self):
        print (self.path)
        request = urllib.parse.parse_qs(self.path[1:])
        
        #request = sampleJSON
        #request = json.loads(request)
        print(request)
        
        if request['event'][0] == "CREATE":
            #peos [-l login_name] -c name_of_model_file
            process = subprocess.Popen(["./peos", "-l", request['login_name'][0], "-c", MODEL_PATH + request['pathway_name'][0]], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            print ("./peos ", " -l " + request['login_name'][0] + " -c " + MODEL_PATH + request['pathway_name'][0])
        elif request['event'][0] == "GETLIST":
            #peos [-l login_name] -i
            process = subprocess.Popen(["./peos", "-l", request['login_name'][0], "-i"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            
            print("Waiting for process to finish")
            output, error = process.communicate()
            print("Process finished")
            print(output)
            print(error)
            print("End")
            first = True
            
            processes = str(output)[2:-1].split("\\")
            
            JSON = "{"
            
            for process in processes:
                print(process)
                if (len(process) > 4):
                    if (not first):
                        JSON += ", "
                        
                    JSON +=  process[1:3] + " : " + (process.split("/")[-1])
                    first = False
                    
            self.send_response(4096)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            
            JSON += "}"
            
            self.wfile.write(bytes(str(JSON), 'utf-8'))
        
        elif request['event'][0] == "DELETE":
            #To delete a process: peos [-l login_name] -d pid
            process = subprocess.Popen(["./peos", "-l", request['login_name'][0], "-d", request['process_id'][0]], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            
        else:
            #peos [-l login_name] -n process_id action_name event
            process = subprocess.Popen(["./peos", "-l", request['login_name'][0], "-n", request['process_id'][0], request['action_name'][0], request['event'][0]], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        if (request['event'][0] != "GETLIST"):
            print("Waiting for process to finish")
            output, error = process.communicate()
            print("Process finished")
            print(output)
            print(error)
            print("End")
            self.send_response(4096)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(bytes(str(output), 'utf-8'))

        return

    def log_request(self, code=None, size=None):
        print('Request')

    def log_message(self, format, *args):
        print('Message')

if __name__ == "__main__":
    
    if (len(sys.argv) < 2):
        print ("Usage: python3 kernel_request.py <portnumber>")
        sys.exit(1)
        
    PORT = int(sys.argv[1])
    
    try:
        server = HTTPServer(('', PORT), KernelRequest)
        print('Started http server')
        server.serve_forever()
    except KeyboardInterrupt:
        print('^C received, shutting down server')
        server.socket.close()
