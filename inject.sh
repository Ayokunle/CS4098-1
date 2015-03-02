OPENEMR_DIR=/var/www/openemr
INJECTION_FILE=${OPENEMR_DIR}/interface/main/main_title.php

echo $INJECTION_FILE

SCRIPT_ANGULAR="<script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js\"></script>"
SCRIPT_ANGULAR_SANITIZE="<script src=\"http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-sanitize.js\"></script>"
SCRIPT_ANGULAR_ROUTE="<script src = \"https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0rc1/angular-route.js\"></script>"
SCRIPT_INJECT="<script src=\"/js/emrinjection.js\"></script>"

POPUP_CSS="<link href=\"css/stylesheets/popup.css\" rel=\"stylesheet\" type=\"text/css\" />"

echo "Injecting popup code"

#Inject popup app declaration into openemr main title frame
sed -e "s@<html>@<html ng-app=\"popupApp\" />@" $INJECTION_FILE > $INJECTION_FILE.temp && mv $INJECTION_FILE.temp $INJECTION_FILE

#Inject popup scripts into openemr main title frame
sed -e "s@</head>@${SCRIPT_ANGULAR}\n${SCRIPT_ANGULAR_SANITIZE}\n${SCRIPT_ANGULAR_ROUTE}\n${SCRIPT_INJECT}\n&@" ${INJECTION_FILE} > ${INJECTION_FILE}.temp && mv ${INJECTION_FILE}.temp ${INJECTION_FILE}

#Inject popup html into openemr main title frame
sed -e "s@</html>@<div ng-controller=\"injection_controller\" ng-bind-html=\"InjectLocation\"></div>\n&@" ${INJECTION_FILE} > ${INJECTION_FILE}.temp && mv ${INJECTION_FILE}.temp ${INJECTION_FILE}

#Inject popup css into openemr main title frame
sed -e "s@<head>@&${POPUP_CSS}@" ${INJECTION_FILE} > ${INJECTION_FILE}.temp && mv ${INJECTION_FILE}.temp ${INJECTION_FILE}
