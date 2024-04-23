const express = require('express')
const cors = require('cors')
const stripe = require('stripe')
const app = express()
const cookieParser = require('cookie-parser')

require('./config/mongoose.config')


app.use(cors({credentials: true, origin: "http://localhost:3000"}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const {oAuthRouter} = require("./routes/oauth.routes")
app.use("/api/", oAuthRouter)

const {productRouter} = require("./routes/product.routes")
app.use("/api/", productRouter)

const {userRouter} = require("./routes/user.routes")
app.use("/api/", userRouter)

const {paymentRouter} = require("./routes/payment.routes")
app.use("/api/", paymentRouter)

app.listen(8000, () =>{
    console.log("Listening at Port 8000")
})