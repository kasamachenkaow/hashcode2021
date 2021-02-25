import common from '../common'
import func from './func'
import inputParser from './input-parser'
import outputBuilder from './output-builder'
import { Output } from './types'

const wrapper = (i: string): string => {
  const input = inputParser(i)
  console.log('input', input)
  const output = func(i) as unknown as Output

  return outputBuilder(output)
}
common.run(wrapper, 'qualifications')
