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
EXECUTION_PATH = "CS4098/peos/os/kernel/"
MODEL_PATH = "../../models/"
XML_PARSER_PATH = "CS4098/backend/"
MAX_CONNECTION_REQUEST_QUEUE = 5


#Error constants
ERROR_USER_NOT_EXIST = 1
ERROR_SCRIPT_FAIL = 2


os.chdir(os.path.dirname(os.path.realpath(__file__)))
os.chdir(EXECUTION_PATH)
sampleJSON = '{ "event": "GETLIST", "login_name": "henrik", "pathway_name": "test_commit.pml" }'

request = cgi.FieldStorage()


#Set header content type to json for frontend
print ("Content-type:text/json\r\n\r\n")

if request.getvalue('event') == "CREATE":
    try:
        #peos [-l login_name] -c name_of_model_file
        process = subprocess.Popen(["./peos", "-l", request.getvalue('login_name'), "-c", MODEL_PATH + request.getvalue('pathway_name')], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        output, error = process.communicate()

        jsonreply = {"status" : "success", "output" : {"o" : output, "e" : error}}
    except Exception as ex:
        jsonreply = {"error": "%s\n%s" % (type(ex), ex), "error_code" : ERROR_SCRIPT_FAIL}

    print json.dumps(jsonreply)

elif request.getvalue('event') == "GETLIST_PEOS":
    models = [ f for f in listdir(MODEL_PATH) if isfile(join(MODEL_PATH,f)) and f.endswith(".pml") ]
    JSON = json.dumps(models)

    print (JSON)

elif request.getvalue('event') == "GETLIST":
    #python3 process_xml_parser.py <login_name>
    os.chdir(os.path.dirname(os.path.realpath(__file__)))
    os.chdir(XML_PARSER_PATH)
    process = subprocess.Popen(["python3", "process_xml_parser.py", request.getvalue('login_name')], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    output, error = process.communicate()
    os.chdir(os.path.dirname(os.path.realpath(__file__)))

    try:
        jsonFile = open("CS4098/backend/" + request.getvalue('login_name') + ".json", "r")
        data = json.loads(jsonFile.read())
    except:
        data = {"error": "User does not exist", "error_code" : 1}

    #Convert process key to list
    if (not isinstance(data["process_table"]["process"], list)):
        data["process_table"]["process"] = [data["process_table"]["process"]]

    print json.dumps(data)


elif request.getvalue('event') == "DELETE":
    #To delete a process: peos [-l login_name] -d pid
    process = subprocess.Popen(["./peos", "-l", request.getvalue('login_name'), "-d", request.getvalue('process_id')], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

else:
    #peos [-l login_name] -n process_id action_name event
    try:
        process = subprocess.Popen(["./peos", "-l", str(request.getvalue('login_name')), "-n", str(request.getvalue('process_id')), request.getvalue('action_name'), request.getvalue('event')], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        output, error = process.communicate()

        #Construct a string from the command arguments
        commandargs = ("./peos", "-l", str(request.getvalue('login_name')), "-n", str(request.getvalue('process_id')), request.getvalue('action_name'), request.getvalue('event'))
        commandstr = ("%s " * len(commandargs)) % commandargs

        jsonreply = {"status" : "success", "output" : {"o" : output, "e" : error}, "command" : commandstr}
    except Exception as ex:
        jsonreply = {"error": "%s\n%s" % (type(ex), ex), "error_code" : ERROR_SCRIPT_FAIL}

    print json.dumps(jsonreply)
