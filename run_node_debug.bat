@ECHO OFF
cd %cd%
node "%cd%\Application\node_modules\nodemon\bin\nodemon.js" "%cd%\Application\start.js"
