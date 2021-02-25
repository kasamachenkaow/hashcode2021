import common from '../common'
import inputParser from './input-parser'
import outputBuilder from './output-builder'
import random from './random'

const wrapper = (i: string): string => {
  const input = inputParser(i)
  //console.log('input', input)
  const output = random(input)
  //console.log('output', output)
  return outputBuilder(output)
}
common.run(wrapper, 'qualifications')
