# #!/usr/bin/python 

# import os
# import sys
# import json
# import socket             
# import subprocess
# try:
#     from lxml import etree
# except ImportError:
#     import xml.etree.ElementTree as etree

# data = {}

# tree = etree.parse('../../../../root/peos-master/os/kernel/patient_id.dat.xml')

# for process in tree.iter("process"):
# 	print("%s - %s" % (process.tag, process.attrib))
# 	data['process.tag'] = process.tag
# 	data['process.attrib'] = process.attrib

# 	for action in process.iter("action"):
# 		print(" %s - %s" % (action.tag, action.attrib))
# 		data['action.tag'] = action.tag
# 		data['action.attrib'] = action.attrib
				
# 		for script in action.iter("script"):
# 			print("  %s - %s" % (script.tag, script.text))
# 			data['script.tag'] = script.tag
# 			data['script.text'] = script.text
				
# 			for req_resource in action.iter("req_resource"):
# 				print("  %s - %s" % (req_resource.tag, req_resource.text))
# 				data['req_resource.tag'] = req_resource.tag
# 				data['req_resource.text'] = req_resource.text

# 				for prov_resource in action.iter("prov_resource"):
# 					print("  %s - %s" % (prov_resource.tag, prov_resource.text))
# 					data['prov_resource.tag'] = prov_resource.tag
# 					data['prov_resource.text'] = prov_resource.text
		
# json_data = json.dumps(data)
# #prin

import subprocess
cmd = "xml2json -t xml2json -o patient_id.json ../../../../../root/peos-master/os/kernel/patient_id.dat.xml --strip_text"

xml = subprocess.check_output(cmd, shell=True)
