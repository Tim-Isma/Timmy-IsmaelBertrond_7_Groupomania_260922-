const multer = require('multer')
const path = require('path')

//Middleware qui va nous permettre gérer la gestion des fichiers image.
const storage = multer.diskStorage({
     
        destination: (req, file, callback) => {
            file.fieldname === "image", callback (null, "./images/post")
        },

        filename: (req, file, callback) => {
            const name = file.originalname  
            callback(null, name + Date.now() + path.extname(file.originalname))
        }
})

fileFilter = (req, file, callback) => {
    if ((file.mimetype).includes('image/png') ||
        (file.mimetype).includes('image/jpg') ||
        (file.mimetype).includes('image/jpeg')
       ) { callback (null, true)
    } else {
        callback (null, false)
        console.log("Invalid file !")
    }
}

upload = multer({storage: storage, fileFilter: fileFilter, limits: { fileSize: 1000000 }}).single('image')

module.exports = upload