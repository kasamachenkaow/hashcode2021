import { Func } from "./types"
import path from 'path'

function intersection(setA: Set<unknown>, setB: Set<unknown>) {
  let _intersection = new Set()
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem)
    }
  }
  return _intersection
}
console.log(process.execPath)
const { readFileSync, writeFileSync, readdirSync } = require('fs')

const run = (f: Func<string, string>, name: string) =>
  readdirSync(path.join(`./src/${name}/input`)).map((file: string) => file.split('.')[0])
    .forEach((file: string) => {
      const IN_FILE = path.join(`./src/${name}/input/${file}.in`)
      const OUT_FILE = path.join(`./src/${name}/output/${file}.out`)
      const input = readFileSync(IN_FILE).toString()
      console.log(`running -> ${file}`)
      const output = f(input)
      writeFileSync(OUT_FILE, output)
      console.log(`endof -> ${file}`)
    })

function chunk<T>(array: T[], size: number): T[][] {
  const chunked_arr: T[][] = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
}

export default {
  set: { intersection },
  run,
  array: { chunk },
}