OPENEMR_DIR=/var/www/openemr
INJECTION_FILE=${OPENEMR_DIR}/interface/main/main_title.php
PROJECT=Shcyup

#TODO:
# Change ALL occurrences of 'top.frames' to 'top.frames["popupframe"].frames'
# Change ALL occurrences of 'top.window.document.Title' to 'top.frames["popupframe"].frames["Title"]'
# Change ALL occurences of 'active_pid = ' to 'top.window.active_pid = active_pid = '

SCRIPT_ANGULAR="<script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js\"></script>"
SCRIPT_ANGULAR_SANITIZE="<script src=\"http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-sanitize.js\"></script>"
SCRIPT_ANGULAR_ROUTE="<script src = \"https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0rc1/angular-route.js\"></script>"
SCRIPT_INJECT="<script src=\"/${PROJECT}/js/emrinjection.js\"></script>"

POPUP_CSS="<link href=\"/${PROJECT}/Shcyup/css/stylesheets/popup.css\" rel=\"stylesheet\" type=\"text/css\" />"

echo "Injecting popup code"

#Inject popup app declaration into openemr main title frame
sed -e "s@<html>@<html ng-app=\"popupApp\" />@" $INJECTION_FILE > $INJECTION_FILE.temp && mv $INJECTION_FILE.temp $INJECTION_FILE

#Inject popup scripts into openemr main title frame
sed -e "s@</head>@${SCRIPT_JQUERY}${SCRIPT_ANGULAR}\n${SCRIPT_ANGULAR_SANITIZE}\n${SCRIPT_ANGULAR_ROUTE}\n${SCRIPT_INJECT}\n&@" ${INJECTION_FILE} > ${INJECTION_FILE}.temp && mv ${INJECTION_FILE}.temp ${INJECTION_FILE}

#Inject popup html into openemr main title frame
sed -e "s@</html>@<div ng-controller=\"injection_controller\" ng-bind-html=\"InjectLocation\"></div>\n&@" ${INJECTION_FILE} > ${INJECTION_FILE}.temp && mv ${INJECTION_FILE}.temp ${INJECTION_FILE}

#Inject popup css into openemr main title frame
sed -e "s@<head>@&\n${POPUP_CSS}@" ${INJECTION_FILE} > ${INJECTION_FILE}.temp && mv ${INJECTION_FILE}.temp ${INJECTION_FILE}
