import express from 'express';
import {create, deleteAll, deleteOne, findAll, findOne, update} from "../controllers/doctor";

const router = express.Router();
// Create a new Doctor
router.post("/doctors", create);

// Retrieve all Doctors
router.get("/doctors", findAll);

// Retrieve a single Doctor by ID
router.get("/doctors/:id", findOne);

// Update a Doctor by ID
router.put("/doctors/:id", update);

// Delete a Doctor by ID
router.delete("/doctors/:id", deleteOne);

// Delete all Doctors
router.delete("/doctors", deleteAll);

export default router;