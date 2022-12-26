const { Router } = require('express');
const { Race, Temperament} = require('../db');
const router = Router();
const { getAllDogs } = require('../routes/controllers');



router.get('/dogs', async (req,res) => { 
    const name = req.query.name
    const allDogs = await getAllDogs()
    try{
        if(name) {
            const dogSelected = allDogs.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()))
            if (dogSelected.length){
                return res.status(200).send(dogSelected)
            } else {
                return res.status(404).send({error: 'The dog is at the park'})
            }
        } else {
            return res.status(201).json(allDogs)
        }
    } catch(error){
        res.status(404).send({error: 'The dog is at the park'})
    }
})




router.get('/dogs/:idRaza', async (req, res) => {
    const { idRaza } = req.params
    const allDogs = await getAllDogs()
    try {
            const dogSelected = allDogs.filter((dog) => dog.id == idRaza)
            if (dogSelected.length){
                return res.status(200).send(dogSelected)
            } 
    } catch (error) {
        return res.status(404).send({error: 'The dog is at the park'})
    }
});

router.post('/dogs', async (req,res) => {
    // try{
        let {
            name,
            height_min,
            height_max,
            weight_min,
            weight_max,
            lifeTime,
            createdInDb,
            temperament
        } = req.body;

        const dogChecked = await Race.findOne({
            where: { name: name }
        })
        if(dogChecked) {
            return res.status(404).send('The dog already exist')
        } else {
            let DogCreated = await Race.create({
                name,
                height_min,
                height_max,
                weight_min,
                weight_max,
                lifeTime,
                createdInDb
            })
            
            let tempDeDB = await Temperament.findAll({
                where: {name: temperament}
            }) 
            DogCreated.addTemperament(tempDeDB)
            return res.status(200).send('The dog was created')
        }
    })