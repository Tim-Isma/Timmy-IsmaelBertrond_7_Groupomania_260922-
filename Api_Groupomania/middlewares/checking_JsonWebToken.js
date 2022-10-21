// Import des modules //

const jwt = require('jsonwebtoken')

/////////////////////////////////////
// Extraction du token //

const extractBearer = authorization => {
    if (typeof authorization !== 'string') {
        return false
    }

    // Isolation du token //
    const rejex = /(bearer)\s+(\S+)/ // s= caractère d'espacement / S= caractère non blanc.
    const matches = authorization.match(rejex)

    return matches && matches[2] // ??? [1]
}

////////////////////////////////////////////////////////////////////////////////////

// Vérification de la présence du token //

const checkTokenMiddleware = (req, res, next) => {

    const token = req.headers.authorization && extractBearer(req.headers.authorization)
    console.log('HEADERS:', req.headers)
    console.log('TOKEN:', token)
    if (!token) {
        return res.status(401).json({ message: 'The token does not exists !'})
    }

    // Vérification de la validité du token //
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        console.log('ERR TOKEN:', err)
        console.log('DECODED TOKEN:', decodedToken)
        if (err) {
            return res.status(401).json({ message: 'Bad token' })
        }
        req.user = decodedToken.id
        next()
    })
}

module.exports = checkTokenMiddleware
