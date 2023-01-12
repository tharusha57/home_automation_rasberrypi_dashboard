const express = require('express')
const router = express.Router()
const Component = require('../models/dataModal')

router.post('/data' , async (req, res) => {
    const {name,value,led2,led3,fan} = req.body
    
    try {
        const data = await Component.findOneAndUpdate({name} , {
            value,led2,led3,fan
        })
        res.status(200).json(data)
    } catch (error) {
        res.json(error)
    }
})

router.get('/data' , async(req,res) => {
    
    try {
        const data = await Component.find({name : 'LED'})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error})
    }
})

module.exports = router