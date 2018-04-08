@ECHO OFF
cd %cd%
cd Application
gulp default
@ECHO ON
cd..
cd..
timeout /t 5
