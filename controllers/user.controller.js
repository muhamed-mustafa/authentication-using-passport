const User     = require('../models/user.model'),
      passport = require('passport');

  
exports.getHome = (req , res) =>
{
    res.render("home");
}

exports.getLogin = (req , res) =>
{
    res.render('login')
}

exports.getSignup = (req , res) =>
{
    res.render('register')
}

exports.getSecrets = (req , res) =>
{
   User.find({"secret" : {$ne : null}} , (err , foundSecrets) =>
   {
       if(err) console.log(err);
       else 
       {
           if(foundSecrets)
           {
            res.render('secrets' , {usersWithSecrets : foundSecrets});
           }
       }
   })
}

exports.submit = (req , res) =>
{
    if(req.isAuthenticated())
    {
        res.render('submit');
    }

    else
    {
        res.redirect('/login');
    }
}
  
exports.postSubmit = (req , res) =>
{
    User.findById(req.user._id , (err , foundUser) =>
    {
        if(err) console.log(err);
        else 
        {
            if(foundUser)
            {
                foundUser.secret = req.body.secret;
                foundUser.save(() => res.redirect('/secrets'));
            }
        }
    })
}


exports.signup = (req , res) =>
{
        User.register({username : req.body.username} , req.body.password , (err , user) =>
        {
            if(err)
            {
                console.log(err);
                res.redirect('/register');
            }

            else
            {
                passport.authenticate("local")(req , res , () =>{
                    res.redirect('/secrets');
                })
            }
        });
}


exports.login = (req , res) =>
{
    passport.authenticate("local" , {
        successRedirect : '/secrets',
        failureRedirect : '/login',
        failureFlash   : true
    })(req , res)
}

exports.logout = (req , res) =>
{
    req.logout();
    res.redirect('/home');
}


