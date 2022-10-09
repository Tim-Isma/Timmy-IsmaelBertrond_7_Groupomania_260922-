// Importation des modules. //

const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')

const checkTokenMiddleware = require('./middlewares/checking_JsonWebToken')

// Initialisation de l'API. //

const app = express()

app.use(cors({
    origin: "*",
    methods: "GET, POST, PUT, PATCH, DELETE, OPTION",
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/images', express.static(path.join(__dirname, 'images')))


// Import des modules de routage. //

const user_router = require('./routes/users')
const post_router = require('./routes/posts')
const comment_router = require('./routes/comments')

const auth_router = require('./routes/auth')


// Mise en place du routage. //

app.get('/', (req, res) => res.send('You are connected!'))

app.use('/users', user_router)  
app.use('/posts', checkTokenMiddleware, post_router)  
app.use('/comments', checkTokenMiddleware, comment_router) 

app.use('/auth', auth_router)

app.get('*', (req, res) => res.status(501).send('An error has occured !'))


// Start serveur. //

mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true,
      useUnifiedTopology: true  })
    .then(() => {
        console.log('Connexion à MongoDB réussie !')
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This server is running on port ${process.env.SERVER_PORT}.`)
        })
    })
    .catch(() => console.log('Connexion à MongoDB échoué !'));