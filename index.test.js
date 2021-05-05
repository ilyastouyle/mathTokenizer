const tokenizer = require('./index');

test("\"sin(-3x)\" should be [sin, (, -, 3, *, x, )]", () => {
	expect(tokenizer.tokenize("sin(-3x)").map(token => token.value)).toEqual(["sin", "(", "-", "3", "*", "x", ")"]);
});

test("\"-x+3\" should be [-, x, +, 3]", () => {
	expect(tokenizer.tokenize("-x+3").map(token => token.value)).toEqual(["-", "x", "+", "3"]);
});

test("\"x+3-\" should be [x, +, 3, -]", () => {
	expect(tokenizer.tokenize("x+3-").map(token => token.value)).toEqual(["x", "+", "3", "-"]);
})

test("\"-x^2\" should be [-, x, ^, 2]", () => {
	expect(tokenizer.tokenize("-x^2").map(token => token.value)).toEqual(["-", "x", "^", "2"]);
})

//Testing for unary/binary detection

test("\"-x+3\" should give [-:unary_operator, x, +:operator]", () => {
	expect(tokenizer.tokenize("-x+3").filter((token, index) => (index == 0 || index == 2)).map(token => [token.value, token.type])).toEqual([['-', "unary_operator"], ['+', "operator"]]);
});

test("\"x+3-\" should give [+:operator, -:operator]", () => {
	expect(tokenizer.tokenize("x+3-").filter((token, index) => (index == 1 || index == 3)).map(token => [token.value, token.type])).toEqual([['+', "operator"], ['-', "operator"]]);
})

test("\"+x-3\" should give [+:unary_operator, -:operator]", () => {
	expect(tokenizer.tokenize("+x-3").filter((token, index) => (index == 0 || index == 2)).map(token => [token.value, token.type])).toEqual([['+', "unary_operator"], ['-', "operator"]]);
})

test("\"-(-x+3)\" should give [-:unary_operator, -:unary_operator, +:operator]", () => {
	expect(tokenizer.tokenize("-(-x+3)").filter((token, index) => (index == 0 || index == 2 || index == 4)).map(token => [token.value, token.type])).toEqual([['-', "unary_operator"], ['-', "unary_operator"], ['+', "operator"]]);
})
