let Tokenizer = {
	token: class token {
		constructor(type, value){
			this.type = type;
			this.value = value;
		}
	},
	/*
		expr: expression input
		f_enc: functional input delimiters 
		(it forces the characters right before the delimiter to be recognized as a function)
	*/
	tokenize: function (expr, f_delim = 3){
		let delim = ['(', '{', '['];
		let buffer = [];
		let output = [];
		let expression = expr.replace(/\s/g,'');
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
									output.push(new this.token("variable", buffer.join('')));
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
									output.push(new this.token("variable", buffer.join('')));
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
						if(buffer.length == 0){
							if(((output.length == 0) || (output[output.length - 1].type == "ldelimiter"))){
								output.push(new this.token("unary_operator", expression[i]));								
							}
							else{
								output.push(new this.token("operator", expression[i]));
							}
						}
						else{
							if(isNaN(buffer.join(''))){
								if(buffer[buffer.length - 1] == '.'){
									output.push(new this.token("separator", buffer.join('')));
								}
								else{
									output.push(new this.token("variable", buffer.join('')));
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
					case '{':
					case '[':
						if(buffer.length > 0){
							if(isNaN(buffer.join(''))){
								if(buffer[buffer.length - 1] == '.'){
									output.push(new this.token("separator", buffer.join('')));
								}
								else{
									if(f_delim < 3){
										if(expression[i] == delim[f_delim]){
											output.push(new this.token("function", buffer.join('')));
										}
										else{
											output.push(new this.token("variable", buffer.join('')));
											output.push(new this.token("operator", '*'));									
										}
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
						output.push(new this.token("ldelimiter", expression[i]));
						buffer = [];
						break;
					case ')':
					case '}':
					case ']':
						if(buffer.length > 0){
							if(isNaN(buffer.join(''))){
								if(buffer[buffer.length - 1] == '.'){
									output.push(new this.token("separator", buffer.join('')));
								}
								else{
									output.push(new this.token("variable", buffer.join('')));								
								}
							}
							else{
								output.push(new this.token("number", buffer.join('')));	
							}
						}
						output.push(new this.token("rdelimiter", expression[i]));
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
				if(output.length > 0){
					if(output[output.length - 1].type == "rdelimiter"){
						output.push(new this.token("operator", '*'));
					}
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
					output.push(new this.token("variable", buffer.join('')));
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