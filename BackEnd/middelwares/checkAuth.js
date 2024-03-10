import { verifyToken } from "../helpers/generateToken.js";

const checkAuth = async (req, res, next) => {
    try{ 
    const token = req.headers.authorization.split(' ').pop()
    const tokenData = await verifyToken(token)
    req.user = tokenData
    if (tokenData && tokenData._id !== null) {
        next()
    }
    else {
        return (
            res.status(401).json(
                {
                    message: "Falla en la autenticación",
                    ok: false
                }
            )
        )
    }
}
catch(error){
    res.status(500).json(
        {
            message:"Ha ocurrido un error",
            ok:false
        }
    )
}
}

export default checkAuth