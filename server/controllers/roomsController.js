// import access to database
const db = require('../models/userModel');

const roomsController = {};

roomsController.addRooms = (req, res, next) => {
  console.log('REQUEST BODY: ', req.body);
  const {
    name,
    admin
  } = req.body;
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
    .then((room) => {
      // console.log('ROOM RESPONSE: ', room);
      res.locals.roomId = room.rows[0]._id;
      res.locals.roomName = room.rows[0].name;
      res.locals.roomAdmin = room.rows[0].admin_id;
      return next();
    })
    .catch((err) =>
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