import common from '../common'
import func from './func'

const wrapper = (i: string): string => {
  return func(i)
}
common.run(wrapper, 'practice01')
