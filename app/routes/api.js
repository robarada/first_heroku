var bodyParser = require('body-parser');
var User = require('../models/user');
var Article = require('../models/article');
var jwt = require('jsonwebtoken');
var config = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {

    var apiRouter = express.Router();

    // Authentication route (http://localhost:3000/api/authenticate)
    apiRouter.post('/authenticate', function(req, res) {

        // Find the user and match with the username/password explicitly
        User.findOne({
            username: req.body.username
        }).select('name username password').exec(function(err, user) {
            if (err) throw err;
            // If no user with that username was found
            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentification failed. User not found\
		'
                });
            } else if (user) {
                // Check if password is valid
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.json({
                        success: false,
                        message: 'Authentification failed. Wrong Password.\
			'
                    });
                } else {
                    // Create a token if credentials are correct
                    var token = jwt.sign({
                        name: user.name,
                        username: user.username
                    }, superSecret, {
                        expiresInMinutes: 1440
                    });
                    // Return information with token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
        });
    });

    // Check Route for token
    apiRouter.use(function(req, res, next) {
        // Check header or url parameters or post parameters for token
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        // Decode Token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, superSecret, function(err, decoded) {
                if (err) {
                    return res.status(403).send({
                        success: false,
                        message: 'Failed to authen\
				ticate token.'
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            // if there is no token return HTTP response return 403 + error message
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });


    apiRouter.get('/', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    // Obtains user's information
    apiRouter.get('/me', function(req, res) {
        res.send(req.decoded);
    });
	
	
	  apiRouter.route('/articles')
        // Create an article (POST at http://localhost:3000/api/articles)
        .post(function(req, res) {
            // Create using Article model as a template
            var article = new Article();
            // Set user information 
            article.name = req.body.name;
            article.username = req.body.username;
            article.content = req.body.content;
			article.title = req.body.title;
			

            // Save user/check for errors
            article.save(function(err) {
                if (err) {
                    // duplicate entry check
                    if (err.code == 11000)
                        return res.json({
                            success: false,
                            message: 'An article with that\
				content already exists. '
                        });
                    else
                        return res.send(err);
                }
                res.json({
                    message: 'Article Created!'
                });
            });
        })
        // get all the users (accessed at GET http://localhost:3000/api/articles)
        .get(function(req, res) {
            Article.find(function(err, articles) {
                if (err) res.send(err);
                // return the users
                res.json(articles);
            });
        });

    // GET/PUT/DEL Request http://localhost:3000/api/articles/:article_id
    apiRouter.route('/articles/:article_id')
        .get(function(req, res) {
            Article.findById(req.params.article_id, function(err, article) {
                if (err) res.send(err);
                // return that user
                res.json(article);
            });
        })
        //PUT Request
        .put(function(req, res) {
            // Update information if new
            Article.findById(req.params.article_id, function(err, article) {
                if (err) res.send(err);
                if (req.body.name) article.name = req.body.name;
                if (req.body.username) article.username = req.body.username;
                if (req.body.title) article.title = req.body.title;
				if (req.body.content) article.content = req.body.content;
				if (req.body.createdAt) article.createdAt = req.body.createdAt;
				
                // Save Article information
                article.save(function(err) {
                    if (err) res.send(err);
                    // Return a response
                    res.json({
                        message: 'Article updated!'
                    });
                });
            });
        })
        // Delete Request
        .delete(function(req, res) {
            Article.remove({
                _id: req.params.article_id
            }, function(err, article) {
                if (err) return res.send(err);
                // Return a response
                res.json({
                    message: 'Successfully deleted'
                });
            });
        });
	
	
    apiRouter.route('/users')
        // Create a user (POST at http://localhost:3000/api/users)
        .post(function(req, res) {
            // Create using User model as a template
            var user = new User();
            // Set user information 
            user.name = req.body.name;
            user.username = req.body.username;
            user.password = req.body.password;

            // Save user/check for errors
            user.save(function(err) {
                if (err) {
                    // duplicate entry check
                    if (err.code == 11000)
                        return res.json({
                            success: false,
                            message: 'A user with that\
				username already exists. '
                        });
                    else
                        return res.send(err);
                }
                res.json({
                    message: 'User Created!'
                });
            });
        })
        // get all the users (accessed at GET http://localhost:3000/api/users)
        .get(function(req, res) {
            User.find(function(err, users) {
                if (err) res.send(err);
                // return the users
                res.json(users);
            });
        });

    // GET/PUT/DEL Request http://localhost:3000/api/users/:user_id
    apiRouter.route('/users/:user_id')
        .get(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {
                if (err) res.send(err);
                // return that user
                res.json(user);
            });
        })
        //PUT Request
        .put(function(req, res) {
            // Update information if new
            User.findById(req.params.user_id, function(err, user) {
                if (err) res.send(err);
                if (req.body.name) user.name = req.body.name;
                if (req.body.username) user.username = req.body.username;
                if (req.body.password) user.password = req.body.password;
                // Save user information
                user.save(function(err) {
                    if (err) res.send(err);
                    // Return a response
                    res.json({
                        message: 'User updated!'
                    });
                });
            });
        })
        // Delete Request
        .delete(function(req, res) {
            User.remove({
                _id: req.params.user_id
            }, function(err, user) {
                if (err) return res.send(err);
                // Return a response
                res.json({
                    message: 'Successfully deleted'
                });
            });
        });

    return apiRouter
};