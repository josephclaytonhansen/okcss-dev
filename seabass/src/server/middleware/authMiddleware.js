const getUserPermissions = async (User, id) => {
    const user = await User.findById(id)
    return user.permissions
}

const authMiddleware = (req, User) => {
    console.log(req.session)
    if (req.session.passport) {
        if (req.session.permissions) {
            if (req.session.permissions !== "worm") {
                return true
            }
        } else {
            getUserPermissions(User, req.session.passport.user).then((permissions) => {
                req.session.permissions = permissions
                if (req.session.permissions !== "worm") {
                    return true
                }
            })
        }
    } else {
        return false
    }

}

export default authMiddleware