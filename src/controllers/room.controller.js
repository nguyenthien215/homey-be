// src/controllers/room.controller.js
import RoomService from "../services/room.service.js";

const roomService = new RoomService();

export const getAllRooms = async (req, res) => {
    try {
        const result = await roomService.getAllRooms(req);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ message: "Error fetching rooms: " + error.message });
    }
};

export const getRoomsByCategory = async (req, res) => {
    try {
        const result = await roomService.getRoomsByCategory(req.params.categoryId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRoomById = async (req, res) => {
    try {
        const result = await roomService.getRoomById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRoomDetailById = async (req, res) => {
    try {
        const result = await roomService.getRoomDetailById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
