import { Auth0Provider } from '@bcwdev/auth0provider'
import { jobsService } from '../services/JobsService.js'
import BaseController from '../utils/BaseController.js'

export class JobsController extends BaseController {
  constructor() {
    super('api/jobs')
    this.router
      .get('', this.getJobs)
      .get('/:jobId', this.getJob)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createJob)
      .delete('/:jobId', this.removeJob)
      .put('/:jobId', this.editJob)
  }

  async getJobs(req, res, next) {
    try {
      const jobs = await jobsService.getJobs(req.query)
      res.send(jobs)
    } catch (error) {
      next(error)
    }
  }

  async removeJob(req, res, next) {
    try {
      const job = await jobsService.removeJob(req.params.jobId, req.userInfo.id)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async editJob(req, res, next) {
    try {
      const job = await jobsService.editJob(req.params.jobId, req.userInfo.id, req.body)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async createJob(req, res, next) {
    try {
      const job = await jobsService.createJob(req.body)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async getJob(req, res, next) {
    try {
      const job = await jobsService.getJobById(req.params.jobId)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }
}
