/* eslint-disable max-len */

const serverError = (response) => response.status(500).json({
  status: 'error',
  error: ' Something went wrong. Try again later',
});

export {
    serverError,
};
