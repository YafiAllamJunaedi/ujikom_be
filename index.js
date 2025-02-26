import './models/index.js'
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import UserRoute from './routes/UserRoute.js'
import ShoesRoute from './routes/ShoesRoute.js'
import TransactionRoute from './routes/TransactionRoute.js'
import "dotenv/config"

const app = express()
const PORT = process.env.PORT

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use("/user", UserRoute)
app.use("/shoes", ShoesRoute);
app.use("/transaction", TransactionRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})