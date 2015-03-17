#!/usr/bin/python

import os
import re
import sys
import json
import urllib
import socket             
import subprocess
import cgi, cgitb 


patient_id = sys.argv[1]

cmd = "xml2json -t xml2json -o " + patient_id + ".json ../peos/os/kernel/"+ patient_id +".dat.xml --strip_text"
output = subprocess.check_output(cmd, shell=True)

file = open(patient_id + ".json", "r+")
print file.read()
file.close()
