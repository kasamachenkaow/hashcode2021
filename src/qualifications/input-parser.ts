import { Car, Input, Intersection, StreetList } from "./types"

const splitInputByLine = (input: string): string[] => input.split('\n').filter(x => x)

const inputParser = (rawInput: string): Input => {
  const lines = splitInputByLine(rawInput)

  const firstLine = lines?.shift()?.split(' ') as string[]
  const totalDuration = +firstLine[0]
  const totalIntersections = +firstLine[1]
  const totalStreets = +firstLine[2]
  const totalCars = +firstLine[3]
  const bonus = +firstLine[4]

  const streetLines = lines.splice(0, totalStreets)
  const streets: StreetList = streetLines.reduce((acc: StreetList, streetStr: string) => {
    const l = streetStr.split(' ')
    acc[l[2]] = {
      B: +l[0],
      E: +l[1],
      L: +l[3],
    }
    return acc
  }, {} as StreetList)

  const carLines = lines.splice(0, totalCars)
  const cars: Car[] = carLines.map<Car>((carStr: string) => {
    const c = carStr.split(' ')
    return {
      P: +c[0],
      streetNames: c.slice(1, +c[0]),
    }
  })

  const intersections: Intersection[] = []
  Object.entries(streets).forEach(([streetName, street]) => {
    if (!intersections[street.B]) intersections[street.B] = { in: [], out: [] }
    intersections[street.B].out.push(streetName)

    if (!intersections[street.E]) intersections[street.E] = { in: [], out: [] }
    intersections[street.E].in.push(streetName)
  })


  return {
    D: totalDuration,
    I: totalIntersections,
    S: totalStreets,
    V: totalCars,
    F: bonus,
    streets,
    cars,
    intersections,
  }
}

export default inputParser