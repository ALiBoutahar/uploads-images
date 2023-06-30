const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');
const path = require('path');
const app = express();

let store = '../';
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, store);
  },
 
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const newFilename = uniqueSuffix + fileExtension;
    cb(null, newFilename);
  }

  // filename: function (req, file, cb) {
  //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  //   cb(null, uniqueSuffix + '.png');
  // }
});

const upload = multer({ storage: storage });

app.set('view engine', 'ejs');
app.use(express.static('images'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.render("index",{title:'Choose Storage...'});
});
app.post('/store', async (req, res) => {
  store=(req.body.store);
  let m ;
  if (store == '../'){m = 'Desktop'; console.log('store created Desktop');};
  if(store == '../files ali'){m = 'files ali'; console.log('store created files ali');};
  if(store == 'files/'){m = 'Local files'; console.log('store created Local files');};
  res.render('index',{title:m});
}); 

app.post('/create', upload.array('images[]'), async (req, res) => {
  let m ;
  if (store == '../') {m = 'Desktop'};
  if(store == '../files ali'){m = 'files ali'};
  if(store == 'files/'){m = 'Local files'};
  res.render('index',{title:m});
  req.files.forEach((file) => {
    console.log(file.filename);
  });
  console.log('files saved');
});

app.listen(11235, () => {
  console.log("http://localhost:11235");
});
