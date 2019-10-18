
module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  decodeToken,
  createfolder
};
const { info } = require("../schema/Userprofile")
const { SECRET } = require("../config/config")
const jwt = require('jsonwebtoken');
var fs = require('fs');

function decodeToken(req){
  const token =req.headers.token 
  const decoded = jwt.verify(token, new Buffer(SECRET, 'base64'));
  return decoded;
}

async function getUsers(req) {
  //console.log(ObjectId().getTimestamp())
  try{
    const decoded = decodeToken(req);
    const det=await info.findOne({"_id":decoded.id});
    return det;
  }
  catch(err)
  {
    console.log(err);
  }
}

async function createfolder(req){
  var dir = "../pictures";

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

}

async function createUser(req, res) {
    let response;
    let body,details;
    body=req.body
    details= new info(body)
    console.log(details)
    try{
      response=await details.save()
      return response

    }
    catch(err)
    {
      response={error:err}
      return response
      }
    
}

async function updateUser(req, res) {
  const body = req.body;
  const _id = req.query.id;
  // console.log(id);
  console.log(body);
  await info.findByIdAndUpdate(_id,body)
  return({
    status: 200,
    statusText: "OK",
    message: "Client Updated!"
  });
}

async function deleteUser(req, res) {
  const id = req.query.email;
  console.log(id);
  await info.findOneAndDelete(id);

  res.send({
    status: 200,
    statusText: "OK",
    message: "Client deleted!"
  });

  // users.pop(id);

  // res.send({
  //   status: 200,
  //   statusText: "OK",
  //   message: "Client Deleted!"
  // });
}