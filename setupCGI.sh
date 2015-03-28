#!/bin/bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

sudo chmod -R 777 peos
sudo chmod -R 777 backend
sudo cp backend/kernel_request.py /usr/lib/cgi-bin/
sudo cp test/python_gateway.py /var/www/test
sudo chmod 755 /usr/lib/cgi-bin/kernel_request.py
sudo chmod 755 /var/www/test/python_gateway.py
sudo dos2unix /usr/lib/cgi-bin/kernel_request.py
sudo dos2unix /var/www/test/python_gateway.py

ln -s $DIR /usr/lib/cgi-bin/CS4098
