const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.isAdmin ? 'admin' : 'user')) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};

module.exports = authorizeRoles;
