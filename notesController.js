// controllers/notesController.js
import Note from '../models/Note.js';

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ success: false, message: 'Note not found' });
    res.status(200).json({ success: true, note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content, mood } = req.body;
    const newNote = new Note({ title, content, mood });
    const savedNote = await newNote.save();
    res.status(201).json({ success: true, note: savedNote });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNote) return res.status(404).json({ success: false, message: 'Note not found' });
    res.status(200).json({ success: true, note: updatedNote });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ success: false, message: 'Note not found' });
    res.status(200).json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle favorite
export const toggleFavorite = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ success: false, message: 'Note not found' });

    note.favorite = !note.favorite;
    await note.save();

    res.status(200).json({ success: true, note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
