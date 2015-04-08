echo "******"
echo "Running Shcyup automated tests"

error=0

if [ -f "../peos/os/kernel/peos" ]; then
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

python3 contact_backend_test.py
rc=$?

if [[ $rc != 0 ]]; then
        echo "ERROR: Could not communicate with CGI script"
        error=1
else
        echo "OK: Can communicate with CGI script"
fi

python3 GETLIST_test.py
rc=$?

if [[ $rc != 0 ]]; then
        echo "ERROR: Could not create a process"
        error=1
else
        echo "OK: Process was created"
fi

python3 CREATE_PROCESS_test.py
rc=$?

if [[ $rc != 0 ]]; then
        echo "ERROR: Script was not able to create a process"
        error=1
else
        echo "OK: Script was able to create a process"
fi

if [ -d "/var/www/openemr" ]; then
        echo "OK: OpenEMR seems to be installed"
else
        echo "ERROR: OpenEMR is not installed"
        error=1
fi

if [ "$error" -eq 1 ]; then
        echo "FAIL: Errors were encountered in testing"
else
        echo "SUCCESS: All tests passed"
fi

echo "******"
