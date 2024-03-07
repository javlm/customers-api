const jwt = require('jsonwebtoken');

const middleware = (request, response) => {
    const token = request.header('Authorization');

    if (!token) return response.status(401).json({ msg: 'Unauthoraized.' })

    try {
        const tokenDecoded = jwt.verify(token, process.env.SECRET_KEY);
        request.userId = tokenDecoded.id;
        next();
    } catch (error) {
        console.error(error);
        response.status(401).json({ msg: 'Invalid token' })
    }
}

module.exports = middleware;