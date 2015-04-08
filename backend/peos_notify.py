#!/usr/bin/python

import os
import re
import sys
import json
import urllib
import socket
import subprocess
import cgi, cgitb
from os import listdir
from os.path import isfile, join

#http://178.62.51.54:13930/event=CREATE&login_name=henrik&pathway_name=test_commit.pml

def peos_notify(patient_id):
    EXECUTION_PATH = "CS4098/peos/os/kernel/"

    #Error constants
    ERROR_USER_NOT_EXIST = 1
    ERROR_SCRIPT_FAIL = 2
    
    try:
        os.chdir(os.path.dirname(os.path.realpath(__file__)))
        os.chdir(EXECUTION_PATH)

	process = subprocess.Popen(["./peos", "-l", patient_id, "-u" ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
	output, error = process.communicate()

    	jsonreply = {"status" : "success", "output" : {"o" : output, "e" : error}}
    except Exception as ex:
	jsonreply = {"error": "%s\n%s" % (type(ex), ex), "error_code" : ERROR_SCRIPT_FAIL}

	print json.dumps(jsonreply)

