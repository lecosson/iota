declare var iota: any;
declare var iotas: any;

let counter: number = 0;
let iotaIterator: IterableIterator<any>|null = null;

const _iotas = new Proxy(function() {
  const iotaFunc = function(val:number|Object):Object|number[] {
    return ({
      [typeof val]: () => { throw Error("wrong Iota") },
      // "number": () => [... function*() {console.log(val,'>');for(let i = 0; i < +val; i++) {yield iota;}}()],
      "number": () => function(){const a = [];for(let i = 0; i < +val; i++) a.push(iota); return a;}(),
      "object": () => (Object.keys(val).forEach(k => (val as any)[k] = iota), val),
    }[typeof val]());
  }
  iotaFunc[Symbol.iterator] = function*() { console.log('>>'); while (true) { yield iota; } } as any;
  return iotaFunc;
}(), {
  get: (target, name) => name in target ? (target as any)[name] as any : iota,
});
const setters = Object.entries({
  iota: (val: unknown) => ({
    [typeof val]: () => { throw Error("wrong Iota") },
    "number": () => { iotaIterator = null; counter = val as number; },
    "function": () => { iotaIterator = (val as Function)() as IterableIterator<any>; },
  }[typeof val]()),
});
const getters = Object.entries({
  iota: () => iotaIterator?.next().value ?? counter++,
  iotas: () => _iotas,
});

// initialize access Iota
const scope = Object(globalThis);
setters.forEach(([k, v]) => scope.__defineSetter__(k, v));
getters.forEach(([k, v]) => scope.__defineGetter__(k, v));
