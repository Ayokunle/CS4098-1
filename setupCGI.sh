#!/bin/bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

sudo chmod -R 777 peos
sudo cp backend/kernel_request.py /usr/lib/cgi-bin/
sudo chmod 755 /usr/lib/cgi-bin/kernel_request.py
sudo dos2unix /usr/lib/cgi-bin/kernel_request.py

ln -s $DIR /usr/lib/cgi-bin/CS4098
