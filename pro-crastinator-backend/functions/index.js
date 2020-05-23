const functions = require('firebase-functions');
const app = require('express')()

const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()    

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
app.post('/signup', (req , res ) => {
    const newUser = {
        email : req.body.email,
        password : req.body.password,
        confirmPassword : req.body.confirmPassword,
        username : req.body.username,
    }

    //TODO validate user
    let token, userId
    db.doc(`/users/${newUser.username}`).get()
    .then(doc => {
        if(doc.exists){
            return res.status(400).json({username : `This username already exists`})
        }else{
            return firebase.auth().createUserWithEmailAndPassword(newUser.email , newUser.password)
        }
    })
    .then(data => {
        userId = data.user.uid
        return data.user.getIdToken()
    })
    .then((idToken) => {
        token = idToken
        const userCredentials = {
            username : newUser.username,
            email : newUser.email,
            password : newUser.password,
            userId
        }
        return db.doc(`/users/${newUser.username}`).set(userCredentials)
    }) 
    .then(() => {
        return res.status(201).json({token})
    })
    .catch(err => {
        console.log(err)
        if(err.code === 'auth/email-already-in-use'){
            return res.status(400),json({email : 'Email already in use'})
        }else{
            return res.status(500).json({error : err.code})
        }
    })
})

//get TODOS
app.get('/getTodos', (req, res) => {
    db.collection('todos')
        .orderBy('createdAt' , 'desc')
        .get()
        .then(data => {
            let todosArray = []
            data.forEach(doc => {
                todosArray.push({
                    todoId : doc.id,
                    ...doc.data()
                })    
            })
            return res.json(todosArray)
    })
    .catch(err => console.log(err))
})

//post a new TODO
app.post('/postTodo', (req, res) => {
    let newTodo = {
        label : req.body.label,
        description : req.body.description,
        username : req.body.username,
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
app.get('/toggleStatus/:todoId', (req, res) => {
    db.doc(`/todos/${req.params.todoId}`)
        .get()
        .then(doc => {
            if(doc.exists){
                if(doc.data().status === "complete"){
                    return doc.ref.update({status : "new"})
                } else{
                    return doc.ref.update({status : "complete"})
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

//delete a todo 
app.delete('/deleteTodo/:todoId', (req, res) => {
    db.doc(`/todos/${req.params.todoId}`)
    .delete()
    .then(() => {
        return res.json({message : "Scream deleted "})
    })
    .catch(err => console.log(err))
})

exports.api = functions.https.onRequest(app)
