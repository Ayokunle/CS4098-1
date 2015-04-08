#!/usr/bin/python

import os
import sys
import subprocess
import urllib.request

EXECUTION_PATH = "../peos/os/kernel/"
MODEL_PATH = "../../models/"

os.chdir(os.path.dirname(os.path.realpath(__file__)))
os.chdir(EXECUTION_PATH)

#Creating a process
response = urllib.request.urlopen("http://127.0.0.1/cgi-bin/kernel_request.py/?event=CREATE&login_name=27&pathway_name=Dementia_management.pml").read()

#10000ing if CGI script will return Json with process table
response = urllib.request.urlopen("http://127.0.0.1/cgi-bin/kernel_request.py/?event=GETLIST&login_name=27").read()
response = str(response)

#Deleting process...
response = urllib.request.urlopen("http://127.0.0.1/cgi-bin/kernel_request.py/?event=DELETE&login_name=27&process_id=0").read()

if ("Dementia_management" in response):
    sys.exit(1)
else:
    sys.exit(0)
