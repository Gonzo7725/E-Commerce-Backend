const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch(err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id);
    if(!tag) {
      res.status(404).json({ message: 'This tag not found'});
      return;
    }
    res.json(tag);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    console.log(req.body)
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch(err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id);
    if(!tag) {
      res.status(404).json({ message: 'This tag was not found'});
      return;
    }
    await tag.update(req.body);
    res.json(tag);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id);
    if(!tag) {
      res.status(404).json({ message: 'This tag was not found'});
      return;
    }
    await tag.destroy();
    res.json({ message: 'This tag was successfully deleted'});
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
