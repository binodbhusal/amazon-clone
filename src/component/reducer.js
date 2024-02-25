export const initialState = {
  basket: [],
  user: null,
};
export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);

export const reducer = (state, action) => {
  const indexToRemove = state.basket.findIndex((item) => item.id === action.id);

  switch (action.type) {
    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: [],
      };
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case 'REMOVE_FROM_BASKET':

      if (indexToRemove !== -1) {
        const newBasket = [...state.basket];
        newBasket.splice(indexToRemove, 1);
        return {
          ...state,
          basket: newBasket,
        };
      }
      return state;
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
