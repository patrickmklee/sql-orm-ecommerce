const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
      
      ]
    }).then( dbTagData => {
      res.json(dbTagData);
    })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
  where: {id: req.params.id},
  attributes: ['id', 'tag_name'],
  include: [
    {
      model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    }
  ]
  })
  .then(dbTagData => {
      res.json(dbTagData)
    })
    .catch( err=> { res.setStatus(404).json(err) } )
    
  

});

router.post('/', (req, res) => {
  // create a new tag
  ProductTag.create(req.body)
  .then(newTagData => {
    res.json(newTagData)
  })
  .catch( err => {
    res.setStatus(500).json(err);
  })

});

router.put('/:id', (req, res) => {
  
  // update a tag's name by its `id` value.0
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  // Promise.resolve(res,re
    ProductTag.destroy({ 
    where: {id: req.params.id}
    })
    .then( (dat) => {
      res.setStatus(200).json(dat)
    }
    ).catch( err => {
    res.setStatus(404).json(err)
  })
});

module.exports = router;
