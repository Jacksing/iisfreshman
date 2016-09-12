import {ADD_DETAL, MOD_DETAIL, DEL_DETAIL} from '../constants/MetaActions'
import {ADD_PROPERTY, DEL_PROPERTY} from '../constants/ApproachActions'

export const addMetaDetail = (code, name, description) => {
    return {
        type: ADD_DETAL,
        name,
        description,
    }
}

export const modMetaDetail = (code, value, name, description) => {
    return {
        type: MOD_DETAIL,
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
