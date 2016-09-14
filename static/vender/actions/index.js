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

export const addProperty = (code) => {
    return {
        type: ADD_PROPERTY,
        code,
    }
}

export const delProperty = (code) => {
    return {
        type: DEL_PROPERTY,
        code,
    }
}

export const setPropertyValue = (index, value) => {
    return {
        type: SET_PROPERTY_VALUE,
        index,
        value,
    }
}