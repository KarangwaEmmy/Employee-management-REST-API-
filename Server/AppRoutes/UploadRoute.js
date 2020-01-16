import { Router } from 'express';
import multer from 'multer';
import xlstojson from "xls-to-json-lc";
import xlsxtojson from "xlsx-to-json-lc";
import EmpModel from '../model/DBModel';

const router = Router();

const storage = multer.diskStorage({
     //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, 'Server/uploads/')
    },
    filename: function (req, file, cb) {
        const datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});
const upload = multer({ 
    //multer settings
                storage: storage,
                fileFilter : function(req, file, callback) { //file filter
                    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                        return callback(new Error('Wrong extension type'));
                    }
                    callback(null, true);
                }
            }).single('file');
/** API path that will upload the files */
router.post('/employee/upload', async function(req, res) {
    let exceltojson;
    upload(req,res, function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        /** Multer gives us file info in req.file object */
        if(!req.file){
            res.json({status:404, error:"No file passed"});
            return;
        }
        /** Check the extension of the incoming file and
         *  use the appropriate module
         */
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders:true
            }, async function(err,result){
                if(err) {
                    return res.json({status:404,Message:'Error in fetching data from Excel file you have uploaded'});
                }
                result.forEach(element => {
                 EmpModel.Uploadmployee(element);
                });
                res.json({status:200, message:` Excel file was uploaded successfully and data has changed  to Json Successfully` , data: result});
            });
        } catch (e){
            res.json({status:401,message:"Corupted excel file"});
        }
    })
});
export default router;