module.exports = function unequalProbabilityRandom(options) {
	let keys = Object.keys(options);
	let values = Object.values(options);
	let len = keys.length;
	let totalProb = 0;
	let executedStr = '';
	let result = '';

	function findLongestValueLength(array) {
	    let len = array.length;
	    let valueLengths = [];

	    for (let i = 0; i < len; i++) {
	        valueLengths[i] = array[i].toString().length;
	    }
	    
	    function findMaximum(arr) {
	        let maximum = arr[0];
	        arr.forEach(element => {
	            if (element > maximum) {
	                maximum = element;
	            }
	        });
	        return maximum;
	    }

	    let longestValueLength = findMaximum(valueLengths);

	    return longestValueLength;
	}
	 
	let powerNum = findLongestValueLength(values);

	let coefficient = 10**powerNum;

	values.forEach(prob => {
		totalProb += prob * coefficient;
    });
    
	if (totalProb != 1 * coefficient) {
		throw new Error("the options' total probability is unequal to 1");
		return null;
	}

	let probs = [0];
	for (let i = 1; i < len + 1; i++) {
		probs[i] = values[i - 1] + probs[i - 1];
	}

	let minusCharIndex = keys[0].indexOf('-');
	let minusLeft = parseFloat(keys[0].slice(0, minusCharIndex));
	let minusRight = parseFloat(keys[0].slice(minusCharIndex + 1));

	if (!isNaN(minusLeft) && !isNaN(minusRight)) {
		let boundarys = [];

		for (let i = 0; i < len + 1; i++) {
			if (i < len) {
				minusCharIndex = keys[i].indexOf('-');
				boundarys[i] = parseFloat(keys[i].slice(0, minusCharIndex));
			} else {
				minusCharIndex = keys[i - 1].indexOf('-');
				boundarys[i] = parseFloat(keys[i -1].slice(minusCharIndex + 1));
			}
		}
		
		return function() {
			let probability = Math.random();
			
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
		return function() {
			let probability = Math.random();
			
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
