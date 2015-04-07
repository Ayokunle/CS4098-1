echo "Running Shcyup tests"

if [ -f "../peos/os/kernel/peos" ]; then
	echo "SUCCESS: peos executable exists"
else
	echo "ERROR: peos executable does not exist"
fi

if [ -f "/usr/lib/cgi-bin/kernel_request.py" ]; then
	echo "SUCCESS: kernel request script exists"
else
	echo "ERROR: kernel request script does not exist"
fi

python3 testCGI.py; echo $?
