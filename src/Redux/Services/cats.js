import {apiCall} from "./service";
import { objToUrlParams } from "../../Helpers/object";

/**
 * @param {Object} payload
 * @param {string} payload.id
 * @returns {Promise<*>}
 */
export function getCatById(payload) {
  return apiCall({
    method: "GET",
    url: `https://api.thecatapi.com/v1/images/${payload.id}`,
    data: payload,
    headers: {"x-api-key": "DEMO-API-KEY"}
  });
}

export function getCatsByBreedId(payload) {
  return apiCall({
    method: "GET",
    url: `https://api.thecatapi.com/v1/images/search?${objToUrlParams(payload)}`,
    data: payload,
    headers: {"x-api-key": "DEMO-API-KEY"}
  });
}

export function getBreeds() {
  return apiCall({
    method: "GET",
    url: `https://api.thecatapi.com/v1/breeds`,
    headers: {"x-api-key": "DEMO-API-KEY"}
  });
}

