import Types from "./shop.types";

const initialState = {
    loggedInShop: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.SHOP_LOGIN_FULFILLED:
        case Types.GET_SHOP_FULFILLED: {
            const loggedInShop = action.payload.data;
            return {
                ...state,
                loggedInShop
            };
        }
    }
    return state;
}