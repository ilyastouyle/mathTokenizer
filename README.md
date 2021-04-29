# Math Tokenizer
## Math expression tokenizer for expression validation
	token: class for token object {type, value}
	tokenize: function that takes in math expression and returns 
	array with tokens 
### Example:
	let tokenizer = require('mathtokenizer')
	let A = tokenizer.tokenize("sin(-3x)")
	console.log(A)
	/*Code produced:
		[
		  token { type: 'function', value: 'sin' },
		  token { type: 'lparenthesis', value: '(' },
		  token { type: 'unary_operator', value: '-' },
		  token { type: 'number', value: '3' },
		  token { type: 'operator', value: '*' },
		  token { type: 'variable', value: 'x' },
		  token { type: 'rparenthesis', value: ')' }
		]
	*/