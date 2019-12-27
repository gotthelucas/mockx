var express = require('express');
var exec = require('child_process').exec;
var xmlparser = require('express-xml-bodyparser');;

var DF_ZCP_CUS = require('./DF_ZCP_CUS_response.json');
var DF_ZCP_CUS_ADRC = require('./DF_ZCP_CUS_ADRC_response.json');
var SOAPR = '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/"><env:Header/><env:Body><m:armcustResponse xmlns:m="http://www.deltek.com/enterprise/integration/ws/customer"><m:com.deltek.enterprise.system.serverapi.remoteapi.integration.MethodResponse><java:Severity xmlns:java="java:com.deltek.enterprise.system.serverapi.remoteapi.integration">0</java:Severity></m:com.deltek.enterprise.system.serverapi.remoteapi.integration.MethodResponse></m:armcustResponse></env:Body></env:Envelope>';


var app = express();
app.use(xmlparser());

app.post('/json', function (req, res)
{
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ valueis: "123456789" }));
});

app.get('/dfcustomer', function(req, res){
	res.send(DF_ZCP_CUS);
});

app.get('/dfcustomeraddress', function(req, res){
	res.send(DF_ZCP_CUS_ADRC);
});

app.post('/soap', function(req, res){

	if(req.body.root.payload[0].cust_id[0] == '1159038')
	{
		return res.status(501).send('Error customer is not valid.');
	}
	res.setHeader('Content-Type', 'text/xml');
	res.send(SOAPR);
});




app.listen(3002, function () 
{
	console.log('MULESOFT Mock Server in 3002');
});

