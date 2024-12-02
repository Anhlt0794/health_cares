import express from "express";
import * as serviceController from "../controllers/service";  // Adjust path as needed

const router = express.Router();

// Create a new Service
router.post("/services", serviceController.create);

// Retrieve all Services
router.get("/services", serviceController.findAll);

// Retrieve a single Service by ID
router.get("/services/:id", serviceController.findOne);

// Update a Service by ID
router.put("/services/:id", serviceController.update);

// Delete a Service by ID
router.delete("/services/:id", serviceController.deleteOne);

// Delete all Services
router.delete("/services", serviceController.deleteAll);

export default router;
