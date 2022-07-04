import { Request, Response } from 'express'
import { Not, IsNull } from 'typeorm'

import { surveysUsersRepository } from '../repositories/surveysUsersRepository'

export class NpsController {
  /*
    1 2 3 4 5 6 7 8 9 10
    Detratores = 0 - 6
    Passivos = 7 - 8
    Promotores = 9 e 10
    
    Detratores e promotores são as variáveis usados para cálculo de NPS. Os passivos não são levados em consideração
    (Número de promotores - número de detratores) / (número de respondentes) * 100   * 
  */
  
    async execute(request: Request, response: Response) {
      const { survey_id } = request.params;
  
      const surveysUsers = await surveysUsersRepository.find({
        where: {
          survey_id,
          value: Not(IsNull()),
        }
      })
  
      const detractor = surveysUsers.filter(
        (survey) => survey.value >= 0 && survey.value <= 6
      ).length
  
      const promoters = surveysUsers.filter(
        (survey) => survey.value >= 9 && survey.value <= 10
      ).length
  
      const passive = surveysUsers.filter(
        (survey) => survey.value >= 7 && survey.value <= 8
      ).length
  
      const totalAnswers = surveysUsers.length;
  
      const calculate = Number(
        (((promoters - detractor) / totalAnswers) * 100).toFixed(2)
      )
  
      return response.json({
        detractor,
        promoters,
        passive,
        totalAnswers,
        nps: calculate,
      })
    }
}