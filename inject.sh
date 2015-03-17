OPENEMR_DIR=/var/www/openemr
INJECTION_FILE=${OPENEMR_DIR}/interface/patient_file/summary/demographics.php
PROJECT=Shcyup

INJECT_AFTER_LINE="<?php echo htmlspecialchars(xl('Issues'),ENT_NOQUOTES); ?></a>"
INJECTED_LINE1="\n|"
INJECTED_LINE2="<a href=\"/Shcyup/pathways.html?patient_id=<?php echo \$pid;?>\" class='iframe large_modal' onclick='top.restoreSession()'>"
INJECTED_LINE3="<?php echo htmlspecialchars(xl('Pathway Support'),ENT_NOQUOTES); ?></a>"

S1=`grep -c "$INJECTED_LINE3" "$INJECTION_FILE"`

#echo "if"
if [[ ${S1} < 1 ]]; then
        #echo "sed -i \"s:${INJECT_AFTER_LINE}:&${INJECTED_LINE1}\n${INJECTED_LINE2}\n${INJECTED_LINE3}:g\" $INJECTION_FILE"
        sed -i "s:${INJECT_AFTER_LINE}:&${INJECTED_LINE1}\n${INJECTED_LINE2}\n${INJECTED_LINE3}:g" $INJECTION_FILE
fi
