/**
 * Load client and append to req.
 */
function load(req, res, next, id) {
  req.comment = req.client.comments
    .find(comment => comment.id === id);
    
  if (!req.comment) return next(new Error('Comment not found'));
  next();
}

/**
 * Create new comment
 * @property {string} req.body.info - The info of client.
 * @returns {Client}
 */
function create(req, res, next) {
  const client = req.client;

  client.addComment(req.body)
    .then(savedClient => res.json(savedClient))
    .catch(e => next(e));
}

/**
 * Delete comment.
 * @returns {Comment}
 */
function remove(req, res, next) {
  const client = req.client;
  client.removeComment(req.params.commentId)
    .then(deletedClient => res.json(deletedClient))
    .catch(e => next(e));
}

export default { load, create, update, remove };
