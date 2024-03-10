import jsonWebToken from "jsonwebtoken";

const jwt = jsonWebToken
const tokenSign = async (user) => {
    return jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        process.env.SECRETKEY,
        {
            expiresIn: '10h'
        }
    );
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.SECRETKEY);
    } catch (error) {
        return null;
    }
}

export {tokenSign, verifyToken}