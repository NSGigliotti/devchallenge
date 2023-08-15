const express = require('express')
const cors = require('cors')

const app = express()

//? config JSON response
app.use(express.json())

//? salve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

//? public folder for images
app.use(express.static('public'))

//? routes
const UserRoutes = require('./routes/UserRoutes')
const ProductRoutes = require('./routes/ProductRotes')
const PurchaseRoute = require('./routes/PurchaseRoutes')

app.use('/users', UserRoutes)
app.use('/produts', ProductRoutes)
app.use('/purchase', PurchaseRoute)

app.listen(5000)