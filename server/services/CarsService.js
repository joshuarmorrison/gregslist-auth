import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class CarsService {
  async getCarById(carId) {
    const car = await dbContext.Cars.findById(carId).populate('creator', 'name picture')
    if (!car) {
      throw new BadRequest('Invalid Car Id')
    }
    return car
  }

  async editCar(carId, userId, carData) {
    return await dbContext.Cars.findByIdAndUpdate(carId, carId, { new: true })
  }

  async removeCar(carId, userId) {
    const car = await this.getCarById(carId)
    if (userId !== car.creatorId.toString()) {
      throw new Forbidden('You shall not pass!!!')
    }
    await car.remove()
    return car
  }

  async createCar(carData) {
    const car = await dbContext.Cars.create(carData)
    return car
  }

  async getCars(query) {
    const cars = await dbContext.Cars.find(query).populate('creator', 'name picture')
    return cars
  }
}

export const carsService = new CarsService()
