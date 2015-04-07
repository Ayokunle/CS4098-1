#!/usr/bin/python

import urllib.request

r = urllib.request.urlopen("http://127.0.0.1/cgi-bin/kernel_request.py")
if (r.getCode() == 200):
	sys.exit(0)
else:
	sys.exit(1)
