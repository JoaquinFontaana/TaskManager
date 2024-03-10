const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
const url = 'http://localhost:3100/api/user/login'


const handleLoginServices = async (e, email, password, login) => {
    e.preventDefault()
    if (!email || !password) {
        const userError = "Email y contraseña son obligatorios"
        console.error(userError)
        return { userError: userError }
    }
    if (!validEmail.test(email)) {
        const userError = 'Ingresa un email valido'
        console.error(userError)
        return { userError: userError}
    }
    const userError = null
    const response = await login(url, email, password);
    if (response.ok === false) {
        return { userError: userError, response: response }
    }
    return {userError:userError, response:response}
}

export { handleLoginServices }