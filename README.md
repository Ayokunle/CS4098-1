#CS4098
#Release tag: 0.3.0

#Requirements:
- The following commands need to be run
- sudo apt-get update (required for flex to install properly)
- sudo apt-get install make
- sudo apt-get install check
- sudo apt-get install tcl-dev
- sudo apt-get install libreadline-dev
- sudo apt-get install lib32ncurses5-dev
- sudo apt-get install apache2
- sudo apt-get install python3
- sudo apt-get install git
- sudo apt-get install bison
- sudo apt-get install flex
- The following will be installed during setup:
	- OpenEMR (will be installed via our makefile)
	- The peos kernel at https://github.com/jnoll/peos (clone this as described below)
  
#Installation:

To install:
- Run all commands given above to install dependencies
- Go to where you want to install the program
- Clone the https://github.com/thysol/CS4098 repo
- Enter the CS4098 folder
- Run "sudo make install"
- If OpenEMR has not been installed it will now download and install
- If prompted, create a mysql root password (applicable if installing mysql server)
- If prompted, enter your mysql root password (during openemr installion)
- Clone https://github.com/jnoll/peos so it will be located in CS4098/peos
- Enter the CS4098/peos directory and run make

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
