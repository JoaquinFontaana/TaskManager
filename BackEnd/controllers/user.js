import { User } from "../models/User.js";
import bcrypt from "bcrypt"
import { validateEmail, validatePassword } from "../helpers/dataValidation.js"
import JsonWebToken from "jsonwebtoken";
import { tokenSign } from "../helpers/generateToken.js";

const UserHandlers = {
    create: async (req, res) => {
        try {
            const { username, email, password} = req.body
            if (!email || !password) {
                return res.status(400).json({
                    ok: false,
                    message: "Faltan campos requeridos"
                })
            }
            if (!validateEmail(email)) {
                return res.status(400).json({
                    ok: false,
                    message: "Email no valido"
                })
            }
            if (!validatePassword(password)) {
                return res.status(400).json({
                    ok: false,
                    message: "Debe contener minimo 5 caracteres"
                })
            }
            //Buscar si ya existe el email
            const userByEmail = await User.findOne({ email })
            if (userByEmail) {
                return res.status(400).json(
                    {
                        ok: false,
                        message: "Email ya registrado"
                    }
                )
            }
            // Generar un salt (un valor aleatorio) para añadir complejidad al hash
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);

            // Hashear la contraseña con el salt
            const hashedPassword = await bcrypt.hash(password, salt);

            const userSaved = await User.create({ username: username, password: hashedPassword, email: email})
            const tokenSession = await tokenSign(userSaved)
            return res.status(202).json(
                {
                    ok: true,
                    message: "Usuario creado exitosamente",
                    tokenSession: tokenSession
                }
            )
        } catch (error) {
            return res.status(500).json(
                {
                    ok: false,
                    message: "Ha ocurrido un error"
                }
            )
        }
    },
    login: async (req, res) => {
        try {
            const { password, email } = req.body;
            console.log(password, email)
            if (!password || !email) {
                return res.status(400).json({
                    message: "Faltan campos requeridos",
                    ok: false
                });
            }
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(404).json({
                    message: "Usuario no encontrado",
                    ok: false
                });
            }
            const hashedPassword = user.password
            const checkPassword = await bcrypt.compare(password, hashedPassword)
                if (!checkPassword) {
                    return res.status(400).json({
                        message: "Contraseña incorrecta",
                        ok: false,
                    });
                }
            const tokenSession = await tokenSign(user) //TOKEN CON EL PAYLOAD(INFORMACION DEL USUARIO)
            return res.status(200).json({
                message: "Inicio de sesión exitoso",
                ok: true,
                tokenSession: tokenSession
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ha ocurrido un error",
                ok: false,
            });
        }
    },
    checkToken: async (req,res) =>{
        try {
            res.status(200).json(
                {
                    message:"Token valido",
                    ok:true
                }
            )
        } catch (error) {
            return res.status(500).json({
                message: "error en la autenticacion",
                ok: false,
            })
        }
    }
}
export default UserHandlers