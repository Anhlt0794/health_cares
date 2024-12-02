import Service from "../models/service"; // Adjust the import path if needed

// Create and Save a new Service
export const create = async (req, res) => {
    try {
        // Destructure data from request body
        const { id, class: serviceClass, treatment, price, description, icon, service_img } = req.body;

        // Validate required fields
        if (!id || !serviceClass || !treatment || !price) {
            return res.status(400).send({ message: "Service ID, class, treatment, and price are required!" });
        }

        // Check if a service with the same ID already exists
        const existingService = await Service.findOne({ id });
        if (existingService) {
            return res.status(400).send({ message: "Service with this ID already exists!" });
        }

        // Create a new service instance
        const service = new Service({
            id,
            class: serviceClass,
            treatment,
            price,
            description,
            icon,
            service_img
        });

        // Save the service to the database
        const savedService = await service.save();

        // Return the newly created service
        return res.status(201).send({
            message: "Service created successfully",
            service: savedService
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "An error occurred while creating the service." });
    }
};

// Retrieve all Services from the database
export const findAll = async (req, res) => {
    try {
        const services = await Service.find();
        return res.status(200).send(services);
    } catch (err) {
        return res.status(500).send({ message: "Error retrieving services." });
    }
};

// Find a single Service by ID
export const findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findOne({ id });
        if (!service) {
            return res.status(404).send({ message: `Service not found with ID ${id}` });
        }
        return res.status(200).send(service);
    } catch (err) {
        return res.status(500).send({ message: `Error retrieving service with ID ${id}` });
    }
};

// Update a Service by ID
export const update = async (req, res) => {
    const { id } = req.params;

    // Ensure data exists in request body
    if (!req.body) {
        return res.status(400).send({ message: "Data to update cannot be empty!" });
    }

    try {
        const updatedService = await Service.findOneAndUpdate({ id }, req.body, { new: true });
        if (!updatedService) {
            return res.status(404).send({ message: `Service with ID ${id} not found!` });
        }
        return res.status(200).send({
            message: "Service updated successfully",
            service: updatedService
        });
    } catch (err) {
        return res.status(500).send({ message: `Error updating service with ID ${id}` });
    }
};

// Delete a Service by ID
export const deleteOne = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findOneAndRemove({ id });
        if (!service) {
            return res.status(404).send({ message: `Service not found with ID ${id}` });
        }
        return res.status(200).send({ message: "Service deleted successfully!" });
    } catch (err) {
        return res.status(500).send({ message: `Error deleting service with ID ${id}` });
    }
};

// Delete all Services from the database
export const deleteAll = async (req, res) => {
    try {
        const result = await Service.deleteMany({});
        return res.status(200).send({ message: `${result.deletedCount} services deleted successfully!` });
    } catch (err) {
        return res.status(500).send({ message: "Error deleting all services." });
    }
};
