export type Pizza = {
  id: number,
  ingredients: Set<string>,
}

export type Input = {
  pizzaNum: number
  team2Num: number
  team3Num: number
  team4Num: number
  pizzas: Pizza
}

export type Output = string