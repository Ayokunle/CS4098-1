OPENEMR.dir=/var/www/openemr
INJECTION_FILE=${OPENEMR}/main/main_title.php

SCRIPT_ANGULAR=<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
SCRIPT_ANGULAR_SANITIZE=<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-sanitize.js"></script>
SCRIPT_ANGULAR_ROUTE=<script src = "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0rc1/angular-route.js"></script>
SCRIPT_INJECT=<script src="/js/emrinjection.js"></script>

POPUP_CSS=<link href="css/stylesheets/popup.css" rel="stylesheet" type="text/css" />

echo "Injecting popup code"

#Inject popup app declaration into openemr main title frame
sed -e "s_<html>_<html ng-app=\"popupApp\" />_" ${INJECTION_FILE} > ${INJECTION_FILE}.temp && mv ${INJECTION_FILE}.temp ${INJECTION_FILE}

#Inject popup scripts into openemr main title frame
sed -e "s_</head>_${SCRIPT_ANGULAR}\n${SCRIPT_ANGULAR_SANITIZE}\n${SCRIPT_ANGULAR_ROUTE}\n${SCRIPT_INJECT}\n&_" ${INJECTION_FILE} > ${INJECTION_FILE}.temp && mv ${INJECTION_FILE}.temp ${INJECTION_FILE}

#Inject popup html into openemr main title frame
sed -e "s_</html>_<div ng-controller=\"injection_controller\" ng-bind-html=\"InjectLocation\"></div>\n&_" ${INJECTION_FILE} > ${INJECTION_FILE}.temp && mv ${INJECTION_FILE}.temp ${INJECTION_FILE}

#Inject popup css into openemr main title frame
sed -e "s_<head>_&${POPUP_CSS}_" ${INJECTION_FILE} > ${INJECTION_FILE}.temp && mv ${INJECTION_FILE}.temp ${INJECTION_FILE}