var express = require('express');
var exec = require('child_process').exec;
var xmlparser = require('express-xml-bodyparser');;

var DF_ZCP_CUS = require('./DF_ZCP_CUS_response.json');
var a1periods = require('./a1periods.json');
var DF_ZCP_CUS_ADRC = require('./DF_ZCP_CUS_ADRC_response.json');
var SOAPR = '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/"><env:Header/><env:Body><m:armcustResponse xmlns:m="http://www.deltek.com/enterprise/integration/ws/customer"><m:com.deltek.enterprise.system.serverapi.remoteapi.integration.MethodResponse><java:Severity xmlns:java="java:com.deltek.enterprise.system.serverapi.remoteapi.integration">0</java:Severity></m:com.deltek.enterprise.system.serverapi.remoteapi.integration.MethodResponse></m:armcustResponse></env:Body></env:Envelope>';

var PERIODSXMLYEAR = "<?xml version='1.0' encoding='UTF-8'?><!--document for glmfy,xsi namespace is added to support nulls in column values--><glmfy xmlns='http://www.deltek.com/enterprise/integration/glmfy' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'><GLMFY_FY tranType='UPDATE'><FY_CD>text</FY_CD><S_STATUS_CD>O</S_STATUS_CD></GLMFY_FY></glmfy>";

var PERIODSXMLPERIODS = "<?xml version='1.0' encoding='UTF-8'?><glmpd xmlns='http://www.deltek.com/enterprise/integration/glmpd' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'><GLMPD_ACCTINGPD_HDR tranType='UPDATE'><FY_CD>text</FY_CD><!--Column `Period Number` MethodPK Required Decimal(2,0)--><PD_NO>0</PD_NO><!--Column `Status` Required String(1)  cb_S_STATUS_CD--><S_STATUS_CD>N</S_STATUS_CD><!--Result set `Journal Entry Status` Supported Operations(UPDATE )--><GLMPD_JNLSTATUSSJNLCD_CTW tranType='UPDATE'><!--Column `Status` Required String(1)  cb_OPEN_FL--><OPEN_FL>N</OPEN_FL><!--Column `Code` MethodPK NonEditable String(3)--><S_JNL_CD>tex</S_JNL_CD></GLMPD_JNLSTATUSSJNLCD_CTW></GLMPD_ACCTINGPD_HDR></glmpd>"

var PERIODSXMLSUBPERIODS = "<?xml version='1.0' encoding='UTF-8'?><!--document for glmsubpd,xsi namespace is added to support nulls in column values--><glmsubpd xmlns='http://www.deltek.com/enterprise/integration/glmsubpd' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'><!--Result set `Manage Subperiods` Supported Operations(UPDATE )--><GLMSUBPD_SUBPD tranType='UPDATE'><!--Column `Fiscal Year` MethodPK Required String(6)--><FY_CD>text</FY_CD>    <!--Column `Period` MethodPK Required Decimal(2,0)--><PD_NO>0</PD_NO><!--Column `Subperiod Number` MethodPK Required Decimal(5,0)--><SUB_PD_NO>0</SUB_PD_NO><!--Column `Subperiod Status` Required String(1)  cb_S_STATUS_CD--><S_STATUS_CD>N</S_STATUS_CD><!--Result set `Journal Entry Status` Supported Operations(UPDATE )--><GLMSUBPD_SUBPDJNLSTATUS_CTW tranType='UPDATE'><!--Column `Status` Required String(1)  cb_OPEN_FL--><OPEN_FL>N</OPEN_FL><!--Column `Code` MethodPK NonEditable String(3)--><S_JNL_CD>tex</S_JNL_CD></GLMSUBPD_SUBPDJNLSTATUS_CTW> </GLMSUBPD_SUBPD></glmsubpd>";


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

app.get('/a1_periods', function(req, res){
	res.send(a1periods);
});

app.get('/a1_xml_years_periods', function(req, res){
	res.setHeader('Content-Type', 'text/xml');
	res.send(PERIODSXMLYEAR);
});

app.get('/a1_xml_periods', function(req, res){
	res.setHeader('Content-Type', 'text/xml');
	res.send(PERIODSXMLPERIODS);
});

app.get('/a1_xml_subperiods', function(req, res){
	res.setHeader('Content-Type', 'text/xml');
	res.send(PERIODSXMLSUBPERIODS);
});

app.get('/a3_customer/:runid', function(req, res){
		
	if(parseInt(req.params.runid) > 1455 && parseInt(req.params.runid) < 5000)
	{
		return res.send(DF_ZCP_CUS);
	}else
	{
		return res.status(501).send('Error RUNID not found. Use between 1456 and 5000');
	}
	
});

app.get('/a3_customer_address', function(req, res){
	res.send(DF_ZCP_CUS_ADRC);
});

app.post('/a3_soap', function(req, res){

	/* if(req.body.root.payload[0].cust_id[0] == '1159038')
	{
		return res.status(501).send('Error customer is not valid.');
	} */
	res.setHeader('Content-Type', 'text/xml');
	res.send(SOAPR);
});




app.listen(process.env.PORT, function () 
{
	console.log('MULESOFT Mock Server in '+process.env.PORT);
});