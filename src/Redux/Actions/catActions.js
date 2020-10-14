import { dispatchActionToReducer, simpleDispatchActionToReducer } from "../ActionDispatchers";
import {
  getBreeds as getBreedsService,
  getCatById as getCatByIdService,
  getCatsByBreedId as getCatsByBreedIdService,
} from "../Services/cats";

/**
 * @param callback
 * @returns {function(*): void}
 */
export function getBreeds(callback = () => {
}) {
  return dispatchActionToReducer(
    getBreedsService(), callback, {
      typeSuccess: "GET_BREEDS_SUCCESS"
    });
}

/**
 * @param payload
 * @param payload.id
 * @returns {function(*): void}
 */
export function getCatById(payload, callback = () => {}) {
  return dispatchActionToReducer(getCatByIdService(payload), callback, {
    typeSuccess: "GET_CAT_BY_ID_SUCCESS"
  });
}

/**
 * @param {Object} payload
 * @param payload.breed_id
 * @param payload.limit
 * @param payload.page
 * @returns {function(*): void}
 */
export function getCatsByBreedId(payload, callback = () => {}) {
  return dispatchActionToReducer(getCatsByBreedIdService(payload), callback, {
    typeSuccess: "GET_CATS_BY_BREED_ID_SUCCESS"
  });
}

/**
 * @param {Object} payload
 * @param {Object} payload.id
 */
export function setSelectedBreedId(payload, callback = () => {}) {
  return simpleDispatchActionToReducer("SET_SELECTED_BREED_ID", payload, callback);
}

/**
 * @param {Object} payload
 * @param {Object} payload.id
 */
export function setSelectedCatId(payload, callback = () => {}) {
  return simpleDispatchActionToReducer("SET_SELECTED_CAT_ID", payload, callback);
}
