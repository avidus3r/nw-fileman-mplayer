var express     = require('express'),
    http        = require('http'),
    path        = require('path'),
    app         = express();

app.set('port', process.env.PORT || 3000);

app.get('/milligram', function(req,res){
    res.sendFile('index.html', {root: path.join(__dirname, './node_modules/milligram/examples'), title:''});
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('app listening on port ' + app.get('port'));
});