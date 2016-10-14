import Cat from '../models/cat';

/**
 * Load cat and append to req.
 */
function load(req, res, next, id) {
  Cat.get(id)
    .then((cat) => {
      req.cat = cat; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get cat
 * @returns {Cat}
 */
function get(req, res) {
  return res.json(req.cat);
}

/**
 * Create new cat
 * @property {string} req.body.name - The name of cat.
 * @property {number} req.body.age - The age of cat.
 * @property {number} req.body.weight - The weight of cat.
 * @returns {Cat}
 */
function create(req, res, next) {
  const cat = new Cat({
    name: req.body.name,
    age: req.body.age,
    weight: req.body.weight
  });

  cat.save()
    .then(savedCat => res.json(savedCat))
    .catch(e => next(e));
}

/**
 * Update existing cat
 * @property {string} req.body.name - The name of cat.
 * @property {number} req.body.age - The age of cat.
 * @property {number} req.body.weight - The weight of cat.
 * @returns {Cat}
 */
function update(req, res, next) {
    const cat = req.cat;
    cat.name = req.body.name,
    cat.age = req.body.age,
    cat.weight = req.body.weight

    cat.save()
        .then(savedCat => res.json(savedCat))
        .catch(e => next(e));
}

/**
 * Get cat list.
 * @property {number} req.query.skip - Number of cats to be skipped.
 * @property {number} req.query.limit - Limit number of cats to be returned.
 * @returns {Cat[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Cat.list({ limit, skip })
    .then(cats => res.json(cats))
    .catch(e => next(e));
}

/**
 * Delete cat.
 * @returns {Cat}
 */
function remove(req, res, next) {
  const cat = req.cat;
  cat.remove()
    .then(deletedCat => res.json(deletedCat))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
