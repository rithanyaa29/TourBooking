import express from "express";
import cors from "cors";
import { packages } from "./src/data.js";

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());


// =====================================
// GET ALL TRAVEL PACKAGES
// =====================================
app.get("/packages", (req, res) => {
  res.json(packages);
});


// =====================================
// GET INDIVIDUAL PACKAGE BY ID
// =====================================
app.get("/packages/:id", (req, res) => {
  const id = Number(req.params.id);

  const packageData = packages.find(
    (pkg) => pkg.id === id
  );

  if (!packageData) {
    return res.status(404).json({
      message: "Package not found."
    });
  }

  res.json(packageData);
});


// =====================================
// GET PACKAGE AVAILABILITY
// =====================================
app.get("/availability/:packageId", (req, res) => {
  const packageId = Number(req.params.packageId);

  const packageData = packages.find(
    (pkg) => pkg.id === packageId
  );

  if (!packageData) {
    return res.status(404).json({
      message: "Package not found."
    });
  }

  res.json({
    packageId: packageData.id,
    packageTitle: packageData.title,
    destination: packageData.destination,
    available: true,
    availableSeats: 20,
    message: "Package is available."
  });
});


// =====================================
// START SERVER
// =====================================
app.listen(PORT, () => {
  console.log(
    `REST API running on http://localhost:${PORT}`
  );
});