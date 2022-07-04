import { SqliteDataSource } from '../database'
import { SurveyUser } from '../models/SurveyUser'

export const surveysUsersRepository = SqliteDataSource.getRepository(SurveyUser)