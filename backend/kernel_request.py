#!/usr/bin/python

import os
import re
import sys
import json
import urllib
import socket             
import subprocess
import cgi, cgitb 

#http://178.62.51.54:13930/event=CREATE&login_name=henrik&pathway_name=test_commit.pml
EXECUTION_PATH = "CS4098/peos/os/kernel/"
MODEL_PATH = "../../models/"
XML_PARSER_PATH = "CS4098/backend/"
MAX_CONNECTION_REQUEST_QUEUE = 5

os.chdir(os.path.dirname(os.path.realpath(__file__)))
os.chdir(EXECUTION_PATH)
sampleJSON = '{ "event": "GETLIST", "login_name": "henrik", "pathway_name": "test_commit.pml" }'

request = cgi.FieldStorage() 

if request.getvalue('event') == "CREATE":
    #os.chdir(EXECUTION_PATH)
    
    #peos [-l login_name] -c name_of_model_file
    process = subprocess.Popen(["./peos", "-l", request.getvalue('login_name'), "-c", MODEL_PATH + request.getvalue('pathway_name')], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    #print ("./peos ", " -l " + request['login_name'][0] + " -c " + MODEL_PATH + request['pathway_name'][0])
    output, error = process.communicate()
    
    os.chdir(os.path.dirname(os.path.realpath(__file__)))
    os.chdir(XML_PARSER_PATH)
    process = subprocess.Popen(["python3", "process_xml_parser.py", request.getvalue('login_name')], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    output, error = process.communicate()
    os.chdir(os.path.dirname(os.path.realpath(__file__)))
    
    try:
        jsonFile = open("CS4098/backend/" + request.getvalue('login_name') + ".json", "r")
        data = jsonFile.read()
        
    except:
        data = '{"error": "User does not exist", "error_code" : 1}'
    
    print ("Content-type:text/json\r\n\r\n")
    #print(output)
    #print(error)
    print (data)
    
elif request.getvalue('event') == "GETLIST_PEOS":
    #peos [-l login_name] -i
    process = subprocess.Popen(["./peos", "-l", request.getvalue('login_name'), "-i"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            
    #print("Waiting for process to finish")
    output, error = process.communicate()
    #print("Process finished")
    #print(output)
    #print(error)
    #print("End")
    first = True
            
    processes = str(output)[2:-1].split("\\")
            
    JSON = "{"
            
    for process in processes:
        #print(process)
        if (len(process) > 4):
            if (not first):
                JSON += ", "
                JSON +=  process[1:3] + " : " + (process.split("/")[-1])
                        
            else:
                JSON +=  process[0:2] + " : " + (process.split("/")[-1])
                        
            first = False
                    
    JSON += "}"
            
    print ("Content-type:text/json\r\n\r\n")
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
        data = jsonFile.read()
        
    except:
        data = '{"error": "User does not exist", "error_code" : 1}'
    
    print ("Content-type:text/json\r\n\r\n")
    #print(output)
    #print(error)
    #print("Bye")
    print (data)
        
elif request.getvalue('event') == "DELETE":
    #To delete a process: peos [-l login_name] -d pid
    process = subprocess.Popen(["./peos", "-l", request.getvalue('login_name'), "-d", request.getvalue('process_id')], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            
else:
    #peos [-l login_name] -n process_id action_name event
    process = subprocess.Popen(["./peos", "-l", request.getvalue('login_name'), "-n", request.getvalue('process_id'), request.getvalue('action_name'), request.getvalue('event')], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
if (request.getvalue('event') != "GETLIST" and request.getvalue('event') != "GETLIST_PEOS" and request.getvalue('event') != "CREATE"):
    print ("Content-type:text/json\r\n\r\n")
    print("Waiting for process to finish")
    output, error = process.communicate()
    print("Process finished")
    print(output)
    print(error)
    print("End")
       
    print ("Content-type:text/html\r\n\r\n")
    print (output)
