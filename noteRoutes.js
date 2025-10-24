import express from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  toggleFavorite
} from '../controllers/notesController.js';

const router = express.Router();

// Note routes with advanced filtering
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.patch('/:id/favorite', toggleFavorite);

export default router;
