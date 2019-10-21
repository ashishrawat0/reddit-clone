module.exports = {
    getUsers,
    createPost,
    updateUser,
    deleteUser
};
const { postModel } = require("../schema/postSchema")
const { decodeToken } = require("../models/users");
const { subredditmodel } = require("../schema/subredditPost")
const { postdataModel } = require("../schema/postdata")
async function getUsers(req) {
    try {
        const decoded = decodeToken(req);
        const det = await postModel.find({"_id":decoded.id});
        return det;
    } catch (err) {
        console.log(err);
    }
}

async function createPost(req) {
    //const decoded = decodeToken(req);
    const id = req.body._id;
    console.log(id);
    // const data =await postModel.find({ "user_id": id });
    // if(data.length())
    const subid = {"sub_id":req.body.subreddit_id}
    debugger
    postModel.findOneAndUpdate({ "user_id":id }, {
        $push: { "subreddits": subid}} , { safe: true, upsert: true }
    ).exec().catch((err)=>{
        console.log(err);
    })
    
    responsesub(req);
    datapost(req);
        return ({"message": "success"})

}

async function responsesub(req){
    const postid = {"post_id":req.body.post_id}
    await subredditmodel.findOneAndUpdate({ "sub_id": req.body.subreddit_id }, {
        $push: { "posts": postid } 
    }, { safe: true, upsert: true }).exec().catch((err)=>{
        console.log(err);
    })
  
}

async function datapost(req){
    await postdataModel.findOneAndUpdate({ "post_id": req.body.post_id }, { "data": req.body.data } 
    , { safe: true, upsert: true }).exec().catch((err)=>{
        console.log(err);
    })

}

async function updateUser(req, res) {
    const body = req.body;
    const _id = req.query.id;
    // console.log(id);
    console.log(body);
    await info.findByIdAndUpdate(_id, body)
    return ({
        status: 200,
        statusText: "OK",
        message: "Client Updated!"
    });
}

async function deleteUser(req, res) {
    const id = req.query.id;
    console.log(id);
    await info.findByIdAndDelete(id);

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