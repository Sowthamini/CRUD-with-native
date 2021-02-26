const express = require('express')
const mongodb = require('mongodb')
const app = express()
let db
let connectionString = `mongodb://localhost:27017/crud`

mongodb.connect(connectionString,{ useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db()
    app.listen(5000)
  }
)
app.use(express.json())

app.post('/create-data', function (req, res) {
  db.collection('data').insertOne({head:req.body.head,title:req.body.title, text: req.body.text }, function (err,info) {
    res.json(info.ops[0])
  })
})

app.get('/', function (req, res) {
  db.collection('data').find().toArray(function (err, items) {
      res.send(items)
    })
})

app.put('/update-data', function (req, res) {
  db.collection('data').findOneAndUpdate({ _id: new mongodb.ObjectId(req.body.id) },{ $set: { 
    head:req.body.head,
    title:req.body.title, 
    text: req.body.text } },
    function () {
      res.send('Success updated!')
    }
  )
})

app.delete('/delete-data', function (req, res) {
  db.collection('data').deleteOne({ _id: new mongodb.ObjectId(req.body.id) },
    function () {
      res.send('Successfully deleted!')
    }
  )
})
