// src/controllers/notesController.js
import Note from "../models/Note.js";

// GET /api/notes
export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1}); // newest 1st
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

// GET /api/notes/:id
export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(note);
    } catch (error) {
        console.error("Error fetching note by id:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

// POST /api/notes
export async function createNote(req, res) {
    try {
        const { title, content } = req.body;

        const note = await Note.create({ title, content });

        res.status(201).json(note);
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

// PUT /api/notes/:id
export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

// DELETE /api/notes/:id
export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Server Error" });
    }
}
