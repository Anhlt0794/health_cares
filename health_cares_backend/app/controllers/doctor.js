import Doctor from "../models/doctor";

// Create and Save a new Doctor
export const create = async (req, res) => {
    try {
        // Get data from the request body
        const { doc_id, name, specialize, hospital_address, exp, doc_img } = req.body;

        // Validate the required fields
        if (!doc_id || !name) {
            return res.status(400).send({ message: "Doctor ID and name are required!" });
        }

        // Check if a doctor with the same doc_id already exists
        const existingDoctor = await Doctor.findOne({ doc_id });
        if (existingDoctor) {
            return res.status(400).send({ message: "Doctor with this ID already exists!" });
        }

        // Create a new doctor instance
        const doctor = new Doctor({
            doc_id,
            name,
            specialize,
            hospital_address,
            exp,
            doc_img
        });

        // Save the doctor to the database
        const savedDoctor = await doctor.save();

        // Return the created doctor (exclude password or sensitive fields if applicable)
        return res.status(201).send({ message: "Doctor created successfully", doctor: savedDoctor });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "An error occurred while creating the doctor." });
    }
};

// Retrieve all Doctors from the database
export const findAll = async (req, res) => {
    try {
        const title = req.query.title;
        let condition = title ? { name: { $regex: new RegExp(title), $options: "i" } } : {};

        const doctors = await Doctor.find(condition);
        return res.status(200).send(doctors);
    } catch (err) {
        return res.status(500).send({ message: "Error retrieving doctors." });
    }
};

// Find a single Doctor by ID
export const findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).send({ message: `Doctor not found with id ${id}` });
        }
        return res.status(200).send(doctor);
    } catch (err) {
        return res.status(500).send({ message: `Error retrieving doctor with id ${id}` });
    }
};

// Update a Doctor by ID
export const update = async (req, res) => {
    const id = req.params.id;

    // Ensure that there's data in the request body
    if (!req.body) {
        return res.status(400).send({ message: "Data to update cannot be empty!" });
    }

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true, useFindAndModify: false });
        if (!updatedDoctor) {
            return res.status(404).send({ message: `Doctor with id ${id} not found!` });
        }
        return res.status(200).send({ message: "Doctor updated successfully", doctor: updatedDoctor });
    } catch (err) {
        return res.status(500).send({ message: `Error updating doctor with id ${id}` });
    }
};

// Delete a Doctor by ID
export const deleteOne = async (req, res) => {
    const id = req.params.id;
    try {
        const doctor = await Doctor.findByIdAndRemove(id, { useFindAndModify: false });
        if (!doctor) {
            return res.status(404).send({ message: `Doctor not found with id ${id}` });
        }
        return res.status(200).send({ message: "Doctor deleted successfully!" });
    } catch (err) {
        return res.status(500).send({ message: `Error deleting doctor with id ${id}` });
    }
};

// Delete all Doctors
export const deleteAll = async (req, res) => {
    try {
        const result = await Doctor.deleteMany({});
        return res.status(200).send({ message: `${result.deletedCount} doctors were deleted successfully!` });
    } catch (err) {
        return res.status(500).send({ message: "Error deleting all doctors." });
    }
};
