import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import { CarSchema } from '../models/CarModel'
import { HouseSchema } from '../models/HouseModel'
import { JobSchema } from '../models/JobModel'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Cars = mongoose.model('Car', CarSchema)
  House = mongoose.model('House', HouseSchema)
  Jobs = mongoose.model('Job', JobSchema)
}

export const dbContext = new DbContext()
