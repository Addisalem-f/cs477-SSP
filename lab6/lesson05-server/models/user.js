// const users = []
 class User {

    constructor(username, password, role) {
        this.username = username,
            this.password = password,
            this.role = role
    }

    login() {
        return users.find(u => u.username === this.username && u.password === this.password)
    }
    // users = [new User('john', 'admin', 'admin'), new User('edwan', 'edwan567', 'user')]
    // static init() {
    //     users.push(new User('john', 'admin', 'admin'));
    //     users.push(new User('bella', 'member', 'member'));
    //     }
        

}
const users = [new User('john', 'admin', 'admin'), new User('edwan', 'edwan567', 'user')]
// users.push('john', 'admin', 'admin')
// users.push('edwan', 'edwan567', 'user')

module.exports = User;
// module.exports=users