var express = require('express');

const jwt = require('jsonwebtoken');

var router = express.Router();

var dbConn = require('../../config/db');

//ROUTES
//INSERT
router.post('/add',(req,res,next)=>{

    var companyName = req.body.companyName;
    var companyAddress = req.body.companyAddress;

    
    sqlQuery = `INSERT INTO company_tb(company_name, company_address) VALUES("${companyName}","${companyAddress}")`; 

    dbConn.query(sqlQuery, function(error, results){
        if(error)throw error;
        res.status(200).json(results);
    });
        

});
//VIEW
router.get('/view', (req, res) => {
    sqlQuery = `SELECT * FROM company_tb`;
    
    dbConn.query(sqlQuery, function( error, results, fields ){ 
    if (error) throw error;
    res.status(200).json(results);
    });  
});
//UPDATE
router.patch('/update/:company_id',(req, res) => {
    console.log('API CONNECTION SUCCESS!');
    const company_id = req.params.company_id;
    dbConn.query(`SELECT company_id FROM company_tb WHERE company_id = ${company_id}`, function(error, results, fields){
        if(error) throw error;

        else if (!results.length) {
            console.log("Unknown ID")
            res.status(400).json("Unknown ID");
            return;
        }
        else{
            var companyName = req.body.companyName;
            var companyAddress = req.body.companyAddress;
            dbConn.query(`UPDATE company_tb SET company_name = '${companyName}', company_address = '${companyAddress}' WHERE company_id = ${company_id}`, function(error, results, fields){
                console.log("Entry Updated");
                if (error) return;
                res.status(200).json(results);
            });
        }

    });
});
//DELETE
router.delete('/delete/:company_id', (req,res)=> {
    console.log('API Running');
    const company_id = req.params.company_id;
    dbConn.query(`SELECT company_id from company_tb WHERE company_id = ${company_id}`, function(error, results, fields){
        if (error) throw error;
        
        else if (!results.length) {
            console.log("ID does not exist")
            res.status(300).json("ID does not exist");
            return;
        }
        else{
            dbConn.query(`DELETE from company_tb WHERE company_id = ${company_id}`, function(error,results, fields){
                console.log("Data DELETED");
                if (error) return;
                res.status(300).json(results);
            });
        }
    });
});

module.exports = router;