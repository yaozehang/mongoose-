var express = require('express');
var router = express.Router();
var googleModel = require('../model/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user', (req,res) => {
  let {pn=1, size=10} = req.query
    pn = parseInt(pn)
    size = parseInt(size)

  googleModel.find().limit(size).skip((pn-1)*size).then(data => {

    res.json({
      code: 200,
      data
    })
  })
})

router.get('/user/:id',(req, res) => {
  let {id} = req.params

  googleModel.findById({_id:id}).then(doc => {
    res.json({
      code: 200,
      data: doc
    })
  })
})

router.post('/user',(req, res) => {
  let {name, age,desc} = req.body

  googleModel.create({name,age,desc}).then(data => {
    console.log(data)
    res.json({
      code:200,
      data
    })
  })
})

router.put('/user/:id',(req, res) => {
  let {desc} = req.body
  let {id} = req.params

  googleModel.updateOne({_id: id},{$set:{desc}}).then(doc => {
    res.json({
      code: 200,
      doc:doc
    })
  })
})

router.delete('/user/:id',(req, res) => {
  let {id} = req.params

  googleModel.deleteOne({_id: id}).then(desc => {
    console.log(desc)
    res.json({
      code: 200,
      desc: desc
    })
  })
})

module.exports = router;
