sudo apt-get -y --force-yes update
sudo apt-get -y --force-yes install make
sudo apt-get -y --force-yes install libxml2-dev
sudo apt-get -y --force-yes install check
sudo apt-get -y --force-yes install expect
sudo apt-get -y --force-yes install libxml2
sudo apt-get -y --force-yes install tcl-dev
sudo apt-get -y --force-yes install libreadline-dev
sudo apt-get -y --force-yes install libncurses5-dev
sudo apt-get -y --force-yes install apache2
sudo apt-get -y --force-yes install python3
sudo apt-get -y --force-yes install bison
sudo apt-get -y --force-yes install flex
sudo apt-get -y --force-yes install python-pip
sudo pip install https://github.com/hay/xml2json/zipball/master
sudo apt-get -y --force-yes install mysqltcl
sudo apt-get -y --force-yes install dos2unix
sudo apt-get -y --force-yes install zlibc 
sudo apt-get -y --force-yes install zlib1g 
sudo apt-get -y --force-yes install zlib1g-dev
git clone https://github.com/jnoll/peos
cd peos
sudo make
cd ../
sudo make install
