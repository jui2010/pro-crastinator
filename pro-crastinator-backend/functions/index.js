const functions = require('firebase-functions');
const app = require('express')()

const {admin , db} = require('./util/admin')

const FBAuth = require('./util/FBAuth')

var firebaseConfig = {
    apiKey: "AIzaSyBIxTzwTTQ32FyjcAB-k_X0_MFswzgyA-U",
    authDomain: "pro-crastinator.firebaseapp.com",
    databaseURL: "https://pro-crastinator.firebaseio.com",
    projectId: "pro-crastinator",
    storageBucket: "pro-crastinator.appspot.com",
    messagingSenderId: "733618024430",
    appId: "1:733618024430:web:cd4def87dee9fea11028ff",
    measurementId: "G-5LYDQ8YW8J"
}

const firebase = require('firebase')
firebase.initializeApp(firebaseConfig)

//signup a user
app.post('/signup' , (req , res) => {
    const newUser = {
        email : req.body.email,
        password : req.body.password,
        confirmPassword : req.body.confirmPassword,
        username : req.body.username
    }

    db.doc(`/users/${newUser.username}`)
        .get()
        .then(doc => {
            if(doc.exists ) {
                return res.status(400).json({username : 'This username is already in use'})
            }else if(newUser.password !== newUser.confirmPassword){
                return res.status(400).json({confirmPassword : 'Passwords do not match'})
            }else {
                return firebase.auth().createUserWithEmailAndPassword(newUser.email , newUser.password)
            }
        })
        .then(data => {
            userId = data.user.uid
            return data.user.getIdToken()
        })
        .then(idToken => {
            token = idToken
            const userCredentials = {
                email : newUser.email,
                username  : newUser.username,
                createdAt : new Date().toISOString(),
                firstName : '',
                lastName : '',
                bio : '',
                location : '',
                profileImage : 'https://firebasestorage.googleapis.com/v0/b/pro-crastinator.appspot.com/o/no-img.jpg?alt=media',
                userId
            }
            db.doc(`users/${newUser.username}`).set(userCredentials)
        })
        .then(() => {
            return res.status(201).json({token})
        })
        .catch(err => {
            if(err.code === "auth/email-already-in-use")
                return res.status(500).json({email : "This email is already in use"})
            else
                return res.status(500).json({err : err.code})
        })
})


//login a user
app.post('/login' , (req , res) => {
    const newUser = {
        email : req.body.email,
        password : req.body.password
    }

    firebase.auth()
        .signInWithEmailAndPassword(newUser.email, newUser.password)
        .then(data => {
            return data.user.getIdToken()
        })
        .then(token => {
            return res.json(token)
        })
        .catch(err => {
            if(err.code === "auth/wrong-password")
                return res.status(403).json({password : 'Incorrect password'})
            else
                return res.status(403).json(err.code)
        })
})

//get TODOS and user Info of the AUthenticated User
app.get('/getAuthenticatedUserDataAndTodos', FBAuth, (req, res) => {
    let userData = {}
    db.doc(`/users/${req.user.username}`)
        .get()
        .then(doc => {
            if(doc.exists){
                userData.userInfo = doc.data()
                return db.collection('todos').where('username' , '==', req.user.username).get()
            }
        })
        .then(data => {
            userData.todos = []
            data.forEach(doc => {
                userData.todos.push({
                    todoId : doc.id,
                    ...doc.data()
                })
            })
        })
        .then(() => {
            return res.json(userData)
        })
        .catch(err => {
            return res.status(500).json({err : err.code})
        })

})

//post a new TODO
app.post('/postTodo', FBAuth, (req, res) => {
    let newTodo = {
        label : req.body.label,
        description : req.body.description,
        username : req.user.username,
        status : 'new',
        dueAt : req.body.dueAt,
        createdAt :  new Date().toISOString()
    }
    db.collection('todos')
        .add(newTodo)
        .then(doc => {
            const resTodo = newTodo
            resTodo.todoId = doc.id
            return res.json(resTodo)
        })
        .catch((err) => {
            res.status(500).json({error : 'something went wrong'})
            console.error(err)
        })
})

