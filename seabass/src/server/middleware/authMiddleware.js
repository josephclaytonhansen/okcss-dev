const authMiddleware = async (req, User) => {
let sessionuser = req.session.passport['user']
if (!req.session.permissions){
        const user = await User.findById(sessionuser)
        req.session.permissions = user.permissions
        return user.permissions === 'worm'
} else {
        return req.session.permissions === 'worm'
}}
export default authMiddleware