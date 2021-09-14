import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class HousesService {
  async getHouseById(houseId) {
    const house = await dbContext.House.findById(houseId).populate('creator', 'name picture')
    if (!house) {
      throw new BadRequest('Invalid House Id')
    }
    return house
  }

  async editHouse(houseId, userId, houseData) {
    return await dbContext.House.findByIdAndUpdate(houseId, houseData, { new: true })
  }

  async removeHouse(houseId, userId) {
    const house = await this.getHouseById(houseId)
    if (userId !== house.creatorId.toString()) {
      throw new Forbidden('You shall not pass!!!')
    }
    await house.remove()
    return house
  }

  async createHouse(houseData) {
    const house = await dbContext.House.create(houseData)
    return house
  }

  async getHouse(query) {
    const house = await dbContext.House.find(query).populate('creator', 'name picture')
    return house
  }

  async getHouses(query) {
    const houses = await dbContext.House.find(query).populate('creator', 'name picture')
    return houses
  }
}

export const housesService = new HousesService()
