module.exports = function unequalProbabilityRandom(options) {
	let keys = Object.keys(options);
	let values = Object.values(options);
	let len = keys.length;
	let totalProb = 0;
	let powerNum = findLongestValueLength(values);
	let coefficient = 10 ** powerNum;	//a number that makes decimals to be integers, in order to avoid the situation that some decimals' summation is not exactly equal to 1 when they are added

	values.forEach(prob => {
		totalProb += prob * coefficient;
    });
    
	if (totalProb != 1 * coefficient) {	//to judge whether the total probabilities(options' values' summation) is equal to 1
		throw new Error("the options' total probability is unequal to 1");
		return null;
	}

	let probs = [0];	//set the breakpoints for each probability area

	for (let i = 1; i < len + 1; i++) {
		probs[i] = values[i - 1] + probs[i - 1];
	}

	let minusCharIndex = keys[0].indexOf('-');
	let minusLeft = parseFloat(keys[0].slice(0, minusCharIndex));
	let minusRight = parseFloat(keys[0].slice(minusCharIndex + 1));

	//to judge the options' keys for different result's returning
	if (!isNaN(minusLeft) && !isNaN(minusRight)) {	//if the options' keys are areas made by numbers, return float numbers
		
		let boundarys = [];

		for (let i = 0; i < len + 1; i++) {
			if (i < len) {
				minusCharIndex = keys[i].indexOf('-');
				boundarys[i] = parseFloat(keys[i].slice(0, minusCharIndex));
			} else {
				minusCharIndex = keys[i - 1].indexOf('-');
				boundarys[i] = parseFloat(keys[i - 1].slice(minusCharIndex + 1));
			}
		}
		
		return function() {

			let probability = Math.random();
			let result = '';
			let executedStr = '';
			
			for (let i = 0; i < len; i++) {
				executedStr += `
				if (probs[${i}] < probability && probability <= probs[${i + 1}]) {
					result = boundarys[${i}] + Math.random() * (boundarys[${i + 1}] - boundarys[${i}]);
				}
				`
			}

			eval(executedStr);
			
			return result;
		}

	} else {

		return function() {	//if the options' keys are strings(or some single number), return strings

			let probability = Math.random();
			let result = '';
			let executedStr = '';
			
			for (let i = 0; i < len; i++) {
				executedStr += `
				if (probs[${i}] < probability && probability <= probs[${i + 1}]) {
					result = keys[${i}];
				}
				`
			}

			eval(executedStr);

			return result;
		}
	}
	
}

function findLongestValueLength(array) {

	let len = array.length;
	let valueLengths = [];

	for (let i = 0; i < len; i++) {
		valueLengths[i] = array[i].toString().length;
	}

	return findMaximum(valueLengths);

}

function findMaximum(array) {

	let maximum = array[0];

	array.forEach(element => {
		if (element > maximum) {
			maximum = element;
		}
	});

	return maximum;

}