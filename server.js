var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(54518, function(){
    console.log('Start http://localhost:54518/?SPHostUrl=Playground&perm=play&dev=1&startState=play#/toys');
});