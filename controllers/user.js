const { user } = require('../db');

module.exports.addUser = async (u) => {
  await user.create({
    data: {
      uid: u.user.uid,
      role: 'user',
    },
  });
};

module.exports.getUser = async (id) => {
  return await user.findFirst({
    where: {
      uid: id,
    },
  });
};
