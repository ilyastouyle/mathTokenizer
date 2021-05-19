# Math Tokenizer

## Install

	npm install mathtokenizer


## Math expression tokenizer for expression validation
	token: class for token object {type, value}
	tokenize: function that takes in math expression and returns 
	array with tokens, also takes in an optional integer [0-2] variable for choosing 
	only a delimiter as a function delimiter. Default is 3, which doesn't force any 
	particular delimiter and recognizes as function any alphanumerical
	expression **right before** the opening delimiter. 

	tokenize(__expr__, __index(optional)__) 

| 	Index 	| 			  Delimiter 			|
| 	:---:	| 				:---:				|
| 	0		| 				  (					|
| 	1		|				  {					|
|	2		|				  [					|
|	3		|	Default	no particular delimiter |

	In the new version (^1.1.0), it's no longer lparenthesis or rparenthesis, it's rather
	ldelimiter, rdelimiter.

### Example1:
	let tokenizer = require('mathtokenizer')
	let A = tokenizer.tokenize("sin(-3x)")
	console.log(A)
	/*Code produced:
		[
		  token { type: 'function', value: 'sin' },
		  token { type: 'ldelimiter', value: '(' },
		  token { type: 'unary_operator', value: '-' },
		  token { type: 'number', value: '3' },
		  token { type: 'operator', value: '*' },
		  token { type: 'variable', value: 'x' },
		  token { type: 'rdelimiter', value: ')' }
		]
	*/

### Example2:
	let tokenizer = require('mathtokenizer')
	let A = tokenizer.tokenize("f1(x+2)")
	console.log(A)
	/*Code produced:
		[
		  token { type: 'function', value: 'f1' },
		  token { type: 'ldelimiter', value: '(' },
		  token { type: 'variable', value: 'x' },
		  token { type: 'operator', value: '+' },
		  token { type: 'number', value: '2' },
		  token { type: 'rdelimiter', value: ')' }
		]
	*/

### Example3:
#### Same as in example2, but this time with the optional argument being assigned the value 1: curly braces

	let tokenizer = require('mathtokenizer')
	let A = tokenizer.tokenize("f1(x+2)", 1) //Optional argument is given 1
	console.log(A)
	/*Code produced:
		[
		  token { type: 'variable', value: 'f1' }, //f1 is recognized as a variable this time because it's followed by a parenthesis and not a curly brace
		  token { type: 'operator', value: '*' },
		  token { type: 'ldelimiter', value: '(' },
		  token { type: 'variable', value: 'x' },
		  token { type: 'operator', value: '+' },
		  token { type: 'number', value: '2' },
		  token { type: 'rdelimiter', value: ')' }
		]
	*/