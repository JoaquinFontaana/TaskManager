import Express  from "express"
const router = Express.Router()
import checkAuth from "../middelwares/checkAuth.js"
import UserHandlers from "../controllers/user.js"

router.post("/register",UserHandlers.create)
router.post("/login", UserHandlers.login)
router.get("/checkToken",checkAuth,UserHandlers.checkToken)

export default router