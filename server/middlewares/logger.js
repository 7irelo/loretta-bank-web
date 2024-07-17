const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const headers = JSON.stringify(req.headers);
    const ip = req.ip || req.connection.remoteAddress;
    const time = new Date().toISOString();
    
    console.log(`[${time}] ${method} ${url} - IP: ${ip} - Headers: ${headers}`);
    
    next();
};

module.exports = logger;
