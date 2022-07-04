import { DataSource } from 'typeorm'

export const SqliteDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.NODE_ENV === 'test' 
    ? './src/database/database.test.sqlite' 
    : './src/database/database.sqlite',  
  logging: true,
  entities: ['./src/models/**.ts'],
  migrations: ['./src/database/migrations/**.ts']
})

SqliteDataSource.initialize()