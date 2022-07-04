import request from 'supertest'

import { app } from '../app'
import { SqliteDataSource } from '../database'

const createSurvey = async () => {
  return await request(app).post('/surveys').send({
    title: 'Title example',
    description: 'Description example'
  })
}

describe('Surveys', () => {
  beforeAll(async () => {
    await SqliteDataSource.initialize()
    await SqliteDataSource.runMigrations()
  })

  afterAll(async () => {
    await SqliteDataSource.dropDatabase()
    await SqliteDataSource.destroy()
  })
  
  it('Should be able to create a new survey', async () => {
    const response = await createSurvey()

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('Should be abe to get all surveys', async () => {
    await createSurvey()

    const response = await request(app).get('/surveys')
    console.log(response.body)

    expect(response.body.length).toBe(2)
  })
})