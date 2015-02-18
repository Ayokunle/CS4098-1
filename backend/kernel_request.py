#!/usr/bin/python 

import os
import sys
import json
import socket             
import subprocess

EXECUTION_PATH = "/root/peos-master/os/kernel/"
MODEL_PATH = "/root/peos-master/models/"
MAX_CONNECTION_REQUEST_QUEUE = 5

os.chdir(EXECUTION_PATH)
sampleJSON = '{ "event": "CREATE", "login_name": "henrik", "pathway_name": "test_commit.pml" }'
server = socket.socket() 
host = socket.gethostname()
port = sys.argv[1]        
server.bind((host, int(port)))

server.listen(MAX_CONNECTION_REQUEST_QUEUE)     

while True:
	client, address = server.accept()
	request = client.recv(1024)
	#request = sampleJSON
	request = json.loads(request)
	
	if request['event'] == "CREATE":
		#peos [-l login_name] -c name_of_model_file
		process = subprocess.Popen(["./peos", "-l", request['login_name'], "-c", MODEL_PATH + request['pathway_name']], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
		
	else:
		#peos [-l login_name] -n process_id action_name event
		process = subprocess.Popen(["./peos", "-l", request['login_name'], "-n", request['process_id'], request['action_name'], request['event']], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
	
	output, error = process.communicate()
	client.send(output)
	client.send(error)
	client.close()
