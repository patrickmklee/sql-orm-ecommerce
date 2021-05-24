const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  
  // find all categories
  // be sure to include its associated Products

  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }

      ]
    }).then( dbCategoryData => {
      res.json(dbCategoryData);
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {id: req.params.id},
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }

      ]
    })
    .then(dbCategoryData => {
      res.json(dbCategoryData)
    })
    .catch( err=> { res.setStatus(404).json(err) } )
    
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((category) => {
    
    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    // if (req.body.tagIds.length) {
    //   const productTagIdArr = req.body.tagIds.map((tag_id) => {
    //     return {
    //       product_id: product.id,
    //       tag_id,
    //     };
    //   });
    //   return Product.bulkCreate(productTagIdArr);
    })
    // if no product tags, just respond
    res.status(200).json(category);
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update( req.body, { 
    where: {id: req.params.id} 
  } )
    .then( dbCategoryData => {
      res.json(dbCategoryData)
    })
    .catch(err =>{
      res.status(404).json(err);
    })
  })
  
  

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({where: { id: req.params.id} })
   .then( delCat => {
     res.status(200).json(delCat)
   }).catch(err => {
     res.status(500).json(err)
   })
});



module.exports = router;
