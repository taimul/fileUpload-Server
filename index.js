const express= require ('express');
const cors =require('cors');
const multer =require('multer');
const fs = require('file-system');
const MongoClient = require('mongodb').MongoClient
// const ObjectId = require('mongodb').ObjectId;
// const mongoose = require('mongoose')
const app = express();
const {ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;


//middle wares
app.use(cors());
app.use(express.json());

//Database
//Gitfair
//kEIUzUjoZVy0FYcH

// MFMi2bXccrNW0uLg



const uri = "mongodb+srv://GitFair:MFMi2bXccrNW0uLg@cluster0.wzbzlyu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




//mongoose
// mongoose.connect('mongodb://localhost:5000/IMGDB2')
// let myschema = mongoose.Schema({
//     Picture : String
// })
// let mymodel = mongoose.model('table', myschema)

//Storage Setting
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/images/");
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + "-" + Date.now());
//     },
//   });
  
//   const upload = multer({ storage: storage });
 
 //SINGALE IMAGE UPLODING
//  const mediaCollection = client.db('Gitfair').collection('images');

// app.post("/upload", upload.single("file"), (req, res, next) => {
//   const file = req.file;
//   var img = fs.readFileSync(req.file.path);
//   var encode_image = img.toString('base64');

//   var finalImg = {
//     contentType: req.file.mimetype,
//     image: Buffer.from(encode_image, 'base64')
//   };  

//       db.collection('images').insertOne(finalImg, (err, result) => {
//         console.log(result)
//         if (err) return console.log(err)
//         console.log('saved to database')
//         // res.redirect('/')
//     })

//   if (!file) {
//     const error = new Error("Please upload a file");
//     error.httpStatusCode = 400;
//     return next(error);
//   }
//   res.send(file);
// });

//  app.post('/singlepost', upload.single('myImage'), (req, res) => {
//     var img = fs.readFileSync(req.file.path);
//     var encode_image = img.toString('base64');
//     // Define a JSONobject for the image attributes for saving to database

//     var finalImg = {
//         contentType: req.file.mimetype,
//         image: Buffer.from(encode_image, 'base64')
//     };
//     db.collection('images').insertOne(finalImg, (err, result) => {
//         console.log(result)
//         if (err) return console.log(err)
//         console.log('saved to database')
        
//     })
// })

async function run(){
    try{
        const mediaCollection = client.db('Gitfair').collection('files');

        app.post('/files', async (req, res) => {
          const images = req.body; 
          const result = await mediaCollection.insertOne(images[0]);
          res.send(result);
      })

      //get  all the files
      app.get('/all-files', async (req, res) => {
        const query = {};
        const cursor = mediaCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
    })

        // app.post("/", upload.single("file"), async(req, res, next) =>{
        //   const file = req.file;
        //   console.log(file);
        //   // const media = req.body;
        //   const doc = {
        //     title: "Record of a Shriveled Datum",
        //     image: req.file.originalname,
        //   }
        //   const result = await mediaCollection.insertOne(doc);
        //   res.send(result);
          // if (!file) {
          //       const error = new Error("Please upload a file");
          //       error.httpStatusCode = 400;
          //       return next(error);
          //     }

          //     res.send(file);
            

       
      //   app.post('/', async (req, res) => {
      //     const media = req.body;
      //     const result = await mediaCollection.insertOne(media);
      //     res.send(result);
      // })
        // app.post('/singlepost',upload.single('single_input'), async (req, res) => {
        //     const images = req.body;
        //     const result = await mediaCollection.insertOne(images);
        //     res.send(result);
        // })

        //  //get all media
        //  app.get('/all-media', async (req, res) => {
        //     const query = {};
        //     const cursor = mediaCollection.find(query);
        //     const result = await cursor.toArray();
        //     res.send(result);
        // })
    }
    finally{

    }
}
run().catch(err =>console.error(err))

app.get('/', (req,res)=>{
    res.send('fileUpload server is up and running');
})

app.listen(port, ()=>{
    console.log(`server is ruuning at port ${port}`)
})