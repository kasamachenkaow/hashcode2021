import common from '../common'
import { Input, Pizza } from './types'


type Delivery = {
  [key: number]: {
    orders: number
    delivering: Pizza[]
    delivered: Pizza[][]
  }
}

const func = (input: string): string => {
  const pizzas: Pizza[] = []
  let batches = 1

  const deliveries: Delivery = {
    4: {
      orders: 0,
      delivering: [],
      delivered: [],
    },
    3: {
      orders: 0,
      delivering: [],
      delivered: [],
    },
    2: {
      orders: 0,
      delivering: [],
      delivered: [],
    }
  }

  const splitInputByLine = input => input.split('\n').filter(x => x)
  const executeInputs = inputs => {
    const commands = inputs[0].split(' ')
    deliveries[2].orders = +commands[1]
    deliveries[3].orders = +commands[2]
    deliveries[4].orders = +commands[3]

    const maxPizzas = +commands[0]
    for (let i = 1; i <= maxPizzas; i++) {
      const rawPizza = inputs[i].split(' ')
      pizzas.push({ id: i - 1, ingredients: new Set(rawPizza.slice(1)) })
    }

    pizzas.sort((a, b) => b.ingredients.size - a.ingredients.size)
  }
  const delivering = (no, pizza) => {
    if (deliveries[no].delivered.length < deliveries[no].orders) {
      deliveries[no].delivering.push(pizza)

      if (deliveries[no].delivering.length === (no * batches)) {
        const spaceLeft = deliveries[no].orders - deliveries[no].delivered.length
        const toAdd = deliveries[no].delivering.splice(0, Math.min(spaceLeft * no, deliveries[no].delivering.length))
        const chunks = common.array.chunk(toAdd, no)
        deliveries[no].delivered.push(...chunks)
      }

      return true
    }
    return false
  }
  const calRatio = (pizza, no) => {
    const history = new Set([
      ...deliveries[no].delivering.map(p => [...p.ingredients]).flat(),
    ])
    const dups = common.set.intersection(history, pizza.ingredients)
    const ratio = dups.size / pizza.ingredients.size
    // console.log(ratio)
    return ratio
  }
  const deliver = (_pizzas, rules) => {
    const leftOver: Pizza[] = []
    _pizzas.forEach(pizza => {
      if (calRatio(pizza, 4) <= rules[0] && delivering(4, pizza)) {
        return
      }
      if (calRatio(pizza, 3) <= rules[1] && delivering(3, pizza)) {
        return
      }
      if (calRatio(pizza, 2) <= rules[2] && delivering(2, pizza)) {
        return
      }

      leftOver.push(pizza)
    })

    return leftOver
  }

  const getTotalDelivered = () => deliveries[4].delivered.length + deliveries[3].delivered.length + deliveries[2].delivered.length


  const getTotalOrders = () => deliveries[4].orders + deliveries[3].orders + deliveries[2].orders

  const genOutput = () => {
    let total = getTotalDelivered()

    const team4 = deliveries[4].delivered.map(pgroup => '4 ' + pgroup.map(p => p.id).join(' ')).join('\n')
    const team3 = deliveries[3].delivered.map(pgroup => '3 ' + pgroup.map(p => p.id).join(' ')).join('\n')
    const team2 = deliveries[2].delivered.map(pgroup => '2 ' + pgroup.map(p => p.id).join(' ')).join('\n')

    let output = '' + total
    if (team2) output += '\n' + team2
    if (team3) output += '\n' + team3
    if (team4) output += '\n' + team4
    return output.trim()
  }

  const getDeliverings = () => {
    const dPizzas = [...deliveries[4].delivering, ...deliveries[3].delivering, ...deliveries[2].delivering]
    deliveries[4].delivering.length = 0
    deliveries[3].delivering.length = 0
    deliveries[2].delivering.length = 0

    return dPizzas
  }

  const inputs = splitInputByLine(input)
  executeInputs(inputs)

  let nextPizzas = pizzas
  let leftOver: Pizza[] = []
  let rules = [0, 0.25, 0.33]
  let currentDelivered = 0
  const totalOrders = getTotalOrders()
  do {
    console.log(rules)
    leftOver = deliver(nextPizzas, rules)
    console.log('deliveries', Object.entries(deliveries).map(([key, value]) => ({ no: key, delivering: value.delivering, delivered: value.delivered.length })))
    nextPizzas = leftOver.concat(getDeliverings())
    rules[0] += 0.1
    rules[1] += 0.1
    rules[2] += 0.1
    batches = Math.max(batches - 1, 1)
    currentDelivered = getTotalDelivered()

    console.log('batches', batches)
    console.log('leftOver', leftOver.length)
    console.log('nextPizzas', nextPizzas.length)
    console.log('pizzas', pizzas.length)
    console.log('currentDelivered', currentDelivered)
    console.log('totalOrders', totalOrders)
  } while (currentDelivered < totalOrders && leftOver.length > 0 && nextPizzas.length >= pizzas.length * 0.05)

  batches = 1
  leftOver = deliver(nextPizzas, [1, 1, 1])
  nextPizzas = leftOver.concat(getDeliverings())
  leftOver = deliver(nextPizzas, [-1, 1, 1])
  nextPizzas = leftOver.concat(getDeliverings())
  leftOver = deliver(nextPizzas, [-1, -1, 1])

  console.log('==== RESULT ====')

  console.log('leftOver', leftOver.length)
  console.log('deliveries', Object.entries(deliveries).map(([key, value]) => ({ no: key, delivering: value.delivering, delivered: value.delivered.length })))
  const output = genOutput()
  return output
}

export default func