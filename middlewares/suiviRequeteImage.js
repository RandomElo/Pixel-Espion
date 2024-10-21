export const suiviAcces = () => {
    return (req, res, next) => {
        const referer = req.headers.referer || req.headers.referrer;
        console.log("Referer:", referer);
        const userAgent = req.headers["user-agent"];
        console.log("User Agent:", userAgent);

        req.Visite.enregistrement(req, res, next);
        next();
    };
};
