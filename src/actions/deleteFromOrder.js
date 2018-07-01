export const deleteFromOrder = idx => dispatch => {
  dispatch({
    type: "DELETE_ORDER",
    payload: idx
  });
};
