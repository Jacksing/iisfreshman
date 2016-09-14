import {ADD_DETAIL, MOD_DETAIL, DEL_DETAIL} from '../constants/MetaActions'
import {ADD_PROPERTY, DEL_PROPERTY, SET_PROPERTY_VALUE} from '../constants/ApproachActions'

export const addMetaDetail = (code, name, description) => {
    return {
        type: ADD_DETAIL,
        code,
        name,
        description,
    }
}

export const modMetaDetail = (code, value, name, description) => {
    return {
        type: MOD_DETAIL,
        code,
        value,
        name,
        description,
    }
}

export const delMetaDetail = (code, value) => {
    return {
        type: DEL_DETAIL,
        code,
        value,
    }
}

// +++++++++++++++++++++++++++++++
//   Approach actions
// +++++++++++++++++++++++++++++++

export const addProperty = (approachIndex, code) => {
    return {
        type: ADD_PROPERTY,
        approachIndex,
        code,
    }
}

export const delProperty = (approachIndex, code) => {
    return {
        type: DEL_PROPERTY,
        approachIndex,
        code,
    }
}

export const setPropertyValue = (approachIndex, propertyIndex, value) => {
    return {
        type: SET_PROPERTY_VALUE,
        approachIndex,
        propertyIndex,
        value,
    }
}
