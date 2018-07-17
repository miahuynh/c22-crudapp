const User = require('../models/user');
const hash = SALT_FACTOR(10);

const userController = {
  login: (req, res) => {
    //req.body
    User.findOne({username: req.body.username}, (err, user, next) => {
      // err is server side problem. user is client side problem
      if (err || !user) return res.status(400).json({ error: 'Something is wrong : (!'});
      if (req.body.password === user.password) {
        //brcyrpt.compareSync(req.body.password, user.password);
        //always hash passwords
        res.locals.userid = user._id;
        return next();
      }
      return res.status(401).json({failure: "Doesn\'t work"});
    });
  },
  signup: (req, res, next) => {
    //const password = bcrypt.hashSync(req.body.password, 10(SALT));
    User.create({
      username: req.body.username,
      password: req.body.password,
    }, (err, user) => {
      if (err) { 
        return res.status(400).json({ failure: "can\'t create user : ("}) 
      };
        res.locals.userId = user._id;
        return next();
    });
    
  },

  startSession: () => {
    // add SID to database
    // wrap SID into cookie
    // redirect to '/'

    //ways to improve: wrapping session inside a jot

    const session = 'sessionsessionsession'
    // const session = bcrypt.UUID();
    // const session = someLibrary.sessionId();
    User.findByIdAndUpdate(req.locals.userId, 
      { sessionId: startSession}, 
        (err, user) => {
          if (err) return res.status(500).json({ message: 'bad bad bad session'});
          res.cookie('sid', session);
          res.redirect('/')
      }
    )
  },

  // can improve with certain logic, try to think how you can get around it
  verify: (req, res) => {
    if (!req.cookies.sid) return res.status(400).json({ message: 'no ~'})
    User.findOne({ sessionId: req.cookies.sid }, (err, user) => {
      if (err || !user) return res.status(400).json({message: 'not verified'});
    });
    return next();
  },
}

module.exports = userController;