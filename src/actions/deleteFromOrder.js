export const deleteFromOrder = idx => dispatch => {
  dispatch({
    type: "DELETE_ORDER",
    payload: idx
  });
};

export const clearOrder = () => dispatch => {
  dispatch({
    type: "CLEAR_ORDER",
  });
};
