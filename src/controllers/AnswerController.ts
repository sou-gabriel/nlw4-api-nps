import { Request, Response } from 'express'

import { surveysUsersRepository } from '../repositories/surveysUsersRepository'

export class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params
    const { u } = request.query

    const surveyUser = await surveysUsersRepository.findOne({
      where: {
        id: String(u)
      }
    })

    if (!surveyUser) {
      return response.status(400).json({
        error: 'Survey user does not exists!'
      })
    }

    surveyUser.value = Number(value)

    await surveysUsersRepository.save(surveyUser)

    return response.json(surveyUser)
  }
}