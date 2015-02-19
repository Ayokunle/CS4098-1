#!/usr/bin/python 

import os
import sys
import json
import socket             
import subprocess
try:
    from lxml import etree
except ImportError:
    import xml.etree.ElementTree as etree


MAX_CONNECTION_REQUEST_QUEUE = 5

server = socket.socket() 
host = socket.gethostname()
port = sys.argv[1]        
server.bind((host, int(port)))

server.listen(MAX_CONNECTION_REQUEST_QUEUE)   

while True:
	client, address = server.accept()
	request = client.recv(1024)
	request = json.loads(request)
	
	if request['event'] == "GET_TABLE":
		data = {}
		data['key'] = 'value'
		json_data = json.dumps(data)

		tree = etree.parse('process_table.xml')  

		for process in tree.iter("process"):
			print("%s - %s" % (process.tag, process.attrib))
			data['process.tag'] = process.tag
			data['process.attrib'] = process.attrib

			for action in process.iter("action"):
				print(" %s - %s" % (action.tag, action.attrib))
				data['action.tag'] = action.tag
				data['action.attrib'] = action.attrib
				
				for script in action.iter("script"):
					print("  %s - %s" % (script.tag, script.text))
					data['script.tag'] = script.tag
					data['script.text'] = script.text
				
				for req_resource in action.iter("req_resource"):
					print("  %s - %s" % (req_resource.tag, req_resource.text))
					data['req_resource.tag'] = req_resource.tag
					data['req_resource.text'] = req_resource.text

				for prov_resource in action.iter("prov_resource"):
					print("  %s - %s" % (prov_resource.tag, prov_resource.text))
					data['prov_resource.tag'] = prov_resource.tag
					data['prov_resource.text'] = prov_resource.text
		
	client.send(error)
	client.close()

