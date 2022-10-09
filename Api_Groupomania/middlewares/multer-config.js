const multer = require('multer')
const path = require('path')

//Middleware qui va nous permettre gérer la gestion des fichiers image.
const storage = multer.diskStorage({
     
        destination: (req, file, callback) => {
            if (file.fieldname === "image_profile") callback (null, "./images/uploads/profiles")
            else if (file.fieldname === "image_post") callback (null, "./images/uploads/posts")
            else if (file.fieldname === "image_comment") callback (null, "./images/uploads/comments")
        },

        filename: (req, file, callback) => {
            //const name = req.body.name
            const name = file.originalname  
            callback(null, name + Date.now() + path.extname(file.originalname))
        }
})

fileFilter = (req, file, callback) => {
    if ((file.mimetype).includes('image/jpg') ||
        (file.mimetype).includes('image/png') ||
        (file.mimetype).includes('image/jpeg')
       ) { callback (null, true)
    } else {
        callback (null, false)
        console.log("Invalid file !")
    }
}

upload = multer({storage: storage, fileFilter: fileFilter, limits: { fileSize: 1000000 }})//.fields([ { name: 'image_profile'}, { name: 'image_post'}, { name: 'image_comment'} ])

module.exports = upload