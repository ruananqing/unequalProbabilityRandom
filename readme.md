# Usage:
```js
const uprandomFun = require('./unequalprobabilityrandom');

// when options like this,  you will get the random string(options' keys) with unequal probability
// note: the summation(total probability) of the options' values(probabilitys) should be a 1 when each added
let options1 = {
    'a': 0.1,
    'b': 0.2,
    'c': 0.3,
    'd': 0.4
};

const uprandom1 = uprandomFun(options1);

uprandom1(); //return 'a' or 'b' or 'c' or 'd' with unequal probability 10%, 20%, 30%, 40%

let Atimes = 0;
let Btimes = 0;
let Ctimes = 0;
let Dtimes = 0;
let times1 = 100000;

for (let i = 0; i < times1; i++) {
    let random = uprandom1();
    if (random == 'a') {
        Atimes++;
    }
    if (random == 'b') {
        Btimes++;
    }
    if (random == 'c') {
        Ctimes++;
    }
    if (random == 'd') {
        Dtimes++;
    }
}

console.log({
    'a': Atimes/times1,
    'b': Btimes/times1,
    'c': Ctimes/times1,
    'd': Dtimes/times1
});     //similar to 0.1, 0.2, 0.3, 0.4


// when options like this,  you will get the random float number(numbers in options' keys' area: 20-9999) with unequal probability
// note: the summation(total probability) of the options' values(probabilitys) should be a 1 when each added
let options2 = {
    '20-30': 0.05,
    '30-60': 0.3,
    '60-80': 0.22,
    '80-85': 0.08,
    '85-9999': 0.35
}

const uprandom2 = uprandomFun(options2);

uprandom2(); //return a float number(in 20-9999) with unequal probability in different area

let Area1times = 0;
let Area2times = 0;
let Area3times = 0;
let Area4times = 0;
let Area5times = 0;
let times2 = 100000;

for (let i = 0; i < times2; i++) {
    let random = uprandom2();
    if (random >= 20 && random < 30) {
        Area1times++;
    } else if (random >= 30 && random < 60) {
        Area2times++;
    } else if (random >= 60 && random < 80) {
        Area3times++;
    } else if (random >= 80 && random < 85) {
        Area4times++;
    } else {
        Area5times++;
    }
}

console.log({
    '20-30': Area1times/times2, 
    '30-60': Area2times/times2,
    '60-80': Area3times/times2,
    '80-85': Area4times/times2,
    '85-9999': Area5times/times2
});     //similar to 0.05, 0.3, 0.22, 0.08, 0.35

```
