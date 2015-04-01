#!/usr/bin/python

import os
import sys
import subprocess
import urllib.request
import json

argList = ""

for arg in sys.argv:
    argList += arg + "&"
    
argList = argList[:-1]

response = urllib.request.urlopen("http://127.0.0.1/cgi-bin/kernel_request.py/?" + argList)
content = response.read()
data = json.loads(content.decode('utf8'))

print (json.dumps(data)) 