//toggle the done/not done status of a Todo
app.get('/toggleStatusOngoing/:todoId', FBAuth, (req, res) => {
    db.doc(`/todos/${req.params.todoId}`)
        .get()
        .then(doc => {
            if(doc.exists){
                if(doc.data().status === "new"){
                    return doc.ref.update({status : "ongoing"})
                } else if(doc.data().status === "ongoing"){
                    return doc.ref.update({status : "new"})
                } else {
                    return doc.ref.update({status : "new"})
                }
            } else {
                return res.status(400).json({message : "todo doesnt exist"})
            }
        })
        .then(() => {
            return res.json({message : "doc done toggle updated "})
        })
        .catch(err => {
            console.log(err)
        })
})

//set status to complete
app.get('/setStatusComplete/:todoId', FBAuth, (req, res) => {
    db.doc(`/todos/${req.params.todoId}`)
        .get()
        .then(doc => {
            if(doc.exists){
                return doc.ref.update({status : "complete"})
            } else {
                return res.status(400).json({message : "todo doesnt exist"})
            }
        })
        .then(() => {
            return res.json({message : "doc status set to complete"})
        })
        .catch(err => {
            console.log(err)
        })
})

//delete a todo 
app.delete('/deleteTodo/:todoId', FBAuth, (req, res) => {
    db.doc(`/todos/${req.params.todoId}`)
    .delete()
    .then(() => {
        return res.json({message : "Scream deleted "})
    })
    .catch(err => console.log(err))
})

//edit user profile
app.post('/editUserDetails/' , FBAuth , (req, res) => {
    const userDetails = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        location : req.body.location,
        bio : req.body.bio
    }
    db.doc(`/users/${req.user.username}`).set(userDetails, {merge : true})
        .then(() => {
            return res.json(userDetails)
        })
        .catch(err => {
            console.log(err.code)
        })
})

//edit todo
app.post(`/editTodo/:todoId` , FBAuth , (req, res) => {
    const todoDetails = {
        description : req.body.description,
        dueAt : req.body.dueAt,
        label : req.body.label
    }
    db.doc(`/todos/${req.params.todoId}`).set(todoDetails, {merge : true})
        .then(() => {
            return res.json(todoDetails)
        })
        .catch(err => {
            console.log(err.code)
        })
})

//upload profile image
app.post(`/uploadProfilePicture` , FBAuth, (req, res) => {
    const BusBoy = require('busboy')
    const os = require('os')
    const path = require('path')
    const fs = require('fs')

    const busBoy = new BusBoy({headers : req.headers})

    let pictureToBeUploaded = {}
    let pictureFilename

    busBoy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        if(mimetype !== "image/png" && mimetype !== "image/jpeg" && mimetype !== "image/jpg"){
            res.status(400).json({filetype : "Invalid file type"})
        }
        
        pictureFilename = filename
        const picturePath = path.join(os.tmpdir(), filename)
        pictureToBeUploaded = {picturePath, mimetype}
        file.pipe(fs.createWriteStream(picturePath))
    })

    busBoy.on('finish', () => {
        admin.storage().bucket().upload(pictureToBeUploaded.picturePath, {
            resumable : false,
            metadata : {
                metadata : {
                    contentType : pictureToBeUploaded.mimetype
                }
            }   
        })
        .then(() => {
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${pictureFilename}?alt=media`
            return db.doc(`users/${req.user.username}`).update({profileImage : imageUrl})
        })
        .then(() => {
            return res.json({message: "Image uploaded successfully"})
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({error : err.code})
        })
    })

    busBoy.end(req.rawBody)
})

exports.api = functions.https.onRequest(app)
