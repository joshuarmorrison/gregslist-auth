import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class JobsService {
  async getJobById(jobId) {
    const job = await dbContext.Jobs.findById(jobId).populate('creator', 'name picture')
    if (!job) {
      throw new BadRequest('Invalid job Id')
    }
    return job
  }

  async editJob(jobId, userId, jobData) {
    return await dbContext.Jobs.findByIdAndUpdate(jobId, jobData, { new: true })
  }

  async removeJob(jobId, userId) {
    const job = await this.getJobById(jobId)
    if (userId !== job.creatorId.toString()) {
      throw new Forbidden('You shall not pass!!!')
    }
    await job.remove()
    return job
  }

  async createJob(jobData) {
    const job = await dbContext.Jobs.create(jobData)
    return job
  }

  async getJob(query) {
    const job = await dbContext.Jobs.find(query).populate('creator', 'name picture')
    return job
  }

  async getJobs(query) {
    const jobs = await dbContext.Jobs.find(query).populate('creator', 'name picture')
    return jobs
  }
}

export const jobsService = new JobsService()
