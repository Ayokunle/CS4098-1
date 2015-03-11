OPENEMR_DIR=/var/www/openemr
INJECTION_FILE=${OPENEMR_DIR}/interface/main/main_title.php
PROJECT=Shcyup

sed -i 's/top.frames/top.frames["popupframe"].frames/g' /var/www/openemr/interface/patient_file/encounter/new_form.php
sed -i 's/top.frames/top.frames["popupframe"].frames/g' /var/www/openemr/interface/patient_file/summary/stats.php
sed -i 's/top.frames/top.frames["popupframe"].frames/g' /var/www/openemr/interface/main/main_title.php
sed -i 's/top.frames/top.frames["popupframe"].frames/g' /var/www/openemr/interface/main/left_nav.php

sed -i 's/top.window.document.Title/top.frames["popupframe"].frames["Title"]/g' /var/www/openemr/interface/patient_file/encounter/new_form.php
sed -i 's/top.window.document.Title/top.frames["popupframe"].frames["Title"]/g' /var/www/openemr/interface/patient_file/summary/stats.php
sed -i 's/top.window.document.Title/top.frames["popupframe"].frames["Title"]/g' /var/www/openemr/interface/main/main_title.php
sed -i 's/top.window.document.Title/top.frames["popupframe"].frames["Title"]/g' /var/www/openemr/interface/main/left_nav.php

sed -i 's/active_pid = /top.window.active_pid = active_pid = /g' /var/www/openemr/interface/main/left_nav.php
