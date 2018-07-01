export default function orderList(state = {list:[]}, action) {
	const {list} = state;

	switch (action.type) {
		case "ADD_ORDER":
		  	return {list: [...list, action.payload]};
		case "DELETE_ORDER":
		  	return {list: [...list.filter(item => item.id !== action.payload)]};
		default:
			return state;
	}
}