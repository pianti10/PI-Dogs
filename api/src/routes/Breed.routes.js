const { Router } = require("express");
const { Breed, Temperament } = require("../db");
const router = Router();
const { getApiInfo, getDBInfo, getInfoTotal } = require("./controllers");

router.get("/", async (req, res) => {
  try {
    const name = req.query.name;
    const infoTotal = await getInfoTotal();
    if (name) {
      const dogName = await infoTotal.filter((d) =>
        d.name.toLowerCase().includes(name.toLowerCase())
      );
      dogName.length
        ? res.status(200).send(dogName)
        : res.status(404).send("El perro no existe");
    } else {
      res.status(200).send(infoTotal);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "No se encontraron perritos" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const dogsTotal = await getInfoTotal();
  try {
    let dogId = dogsTotal.filter((e) => e.id == id);
    if (dogId.length) {
      return res.status(200).send(dogId);
    }
  } catch (error) {
    return res.status(404).send({ error: "No se encontro el perro" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_span,
      image,
      temperaments
    } = req.body;
    if (
      !name ||
      !height_min ||
      !height_max ||
      !weight_min ||
      !weight_max ||
      !life_span
    ) 
      return res.status(400).send("Falta enviar datos");
    
    const obj = {
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_span,
      image,
      temperaments
    };
    const newDog = await Breed.create(obj);
    res.send(newDog);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
