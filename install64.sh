sudo apt-get -y --force-yes update
sudo apt-get -y --force-yes install make
sudo apt-get -y --force-yes install bison
sudo apt-get -y --force-yes install flex
sudo apt-get -y --force-yes install libxml2
sudo apt-get -y --force-yes install check
sudo apt-get -y --force-yes install expect
sudo apt-get -y --force-yes install tcl
sudo apt-get -y --force-yes install mysqltcl
sudo apt-get -y --force-yes install lib32ncurses5-dev
sudo apt-get -y --force-yes install libreadline-dev
sudo apt-get -y --force-yes install python3
sudo apt-get -y --force-yes install apache2
sudo apt-get -y --force-yes install tcl-dev
sudo apt-get -y --force-yes install libxml2-dev
sudo apt-get -y --force-yes install dos2unix
sudo apt-get -y --force-yes install libxslt-dev
sudo apt-get -y --force-yes install python-dev
sudo apt-get -y --force-yes install python-lxml

if [ ! -d "/var/www/openemr" ]; then
	echo "Installing OpenEMR"
        wget downloads.sourceforge.net/openemr/openemr_4.2.0-1_all.deb
        sudo dpkg -i openemr_4.2.0-1_all.deb
        sudo apt-get -y --force-yes install -f
else
	echo "OpenEMR is already installed"
fi

if [ ! -d "peos" ]; then
	echo "Downloading peos"
	git clone https://github.com/jnoll/peos
else
	echo "peos already downloaded"
fi

cp backend/peos/kernel/. peos/os/kernel/ -R
cp backend/peos/models/. peos/models/ -R
chmod u+x mysql.sh
/bin/bash mysql.sh
cd peos
sudo make
rm models/commit_changes.pml
rm models/incremental_test.pml
rm models/netbeans_req_release.pml
rm models/run_peos.pml
rm models/simple.pml
rm models/test_commit.pml

cd ../
sudo make install

sudo a2enmod cgi
sudo service apache2 restart

#run tests

echo "******"
echo "Install complete - running Shcyup automated tests"

error=0

if [ -f "peos/os/kernel/peos" ]; then
        echo "OK: Peos executable exists"
else
        echo "ERROR: Peos executable does not exist"
        error=1
fi

if [ -f "/usr/lib/cgi-bin/kernel_request.py" ]; then
        echo "OK: Kernel request script exists"
else
        echo "ERROR: Kernel request script does not exist"
        error=1
fi

python3 test/contact_backend_test.py
rc=$?

if [ ! $rc -eq 0 ]; then
        echo "ERROR: Could not communicate with CGI script"
        error=1
else
        echo "OK: Can communicate with CGI script"
fi

if [ -d "/var/www/openemr" ]; then
        echo "OK: OpenEMR seems to be installed"
else
        echo "ERROR: OpenEMR is not installed"
        error=1
fi

if [ -d "/var/www/openemr/pathway_support" ]; then
        echo "OK: Our code seems to be installed"
else
        echo "ERROR: Our code is not installed"
        error=1
fi

if [ "$error" -eq 1 ]; then
        echo "FAIL: Errors were encountered in testing"
else
        echo "SUCCESS: All tests passed"
fi

echo "******"
