import { EntityRepository } from 'typeorm'
import { SqliteDataSource } from '../database'
import { Survey } from '../models/Survey'

export const surveysRepository = SqliteDataSource.getRepository(Survey)