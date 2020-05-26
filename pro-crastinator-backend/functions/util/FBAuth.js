const {admin , db} = require('./admin')

module.exports = (req, res, next) => {
    let idToken = ''
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        idToken = req.headers.authorization.split('Bearer ')[1]
    }else{
        console.log('No token found')
        return res.status(403).json({error : "Un-Authorized"})
    }

    admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            req.user = decodedToken
            return db.collection('users')
                    .where('userId','==', req.user.uid)
                    .limit(1)
                    .get()
        })
        .then(data => {
            req.user.username = data.docs[0].data().username
            return next()
        })
        .catch(err => {
            return res.status(500).json(err.code)
        })
}