/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  update
 * DELETE  /api/things/:id          ->  destroy
 */

import Score from './score.model';
import {
  respondWithResult,
  saveUpdates,
  removeEntity,
  handleEntityNotFound,
  handleError
} from '../util';

// Gets a list of Scores
export function index(req, res) {
  return Score.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Score from the DB
export function show(req, res) {
  return Score.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Score in the DB
export function create(req, res) {
  return Score.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Score in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  return Score.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Score from the DB
export function destroy(req, res) {
  return Score.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
