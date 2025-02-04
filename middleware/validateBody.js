const validateBody = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body cannot be empty' });
    }
    next();
  };
  
  module.exports = validateBody;