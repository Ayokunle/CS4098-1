#CS4098

#Only works on 64 bit - do not use 32 bit

#Installation:
- Go to where you want the program to be installed
- Run "sudo apt-get install git"
- Run "git clone https://github.com/thysol/CS4098"
- Enter the CS4098 directory and run "sudo chmod +x install64.sh"
- Run "sudo ./install64.sh"
- This script will now install all dependencies then install the program
- Answer "yes" to all confirmation prompts
- You may be prompted to create and/or enter a MySQL root password, please do so
- If you want to install dependencies manually, see the below section

#How to use
- To view pathway support modal dialog popup
	- Go to http://localhost/openemr/ and log in
	- Create a patient
	- Click "Pathway Support" in the patient view screen
	- Verify that modal dialog box with header "Pathway Support" appears
- To show pathway support action list
	- Go to pathway support popup
	- Click the "+" button
	- Select the pathway you want to create an instance of
		- Note that only "web_test", "run_peos", "netbeans_req_release", "test_commit" and "simple" work
	- Click ok
	- Mouse over the pathway and click it when it turns dark blue
	- Verify that the action list appears below the pathway list
	- Click "expand" on the action you want to select
	- Verify that the start, suspend, abort and finish buttons appear (these are currently unfinished)
- To test backend functionality
	- Enter CS4098/test directory
	- Run "python3 create_process_test.py"
	- Run "python3 parse_xml_process_table_test.py"
	- If it is able to receive a request from the server it means the CGI scripts are working and can contact peos
    - To make a request to "Start action", "Finish action", "Abort action" or "Suspend action": "IP/domain name of server"/cgi-bin/kernel_request.py/?event="event"&login_name="login_name"&process_id="process_id"&action_name="action_name"

#Requirements:
- Tested only on Ubuntu 12.04 64bit
- The user installing the program must be able to use sudo
- The following commands need to be run (if not using our install script)
	- sudo apt-get update (required for flex to install properly)
	- sudo apt-get install make
	- sudo apt-get install check
	- sudo apt-get install tcl-dev
	- sudo apt-get install libreadline-dev
	- sudo apt-get install libncurses5-dev
	- sudo apt-get install apache2
	- sudo apt-get install python3
	- sudo apt-get install git
	- sudo apt-get install bison
	- sudo apt-get install flex
	- sudo apt-get install python-pip
	- sudo pip install https://github.com/hay/xml2json/zipball/master
	- sudo apt-get install mysqltcl

#To verify OpenEMR is working:

- Go to OpenEMR location on server 
	- http://localhost/openemr/
- Go to OpenEMR location on server 
	- http://localhost/openemr
- Sign in as admin
	- username: admin
	- password: pass
- Create patients

#To verify peos is working

- Go to CS4098/peos/os/kernel and run "./peos -h" and it should display a list of possible commands
