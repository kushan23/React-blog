const express = require('express');
const router = express.Router();
const signUpTemplateCopy = require('../ models/SignUpModels')
const makePostTemplateCopy = require('../ models/Posts')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
router.post('/signup', (req, res) => {

    const signedUpUser = new signUpTemplateCopy({

        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    signedUpUser.save()
        .then(data => {

            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
})
router.post('/new', async (req, res) => {

    const newPost = new makePostTemplateCopy({
        title: req.body.title,
        username: req.body.username,
        description: req.body.description,
        body: req.body.body,

    })
    newPost.save()
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
})
router.post('/login', async (req, res) => {
    const { password, username } = req.body
    const ans = await signUpTemplateCopy.find({ username: username, password: password })
    if (ans.length > 0) {

        makePostTemplateCopy.find({ username: username })
            .then((data) => {
                if (!data) {
                    res.send("OOps")
                }
                else {

                    res.send(data)
                }
            })
            .catch((error => res.json(error)))
    }
    else {
        res.send("Wrong")
    }
})
router.post('/posts', async (req, res) => {
    const { username } = req.body
    makePostTemplateCopy.find({ username: username })
        .then((data) => {
            console.log(data)
            res.send(data)
        })
        .catch((error) => {
            res.send(err)
        })
})
router.post('/posts/find', async (req, res) => {
    const { id } = req.body
    console.log(id)
    makePostTemplateCopy.find({ _id: id })
        .then((data) => {
            console.log(data)
            res.send(data)
        })
        .catch(err => res.status(400).json('Error:' + err));
})

router.put('/posts/edit', (req, res) => {
    const { id, username, title, body, description } = req.body
    const newPot = {
        _id: id,
        username: username,
        title: title,
        description: description,
        body: body,
    }
    makePostTemplateCopy.findByIdAndUpdate(
        id,
        newPot,
        (err, updatedBoard) => {
            if (err) {
                res.json({
                    newPot,
                    success: false,
                    msg: 'Failed to update board'
                })
            } else {
                res.json({ newPot, success: true, msg: 'Board added' })
            }
        }
    )
})

router.get('/show', async (req, res) => {
    const posts = await makePostTemplateCopy.find({})
    res.json(posts)


})
router.get('/api', (req, res) => {
    signUpTemplateCopy.find({})
        .then((data) => {
            console.log("The dat is->", data);
            res.json(data)

        })
        .catch((error) => {
            console.log('Data :', data);
        })

})


router.delete('/posts/delete', async (req, res) => {
    const { id } = req.body

    makePostTemplateCopy.findByIdAndDelete(id, function (err) {
        if (err) console.log(err)
        res.send("YES")
    })


})



module.exports = router;
