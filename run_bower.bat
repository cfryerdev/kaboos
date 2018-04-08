@ECHO OFF
cd %cd%
cd Application
cd website
bower install
@ECHO ON
cd..
cd..
timeout /t 5
