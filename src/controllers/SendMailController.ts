import path from 'path'
import { Request, Response } from 'express'

import { usersRepository } from '../repositories/usersRepository'
import { surveysRepository } from '../repositories/surveysRepository'
import { surveysUsersRepository } from '../repositories/surveysUsersRepository'
import sendMailService from '../services/SendMailService'

export class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body

    const user = await usersRepository.findOne({
      where: {
        email
      }
    })
    
    if (!user) {
      return response.status(400).json({
        error: 'User does not exists!'
      })
    }

    const survey = await surveysRepository.findOne({
      where: {
        id: survey_id,
      }
    })

    if (!survey) {
      return response.status(400).json({
        error: 'Survey does not exists!'
      })
    }
    
    const npsPath = path.resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')
    
    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: { user_id: user.id, value: undefined },
      relations: ['user', 'survey']
    })

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: '',
      link: process.env.URL_MAIL
    }

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id
      await sendMailService.execute(email, survey.title, variables, npsPath)
      return response.json(surveyUserAlreadyExists)
    }

    // Salvar as informações na tabela surveyUser
    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id
    })    

    await surveysUsersRepository.save(surveyUser)

    // Enviar e-mail para o usuário
    variables.id = surveyUser.id
    await sendMailService.execute(email, survey.title, variables, npsPath)

    return response.json(surveyUser)
  }
}