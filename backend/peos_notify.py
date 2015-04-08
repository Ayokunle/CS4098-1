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
    EXECUTION_PATH = "../peos/os/kernel/"

    #Error constants
    ERROR_USER_NOT_EXIST = 1
    ERROR_SCRIPT_FAIL = 2
    
    os.chdir(os.path.dirname(os.path.realpath(__file__)))
    os.chdir(EXECUTION_PATH)

    process = subprocess.Popen(["./peos", "-l", str(patient_id), "-u" ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, error = process.communicate()

    return output, error
