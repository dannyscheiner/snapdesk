// import access to database
const db = require("../models/userModel");

const roomsController = {};

roomsController.addRooms = (req, res, next) => {
<<<<<<< HEAD
  console.log('REQUEST BODY: ', req.body);
  const {
    name,
    admin
  } = req.body;
=======
  console.log("REQUEST BODY: ", req.body);
  const { name, admin } = req.body;
>>>>>>> d378fe404f184a1beb85708ef63326d14b1083b0
  const addRoom = {
    text: `
      INSERT INTO rooms
      (name, admin_id)
      VALUES
      ($1, $2)
      RETURNING _id, name, admin_id;
    `,
    values: [name, admin]
  };
  db.query(addRoom)
    .then(room => {
      // console.log('ROOM RESPONSE: ', room);
      res.locals.activeRoom = {
        id: room.rows[0]._id,
        name: room.rows[0].name,
        admin: room.rows[0].admin_id
      };
      return next();
    })
    .catch(err =>
      next({
        log: `Error in middleware roomsController.addNewRoom: ${err}`
      })
    );
};

roomsController.joinRoom = (req, res, next) => {
  const {
    user_id,
    room_name
  } = req.body
  const joinRoom = {
    text: 'INSERT INTO rooms_users VALUES $1, $2, false',
    values: [user_id, room_name]
  }
  db.query(joinRoom)
    .then((joinedRoomData) => {
      console.log(joinedRoomData);
      // FIGURE OUT THE SOMETHING
      res.locals.joinedRoomData = joinedRoomData.something;
      return next();
    })
    .catch((err) => {
      console.log(err)
      return next();
    })
};

module.exports = roomsController;