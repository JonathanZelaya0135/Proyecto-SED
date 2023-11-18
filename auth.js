const User = require('./models/userModel')

/*async function setUser(req, res, next) {
    const id = req.body.userId
    if (id) {
        console.log(id)
        //const user = await User.find({userId: id})
        req.user = await User.find({userId: id})
        console.log(req.user.role)
        if (req.user == '') {
            res.status(404)
            return res.send('User not found')
        }
    }
    next()
}*/

async function setUser(req, res, next) {
    const id = req.body.userId
    if (id) {
        //console.log(id)
        //const user = await User.find({userId: id})
        req.user = await User.find({userId: id})
        const user = req.user
        if (user == '') {
            res.status(404)
            return res.send('User does not exist')
        }
        //const object = user[0]
        //console.log(object.role)
        /*if (user.constructor === Array) {
            console.log(user[0])
        }*/

    }
    next()
}

function authUser(req, res, next) {
    if (req.user == null) {
        res.status(403)
        return res.send('Sign in required')
    }
    next()
}

function authRole(role) {
    return (req, res, next) => {
        const user = req.user
        const object = user[0]
        //console.log(object.role)
        //console.log(user)
        if (object.role !==  role) {
            res.status(401)
            return res.send('Not allowed')
        }
        next()
    }
}

module.exports = {
    setUser,
    authUser,
    authRole
}