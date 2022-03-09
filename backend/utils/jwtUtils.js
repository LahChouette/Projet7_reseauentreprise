/*Gestion de jwt*/

//import
let jwt = require('jsonwebtoken')

module.exports = {
  tokenSign : process.env.JWT_SECRET,
  generateToken: function (user) {
    return jwt.sign({
      userId: user.id,
    },
      this.tokenSign,
      {
        expiresIn: process.env.JWT_DURING
      })
  },
  getUserId: function (data) {
    if (data.length > 1) {
      let token = data.split(' ')[1];
      try {
        let decodedToken = jwt.verify(token, this.tokenSign)
        userId = decodedToken.userId
        return userId
      }
      catch (err) {
        return err
      }
    };
  }
}