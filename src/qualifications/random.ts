import { Input, Intersection, Output, StreetName } from "./types";


const calDuration2 = (input: Input, streetName: StreetName, intId: number, intCount: number): number => {
  const street = input.streets[streetName]
  return (Math.floor(1 + street.L / 4) + intId) % (Math.ceil(input.D / intCount))
}

// const calDuration1 = (input: Input): number => {
//   const streetCount = Object.keys(input.streets).length
//   return Math.round(1 + (Math.random() * (input.D / streetCount)))
// }

const random = (input: Input): Output => {
  const intCount = input.intersections.length
  return input.intersections.map((int: Intersection, id: number) => {
    return {
      intersectionId: id,
      schedule: int.in.map((streetName: StreetName) => {
        return {
          streetName,
          duration: calDuration2(input, streetName, id, intCount),
        }
      })
    }
  })
}

export default random