var express = require('express');

const jwt = require('jsonwebtoken');

var router = express.Router();

var dbConn = require('../../config/db');

//ROUTES
//INSERT
router.post('/add',(req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
        res.status(200).json({
            success: false,
            msg: "Error, token not found",
        });
    }


    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decodedToken);

    var userLastname = req.body.userLastname;
    var userFirstname = req.body.userFirstname;
    var userAddress = req.body.userAddress;
    var userContact = req.body.userContact;
    
    sqlQuery = `INSERT INTO user_tb(user_address, user_Lastname, user_Firstname, user_contactnumber) VALUES("${userAddress}","${userLastname}","${userFirstname}","${userContact}")`; 

    dbConn.query(sqlQuery, function(error, results){
        if(error)throw error;
        res.status(200).json(results);
    });
        

});
//VIEW
router.get('/view', (req, res) => {
    sqlQuery = `SELECT * FROM user_tb`;
    
    dbConn.query(sqlQuery, function( error, results, fields ){ 
    if (error) throw error;
    res.status(200).json(results);
    });  
});
//UPDATE
router.patch('/update/:user_id',(req, res) => {
    console.log('API CONNECTION SUCCESS!');
    const user_id = req.params.user_id;
    dbConn.query(`SELECT user_id FROM user_tb WHERE user_id = ${user_id}`, function(error, results, fields){
        if(error) throw error;

        else if (!results.length) {
            console.log("Unknown ID")
            res.status(400).json("Unknown ID");
            return;
        }
        else{
            var userLastname = req.body.userLastname;
            var userFirstname = req.body.userFirstname;
            var userAddress = req.body.userAddress;
            var userContact = req.body.userContact;
            dbConn.query(`UPDATE user_tb SET user_Lastname = '${userLastname}', user_Firstname = '${userFirstname}', user_address = '${userAddress}', user_contactnumber = '${userContact}' WHERE user_id = ${user_id}`, function(error, results, fields){
                console.log("Entry Updated");
                if (error) return;
                res.status(200).json(results);
            });
        }

    });
});
//DELETE
router.delete('/delete/:user_id', (req,res)=> {
    console.log('API Running');
    const user_id = req.params.user_id;
    dbConn.query(`SELECT user_id from user_tb WHERE user_id = ${user_id}`, function(error, results, fields){
        if (error) throw error;
        
        else if (!results.length) {
            console.log("ID does not exist")
            res.status(300).json("ID does not exist");
            return;
        }
        else{
            dbConn.query(`DELETE from user_tb WHERE user_id = ${user_id}`, function(error,results, fields){
                console.log("Data DELETED");
                if (error) return;
                res.status(300).json(results);
            });
        }
    });
});

module.exports = router;