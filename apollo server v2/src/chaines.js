var express = require('express');
var router = express.Router();
var Chaine = require('./models/chaine');

//Affichage de toutes les chaines
router.get('/', function (req, res, next) {
   Chaine.find({}, function (err, chaines) {
    if (err) {
      res.send(err);
    } else {
      res.json(chaines);
    }
  });
});

//Affichage des chaines par user_id
router.get('/:user_id', function (req, res, next) {
    Chaine.find({'user_id':req.params.user_id}, function (err, chaines) {
   if (err) {
     res.send(err);
   } else {
     res.json(chaines);
   }
 });
});

//Ajout d'une chaine
router.post('/addChaine', (req, res ) => {

    var chaine = new Chaine({

        chaineContenu: req.body.chaineContenu   ,
        user_id: req.body.user_id   
    })
 

   chaine.save(function (err, result) {
        if (err) {
            res.send(err)
                }
        res.json({ message: 'chaine ajouter' })
      })
      //sleep(2000);
  });

//Suppression d'une chaine
  router.delete('/:id', (req, res) => {
    Chaine.remove({
      _id: req.params.id
    }, function (err, post) {
      if (err) { res.send(err) }
      res.send({
        success: true
      })
    })
  })



module.exports = router
