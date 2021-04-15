const { response } = require('express');
const Apartament = require('../models/Apartament');
const User = require('../models/User');

async function getOne(id) {
    id = id.id;
    let apart = {}
    let house = await Apartament.findById(id).lean();
    return house;
}

async function getAll() {
    let apartaments = await Apartament.find({}).lean();
    return apartaments;
};

async function getFromSearch(name, rooms, city, priceFrom, priceTo) {
    name = name.name;
    rooms = rooms.rooms;
    city = city.city;
    priceFrom = priceFrom.priceFrom;
    priceTo = priceTo.priceTo;
    let apartaments = await Apartament.find({}).lean();
    if (name) {
        apartaments = apartaments.filter(x => x.name.toLowerCase().includes(name.toLowerCase()));
    };
    if (priceFrom) {
        apartaments = apartaments.filter(x => Number(x.price) >= Number(priceFrom));
    }
    if (priceTo) {
        apartaments = apartaments.filter(x => Number(x.price) <= Number(priceTo));
    }
    if (rooms) {
        apartaments = apartaments.filter(x => Number(x.rooms) == Number(rooms));
    };
    if (city) {
        apartaments = apartaments.filter(x => x.city.toLowerCase().includes(city.toLowerCase()));
    };

    return apartaments;
};

async function sellApartament(name, rooms, city, price, imageURL, description, owner) {
    name = name.name;
    rooms = rooms.rooms;
    city = city.city;
    price = price.price;
    imageURL = imageURL.imageURL;
    description = description.description;
    owner = owner.owner;
    let apartament = new Apartament({ name, rooms, city, price, imageURL, description, owner });
    return apartament.save();
};

async function getByUserId(id) {
    let apartament = await Apartament.find({ owner: id }).lean();
    return apartament;
};

async function likeOne(userId, apartamentId) {
    let user = await User.findById(userId);
    let apartament = await Apartament.findById(apartamentId);
    user.liked.push(apartament);
    return user.save();
}
async function getApartamentByUserId(userId) {
    let result = await User.findById(userId).populate('liked').lean();
    return result.liked;
}
async function unLikeOne(userId, apartamentId) {
    await User.updateOne({ _id: userId }, { $pull: { 'liked': apartamentId } })
    let updatedUser = await User.findById(userId).lean();
    return updatedUser;
}
async function deleting(id) {
    await Apartament.deleteOne({ _id: id });
    return;
}
async function editOn(id) {
    let houseId = id[0]
    let edited = Apartament.findById(houseId).lean();
    return edited;
}
async function editOne(name, rooms, city, price, imageURL, description, houseId) {
    name = name.name;
    rooms = rooms.rooms;
    city = city.city;
    price = price.price;
    imageURL = imageURL.imageURL;
    description = description.description;
    houseId = houseId.houseId;
    let updated = await Apartament.updateOne({ _id: houseId }, { name, rooms, city, price, imageURL, description });
    return updated
}
module.exports = {
    getAll,
    getOne,
    sellApartament,
    getFromSearch,
    getByUserId,
    likeOne,
    getApartamentByUserId,
    unLikeOne,
    deleting,
    editOn,
    editOne
};