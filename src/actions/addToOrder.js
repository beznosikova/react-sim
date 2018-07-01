export const addToOrder = item => dispatch => {
  dispatch({
    type: "ADD_ORDER",
    payload: item
  });
};
