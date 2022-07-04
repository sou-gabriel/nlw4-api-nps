import request from 'supertest'

import { app } from '../app'
import { SqliteDataSource } from '../database'

describe('Users', () => {
  beforeAll(async () => {
    await SqliteDataSource.initialize()
    await SqliteDataSource.runMigrations()
  })

  it('Should be able to create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'john.doe@email.com',
        name: 'John Doe'
      })

    expect(response.status).toBe(201)
  }) 

  it('Should not abe to create a user with exists email', async () => {
    const response = await request(app).post('/users').send({
      email: 'john.doe@email.com',
      name: 'John Doe'
    })

    expect(response.status).toBe(400)
  })
})