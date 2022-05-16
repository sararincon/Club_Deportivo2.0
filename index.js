const express = require("express");
const app = express();
const fs = require("fs");
const url = require("url");

app.get("/", function (req, res) {
  res.setHeader("content-type", "text/html");
  fs.readFile("index.html", "utf-8", (err, data) => {
    res.end(data);
  });
});

app.get("/deportes", function (req, res) {
  res.setHeader("content-type", "application/json");
  fs.readFile("deportes.json", "utf-8", (err, data) => {
    res.end(data);
  });
});

app.post("/agregar", function (req, res) {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });
  req.on("end", () => {
    let deporte = JSON.parse(body);
    let deportes = JSON.parse(fs.readFileSync("deportes.json", "utf-8"));
    let masDeportes = deportes.deportes;
    masDeportes.push(deporte);
    fs.writeFileSync("deportes.json", JSON.stringify(deportes));
    res.end("Deporte agregado");
  });
});

app.put("/editar", function (req, res) {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });
  req.on("end", () => {
    let deporte = JSON.parse(body);
    let deportes = JSON.parse(fs.readFileSync("deportes.json", "utf-8"));
    let masDeportes = deportes.deportes;
    let index = masDeportes.findIndex((deporte) => {
      return deporte.nombre == deporte.nombre;
    });
    masDeportes[index] = deporte;
    fs.writeFileSync("deportes.json", JSON.stringify(deportes));
    res.end("Deporte editado");
  });
});

app.delete("/eliminar", function (req, res) {
  const { nombre } = url.parse(req.url, true).query;
  let deportes = JSON.parse(fs.readFileSync("deportes.json", "utf-8"));
  let masDeportes = deportes.deportes;
  let index = masDeportes.findIndex((deporte) => {
    return deporte.nombre == nombre;
  });
  masDeportes.splice(index, 1);
  fs.writeFileSync("deportes.json", JSON.stringify(deportes));
  res.end("Deporte eliminado");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
