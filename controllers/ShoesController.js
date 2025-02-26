import Shoes from '../models/ShoesModel.js';
import 'dotenv/config';

export const getAllShoes = async (req, res) => {
    try {
        const shoes = await Shoes.findAll();
        res.json(shoes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getShoesById = async (req, res) => {
    const id = req.params.id;
    try {
        const shoes = await Shoes.findByPk(id);
        res.json(shoes || { message: "Shoes not found" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const addShoes = async (req, res) => {
    const { name, price, image, stock } = req.body;
    try {
        const newShoes = await Shoes.create({ name, price, image, stock});
        res.status(201).json(newShoes);
    } catch (error) {
        console.error('Error inserting shoes:', error);
        res.status(400).send(error.message);
    }
};

export const updateShoes = async (req, res) => {
    const id = req.params.id;
    const { name, price, image, stock } = req.body;
    try {
        const result = await Shoes.update(
            { name, price, image, stock },
            { where: { id } }
        );
        res.json(result[0] ? "Shoes updated" : "Shoes not found");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const deleteShoes = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Shoes.destroy({ where: { id } });
        res.json(result ? "Shoes deleted" : "Shoes not found");
    } catch (error) {
        res.status(500).send(error.message);
    }
};
