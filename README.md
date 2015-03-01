#CS4098
#Release tag: 0.3.0

#Requirements:

- make
- apache 2
- python 3.4.1
- https://github.com/jnoll/peos (requries bison [for yacc] and flex)
- OpenEMR (http://www.open-emr.org/wiki/index.php/OpenEMR_Downloads)
  
#Installation:

To install OpenEMR:

- Run the following commands:

 ```bash
 wget downloads.sourceforge.net/openemr/openemr_4.2.0-1_all.deb
 sudo apt-get update
 sudo dpkg -i openemr_4.2.0-1_all.deb
 ```
 If there was an error(s), then issue the following command (type 'Y' after): 

 ```bash
 sudo apt-get install -f
 ```

- If prompted, create a mysql root password (applicable if installing mysql server)
- If prompted, enter your mysql root password (during openemr installion)
- See more at: http://www.open-emr.org/wiki/index.php/OpenEMR_4.2.0_Ubuntu-Debian_Package_Installation#sthash.CTMZM8Vp.dpuf

#OpenEMR:

- Go to OpenEMR location on server 
	- http://localhost/openemr/
- Go to OpenEMR location on server 
	- http://localhost/openemr
- Sign in as admin
	- username: admin
	- password: pass
- Create patients
