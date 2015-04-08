#CS4098

#Tested only to work on Ubuntu 14.04 64 bit - will not work on 32 bit
#See documentation.pdf for technical information, feature lists and user guides

#Installation:
- Go to where you want the program to be installed
- Run "sudo apt-get install git"
- Run "git clone https://github.com/thysol/CS4098"
- Enter the CS4098 directory and run "sudo chmod +x install64.sh"
- Run "sudo ./install64.sh"
- This script will now install all dependencies and then install the program
- Answer "yes" to any confirmation prompts
- You will be prompted to enter your MySQL root password - please enter it correctly
- This install script performs actions other than just installing dependencies. Please do not try to run the project without having ran the install script.
- Once the install is finished automated tests will be run. Please observer their output and note any errors.

#How to use
- For detailed usage instructions on each feature (with screenshots included) see documentation.pdf
- To view pathway support modal dialog popup
	- Go to http://localhost/openemr/ and log in
	- Create a patient
	- Click "Pathway Support" in the patient view screen
	- Verify that modal dialog box with header "Pathway Support" appears
- To show pathway support action list
	- Go to pathway support popup
	- Click the "Create New Pathway" button
	- Select the pathway you want to create an instance of
	- Click ok
	- Click the "Action List" button next to the pathway
	- View the action list
	- Click "expand" on the action you want to select
	- Verify that the start, suspend, abort and finish buttons appear
	- Where applicable, click the buttons to change the action's state
- To test backend functionality
	- Automated tests are performed at the end of the install process. If you want to do manual tests then see below
	- Enter CS4098/test directory
	- Run "python3 create_process_test.py"
	- Run "python3 parse_xml_process_table_test.py"
	- If it is able to receive a request from the server it means the CGI scripts are working and can contact peos
    - To make a request to "Start action", "Finish action", "Abort action" or "Suspend action": "IP/domain name of server"/cgi-bin/kernel_request.py/?event="event"&login_name="login_name"&process_id="process_id"&action_name="action_name"

#Requirements:
- Tested only on Ubuntu 14.04 64bit
- The user installing the program must be able to use sudo
- The following dependencies are required (all installed via our script)
	- make
	- bison
	- flex
	- libxml2
	- check
	- expect
	- tcl
	- mysqltcl
	- lib32ncurses5-dev
	- libreadline-dev
	- python3
	- apache2
	- tcl-dev
	- libxml2-dev
	- dos2unix
	- libxslt-dev
	- python-dev
	- python-lxml
