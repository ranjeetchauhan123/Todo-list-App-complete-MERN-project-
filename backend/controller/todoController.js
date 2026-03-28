const {collection, newUser}= require('../schema/todoSchema')
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const handleAddTask = async (req, res) => {
    try {
        const result = await collection.find()
        res.send(result)
    } catch (err) {
        res.send({ message: 'no such data', error: err.message })
    }

}


const handlePostTask = async (req, res) => {
    try {
        const result = await collection.create(req.body)
        if (result) {
            res.send({ message: 'task added', success: true, result })
        } else {
            res.send({ message: 'task added faild', success: false })
        }
    } catch (err) {
        res.send({ message: 'data post faild', error: err.message })
    }

}

const handleDelete = async (req, res) => {
    try {
        const id = req.params.id;
        await collection.findByIdAndDelete(id)
        if (id) {
            res.send({ message: 'task deleted', success: true })
        } else {
            res.send({ message: 'task not  delete', success: false })
        }
    } catch (err) {
        res.send({ message: 'data delete faild', error: err.message })
    }

}


const handleNevigate = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.send({ message: 'id not recevied', success: 'false' })
        }
        const result = await collection.findById(id)
        res.send({ message: 'task successfully recevied', success: true, data: result })
    } catch (err) {
        res.send({ message: 'Error', error: err.message })
    }
}

const handleUpdate = async (req, res) => {
    try {
        const id = req.body._id
        if (id) {
            const result = await collection.findByIdAndUpdate(id, req.body)
            res.send({ message: 'task successfully update', success: true, data: result })
        } else {
            res.send({ message: 'id not recevied', error: err.message })
        }

    } catch (err) {
        res.send({ message: 'Error', error: err.message })
    }
}

const handleMultipleDelete = async (req, res) => {
    try {
        const ids = req.body;
        if (!ids) {
            res.send({ message: 'id Not recevied', success: false })
        } else {
            const newId = ids.map((id) => new ObjectId(id))
            const result = await collection.deleteMany({ _id: { $in: newId } })
            res.send({ message: 'task successfully delete', success: true })
        }
    } catch (err) {
        res.send({ message: 'Error', error: err.message })
    }
}

//signup 

const handleSignup = async (req, res) => {
    const userData = req.body;
    if (userData) {
        const result = await newUser.create(userData)
        if (result) {
            jwt.sign(userData, 'unique', { expiresIn: '5d' }, (error, token) => {
                res.send({ message: 'token generate success', success: true  , token})
            })
        } else {
            res.send({ message: 'token generate Faild', success: false })
        }
    } else {
        res.send({ message: 'error', success: false })
    }
}


const handleSignin = async (req, res) => {
    const {email , password} = req.body;
    if (email && password) {
        const result = await newUser.findOne({email , password})
        if (result) {
            jwt.sign(req.body, 'unique', { expiresIn: '5d' }, (error, token) => {
                res.send({ message: 'usre match success', success: true  , token})
            })
        } else {
            res.send({ message: 'user not found', success: false })
        }
    } else {
        res.send({ message: 'error', success: false })
    }

}



module.exports = {
    handleAddTask, handlePostTask, handleDelete,
    handleNevigate, handleUpdate, handleMultipleDelete,
    handleSignup, handleSignin
}