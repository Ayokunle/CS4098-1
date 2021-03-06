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
response = urllib.request.urlopen("http://127.0.0.1/cgi-bin/kernel_request.py/?event=CREATE&login_name=42&pathway_name=Dementia_management.pml").read()

#27ing if CGI script will return Json with process table
response = urllib.request.urlopen("http://127.0.0.1/cgi-bin/kernel_request.py/?event=GETLIST&login_name=42").read()
response = str(response)

#Clean up (Adding a process at random may have side effects....)
process = subprocess.Popen(["./peos", "-l", "42", "-d", "0"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

if ("Dementia_management" in response):
    sys.exit(0)
else:
    sys.exit(1)
