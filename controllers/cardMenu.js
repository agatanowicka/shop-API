const { validationResult } = require('express-validator/check');
const CardMenu = require("../models/cardMenu");

exports.getCardMenu = (req, res) => {
  CardMenu
    .find()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.send(500);
    }
    )
};

exports.createCardMenu = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.send(422);
    return
  }
  const image = req.body.image;
  const title = req.body.title;
  const type = req.body.type;
  const cardMenu = new CardMenu({
    image: image,
    title: title,
    type: type
  })
  cardMenu
    .save()
    .then(result => {
      res.status(201).json(
        result
      );
    })
    .catch(err => {
      res.send(500);
    });
}
exports.deleteCardMenu = (req, res) => {
  const cardMenuId = req.params.cardMenuId;

  CardMenu.findByIdAndRemove(cardMenuId)
    .then(deletedCardMenu => {
      res.send(200);
    })
    .catch(err => {
      res.send(500);
    });
}

exports.updateCardMenu = (req, res) => {
  const cardMenuId = req.params.cardMenuId;

  CardMenu.findOneAndUpdate({ _id: cardMenuId },
    {$set: {
        image: req.body.image,
        type: req.body.type,
        title: req.body.title,
      }
    }, { new: true, useFindAndModify: false })
    .then(updateCard => {
      if (!updateCard) {
        return res.send(404);
      }
      return res.json(updateCard);
    })
    .catch(err => {
      res.send(500);
    });
}


