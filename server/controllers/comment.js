//import Client from '../models/client';
/**
 * Load client and append to req.
 */
function get(req, res) {
  return res.json(req.client.comments);
}
/**
 * Create new comment
 * @property {string} req.body.info - The info of client.
 * @returns {Client}
 */
function create(req, res, next) {
  const client = req.client;
  const comment = {
    description: req.body.description,
  };

  client.comments.push(comment);
  
  client.save()
    .then(savedClient => res.json(savedClient))
    .catch(e => next(e));
/*
  client.addComment(req.body)
    .then(savedClient => res.json(savedClient))
    .catch(e => next(e));*/
}

/**
 * Delete comment.
 * @returns {Comment}
 */
function remove(req, res, next) {
  const client = req.client;
  client.delete(req.params.commentId)
    .then(deletedClient => res.json(deletedClient))
    .catch(e => next(e));
}

export default { get, create, remove };
