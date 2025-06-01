import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import accountRoutes from './routes/account.route.js'
import destinationRoutes from './routes/destination.route.js'
import dataHandlerRoutes from './routes/dataHandler.route.js'

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/server', dataHandlerRoutes)
app.use('/server/accounts', accountRoutes)
app.use('/server/destinations', destinationRoutes)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server started to running at port: ${port}`);
})