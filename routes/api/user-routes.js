const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    postOneUser,
    updateUser,
    removeUser,
    addNewFriend,
    removeFriend
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(postOneUser);

router.route('/:id')
    .get(getOneUser)
    .put(updateUser)
    .delete(removeUser)

router.route('/:userId/friends/:friendId')
    .post(addNewFriend)
    .delete(removeFriend)

module.exports = router;