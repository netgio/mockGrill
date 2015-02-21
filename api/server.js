var express = require('express');
var fs = require('fs');
var app = express();
var gpio = require('pi-gpio');

var status = {lid:'closed', rotisserie:'off', burner:'off'};
var file = '../status.json';

var led = function (pin, state) {
    gpio.open(pin, "output", function(err) {
	gpio.write(pin, state, function() {
	    gpio.close(pin);
        });	
    });  
};

app.use('/static', express.static(__dirname + '/static'));

app.post('/lid', function (req, res) {
    status.lid = (status.lid === 'open')?'closed':'open';
    led(11, (status.lid === 'open')?1:0);
    fs.writeFile(file, JSON.stringify(status), function (err) {
	if (err) {
		res.send('failed to update lid status');
	} else {
		res.send('status updated:' + JSON.stringify(status));
		console.log('Lid Changed:' + JSON.stringify(status));
	}
    });
})


app.post('/burner', function (req, res) {
    status.burner = (status.burner === 'on')?'off':'on';
    led(12, (status.burner === 'on')?1:0);
    fs.writeFile(file, JSON.stringify(status), function (err) {
	if (err) {
		res.send('failed to update burner status');
	} else {
		res.send('status updated:' + JSON.stringify(status));
		console.log('Burner Changed:' + JSON.stringify(status));
	}
    });
})

app.post('/rotisserie', function (req, res) {
    status.rotisserie = (status.rotisserie === 'on')?'off':'on' ;
    led(13, (status.rotisserie === 'on')?1:0);
    fs.writeFile(file, JSON.stringify(status), function (err) {
	if (err) {
		res.send('failed to update rotisserie status');
	} else {
		res.send('status updated:' + JSON.stringify(status));
		console.log('Rotisserie Changed:' + JSON.stringify(status));
	}
    });
})

app.get('/lid', function (req, res) {
    res.send(status.lid);
    console.log('lid:' + JSON.stringify(status));
})
app.get('/burner', function (req, res) {
    res.send(status.burner);
    console.log('burner:' + JSON.stringify(status));
})
app.get('/rotisserie', function (req, res) {
    res.send(status.rotisserie);
    console.log('rotisserie:' + JSON.stringify(status));
})

app.get('/', function (req, res) {
    res.send(JSON.stringify(status));
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})

