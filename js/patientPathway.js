KERNEL_REQUEST_URL = "cgi-bin/kernel_request.py"

function getPathway(pid, handler) {
        data = {"event" : "GETLIST", "login_name" : pid};
        $.get(KERNEL_REQUEST_URL, data, handler);
}