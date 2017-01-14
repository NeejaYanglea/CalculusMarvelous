var express = require('express');
var router = express.Router();
let ApiAiAssistant = require('actions-on-google').ApiAiAssistant;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Calculus Marvelous' });
});

router.post('/', function (request, response) {
	const assistant = new ApiAiAssistant(
		{ request: request, response: response });

	// Create functions to handle requests here
	const CALCULUS_INTENT = 'input.calculate';  // the action name from the API.AI intent

	function calculusIntent (assistant) {
  		var number = assistant.getArgument("number");
  		var number1 = assistant.getArgument("number1");
  		var operator = assistant.getArgument("operator");

		var result;

		switch (operator) {
		case 'sum_operator':
		result = +number + +number1;
		break;

		case 'diff_operator':
		result = number - number1;
		break;

		case 'mult_operator':
		result = number * number1;
		break;

		case 'div_operator':
		result = number / number1;
		break;

		default:
		assistant.tell('Can you repeat, please?');
		break;
		}

 		assistant.tell('The result is ' + result);
	}

	//Not necessary. Required when you have more intents and more functions
	/*
	let actionMap = new Map();
	actionMap.set(CALCULUS_INTENT, calculusIntent);
	assistant.handleRequest(actionMap);
	*/

	assistant.handleRequest(calculusIntent);
});

module.exports = router;
