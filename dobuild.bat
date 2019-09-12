node tools/build -n -t browser
copy /y build\highlight.pack.js ..\docs-ui-assets\third-party\highlight.js\highlight.js
node tools/build -t browser
copy /y build\highlight.pack.js ..\docs-ui-assets\third-party\highlight.js\highlight.pack.js
