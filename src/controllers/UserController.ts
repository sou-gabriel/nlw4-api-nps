import { Request, Response } from 'express'
import * as yup from 'yup'

import { usersRepository } from '../repositories/usersRepository'

export class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body

    const schema = yup.object().shape({
      name: yup.string().required('Nome é obrigatório'),
      email: yup.string().email().required('E-mail é obrigatório')
    })

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({
        error: 'Validation failed!'
      })
    }

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json({
        error: error
      })
    }


    const userAlreadyExists = await usersRepository.findOne({
      where: {
        email
      }
    })

    if (userAlreadyExists) {
      return response.status(400).json({
        error: 'User already exists!'
      })
    }

    const user = usersRepository.create({
      name,
      email,
    })

    await usersRepository.save(user)
    return response.status(201).json(user)
  }
}
