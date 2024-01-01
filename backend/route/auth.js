const express = require('express');
const route = express.Router();
const Auth = require('../controller/auth/Signin')
const multer  = require('multer')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname; // Get the original file name
    console.log(file?.originalname.split('.'),'FILE')
    const lastExtension = file?.originalname.split('.').length;
    const extension = file?.originalname.split('.')[lastExtension-1];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  }
});
  
  const upload = multer({ storage: storage })

route.post('/signin', Auth.Signin)
route.post('/register', Auth.Register)
route.post('/getFiles', Auth.GetFiles)
route.post('/update',upload.single("file"), Auth.UpdateProfile)

module.exports = route;

