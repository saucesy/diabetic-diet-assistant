export { createMealModel, default as Meal} from './meal'
export { createFoodModel } from './food'

export const List = {
  /**
   * @return {Food[]}
   * @constructor
   */
  get Food() {
    return []
  },
  /**
   *
   * @return {Meal[]}
   * @constructor
   */
  get Meal() {
    return []
  }
}