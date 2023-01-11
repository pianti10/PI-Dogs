const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Temperament } = require("../db");
const { API_KEY } = process.env;



router.get("/", async (req, res) => {
  try {
    const temperamentApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    ); 
    
    const temperamentsStrings = temperamentApi.data.map((t) => t.temperament);
    
    const temperamentArray = [];
    for (let i = 0; i < temperamentsStrings.length; i++) {
      if (temperamentsStrings[i]) {
        temperamentsStrings[i].split(", ").forEach((t) => {
          temperamentArray.push(t);
        });
      }
    }
    const altTemperaments = [... new Set(temperamentArray)] 
    console.log(altTemperaments) 
    for (const temp of altTemperaments) {
      await Temperament.findOrCreate({
        where: { name: temp },
      });
    }
  
    const allTemperaments = await Temperament.findAll();
    res.status(200).send(allTemperaments);
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "No se encontraron temperamentos" });
  }
});

module.exports = router;
