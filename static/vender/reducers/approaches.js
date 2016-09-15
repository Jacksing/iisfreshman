import $ from 'jquery'

import {ADD_PROPERTY, DEL_PROPERTY, SET_PROPERTY_VALUE} from '../constants/ApproachActions'
import {approaches as data} from '../tests/test-data'

const approaches = (state=data, action) => {
    let index
    // let approachIndex, propertyIndex, value
    state = $.extend(true, [], state)

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

    case SET_PROPERTY_VALUE:
        state[action.approachIndex][action.propertyIndex].value = action.value
        return state

    default:
        return state
    }
}

export default approaches