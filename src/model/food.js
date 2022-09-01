export default class Food {
  /**
   * @param {Number} gi
   * @param {Number} id
   * @param {String} name
   * @param {String} unit
   * @param {String} image
   * @param {Number} amount
   * @param {Number} carbohydrate
   * @param {Number} default_amount
   */
  constructor(
    gi,
    id,
    name,
    unit,
    image,
    amount,
    carbohydrate,
    default_amount,
  ) {
      this.gi = gi
      this.id = id
      this.name = name
      this.unit = unit
      this.image = image
      this.amount = amount
      this.carbohydrate = carbohydrate
      this.default_amount = default_amount
  }
}

/**
 *
 * @param {Object<String, any>} json
 * @return {Food}
 */
export const createFoodModel = (json) => new Food(...json)
