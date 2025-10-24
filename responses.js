// Standardized response utilities
export const createSuccessResponse = (message, data = null, statusCode = 200) => {
  const response = {
    success: true,
    message,
    timestamp: new Date().toISOString()
  };
  
  if (data) {
    response.data = data;
  }
  
  return {
    statusCode,
    response
  };
};

export const createErrorResponse = (message, statusCode = 500, details = null) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };
  
  if (details) {
    response.details = details;
  }
  
  return {
    statusCode,
    response
  };
};

export const sendResponse = (res, { statusCode, response }) => {
  res.status(statusCode).json(response);
};
