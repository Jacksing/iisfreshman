import {ADD_PROPERTY, DEL_PROPERTY} from '../constants/PropertyActions'

export const property = (state, action) => {
    let approaches = state.approaches
    switch (action.type) {
    case ADD_PROPERTY:
        return state
    case DEL_PROPERTY:
        return state
    default:
        return state
    }
}