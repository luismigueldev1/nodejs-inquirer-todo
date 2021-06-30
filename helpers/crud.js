const fs = require("fs");

const archivo = "./db/data.json";

const guardarDb = (data) => {
  fs.writeFileSync(archivo, JSON.stringify(data));
};

const leerDb = () => {
  if (!fs.existsSync(archivo)) return null;

  const data = fs.readFileSync(archivo, { encoding: "utf-8" });
  const dataParse = JSON.parse(data);
  return dataParse;
};

module.exports = { guardarDb, leerDb };
