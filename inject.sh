OPENEMR_DIR=/var/www/openemr
INJECTION_FILE=${OPENEMR_DIR}/interface/patient_file/summary/demographics.php
PROJECT=openemr/pathway_support

#The location in the file to place the injected lines after
INJECT_AFTER_LINE="<?php echo htmlspecialchars(xl('Issues'),ENT_NOQUOTES); ?></a>"

#The lines to be injected into the file
INJECTED_LINE1="\n|"
INJECTED_LINE2="<a href=\"/$PROJECT/app/pathways/pathways.html?patient_id=<?php echo \$pid;?>\" class='iframe large_modal' onclick='top.restoreSession()'>"
INJECTED_LINE3="<?php echo htmlspecialchars(xl('Pathway Support'),ENT_NOQUOTES); ?></a>"

#Get the number of times the injected lines appear in the file
S1=`grep -c "$INJECTED_LINE3" "$INJECTION_FILE"`

#If injected lines don't appear in the file, then inject them
if [[ ${S1} < 1 ]]; then
	sed -i "s:${INJECT_AFTER_LINE}:&${INJECTED_LINE1}\n${INJECTED_LINE2}\n${INJECTED_LINE3}:g" $INJECTION_FILE
	echo "Injection successful"
else
	echo "Injection already present! No changes made."
	S2=`grep "$INJECTED_LINE3" "$INJECTION_FILE"`
	echo "Found: $S2"
fi
