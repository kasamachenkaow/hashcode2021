export type StreetName = string

export type Street = {
  B: number // intersection id at beginning
  E: number // intersection id at ending
  L: number // length
}

export type Car = {
  P: number // number of streets that car wants to travel
  streetNames: StreetName[]
}

export type Intersection = {
  in: StreetName[]  // streets going in
  out: StreetName[] // streets going out
}

export type StreetList = {
  [name: string]: Street
}

export type Input = {
  D: number // duration of simulation
  I: number // number of intersections
  S: number // number of streets
  V: number // number of cars
  F: number // bonus points
  streets: StreetList
  cars: Car[]
  intersections: Intersection[]
}

export type Output = Array<{
  intersectionId: number
  schedule: Array<{
    streetName: StreetName
    duration: number
  }>
}>
