import { Proof } from './Proof.js'
// the version that works from leetcode (translated from python to typescript)
// https://leetcode.com/problems/mini-parser/description/
type NestedString = (NestedString | string)[]

function deserialize(s: string): NestedString | string {

  // puts a comma between any occurance of ")[" so that collapses parse properly.
  //s = s.replace(/[^~]\[/g, ')~[');

  const stack: NestedString[] = [];
  let current: NestedString = [];
  let elem = '';

  // used for checking a string is only whitespace
  const regex = /\S/;
  for (const ch of s) {
    if (ch === '[') {
      if (elem.length !== 0 && regex.test(elem)){
        throw new Error(`list elements are not seperated by commas:${elem}[`);
      }
      elem = ""; // remove any leading whitespace from outside the bracket group
      stack.push(current);
      current = [];
    } else if (ch === ']') {
      if (elem !== '') {
        current.push(elem);
        elem = '';
      }
      const popped = stack.pop();
      if (popped) {
        popped.push(current);
        current = popped;
      }
    } else if (ch === ',') {
      if (elem !== '') {
        current.push(elem);
        elem = '';
      }
    } else {
      elem += ch;
    }
  }

  if (stack.length !== 0){
    throw new Error('unbalanced open and closed brackets')
  }
  if (!current || current.length === 0) {
    return s
  }

  return current[0];
}

// returns the Proof object corresponding to the nested string `ns`
// // Note: input object ns will be modified (completely empty by the end of the function)
function toProof(ns : NestedString | string) : Proof | string {
  if (! Array.isArray(ns) && typeof ns === 'string')
    return ns
  
  let out : (Proof | string) [] = []
  while (ns.length !== 0){
    // console.log(ns)
    let temp = ns.shift()
    if (typeof temp == 'string' && temp[0] === '(' && temp[temp.length - 1] === ')'){
      const temp1 = ns.shift()
      if (temp1)
        out.push({collapse:{placeholder:temp.slice(1, temp.length - 1), content:toProof(temp1)}})
    }
    else if (typeof temp == 'string' && temp[0] === '*' && temp[temp.length - 1] === '*'){
      const temp1 = ns.shift()
      if (temp1)
        out.push({popup:{content:temp.slice(1, temp.length - 1), ["popup-content"]:toProof(temp1)}})
    }
    else{
      if (Array.isArray(temp))
        out.push({collapse:{content:toProof(temp)}})
      else if (temp)
        out.push(temp)
    }
  }
  return {content:out}
}

const ToProof = function(s : string) : Proof  {
    console.log(deserialize("[" + s + "]"))
    const temp = deserialize("[" + s + "]")
    const temp1 = toProof(temp)
    if (typeof temp1 !== 'string')
        return temp1
    return {content : ["none"]}
}
export default ToProof

// console.log(deserialize("[a,(askjda)[v,c], j,(lool)[a, al]]"))
// const test = deserialize("[a,(askjda)[v,c], j,(lool)[a, al]]")
// console.log(test)
// console.log(JSON.stringify(toProof(test)))
