const express= require ('express');
const cors =require('cors');
const MongoClient = require('mongodb').MongoClient

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



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wzbzlyu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





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