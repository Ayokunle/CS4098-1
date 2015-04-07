#!/usr/bin/python
import os
import re
import sys
import json
import urllib
import socket             
import subprocess
import cgi, cgitb 


cmd = "mysqldump --xml -u root openemr patient_data"

xml = subprocess.check_output(cmd, shell=True)
print "Content-Type: text/html\n"
#print xml

file = open("patient_data.xml", "w+")
file.write(xml)
file.close()

cmd = "xml2json -t xml2json -o patient_data.json patient_data.xml --strip_text"
output = subprocess.check_output(cmd, shell=True)

file = open("patient_data.json", "r+")
print file.read()
file.close()
