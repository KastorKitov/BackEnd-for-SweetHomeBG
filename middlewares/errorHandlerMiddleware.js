//хваща се от next на action-ите.
const errorHandler = (err,req,res,next)=>{
    err.message = err.message || 'Something went wrong';
    err.status = err.status || '500';
    //page
    if (err.message.includes('Wrong username or password')){
        res.render('login', {error:err});
    };
    if (err.message.includes('match')){
        res.render('register', {error:err});
    };
    if (err.message.includes('User validation failed: password:')){
        err.message = 'Password must contain atleast 5 characters!'
        res.render('register', {error:err});
    };
    if (err.message.includes('User validation failed: username:')){
        err.message = 'Username must contain atleast 5 characters!'
        res.render('register', {error:err});
    }

    else res.status(err.status).render('home', { error: err });
};

module.exports = errorHandler;