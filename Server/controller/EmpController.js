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
  }
}
async fetchAllEmployees(req, res) {

  const datas = await EmpModel.fetchAllRecords();
  return res.status(200).json({ status: 200, message: ` Hy all records were retrieved Successfully `, data: datas });
}

async destroyRecord(req, res) {
  const getData = await EmpModel.fetchOneRecord((parseInt(req.params.id)));
  if (!(parseInt(req.params.id))) {
    return res.status(404).json({ status: 404, message: `Hey insert record id ` });
  }
  if (getData.length === 0) {
    return res.status(404).json({ status: 404, message: `Hey this record with id ${(parseInt(req.params.id))} is not found ` });
  }
  await EmpModel.deleteRecord((parseInt(req.params.id)));
  return res.status(200).json({ status: 200, message: `Hey !! this record with id ${(parseInt(req.params.id))} was deleted Successfully ` });
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
  return res.status(200).json({ status: 200, message: `Hey !!  Employee with id ${(parseInt(req.params.id))} was activated Successfully  on ${ValidateHelp.ceatedOn}`, data: updateRecord });
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
}
// Search features

async SeachByName(req, res) {
  const fetchData = await EmpModel.searchName((req.params.name));
  if (!(parseInt(req.params.id))) {
    return res.status(404).json({ status: 404, message: `Hey new employee record id ` });
  }
  if (fetchData.length === 0) {
    return res.status(404).json({ status: 404, message: `Hey this employee with id ${(req.params.name)} is not found ` });
  }

  const updateRecord = await EmpModel.searchName(readyDatas, req.params.name);
  return res.status(200).json({ status: 200, message: `Hey !! Your record with id ${(req.params.name)} was searched Successfully  on ${ValidateHelp.ceatedOn}`, data: updateRecord });
}

async SeachByItem(req, res) {
  const {item} = req.body;
  const fetchData = await EmpModel.searchItem(item);


  if (fetchData.length === 0) {
    return res.status(404).json({ status: 404, message: `Your search: ${(item)} is not found ` });
  }

  // const searchEmployee = await fetchData.filter(item.position === req.body.position);
  return res.status(200).json({ status: 200, message: `Hey !!  Employee with  ${(item)} was searched Successfully  on ${ValidateHelp.ceatedOn}`, data: fetchData });
}
}

const ExportEmployee = new Employee();
export default ExportEmployee;