import {List} from '@/model/index'

const _date = new Date()

/**
 *
 * @param {String | Date | Number} date
 * @return {string}
 */
const createTime = (date = _date) => {
  return [date.getHours(), date.getMinutes()].map((el) => el < 10 ? '0' + el : el).join(':')
}

/**
 *
 * @param {String | Number | Date} date
 * @return {string}
 */
export const createDate = (date = _date) => {
  return new Date(date)
    .toLocaleDateString()
    .split('/')
    .map((el, i) => i === 0 ? el : (el < 10 ? '0' + el : el))
    .join('-')
}

const MealNode = {
  BEFORE_DAWN: 'Before Dawn',
  BREAKFAST: 'Breakfast',
  LUNCH: 'Lunch',
  SUPPER: 'supper',
  NIGHT_SNACK: 'Night Snack',
}

/**
 * @return {string}
 */
const createName = () => {
  const h = _date.getHours()
  if (h >= 0 && h < 7) {
    return MealNode.BEFORE_DAWN
  } else if (h >= 7 && h < 11) {
    return MealNode.BREAKFAST
  } else if (h >= 11 && h < 17) {
    return MealNode.LUNCH
  } else if (h >= 17 && h < 21) {
    return MealNode.SUPPER
  } else {
    return MealNode.NIGHT_SNACK
  }
}

export default class Meal {
  /**
   * @param {Number} id
   * @param {String | Date} date
   * @param {string} time
   * @param {String} name
   * @param {Number} carbohydrate
   * @param {Food[]} food
   */
  constructor(
    id,
    date,
    name,
    time,
    food,
    carbohydrate = 0,
  ) {
    this.id = id
    this.date = date
    this.time = time
    this.name = name
    this.food = food
    this.carbohydrate = carbohydrate
  }
}

/**
 * @param {Object<String, any>} json
 * @return {Meal}
 */
export const createMealModel =
  (json =
     {
       id: -1,
       date: createDate(),
       name: createName(),
       time: createTime(),
       food: List.Food,
       carbohydrate: 0,
     }) => {
    return new Meal(json.id, json.date, json.name, json.time, json.food, json.carbohydrate)
  }