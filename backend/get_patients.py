import subprocess
cmd = "mysqldump --xml -u root openemr patient_data"

xml = subprocess.check_output(cmd, shell=True)
#print xml

file = open("patient_data.xml", "w")
file.write(xml)
file.close()