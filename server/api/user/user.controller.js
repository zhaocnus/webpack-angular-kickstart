/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  update
 * DELETE  /api/things/:id          ->  destroy
 */

import User from './user.model';
import {
  respondWithResult,
  saveUpdates,
  removeEntity,
  handleEntityNotFound,
  handleError
} from '../util';

// Gets a list of Users
export function index(req, res) {
  return User.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single User from the DB
export function show(req, res) {
  return User.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new User in the DB
export function create(req, res) {
  return User.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing User in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  return User.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a User from the DB
export function destroy(req, res) {
  return User.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
