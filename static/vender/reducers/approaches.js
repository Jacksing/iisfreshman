import {ADD_PROPERTY, DEL_PROPERTY} from '../constants/ApproachActions'
import {approaches as data} from '../components/test-data'

const approaches = (state=data, action) => {
    let index

    switch (action.type) {
    case ADD_PROPERTY:
        return [
            ...state,
            {code: action.code, value: undefined}
        ]

    case DEL_PROPERTY:
        index = state.indexOf(state.find(a => a.code == action.code))
        if (index == -1) return state 
        state.splice(index, 1)
        return state

    default:
        return state
    }
}

export default approaches