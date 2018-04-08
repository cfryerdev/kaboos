@ECHO OFF

ECHO INSTALLING PREREQS...
ECHO --------------------------------------
cmd /c npm install -g artillery
cmd /c npm install -g bower
cmd /c npm install -g gulp
cd %cd%/Application

ECHO INSTALLING SERVICE PACKAGES...
ECHO --------------------------------------
cmd /c npm install
cd..
cd %cd%/Load

ECHO INSTALLING WEBSITE PACKAGES...
ECHO --------------------------------------
cmd /c npm install
cd ..
cd %cd%/Application/Website

ECHO INSTALLING WEBSITE LIBS...
ECHO --------------------------------------
cmd /c bower install
cd..