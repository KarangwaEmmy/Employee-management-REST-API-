import ValidateHelp from '../Middleware/Validation';
import EmpModel from '../model/DBModel';
import Mailer from '../Helper/Mailer'

class Employee {

async createEmployee( req, res) {
  const { position, name, nationalId, email, phoneNumber, dateofBirth, status, createdDate, nodifiedDate} = req.body;
  const createValidate = ValidateHelp.schemaCreate(req.body);
  if(createValidate.error){
    const Message = createValidate.error.details[0].message;
    const messUser = Message.replace(/\"/g, '');
    res.status(400).send({
      status: 400,
      message: messUser
    });
  } if(!createValidate.error){
    // Check existence of email 
    const findThisUser = await EmpModel.checkEmaiExist(email);
    if (findThisUser.length > 0)
      { res.status(401).json({ status: 401, message: 'email Already exists. Try another email' }); }
        // Check existence of  national Id 
    const foundId = await EmpModel.checkNationalIdExist(nationalId);
    if (foundId.length > 0)
      { res.status(401).json({ status: 401, message: 'National ID Already exists. Check if youo have written correct ID' }); }
        // Check existence of phone Number
    const foundPhone = await EmpModel.checkPhoneExist(phoneNumber);
    if (foundPhone.length > 0)
      { res.status(401).json({ status: 401, message: 'phone Number Already exists. check if  phone number is correct' }); } 

   try{
    const EmpData = {
      position: position,
      name: name,
      nationalId: nationalId,
      phoneNumber: phoneNumber,
      email: email,
      dateofBirth: dateofBirth,
      status: 'inactive',
      createdDate: new Date(),
      modifiedDate: 'none'
    }
    const newEmployee = await EmpModel.createRecord(EmpData);
    const data = await EmpModel.fetchOneRecord(newEmployee[0].id);
    res.status(201).json({ status: 201, message: ` Employee was registered successfully on ${ValidateHelp.ceatedOn}`, data: data});
    await Mailer.sendMail(newEmployee);
   }catch(error){
    res.status(500).json({ status: 500, error: 'Internal Server Error!' });
   }
  }
}
async fetchAllEmployees(req, res) {

  const datas = await EmpModel.fetchAllRecords();
  return res.status(200).json({ status: 200, message: ` Hy all records were retrieved Successfully `, data: datas });
}

async destroyRecord(req, res) {
  const getData = await EmpModel.fetchOneRecord((parseInt(req.params.id)));
  try{
    if (!(parseInt(req.params.id))) {
      return res.status(404).json({ status: 404, message: `Hey insert record id ` });
    }
    if (getData.length === 0) {
      return res.status(404).json({ status: 404, message: `Hey this record with id ${(parseInt(req.params.id))} is not found ` });
    }
    await EmpModel.deleteRecord((parseInt(req.params.id)));
    return res.status(200).json({ status: 200, message: `Hey !! this record with id ${(parseInt(req.params.id))} was deleted Successfully ` });
  
  }catch(error){
    res.status(500).json({ status: 500, error: 'Internal Server Error!' });
  }
 
}
async FetchoneEmployee(req, res) {
  const getData = await EmpModel.fetchOneRecord((parseInt(req.params.id)));
  try{
    if (!(parseInt(req.params.id))) {
      return res.status(404).json({ status: 404, message: `Hey insert record id ` });
    }
    if (getData.length === 0) {
      return res.status(404).json({ status: 404, message: `Hey this record with id ${(parseInt(req.params.id))} is not found ` });
    }
    await EmpModel.fetchOneUser((parseInt(req.params.id)));
    return res.status(200).json({ status: 200, message: `Hey !! this record with id ${(parseInt(req.params.id))} was fetched Successfully `, data:  getData});
  
  }catch(error){
    res.status(500).json({ status: 500, error: 'Internal Server Error!' });
  }
 
}
async activateEmployee(req, res) {
  const { position, name, nationalId, email, phoneNumber, dateofBirth, status} = req.body;
  const fetchData = await EmpModel.fetchOneRecord((parseInt(req.params.id)));
  if (!(parseInt(req.params.id))) {
    return res.status(404).json({ status: 404, message: `Hey insert record id ` });
  }
  if (fetchData.length === 0) {
    return res.status(404).json({ status: 404, message: `Hey this employee with id ${(parseInt(req.params.id))} is not found in the database` });
  }
  try{
  const readyDatas = {
    position: position || '',
    name: name || fetchData[0].name,
    nationalId: nationalId || fetchData[0].nationalId,
    email: email || fetchData[0].email,
    phoneNumber: phoneNumber || fetchData[0].phoneNumber,
    dateofBirth: dateofBirth || fetchData[0].dateofBirth,
    status: 'activated',
    modifiedDate: new Date(),
  };

  const updateRecord = await EmpModel.editStatus(readyDatas, parseInt(req.params.id));
  return res.status(200).json({ status: 200, message: `Hey !!  Employee named id ${(parseInt(req.params.id))} was activated Successfully  on ${ValidateHelp.ceatedOn}`, data: updateRecord });
}
catch(error){
  res.status(500).json({ status: 500, error: 'Internal Server Error!' });
}
}

async suspendEmployee(req, res) {
  const { position, name, nationalId, email, phoneNumber, dateofBirth, status} = req.body;
  const fetchData = await EmpModel.fetchOneRecord((parseInt(req.params.id)));
  if (!(parseInt(req.params.id))) {
    return res.status(404).json({ status: 404, message: `Hey insert record id ` });
  }
  if (fetchData.length === 0) {
    return res.status(404).json({ status: 404, message: `Hey this record with id ${(parseInt(req.params.id))} is not found ` });
  }
try {
  const readyDatas = {

    position: position || fetchData[0].position,
    name: name || fetchData[0].name,
    nationalId: nationalId || fetchData[0].nationalId,
    email: email || fetchData[0].email,
    phoneNumber: phoneNumber || fetchData[0].phoneNumber,
    dateofBirth: dateofBirth || fetchData[0].dateofBirth,
    status: 'suspended',
    modifiedDate: new Date(),

  };

  const updateRecord = await EmpModel.editStatus(readyDatas, parseInt(req.params.id));
  return res.status(200).json({ status: 200, message: `Hey !! Employee  with id ${(parseInt(req.params.id))} was suspended Successfully  on ${ValidateHelp.ceatedOn}`, data: updateRecord });
}catch(error){
  res.status(500).json({ status: 500, error: 'Internal Server Error!' });
}
}

async updateEmployee(req, res) {
  const { position, name, nationalId, email, phoneNumber, dateofBirth, status, createdDate, nodifiedDate} = req.body;
  const fetchData = await EmpModel.fetchOneRecord((parseInt(req.params.id)));
  if (!(parseInt(req.params.id))) {
    return res.status(404).json({ status: 404, message: `Hey insert record id ` });
  }
  if (fetchData.length === 0) {
    return res.status(404).json({ status: 404, message: `Hey this record with id ${(parseInt(req.params.id))} is not found ` });
  }
 try{
  const readyDatas = {
    id: req.params.id,
    position: position || fetchData[0].position,
    name: name || fetchData[0].name,
    nationalId: nationalId || fetchData[0].nationalId,
    email: email || fetchData[0].email,
    phoneNumber: phoneNumber || fetchData[0].phoneNumber,
    dateofBirth: dateofBirth || fetchData[0].dateofBirth,
    modifiedDate: new Date(),

  };

  const updateRecord = await EmpModel.updateEmployee(readyDatas, parseInt(req.params.id));
  return res.status(200).json({ status: 200, message: `Hey !! Your record with id ${(parseInt(req.params.id))} was updated Successfully  on ${ValidateHelp.ceatedOn}`, data: updateRecord });
}catch(error){
  res.status(500).json({ status: 500, error: 'Internal Server Error!' });
}
}
// Search features

async SeachByItem(req, res) {
  const {item} = req.body;
  const fetchData = await EmpModel.searchItem(item);
    try{

  if (fetchData.length === 0) {
    return res.status(404).json({ status: 404, message: `Your search: ${(item)} is not found ` });
  }

  return res.status(200).json({ status: 200, message: `Hey !!  Employee with  ${(item)} was searched Successfully  on ${ValidateHelp.ceatedOn}`, data: fetchData });
}catch(error){
  res.status(500).json({ status: 500, error: 'Internal Server Error!' });
}
}
async uploadFile(req, res) {
  const uploadedFile = req.files.file;
  const file = [];


  if (uploadedFile !== undefined) uploadedFile.map((i) => file.push(i.path));
  const date = new Date();

  try {
    const uploadFile = await EmpModel.UploadFile(uploadedFile,date);
    res.status(201).json({
      status: 201,
      data: [{
        id: uploadFile.id,
        message: 'File was uploaded Successfully',
      }],
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'Internal Server Error!',
    });
  }
}
}

const ExportEmployee = new Employee();
export default ExportEmployee;