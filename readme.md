# <font color="007acc">Introduction:</font>
<font color="red" size = "3px">unequalprobabilityrandom</font>
is a Node.js package for returning unequal probability numbers or strings

# <font color="e39d38">Installation:</font>
```shell
npm install unequalprobabilityrandom
```

# <font color="298a48">Usage:</font>

## 1.For returning unequal random strings:

```js
const uprandomFun = require('unequalprobabilityrandom');

// when options like this,  you will get the random string(options' keys) with unequal probability
// note: the summation(total probability) of the options' values(probabilitys) should be a 1 when each value added
let options = {
    'a': 0.1,
    'b': 0.2,
    'c': 0.3,
    'd': 0.4
};

const uprandom = uprandomFun(options);

uprandom(); //return 'a' or 'b' or 'c' or 'd' with unequal probability 10%, 20%, 30%, 40%
```

## Test for upradom()'s strings:

```js
let times = 100000; //a bigger times means closer probabilities

let Atimes = 0;
let Btimes = 0;
let Ctimes = 0;
let Dtimes = 0;

for (let i = 0; i < times; i++) {

    let random = uprandom();

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
    'a': Atimes/times,
    'b': Btimes/times,
    'c': Ctimes/times,
    'd': Dtimes/times
});     //similar to 0.1, 0.2, 0.3, 0.4
```

## 2.For returning unequal random numbers in different areas:

```js
const uprandomFun = require('unequalprobabilityrandom');

// when options like this,  you will get the random float number(numbers in options' keys' area: 20-9999) with unequal probability
// note: the summation(total probability) of the options' values(probabilitys) should be a 1 when each value added
let options = {
    '20-30': 0.05,
    '30-60': 0.3,
    '60-80': 0.22,
    '80-85': 0.08,
    '85-9999': 0.35
}

const uprandom = uprandomFun(options);

uprandom(); //return a float number(in 20-9999) with unequal probability in different area
```

## Test for upradom()'s numbers:

```js
let times = 100000; //a bigger times means closer probabilities

let Area1times = 0;
let Area2times = 0;
let Area3times = 0;
let Area4times = 0;
let Area5times = 0;

for (let i = 0; i < times; i++) {

    let random = uprandom();
    
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
    '20-30': Area1times/times, 
    '30-60': Area2times/times,
    '60-80': Area3times/times,
    '80-85': Area4times/times,
    '85-9999': Area5times/times
});     //similar to 0.05, 0.3, 0.22, 0.08, 0.35

```
