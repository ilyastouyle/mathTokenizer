const tokenizer = require('./index');

test("\"sin(-3x)\" should be [sin, (, -, 3, *, x, )]", () => {
	expect(tokenizer.tokenize("sin(-3x)").map(token => token.value)).toEqual(["sin", "(", "-", "3", "*", "x", ")"]);
})

test("\"-x+3\" should be [-, x, +, 3]", () => {
	expect(tokenizer.tokenize("-x+3").map(token => token.value)).toEqual(["-", "x", "+", "3"]);
})

test("\"x+3-\" should be [x, +, 3, -]", () => {
	expect(tokenizer.tokenize("x+3-").map(token => token.value)).toEqual(["x", "+", "3", "-"]);
})

test("\"-x^2\" should be [-, x, ^, 2]", () => {
	expect(tokenizer.tokenize("-x^2").map(token => token.value)).toEqual(["-", "x", "^", "2"]);
})

//Testing for unary/binary detection

test("\"-x+3\" should give [-:unary_operator, x, +:operator]", () => {
	expect(tokenizer.tokenize("-x+3").filter((token, index) => (index == 0 || index == 2)).map(token => [token.value, token.type])).toEqual([['-', "unary_operator"], ['+', "operator"]]);
})

test("\"x+3-\" should give [+:operator, -:operator]", () => {
	expect(tokenizer.tokenize("x+3-").filter((token, index) => (index == 1 || index == 3)).map(token => [token.value, token.type])).toEqual([['+', "operator"], ['-', "operator"]]);
})

test("\"+x-3\" should give [+:unary_operator, -:operator]", () => {
	expect(tokenizer.tokenize("+x-3").filter((token, index) => (index == 0 || index == 2)).map(token => [token.value, token.type])).toEqual([['+', "unary_operator"], ['-', "operator"]]);
})

test("\"-(-x+3)\" should give [-:unary_operator, -:unary_operator, +:operator]", () => {
	expect(tokenizer.tokenize("-(-x+3)").filter((token, index) => (index == 0 || index == 2 || index == 4)).map(token => [token.value, token.type])).toEqual([['-', "unary_operator"], ['-', "unary_operator"], ['+', "operator"]]);
})

test("\" - x + 3 \" should be [-, x, +, 3]", () => {
	expect(tokenizer.tokenize(" - x + 3 ").map(token => token.value)).toEqual(["-", "x", "+", "3"]);
})

test("f1[x] should give a function followed by delimiter, variable then delimiter", () => {
	expect(tokenizer.tokenize("f1[x]").map(token => token.type)).toEqual(["function", "ldelimiter", "variable", "rdelimiter"]);
})

test("f1(x) but with forcing curly brace as function delimiter should give variable then operator..", () => {
	expect(tokenizer.tokenize("f1(x)", 1).map(token => token.type)).toEqual(["variable", "operator", "ldelimiter", "variable", "rdelimiter"]);
})

test("f1(x)g1(x) should give function then delimiter then variable then delimiter then the same all over again", () => {
	expect(tokenizer.tokenize("f1(x)g1(x)").map(token => token.type)).toEqual(["function", "ldelimiter", "variable", "rdelimiter", "operator", "function", "ldelimiter", "variable", "rdelimiter"]);
})

test("f1(x)g1[x] with parenthesis as function delimiters", () => {
	expect(tokenizer.tokenize("f1(x)g1[x]", 0).map(token => token.type)).toEqual(["function", "ldelimiter", "variable", "rdelimiter", "operator", "variable", "operator", "ldelimiter", "variable", "rdelimiter"]);
})
