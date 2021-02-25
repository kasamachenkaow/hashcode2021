import { Output } from './types'

const outputBuilder = (output: Output): string => {
  let outputStr = output.length.toString()

  output.forEach(outputIntersection => {
    outputStr += `\n${outputIntersection.intersectionId}`
    outputStr += `\n${outputIntersection.schedule.length}`
    outputIntersection.schedule.forEach(oneSchedule => {
      outputStr += `\n${oneSchedule.streetName} ${oneSchedule.duration}`
    })
  })

  return outputStr
}

/*
const example: Output = [
  {
    intersectionId: 3,
    schedule: [
      { streetName: 'street-1', duration: 10 },
      { streetName: 'street-2', duration: 20 },
    ],
  },
  {
    intersectionId: 2,
    schedule: [
      { streetName: 'street-2', duration: 10 },
    ],
  },
]

console.log(outputBuilder(example))
*/

export default outputBuilder
