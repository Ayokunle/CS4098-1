#!/usr/bin/python

import os
import sys
import subprocess
import urllib.request

#Testing if CGI script will return Json with process table
#print("Requesting parsed list of processes.....")
response = urllib.request.urlopen("http://127.0.0.1/cgi-bin/kernel_request.py/?event=GETLIST&login_name=test").read()
response = str(response)
#print("Received response from server")

if ("404" in response or "500" in response or response == ""):
    sys.exit(1)
else:
    sys.exit(0)
