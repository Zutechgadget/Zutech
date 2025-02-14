const mongoose = require ('mongoose')
const  express = require ('express')


const cors = require('cors');

const app = express();

// Allow requests from the frontend running on localhost:3000
app.use(cors({
  origin: 'http://localhost:3000', // Your Next.js frontend
  methods: 'GET,POST,PUT,DELETE',
}));
const categoryRoute = require('./src/app/api/products/routes/categorys')
const productRoute = require('./src/app/api/products/routes/products')




mongoose.connect('mongodb://localhost/apple')
.then(() =>console.log('Connected to MongoDB...'))
.catch(err => console.log('Could not connect to MongoDB...', err))


// middleware
app.use(express.json());

app.use('/api/categorys', categoryRoute)
app.use('/api/products', productRoute )



const port = process.env.PORT || 8700

app.listen(port, () => console.log (`listening on port ${port}`))