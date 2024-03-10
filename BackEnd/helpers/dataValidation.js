function validateEmail (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email);
}
function validatePassword (password) {
    if(password.length < 5){
        return false
    }
    return true
}
export {validateEmail, validatePassword}