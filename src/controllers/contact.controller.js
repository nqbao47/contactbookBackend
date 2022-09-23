//lab1
exports.create = (req, res) => {
    return res.send({ message: 'create handler' });
};

exports.findAll = (req, res) => {
    return res.send({ message: 'findAll handler' });
};

exports.findOne = (req, res) => {
    return res.send({ message: 'findOne handler' });
};

exports.update = (req, res) => {
    return res.send({ message: 'update handler' });
};

exports.delete = (req, res) => {
    return res.send({ message: 'delete handler' });
};

exports.deleteAll = (req, res) => {
    return res.send({ message: 'deleteAll handler' });
};

exports.findAllFavorite = (req, res) => {
    return res.send({ message: 'findAllFavorite handler' });
};

//lab2 step3
const ContactService = require('../services/contact.service');
const ApiError = require('../api-error');



//create and savee a new Contact
exports.create = async (req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, 'Name can not be empty'));
    }
    try {
        const contactService = new ContactService();
        const contact = await contactService.create(req.body);
        return res.send(contact);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while creating the contact')
        );
    }
};

//lab2 step 3 (tt)
//Retrivel all contacts of a user fporm the database
//Implement findAll handler
exports.findAll = async (req, res, next) => {
    let contacts = [];

    try {
        const contactService = new ContactService();
        const { name } = req.query;
        if (name) {
            contacts = await ContactService.findByName(name);
        } else {
            contacts = await ContactService.all();
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving contacts')
        );
    }
    return res.send(contacts);
};

//Implement findOne handler
// Find a single contact with an id
exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService();
        const contact = await ContactService.findById(req.params.id);
        if (!contact) {
            return next(new ApiError(404, 'Contact not found'));
        }
        return res.send(contact);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500, `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
};


//Implement update handler
// uPDATE a single contact by the id in the request
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }
    try {
        const contactService = new ContactService();
        const update = await contactService.update(req.params.id, req.body);
        if(!update) {
            return next(new ApiError(404, 'Contact not found'));
        }
        return res.send({ message: 'Contact was update succesfully' });
    } catch (error) {   
        console.log(error);
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

//Implement delete handler

//Implement findAllFavorite handler

//Implement deleteAll handler