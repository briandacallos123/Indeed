const express = require('express');
const route = express.Router()
const Job = require('../model/job');



route.get('/', async(req, res) =>{
    try {
        const { page, take } = req.query;

        // Default values for page and limit
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(take) || 7;

         // Calculate the skip value based on the page number and limit
         const skip = (pageNumber - 1) * limitNumber;

        const response = await Job.find().limit(limitNumber).skip(skip)
        res.status(200).json({message:"Success", data:response})
    } catch (error) {
        console.log(error)
    }
})

route.get('/search', async(req, res)=>{
    try {
        const titleRegExp = new RegExp(req.query.title, 'i');
        const locationRegExp = new RegExp(req.query.location, 'i');

        const data = await Job.find({title: titleRegExp,address:locationRegExp});
        res.status(200).json({data})
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})


route.get('/:id', async(req, res) =>{
    try {
       const id = req.params.id;

       const data = await Job.findById(id);
       res.status(200).json({ data})
    } catch (error) {
        console.log(error)
    }
})

route.post('/', async(req, res) => {
    console.log(req.body)
    try {
        const data = req.body
        console.log(data)
        const result = await Job.create(data);
        res.status(200).json({message:"Success create"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})



module.exports = route
