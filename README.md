# iota
This package provides golang-like iota implementation.
Implemented entities:

| entity | description                                |
|--------|--------------------------------------------|
| iota   | getter(number) / setter (number/function)  |
| iotas  | getter for object(iterator/proxy/callable) |

##Example: simple iota

```js
import "@lecosson/iota";

console.log("0) iota         :", iota);     // 0
console.log("1) iota         :", iota);     // 1
console.log("2) iota * iota  :", iota * iota); // 2 * 3 = 6
```

##Example: reset values

```js
console.log("0) iota         :", iota);     // 0
console.log("1) iota         :", iota);     // 1
iota = 10;
console.log("2) iota         :", iota);     // 10
console.log("3) iota         :", iota);     // 11
```

##Example: populate enum's

```js
iota = 1;
const enum1 = {
  alpha: iota,
  beta: iota,
  gamma: iota
};
console.log(enum1);     // { alpha: 1, beta: 2, gamma: 3}
```

##Example: enum's entries comparison

```js
console.log(enum1.alpha > enum1.beta);  // false
console.log(enum1.alpha < enum1.beta);  // true
```

##Example: custom iota

```js
// bin flags
iota = function *binFlags() {
  let step:number = 0;
  while (true) {
    yield (1 << step++);
  }
}
console.log("for bin flags:", iota, iota, iota, iota, iota, iota, iota);
// output: 1 2 4 8 16 32 64

// fibbonacci
iota = function *fibonacci() {
  let [current, next] = [0, 1];
  while (true) {
    yield current;
    [current, next] = [next, current + next];
  }
}
console.log("fibonacci:", iota, iota, iota, iota, iota, iota, iota);
// output: 0 1 1 2 3 5 8

iota = 0;
console.log("iota:", iota); // 0
```

##Example: wrong assignment

```js
try {
    iota = 'wrong value, not number or generator function';
} catch(e) {
    console.log('catched:', e); // print error
}
```

##Example: iotas

```js
iota = 0;
console.log(iotas);                             // [Function: _iotas0]
let {a1,b1,c1} = iotas;                         // decompose
console.log("decompose object:", a1,b1,c1);     // 0, 1, 2
let [a2,b2,c2] = iotas;                         // decompose
console.log("decompose array:", a2,b2,c2);      // 3, 4, 5
let [a3,b3,c3] = iotas(2);                      // decompose limited sequence
console.log("decompose sequence:", a3,b3,c3);   // 6, 7, undefined
let array1 = [...iotas(5)];                     // decompose limited sequence
console.log("compose sequence:", array1);       // [ 8, 9, 10, 11, 12 ]
let array2 = iotas(5);                          // direct assignment
console.log("direct call:", array2);            // [ 13, 14, 15, 16, 17 ]
```

##Example: custom iotas sequence

```js
iota = function *fibonacci() { // custom iotas
    let [current, next] = [0, 1];
    while (true) {
        yield current;
        [current, next] = [next, current + next];
    }
}
console.log("custom sequence:", iotas(5))        // [ 0, 1,  1,  2,  3 ]
```

##Example: populate object

```js
iota = 0;
const complexObj = { 
  alpha: "alpha",
  beta: "beta",
  gamma: "gamma",
  delta: "delta",
};
iotas(complexObj); // populate and return existing mutated object
console.log("populated object", complexObj); // { alpha: 0, beta: 1, gamma: 2, delta: 3 }
```
