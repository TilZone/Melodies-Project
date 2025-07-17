export const successResponse = (res, statusCode, data, message = 'Success') => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res, statusCode, message = 'An error occurred') => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};
