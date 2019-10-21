module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};
const { postCommentModel } = require("../schema/postComment");
const users = [];

async function getUsers(req) {
    // console.log(info.find());
    try {
        const user = await info.find(req.body._id)
        console.log("----------------------------user-----------------------------")
        console.log(user[0]);
        const det = await info.find();
        return user;
    } catch (err) {
        console.log(err);
    }
}

async function createUser(req, res) {
    let response;
    let body, details;
    // body=req.body;
    // details= new info(body)
    console.log(details)
    debugger
    try {
        response = await info.create(req.body);
        return response

    } catch (err) {
        response = { error: err }
        return response
    }

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

}