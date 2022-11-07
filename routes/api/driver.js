var express = require('express');

const jwt = require('jsonwebtoken');

var router = express.Router();

var dbConn = require('../../config/db');

//ROUTES
//INSERT
router.post('/add',(req,res,next)=>{
    
    var licenseNumber = req.body.licenseNumber;
    var driverLastname = req.body.driverLastname;
    var driverFirstname = req.body.driverFirstname;
    var driverContact = req.body.driverContact;
    
    sqlQuery = `INSERT INTO driver_tb(license_number, driver_contactnumber, driver_Firstname, driver_Lastname) VALUES(${licenseNumber},"${driverContact}","${driverFirstname}","${driverLastname}")`; 

    dbConn.query(sqlQuery, function(error, results){
        if(error)throw error;
        res.status(200).json(results);
    });
        

});
//VIEW
router.get('/view', (req, res) => {
    sqlQuery = `SELECT * FROM driver_tb`;
    
    dbConn.query(sqlQuery, function( error, results, fields ){ 
    if (error) throw error;
    res.status(200).json(results);
    });  
});
//UPDATE
router.patch('/update/:license_number',(req, res) => {
    console.log('API CONNECTION SUCCESS!');
    const license_number = req.params.license_number;
    dbConn.query(`SELECT license_number FROM driver_tb WHERE license_number = ${license_number}`, function(error, results, fields){
        if(error) throw error;

        else if (!results.length) {
            console.log("Unknown ID")
            res.status(400).json("Unknown ID");
            return;
        }
        else{
            var driverLastname = req.body.driverLastname;
            var driverFirstname = req.body.driverFirstname;
            var driverContact = req.body.driverContact;
            dbConn.query(`UPDATE driver_tb SET driver_Lastname = '${driverLastname}', driver_Firstname = '${driverFirstname}', driver_contactnumber = '${driverContact}' WHERE license_number = ${license_number}`, function(error, results, fields){
                console.log("Entry Updated");
                if (error) return;
                res.status(200).json(results);
            });
        }

    });
});
//DELETE
router.delete('/delete/:license_number', (req,res)=> {
    console.log('API Running');
    const license_number = req.params.license_number;
    dbConn.query(`SELECT license_number from driver_tb WHERE license_number = ${license_number}`, function(error, results, fields){
        if (error) throw error;
        
        else if (!results.length) {
            console.log("ID does not exist")
            res.status(300).json("ID does not exist");
            return;
        }
        else{
            dbConn.query(`DELETE from driver_tb WHERE license_number = ${license_number}`, function(error,results, fields){
                console.log("Data DELETED");
                if (error) return;
                res.status(300).json(results);
            });
        }
    });
});

module.exports = router;