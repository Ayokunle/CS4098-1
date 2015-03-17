OPENEMR_DIR=/var/www/openemr
INJECTION_FILE=${OPENEMR_DIR}/interface/patient_file/summary/demographics.php
PROJECT=Shcyup

INJECT_AFTER_LINE="<?php echo htmlspecialchars(xl('Issues'),ENT_NOQUOTES); ?></a>"
INJECTED_LINE="\n|\n<a href=\"/Shcyup/app/pathways/pathways.html?patient_id=<?php echo \$pid;?>\" class='iframe large_modal' onclick='top.restoreSession()'>\n<?php echo htmlspecialchars(xl('Pathway Support'),ENT_NOQUOTES); ?></a>"

sed -i "s:${INJECT_AFTER_LINE}:&${INJECTED_LINE}:g" $INJECTION_FILE
