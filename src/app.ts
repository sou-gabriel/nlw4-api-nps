import 'reflect-metadata'
import './database'
import 'dotenv/config'
import express from 'express'

import { router } from './routes'

export const app = express()

app.use(express.json())
app.use(router)
