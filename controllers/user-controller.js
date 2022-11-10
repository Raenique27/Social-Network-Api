const {User} = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find()
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one user by id
    getUserById({params}, res) {
        User.findOne({_id: params.id})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate('friends')
            .select('-__v')
            .then(dbUserdata => {
                if (!dbUserdata) {
                    res.status(404).json({message: 'No user found with that id!'});
                    return;
                }
                res.json(dbUserdata);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    
}