'use strict';

var util = require('util');


var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var plaid = require('plaid');
var c_trans_ref = require('./controller/c_transactions')

var app_port = 8000;
var p_client_id = '5bdce0ecca639100112a5014';
var p_secret = '29a8b3c0aa0ab0e0001dfb9c2cc7dc';//Change if we switch to development environment
var p_public_key = 'fed36afd6f314f3cd45aabb90e8420';
var p_env = 'sandbox';//Environment. Options: sandbox,development,production
var p_product = 'transactions';//String list, comma-divided, 

// Access_token is stored in memory. Future development: Persist it to a safer/more stable location (Database)
var p_access_token = null;
var p_public_token = null;
var ITEM_ID = null;

// Initialize Plaid Client
var client = new plaid.Client(
  p_client_id,
  p_secret,
  p_public_key,
  plaid.environments[p_env],
  {version: '2018-05-22'}
);

var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.get('/', function(request, response, next) {
  console.log("requested base app");
  response.render('index.ejs', {
    p_public_key: p_public_key,
    p_env: p_env,
    p_product: p_product,
  });
});

// Exchange token flow - exchange a Link public_token for an API access_token
app.post('/get_access_token', function(request, response, next) {
  p_public_token = request.body.public_token;
  client.exchangePublicToken(p_public_token, function(error, tokenResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    p_access_token = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    prettyPrintResponse(tokenResponse);
    response.json({
      access_token: p_access_token,
      item_id: ITEM_ID,
      error: null,
    });
  });
});


// Retrieve Transactions for an Item
app.get('/transactions', function(request, response, next) {
  console.log("inside function");
  var date_to = request.query.to;
  var date_from = request.query.from;
  var startDate;
  var endDate;
  // Pull transactions for the Item for the last 30 days
  if(date_from == null){
    console.log("date_from is empty");
    startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
  }else{
    console.log("date_from is eq. to" + date_from.toString());
    startDate = moment(date_from).format("YYYY-MM-DD");
  }
  if(date_to == null){
    endDate = moment().format('YYYY-MM-DD');
  }else{
    endDate = moment(date_to).format("YYYY-MM-DD");
  }
  console.log(startDate.toString() + endDate.toString());
  client.getTransactions(p_access_token, startDate, endDate, {
    count: 250,
    offset: 0,
  }, function(error, transactionsResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    } else {
      var trans = new c_trans_ref.c_transactions();
      trans.insert_transactions(transactionsResponse);
      response.json({error: null, categories: trans.get_JSON()});
      //prettyPrintResponse(transactionsResponse);
      //response.json({error: null, transactions: transactionsResponse});
    }
  });
});


// Retrieve an Item's accounts
app.get('/accounts', function(request, response, next) {
  client.getAccounts(p_access_token, function(error, accountsResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    prettyPrintResponse(accountsResponse);
    response.json({error: null, accounts: accountsResponse});
  });
});

// Retrieve ACH or ETF Auth data for an Item's accounts
app.get('/auth', function(request, response, next) {
  client.getAuth(p_access_token, function(error, authResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    prettyPrintResponse(authResponse);
    response.json({error: null, auth: authResponse});
  });
});


// Retrieve information about an Item
app.get('/item', function(request, response, next) {
  // Pull the Item
  client.getItem(p_access_token, function(error, itemResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    // Also pull information about the institution
    client.getInstitutionById(itemResponse.item.institution_id, function(err, instRes) {
      if (err != null) {
        var msg = 'Unable to pull institution information from the Plaid API.';
        console.log(msg + '\n' + JSON.stringify(error));
        return response.json({
          error: msg
        });
      } else {
        prettyPrintResponse(itemResponse);
        response.json({
          item: itemResponse.item,
          institution: instRes.institution,
        });
      }
    });
  });
});

var server = app.listen(app_port, function() {
  console.log('Console log: listening on port ' + app_port);
});

var prettyPrintResponse = response => {
  console.log(util.inspect(response, {colors: true, depth: 4}));
};

app.post('/set_access_token', function(request, response, next) {
  p_access_token = request.body.access_token;
  client.getItem(p_access_token, function(error, itemResponse) {
    response.json({
      item_id: itemResponse.item.item_id,
      error: false,
    });
  });
});
