node tools/build -n -t browser
copy /y build\highlight.pack.js ..\Template.Docs\src\themes\global\js\highlight.js
node tools/build -t browser
copy /y build\highlight.pack.js ..\Template.Docs\src\themes\global\js\ 
