OPENEMR_DIR=/var/www/openemr
INJECTION_FILE=${OPENEMR_DIR}/interface/main/main_title.php
PROJECT=Shcyup

#Add 
#
#<a href="Shcyup/app/pathways/pathways.html" class='iframe large_modal' onclick='top.restoreSession()'>
#<?php echo htmlspecialchars(xl('Pathway Support'),ENT_NOQUOTES); ?></a>
#
#to main/interface/patient_file/summary/demographics.php

sed 