let Tokenizer = {
	token: class token {
		constructor(type, value){
			this.type = type;
			this.value = value;
		}
	},
	tokenize: function (expression){
		let buffer = [];
		let output = [];
		for(let i = 0; i < expression.length; i++){
			if(isNaN(expression[i])){
				switch(expression[i]){
					case '.':
						if(buffer.length == 0){
							buffer.push(expression[i]);
						}
						else{
							if(isNaN(buffer[buffer.length - 1])){
								if(buffer[buffer.length - 1] == '.'){
									if(buffer.length == 1){
										output.push(new this.token("separator", buffer.join('')));
									}
									else{
										output.push(new this.token("number", buffer.join('')));	
									}
									output.push(new this.token("number", buffer.join('')));
								}
								else{
									output.push(new this.token(((buffer.length = 1) ? "variable" : "function"), buffer.join('')));
								}
							}
							buffer.push(expression[i]);
						}
						break;
					case '+':
					case '-':
					case '*':
					case '/':
						if(buffer.length > 0){
							if(isNaN(buffer.join(''))){
								if(buffer[buffer.length - 1] == '.'){
									output.push(new this.token("separator", buffer.join('')));
								}
								else{
									output.push(new this.token(((buffer.length = 1) ? "variable" : "function"), buffer.join('')));									
								}
							}
							else{
								output.push(new this.token("number", buffer.join('')));	
							}
						}
						output.push(new this.token("operator", expression[i]));
						buffer = [];
						break;
					case '(':
						if(isNaN(buffer[buffer.length - 1])){
							if(buffer[buffer.length - 1] == '.'){
								output.push(new this.token("separator", buffer.join('')));
							}
							else{
								if(buffer.length = 1){
									output.push(new this.token("variable", buffer.join('')));
									output.push(new this.token("operator", '*'));
									output.push(new this.token("lparenthesis", expression[i]));
								}
								else{
									output.push(new this.token("function", buffer.join('')));									
								}
							}
						}
						else{
							output.push(new this.token("number", buffer.join('')));
							output.push(new this.token("operator", '*'));
							output.push(new this.token("lparenthesis", expression[i]));
						}
						output.push(new this.token("lparenthesis", expression[i]));
						buffer = [];
						break;
					case ')':
						if(buffer.length > 0){
							if(isNaN(buffer.join(''))){
								if(buffer[buffer.length - 1] == '.'){
									output.push(new this.token("separator", buffer.join('')));
								}
								else{
									output.push(new this.token(((buffer.length = 1) ? "variable" : "function"), buffer.join('')));									
								}
							}
							else{
								output.push(new this.token("number", buffer.join('')));	
							}
						}
						output.push(new this.token("rparenthesis", expression[i]));
						buffer = [];
						break;
					default:
						if(buffer.length > 0){
							if(isNaN(buffer.join(''))){
								if(buffer[buffer.length - 1] == '.'){
									output.push(new this.token("separator", buffer.join('')));
								}
							}
							else{
								output.push(new this.token("number", buffer.join('')));
								output.push(new this.token("operator", '*'));
							}
						}
						buffer.push(expression[i]);
						break;
				}
			}
			else{
				if(isNaN(buffer[buffer.length - 1]) && buffer[buffer.length - 1] != '.'){
					output.push(new this.token(((buffer.length = 1) ? "variable" : "function"), buffer.join('')));
					output.push(new this.token("operator", '*'));
				}
				buffer.push(expression[i]);
			}
		}
	}
}
module.exports = Tokenizer;