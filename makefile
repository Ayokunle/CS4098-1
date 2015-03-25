# This directory is where stuff served by Apache goes. 
HTML.dir=/var/www/${PROJECT}
APP.PATHWAYS.dir=/var/www/${PROJECT}/app/pathways
APP.ACTIONS.dir=/var/www/${PROJECT}/app/actions
CSS.dir=/var/www/${PROJECT}/css/stylesheets
JS.dir=/var/www/${PROJECT}/js
TEST.dir=/var/www/test
JQUERY.dir=${OPENEMR.dir}/library/js
OPENEMR.dir=/var/www/openemr


#####################################################################
# Project-specific parameters that should not be modified by users.

#
# Content to be installed
#

APP_FOLDER=${PROJECT}/app

# Static web pages and forms to be installed:
APP.PATHWAYS=${APP_FOLDER}/pathways/pathways.html ${APP_FOLDER}/pathways/pathwaycontroller.js ${APP_FOLDER}/pathways/popup.js
APP.ACTIONS=${APP_FOLDER}/actions/actions.html ${APP_FOLDER}/actions/actionsDirective.js
PAGES.TEST=test/kernel_request.php

# CGI (and other) scripts to be installed:
SCRIPTS=hello.cgi

CSS=${PROJECT}/css/stylesheets/mick.css ${PROJECT}/css/stylesheets/ie.css ${PROJECT}/css/stylesheets/processaction.css ${PROJECT}/css/stylesheets/screen.css ${PROJECT}/css/stylesheets/pathways.css ${PROJECT}/css/stylesheets/popup.css
JQUERY=openemr/library/js/jquery-2.1.3.min.js

#
# Values for creating the distribution.
#

PROJECT=openemr/pathway_support
# File creation modes.  Please do not modify these: they work on
# proisis.lero.ie.
FILE_MODE=ug+rwX,o+rX
DIR_MODE=ug+rwXs,o+rX
SCRIPT_MODE=ug+rwx,o+rx

#####################################################################
# Some programs used by rules below.

# Use ${INSTALL} to ensure all files & dirs get created with the right
# permissions. 
INSTALL=install

#####################################################################
# The rules.

all: test

# This rule just prints information about what will be built or installed.
what:
	@echo "PROJECT: " ${PROJECT} 
	@echo "RELEASE: " ${RELEASE}
	@echo "RELEASE_CANDIDATE: " ${RELEASE_CANDIDATE}
	@echo "RELEASE_NAME: " ${RELEASE_NAME}

# The 'test' rule should run any unit tests, but because it depends on
# 'build', it will build the system first.
test: build

# The 'build' rule should do things like compile any code, 
# create a database if necessary, etc.
# CAUTION: if you need to ship a default populated database, it should
# be created and populated here.  DO NOT do this by hand else you
# won't have a repeatable, reliable build process.
build: 

# Install the application for deployment by Apache.
# install -d creates a directory if necessary.
install:
	echo "build something"
	wget downloads.sourceforge.net/openemr/openemr_4.2.0-1_all.deb 
	-sudo apt-get update
	-sudo dpkg -i openemr_4.2.0-1_all.deb
	-sudo apt-get install -f
	chmod +x inject.sh
	chmod +x setupCGI.sh
	${INSTALL} --mode ${DIR_MODE} -d ${HTML.dir}
	${INSTALL} --mode ${DIR_MODE} -d ${APP.PATHWAYS.dir}
	${INSTALL} --mode ${DIR_MODE} -d ${APP.ACTIONS.dir}
	${INSTALL} --mode ${DIR_MODE} -d ${CSS.dir}
	${INSTALL} --mode ${DIR_MODE} -d ${JS.dir}
	${INSTALL} --mode ${DIR_MODE} -d ${TEST.dir}
	
	${INSTALL} --mode ${FILE_MODE} ${APP.PATHWAYS} ${APP.PATHWAYS.dir}
	${INSTALL} --mode ${FILE_MODE} ${APP.ACTIONS} ${APP.ACTIONS.dir}
	${INSTALL} --mode ${FILE_MODE} ${CSS} ${CSS.dir}
	#${INSTALL} --mode ${FILE_MODE} ${JS} ${JS.dir}
	#${INSTALL} --mode ${FILE_MODE} ${JS.APP} ${APP.dir}
	${INSTALL} --mode ${FILE_MODE} ${PAGES.TEST} ${TEST.dir}
	${INSTALL} --mode ${FILE_MODE} ${JQUERY} ${JQUERY.dir}
	sudo bash ./inject.sh
	sudo bash ./setupCGI.sh

# Make a distribution archive from the current workspace.
# the 'distclean' dependency insures that the distribution is 
# free of derived files and other cruft.  Make sure 'distclean' 
# actually cleans!
# The '--transform' switch to 'tar' prepends a directory name to 
# each path in the archive, so that the distribution unpacks 
# into its own sub-directory.  This is extremely important, as it 
# ensures your project won't interfere with something else when
# it is unpacked.
dist: distclean
	tar ${TAR_EXCLUDE} --transform='s,^./,${RELEASE_NAME}/,' -cvzf ${RELEASE_NAME}.tar.gz .


clean: 
	rm -f *~


distclean: clean
	rm -f *.pyc ${DB}

