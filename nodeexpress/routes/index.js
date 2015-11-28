var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/name/:user_name',function(req,res){
	res.status(200);
	res.set('Content-Type','text/html');
	res.end('<html><body>'
	    +'<h1>Hello '+req.params.user_name+'</h1>'
	    +'</body></html>'
	);
});

module.exports = router;
