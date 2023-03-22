/**
 * Function that creates error objects
 * @function
 * @group error
 * @param {Object} status - HTTP status
 * @param {String} message - message to describe the error
 * @returns 
 */
export const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};
