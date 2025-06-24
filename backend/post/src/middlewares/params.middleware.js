
function requireBodyParams(...requiredParams) {
    return (req, res, next) => {
        const missing = requiredParams.filter(param => !(param in req.body));

        if (missing.length > 0) {
            return res.status(400).json({
                error: 'Missing required fields',
                missing
            });
        }
        next();
    };
};

module.exports = { requireBodyParams };