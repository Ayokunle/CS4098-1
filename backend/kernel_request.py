#!/usr/bin/python 

import sys
import socket             
from subprocess import call

EXECUTION_PATH = "/root/peos-master/os/kernel/"
MODEL_PATH = "/root/peos-master/models/"
MAX_CONNECTION_REQUEST_QUEUE = 5

server = socket.socket() 
host = socket.gethostname()
port = sys.argv[1]        
server.bind((host, int(port)))

server.listen(MAX_CONNECTION_REQUEST_QUEUE)     

while True:
	client, address = server.accept()
	request = client.recv(1024)
	
	request = request.split("****")
	
	if request[0] == "CREATE":
		#peos [-l login_name] -c name_of_model_file
		call([EXECUTION_PATH + "./peos", "-l", request[1], "-c", MODEL_PATH + request[2]])
		
	elif request[0] == "START/FINISH/SUSPEND/ABORT":
		#peos [-l login_name] -n process_id action_name event
		call([EXECUTION_PATH + "./peos", "-l", request[1], "-n", request[2], request[3], request[4]])
		
	client.close()