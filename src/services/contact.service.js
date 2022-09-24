const knex = require('../database/knex');

class ContactService {
    constructor() {
    this.contacts = knex('contacts');
}

//lab2 step 3
    #getContact(payload) {
        const contact = { ...payload };
        const contactProperties = [
            "name", "email", "address", "phone", "favorite"
    ];
    // Remove non-contact properties
    Object.keys(contact).forEach(function(key) {
        if (contactProperties.indexOf(key) == -1) {
            delete contact[key];
        }
    });
    return contact;
    }
    async create(payload) {
        const contact = this.#getContact(payload);
        const [id] = await this.contacts.insert(contact);
        return { id, ...contact };
    }

//Implement findAll handler
async all() {
    return await this.contacts.select('*');
    }
    async findByName(name) {
    return await this.contacts
    .where('name', 'like', `%${name}%`)
    .select('*');
    }


//Implement findOne handler
async findById(id) {
    return await this.contacts.where('id', id).select('*').first();
    }

//Implement update handler
async update(id, payload) {
    const update = this.#getContact(payload);
    return await this.contacts.where('id', id).update(update);
    }

//Implement delete handler
async delete(id) {
    return await this.contacts.where('id', id).del();
    }

//Implement findAllFavorite handler
async allFavorite() {
    return await this.contacts.where('favorite', 1).select('*');
    }

//Implement deleteAll handler
async deleteAll() {
    return await this.contacts.del();
    }

}

// Define methods for accessing the database

module.exports = ContactService;
