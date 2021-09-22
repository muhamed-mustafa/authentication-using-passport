const express    = require('express'),
      User       = require('./models/user.model'),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      session    = require('express-session'),
      passport   = require('passport'),
      flash      = require('express-flash'),
      GoogleStrategy = require('passport-google-oauth20').Strategy;
      
require('dotenv/config');

const app = express();

mongoose.connect(`${process.env.URI}` , { useNewUrlParser: true})
.then(() => console.log("Database Connection is ready..."))
.catch((e) => console.log("Error is : " + e));

app.use(express.static("public"));
app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({ extended : true }));
app.use(flash());

app.use(session({
      secret : process.env.SECRET ,
      resave : false ,
      saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy(
    {
      clientID     : process.env.ClientID,
      clientSecret : process.env.ClientSecret,
      callbackURL  : "http://localhost:3000/auth/google/secrets",
    },

    function(accessToken, refreshToken, profile, cb)
    {
      User.findOrCreate({ googleId : profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
));
  
passport.use(User.createStrategy());

passport.serializeUser((user , done) =>
{
    done(null , user._id);
});


passport.deserializeUser((_id , done) =>
{
    User.findById(_id , (err , user) =>
    {
        done(null , user);
    })
});

app.get('/auth/google' , passport.authenticate('google' , {scope : ['profile']}));

app.get('/auth/google/secrets' , passport.authenticate('google' , {failureRedirect : "/login"}) , (req , res) => res.redirect('/secrets'));

const userRouter = require('./routers/user.route');

app.use('/' , userRouter);

const PORT = process.env.PORT;
app.listen(PORT , () => console.log("server is running http://localhost:3000"));