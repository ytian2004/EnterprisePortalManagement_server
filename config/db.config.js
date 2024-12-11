
const mongoose = require('mongoose');
const dbURI = 'mongodb://127.0.0.1:27017/company-system';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// 如果数据库为空，则在navicat里看不到该数据库，应先插入一条数据，才能看见该数据库,下述是我插入的数据
// const newUser = new UserModel({
//     username: 'admin',
//     password: '123456',
//     role:1
// });

// newUser.save((err, user) => {
//     if (err) {
//         console.error('Error saving user:', err);
//     } else {
//         console.log('User saved:', user);
//     }
// });
