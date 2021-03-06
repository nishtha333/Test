import socket from '../socket';

const SET_STOCKS = 'SET_STOCKS'
const _setStocks = (stocks) => ({ type: SET_STOCKS, stocks })

const getStocks = () => {
    return (dispatch) => {
        socket.on('update-stocks', message => {
            dispatch(_setStocks(message))
        })
    }
}

const subscribeStocks = (stocks) => {
    return (dispatch) => {
        console.log("client calling subscribe stocks")
        socket.emit('subscribe-stocks', stocks);
    }
}

const stocksReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_STOCKS:
            return action.stocks
        default:
            return state
    }
}

export { stocksReducer, getStocks, subscribeStocks }
