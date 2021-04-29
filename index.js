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
								}
								else{
									if(buffer.length == 1){
										output.push(new this.token("variable", buffer.join('')));
										output.push(new this.token("operator", '*'));
									}
									else{
										output.push(new this.token("function", buffer.join('')));									
									}
								}
								buffer = [];
							}
							else{
								if(buffer.join('').includes('.')){
									output.push(new this.token("number", buffer.join('')));
									buffer = [];	
								}
							}
							buffer.push(expression[i]);
						}
						break;
					case '*':
					case '/':
					case '^':
						if(buffer.length > 0){
							if(isNaN(buffer.join(''))){
								if(buffer[buffer.length - 1] == '.'){
									output.push(new this.token("separator", buffer.join('')));
								}
								else{
									if(buffer.length == 1){
										output.push(new this.token("variable", buffer.join('')));
									}
									else{
										output.push(new this.token("function", buffer.join('')));									
									}									
								}
							}
							else{
								output.push(new this.token("number", buffer.join('')));	
							}
						}
						output.push(new this.token("operator", expression[i]));
						buffer = [];
						break;
					case '+':
					case '-':
						if(buffer.length == 0 && ((output.length == 0) || (output[output.length - 1].type == "lparenthesis")) ){
							output.push(new this.token("unary_operator", expression[i]));
						}
						else{
							if(isNaN(buffer.join(''))){
								if(buffer[buffer.length - 1] == '.'){
									output.push(new this.token("separator", buffer.join('')));
								}
								else{
									if(buffer.length == 1){
										output.push(new this.token("variable", buffer.join('')));
									}
									else{
										output.push(new this.token("function", buffer.join('')));									
									}									
								}
							}
							else{
								output.push(new this.token("number", buffer.join('')));	
							}
							output.push(new this.token("operator", expression[i]));
						}
						buffer = [];
						break;
					case '(':
						if(buffer.length > 0){
							if(isNaN(buffer.join(''))){
								if(buffer[buffer.length - 1] == '.'){
									output.push(new this.token("separator", buffer.join('')));
								}
								else{
									if(buffer.length == 1){
										output.push(new this.token("variable", buffer.join('')));
										output.push(new this.token("operator", '*'));
									}
									else{
										output.push(new this.token("function", buffer.join('')));									
									}
								}
							}
							else{
								output.push(new this.token("number", buffer.join('')));
								output.push(new this.token("operator", '*'));
							}
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
									if(buffer.length == 1){
										output.push(new this.token("variable", buffer.join('')));
									}
									else{
										output.push(new this.token("function", buffer.join('')));									
									}									
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
									buffer = [];
								}
							}
							else{
								output.push(new this.token("number", buffer.join('')));
								output.push(new this.token("operator", '*'));
								buffer = [];
							}
						}
						buffer.push(expression[i]);
						break;
				}
			}
			else{
				if(buffer.length > 0 && isNaN(buffer[buffer.length - 1]) && buffer[buffer.length - 1] != '.'){
					if(buffer.length == 1){
						output.push(new this.token("variable", buffer.join('')));
						output.push(new this.token("operator", '*'));
					}
					else{
						output.push(new this.token("function", buffer.join('')));									
					}
					output.push(new this.token("operator", '*'));
					buffer = [];
				}
				buffer.push(expression[i]);
			}
		}
		if(buffer.length > 0){
			if(isNaN(buffer.join(''))){
				if(buffer[buffer.length - 1] == '.'){
					output.push(new this.token("separator", buffer.join('')));
				}
				else{
					if(buffer.length == 1){
						output.push(new this.token("variable", buffer.join('')));
						output.push(new this.token("operator", '*'));
					}
					else{
						output.push(new this.token("function", buffer.join('')));									
					}
				}
			}
			else{
				output.push(new this.token("number", buffer.join('')));
			}
		}
		return output;
	}
}
module.exports = Tokenizer;