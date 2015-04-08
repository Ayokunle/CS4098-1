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
./mysql.sh
cd peos
sudo make
rm models/build_test.pml
rm models/commit_changes.pml
rm models/incremental_test.pml
rm models/netbeans_req_release.pml
rm models/run_peos.pml
rm models/simple.pml
rm models/test_commit.pml
rm models/web_test.pml

cd ../
sudo make install

sudo a2enmod cgi
sudo service apache2 restart

cd test
sudo chmod +x test.sh
./test.sh
