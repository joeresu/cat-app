/**
 * @function Calls the service and then dispatch action Object as a response to reducer.
 * @param service - Name of the Service that handles all the input parameters required to be pass in service.
 * @param actionTypeStart - type : action start
 * @param actionTypeSuccess - type : action Success
 * @param actionTypeFailure - type : action Failure
 * @returns {function()}
 * @constructor
 */
export function dispatchActionToReducer(service, callback, actionType = {}) {
  const {typeStart = "START", typeSuccess = "SUCCESS", typeFailure = "FAILURE"} = actionType;
  return (dispatch) => {
    dispatch({
      type: typeStart,
    });
    service
      .then((result) => {
        if (result.status === 200 || result.status === 201 || result.status === 204) {
          dispatch({
            config: result.config,
            type: typeSuccess,
            data: result.data,
          });
          if (callback) callback(null, result);
        } else {
          dispatch({
            type: typeFailure,
            error: result,
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 422 || error.response.status === 403) {
          }
          // not authenticated user.
          if (error.response.status === 401) {
          }
          // internal server error
          if (error.response.status === 500) {
            console.log(error.response.data);
          }
          dispatch({
            type: typeFailure,
            error,
          });
          if (callback) callback(error);
        }
      });
  };
}

export function simpleDispatchActionToReducer(type, data, callback) {
  return (dispatch) => {
    dispatch({ type, data });
    if (callback) callback();
  };
}
