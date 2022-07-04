import { Request, Response } from 'express'

import { surveysRepository } from '../repositories/surveysRepository'

class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body
   
    const survey = surveysRepository.create({
      title,
      description
    })
    await surveysRepository.save(survey)
    
    return response.status(201).json(survey)
  }

  async show(request: Request, response: Response) {
    const allSurveys = await surveysRepository.find()
    return response.json(allSurveys)
  }
}

export { SurveysController }