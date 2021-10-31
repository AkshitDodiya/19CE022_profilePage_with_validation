const express=require('express');
const bodyParser = require('body-parser');
const { body, validationResult, check } = require('express-validator');
const expressSession = require('express-session');
const app=express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(expressSession({secret : 'max', saveUninitialized: false, resave : false}));

app.get('/', function (req, res) {
    res.sendFile('index.html', {root  : __dirname});
    // res.send("akshit");
});

app.post('/submit',
        [check('email','not a valid .....').isEmail(),
        check('fname', 'First Name is required').not().isEmpty(),
        check('lname', 'Last Name is required').not().isEmpty(),
        check('dob').isDate(),
        body('mobile').isMobilePhone(),
        check('gender', 'Gender not selected').not().isEmpty(),
        check('address', 'Address not avaible').not().isEmpty()
        
        ],(req,res)=>{
            const errors=validationResult(req);
            console.log(req.body);
            if(!errors.isEmpty()){
                console.log(errors.mapped());
                console.log("errors")
                return res.status(400).json({ errors: errors.array() });
            }
            else{
                res.send("<h1> Success </h1>");
            }
        }

)

app.listen(3030, console.log("Server started at port 3030 ... "));