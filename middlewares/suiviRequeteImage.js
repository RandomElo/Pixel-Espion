export const suiviAcces = () => {
    return (req, res, next) => {
        req.Visite.enregistrement(req, res, next);
        next();
    };
};
