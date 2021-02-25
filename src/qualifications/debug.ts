import { Input, Output, StreetName } from './types'
import common from '../common'

const whichStreetGreen = (outputIntersection: Output[number], Ti: number) => {
  let currentT = 0
  let scheduleI = 0

  while (currentT <= Ti) {
    currentT += outputIntersection.schedule[scheduleI].duration

    if (currentT <= Ti) {
      scheduleI++;
      if (scheduleI >= outputIntersection.schedule.length) {
        scheduleI = 0;
      }
    }
  }

  return outputIntersection.schedule[scheduleI].streetName
}

const debug = (input: Input, output: Output): number => {
  let score = 0

  let carsRunning: Array<{
    carId: number
    currentCarStreetId: number // the id of the street in the car.streetNames context
    timeOnStreet: number // how many seconds the car has been on current street
  }> = input.cars.map((_, carId) => ({
    carId,
    currentCarStreetId: 0,
    timeOnStreet: input.D,
  }))

  const streetsState: Record<StreetName, {
    carsQueue: Array<{
      carId: number // id of the car waiting
      nextCarStreetId: number // the id of the street the car wants to go on in the car.streetNames context
    }>
  }> = Object.keys(input.streets).reduce((acc, streetName) => ({
    ...acc,
    [streetName]: { carsQueue: [] }
  }), {})

  for (let Ti = 0; Ti <= input.D; Ti++) {
    common.inspect({ Ti })

    // run cars
    carsRunning.forEach(carRunning => carRunning.timeOnStreet++)

    // put cars at intersection queue
    carsRunning = carsRunning.filter(carRunning => {
      const currentStreetName = input.cars[carRunning.carId].streetNames[carRunning.currentCarStreetId]
      const currentStreet = input.streets[currentStreetName]
      if (carRunning.timeOnStreet >= currentStreet.L) {
        common.inspect(`⏰ Car ${carRunning.carId} waits at intersection ${currentStreet.E}`)
        streetsState[currentStreetName].carsQueue.push({
          carId: carRunning.carId,
          nextCarStreetId: carRunning.currentCarStreetId + 1,
        })
        return false
      }

      return true
    })

    // let cars through for each intersection of output
    for (const outputIntersection of output) {
      const currentGreen = whichStreetGreen(outputIntersection, Ti)
      common.inspect(`🚦 Current green street is ${currentGreen}`)
      const carLetThrough = streetsState[currentGreen].carsQueue.pop()
      if (carLetThrough) {
        common.inspect(`✅ Car ${carLetThrough.carId} let through on street ${carLetThrough.nextCarStreetId} (${input.cars[carLetThrough.carId].streetNames[carLetThrough.nextCarStreetId]})`)

        const nextCarStreet = input.cars[carLetThrough.carId].streetNames[carLetThrough.nextCarStreetId]
        if (nextCarStreet) {
          carsRunning.push({
            carId: carLetThrough.carId,
            timeOnStreet: 0,
            currentCarStreetId: carLetThrough.nextCarStreetId,
          })
        } else {
          // finish car
          common.inspect(`🏁 Finishing car ${carLetThrough.carId}`)
          score += input.F + (input.D - Ti)
        }
      }
    }

    common.inspect({ carsRunning, streetsState })
  }

  return score
}

export default debug
