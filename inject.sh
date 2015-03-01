OPENEMR.dir=/var/www/openemr
INJECTION_FILE=${OPENEMR}/main/main_title.php

SCRIPT_ANGULAR=<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
SCRIPT_INJECT=<script src="/js/emrinjection.js"></script>

echo "Injecting popup code"

#Inject popup app declaration into openemr main title frame
sed -e "s_<html>_<html ng-app=\"popupApp\" />_" ${INJECTION_FILE} > ${INJECTION_FILE}.temp && mv ${INJECTION_FILE}.temp ${INJECTION_FILE}

#Inject popup scripts into openemr main title frame
sed -e "s_</head>_${SCRIPT_ANGULAR}\n${SCRIPT_INJECT}\n&_" ${INJECTION_FILE} > ${INJECTION_FILE}.temp && mv ${INJECTION_FILE}.temp ${INJECTION_FILE}

#Inject popup html into openemr main title frame
sed -e "s_</html>_<div ng-controller=\"injection_controller\">{{InjectLocation}}</div>\n&_" ${INJECTION_FILE} > ${INJECTION_FILE}.temp && mv ${INJECTION_FILE}.temp ${INJECTION_FILE}
