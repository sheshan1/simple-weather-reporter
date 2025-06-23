/**
 * Retry async function with exponential backoff
 * @param {Function} fn 
 * @param {number} retries 
 * @param {number} delay 
 * @returns {Promise}
 */
export const retryWithBackoff = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryWithBackoff(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};
