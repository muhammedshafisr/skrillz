const axios = require("axios");
const Community = require("../models/communityModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const { Types:{
  ObjectId
}} = require('mongoose');

// get community
// const getCommunity = (req, res) => {
//   const userId = req.user;
//   User.findOne({ _id: userId })
//     .then((user) => {
//       const { email, password, projectId } = user;
//       console.log(email, password, projectId);
//       const config = {
//         method: "get",
//         maxBodyLength: Infinity,
//         url: "https://api.chatengine.io/chats/",
//         headers: {
//           "Project-ID": projectId,
//           "User-Name": email,
//           "User-Secret": password,
//         },
//       };

//       axios(config)
//         .then((response) => {
//           const { data } = response;
//           res.status(200).json({ data });
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// // create community
// const createCommunity = (req, res) => {
//   const userId = req.user;
//   const { communityName } = req.body;

//   const data = {
//     title: communityName,
//     is_direct_chat: false,
//   };

//   User.findOne({ _id: userId })
//     .then((user) => {
//       console.log(user.projectId, user.email, user.password);
//       const config = {
//         method: "post",
//         maxBodyLength: Infinity,
//         url: "https://api.chatengine.io/chats/",
//         headers: {
//           "Project-ID": user.projectId,
//           "User-Name": user.email,
//           "User-Secret": user.password,
//         },
//         data: data,
//       };

//       axios(config)
//         .then(function (response) {
//           //   console.log(JSON.stringify(response.data));
//           // res.status(200).json({ response });
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// // get chat list
// const getChatList = (req, res) => {
//   const { id } = req.query;
//   const userId = req.user;
//   console.log(id);
//   User.findOne({ _id: userId })
//     .then((user) => {
//       const config = {
//         method: "get",
//         maxBodyLength: Infinity,
//         url: `https://api.chatengine.io/chats/${id}/messages/`,
//         headers: {
//           "Project-ID": user.projectId,
//           "User-Name": user.email,
//           "User-Secret": user.password,
//         },
//       };

//       axios(config)
//         .then((response) => {
//           console.log(JSON.stringify(response.data));
//           const { data } = response;
//           res.status(200).json({ data });
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// // send chat
// const sendChat = (req, res) => {
//   const userId = req.user;
//   const { text, id } = req.body;
//   const data = { text };

//   User.findOne({ _id: userId })
//     .then((user) => {
//       const { email, password, projectId } = user;
//       console.log(email, password, projectId);
//       console.log(id);
//       const config = {
//         method: "post",
//         maxBodyLength: Infinity,
//         url: `https://api.chatengine.io/chats/${id}/messages/`,
//         headers: {
//           "Project-ID": projectId,
//           "User-Name": email,
//           "User-Secret": password,
//         },
//         data: data,
//       };

//       axios(config)
//         .then(function (response) {
//           // getting all messages from chat engine
//           const config = {
//             method: "get",
//             maxBodyLength: Infinity,
//             url: `https://api.chatengine.io/chats/${id}/messages/`,
//             headers: {
//               "Project-ID": projectId,
//               "User-Name": email,
//               "User-Secret": password,
//             },
//           };

//           axios(config)
//             .then(function (response) {
//               const { data } = response;
//               res.status(200).json({ data });
//             })
//             .catch(function (error) {
//               console.log(error);
//             });
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// // add new member
// const addNewMember = (req, res) => {
//   const { id, member } = req.body;
//   const userId = req.user;
//   console.log(req.body)
//   // finding the member
//   User.findOne({ id: member })
//     .then((newMember) => {
//       const newMemberEmail = newMember.email;
//       const data = {"username": newMemberEmail};

//       User.findOne({ _id: userId })
//         .then((user) => {
//           const { email, password, projectId } = user;
//           console.log(email, password, projectId, data)
//           const config = {
//             method: "post",
//             maxBodyLength: Infinity,
//             url: `https://api.chatengine.io/chats/${id}/people/`,
//             headers: {
//               "Project-ID": projectId,
//               "User-Name": email,
//               "User-Secret": password,
//             },
//             data: data,
//           };

//           axios(config)
//             .then((response) => {
//               console.log('response')
//               console.log(JSON.stringify(response.data));
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// creating new community
const createCommunity = async (req, res) => {
  const userId = req.user;
  const { communityName, image } = req.body;

  console.log(req.body);
  try {
    await User.findOne({ _id: userId });
    await Community.create({
      admin: userId,
      communityName,
      status: true,
      image
    });

    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
  }
};

// getting community list
const getCommunity = async (req, res) => {
  const userId = req.user.valueOf();

  console.log(`this is user id's value ${userId}`);
  try {
    const { email } = await User.findOne({ _id: userId }).select('email')
    const communityList = await Community.find({ $or: [ { admin: userId }, { members: { member: email} } ]});
    console.log(communityList)
    res.status(200).json({ communityList });
  } catch (error) {
    console.log(error);
  }
};

// getChatList
const getChat = async (req, res) => {
  const { id } = req.query;
  const _id = ObjectId(id);
  console.log(`this is user id's value ${( id )}`);

  try {
    // checking for existing
    const exist = await Message.findOne({ community: id });

    if(!exist) {
      const communityData = await Community.findOne({ _id: id });
    return res.status(200).json( [communityData]);
    }

    const communityData = await Community.aggregate([
      { $match: { _id }},
      { $lookup: {
        from: "messages",
        localField: "_id",
        foreignField: "community",
        as: "result"
      }}
    ]);
    console.log(communityData);
    res.status(200).json(communityData);
  } catch (error) {
    console.log(error);
  }
};

// add new member
const addNewMember = async (req, res) => {
  const { id, member } = req.body;

  try {
    const findMember = await User.findOne({ _id: member })
    const updatedList = await Community.findOneAndUpdate(
      { _id: id },
      { $push: { members: { member: findMember?.email } } },
      { returnDocument: "after" }
    );

    res.status(200).json({ members: updatedList });
  } catch (error) {
    console.log(error);
  }
};

// send chat
const sendChat = async (req, res) => {
  const { id, sender, image, text } = req.body;
  console.log(id, sender, image, text)
  try {
    // check the community is blocked or not 
    const status = await Community.findOne({ _id: id });

    console.log(status)
    if (status?.status) {
      // not blocked && send message
      // checking for existing
    const exist = await Message.findOne({ community: id});

    if(!exist) {
      const sendChat = await Message.create({
        community: id,
        chatting:[{
          sender,
          image,
          text
        }]
      });
      console.log(sendChat)
    }
    else {
      const sendChat = await Message.findOneAndUpdate(
        { community: id },
        { $push: { chatting: { sender, image, text } } },
        { returnDocument: "after" }
      );
      console.log(sendChat)
    }
      res.status(200).json(true);
    }
    else {
      res.status(200).json(false);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCommunity,
  getCommunity,
  getChat,
  sendChat,
  addNewMember,
};
