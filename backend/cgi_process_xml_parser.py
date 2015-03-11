#!/usr/bin/python

import os
import re
import sys
import json
import urllib
import socket             
import subprocess
import cgi, cgitb 


cmd = "xml2json -t xml2json -o patient_id.json ../../../home/michael/peos/os/kernel/patient_id.dat.xml --strip_text"
output = subprocess.check_output(cmd, shell=True)

print "Content-Type: text/html\n"

file = open("patient_id.json", "r+")
print file.read()
file.close()
