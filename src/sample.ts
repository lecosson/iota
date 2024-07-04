import "./iota";

console.clear();

// simple iota
console.log('iota -----------------------------------------------');
iota = 20
console.log("0) iota         :", iota);     // 20
console.log("1) iota         :", iota);     // 21
console.log("2) +iota        :", +iota);    // 22
console.log("3) iota + 1     :", iota + 1); // 24
console.log("4) 1 + iota     :", 1 + iota); // 25

// enums
console.log('enums ----------------------------------------------');
iota = 11
const smallEnum1 = {
  alpha: iota,
  beta: iota,
  gamma: iota,
  delta: iota,
}
console.log(smallEnum1);                    // { alpha: 11, beta: 12, gamma: 13, delta: 14 }
// comparison
console.log(smallEnum1.alpha > smallEnum1.beta);  // false
console.log(smallEnum1.alpha < smallEnum1.beta);  // true
// decomposition
const { alpha,  beta,  gamma,  delta } = iotas;
console.log(alpha,  beta,  gamma,  delta);  // 15 16 17 18

// custom iota's
console.log('custom iota\'s --------------------------------------');
// bin flags
iota = function *binFlags() { // resets count to 0
  let step:number = 0;
  while (true) {
    yield (1 << step++);
  }
}
console.log("for bin flags:", iota, iota, iota, iota, iota, iota, iota);  // 1 2 4 8 16 32 64
// fibbonacci
iota = function *fibonacci() {  // resets count to 0
  let [current, next] = [0, 1];
  while (true) {
    yield current;
    [current, next] = [next, current + next];
  }
}
console.log("fibonacci:", iota, iota, iota, iota, iota, iota, iota);  // 0 1 1 2 3 5 8

// back to simple counter
// simple iota
console.log('iota -----------------------------------------------');
const smallEnum2 = {
  _: iota = 3, // iota with inline assignment - NOT Iota! it is result of assignment
  alpha: iota, // 3
  beta: iota, // 4
  gamma: iota, // 5
  delta: iota, // 6
}
console.log(smallEnum2); // { _: 3, alpha: 3, beta: 4, gamma: 5, delta: 6 }

console.log("0) iota         :", iota);         // 7
console.log("1) iota + 1     :", iota + 1);     // 9
console.log("2) iota * iota  :", iota * iota);  // 90
console.log("3) iota         :", iota);         // 11
console.log("4) iota--       :", iota--);       // 12
console.log("5) iota         :", iota);         // 11


// wrong assignment
console.log('iota -----------------------------------------------');
try {
  iota = 'sample';
} catch(e) {
  console.log('catched:', e);
}

// iotas
console.log('iotas ----------------------------------------------');
iota = 0;
console.log(iotas);                             // [Function: _iotas0]
let {a1,b1,c1} = iotas;                         // decompose
console.log("decompose object:", a1,b1,c1);     // 0, 1, 2
let [a2,b2,c2] = iotas;                         // decompose
console.log("decompose array:", a2,b2,c2);      // 3, 4, 5
let [a3,b3,c3] = iotas(2);                      // decompose
console.log("decompose limited:", a3,b3,c3);    // 6, 7, undefined
let array1 = [...iotas(5)];                     // decompose
console.log("compose limited:", array1);        // [ 8, 9, 10, 11, 12 ]
let array2 = iotas(5);                          // direct call
console.log("direct call:", array2);            // [ 13, 14, 15, 16, 17 ]

iota = 0;
const complexObjs = iotas({ // populate existing object
  alpha: "alpha",
  beta: "beta",
  gamma: "gamma",
  delta: "delta",
});
console.log("populate object", complexObjs)     // { alpha: 0, beta: 1, gamma: 2, delta: 3 }

iota = function *fibonacci() { // custom iotas
  let [current, next] = [0, 1];
  while (true) {
    yield current;
    [current, next] = [next, current + next];
  }
}
console.log("custom limited:", iotas(5))        // [ 0, 1,  1,  2,  3 ]
