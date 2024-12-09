export const errorHandler = (err, req, res, next) => {
    // Log the full error stack for debugging
    console.error(err.stack);

    // Default status code is 500 (Internal Server Error) unless set otherwise
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Send a response with the error message
    res.status(statusCode).json({
        message: err.message,
        // Optionally, include the stack trace in the response for development (remove in production)
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
};
