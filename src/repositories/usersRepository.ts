import { SqliteDataSource } from '../database'
import { User } from '../models/User'

export const usersRepository = SqliteDataSource.getRepository(User)
