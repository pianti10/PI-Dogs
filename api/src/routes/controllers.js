const axios = require("axios");
const { Breed, Temperament } = require("../db");
const { API_KEY } = process.env;

const getApiInfo = async () => {
  let api = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  let dogsInfo = await api.data.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image.url,
      breed_group: e.breed_group,
      temperament: e.temperament,
      life_span: e.life_span,
      weight_min: parseInt(e.weight.metric.slice(0, 2).trim()),
      weight_max: parseInt(e.weight.metric.slice(4).trim()),
      height_min: parseInt(e.height.metric.slice(0, 2).trim()),
      height_max: parseInt(e.height.metric.slice(4).trim()),
    };
  });
  return dogsInfo;
};

const getDBInfo = async () => {
  const dogsDB = await Breed.findAll({
    include: [{
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    }]
  });
  return dogsDB;
};

const getInfoTotal = async () => {
  const apiInfo = await getApiInfo();
  const DBInfo = await getDBInfo();
  
  const info = DBInfo.map((p) => {
    const temperamentNames = []
    const dog = {...p}
    for (const temperament of p.dataValues.temperaments) {
      temperamentNames.push(temperament.name)
    }
    dog.dataValues.temperament = temperamentNames.join(", ")
    delete dog.dataValues.temperaments
    return dog.dataValues
  })
  const infoTotal = apiInfo.concat(info);
  return infoTotal;
};



module.exports = {
  getApiInfo,
  getDBInfo,
  getInfoTotal
};
