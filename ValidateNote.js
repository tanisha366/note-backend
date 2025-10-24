// Validation middleware for note operations
export const validateNote = (req, res, next) => {
  const { title, content } = req.body;
  
  const errors = [];
  
  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  } else if (title.length > 200) {
    errors.push('Title cannot exceed 200 characters');
  }
  
  if (!content || content.trim().length === 0) {
    errors.push('Content is required');
  } else if (content.length > 10000) {
    errors.push('Content cannot exceed 10000 characters');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  next();
};

export const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid note ID format'
    });
  }
  
  next();
};
