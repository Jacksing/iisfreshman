import {ADD_META_DETAL, MOD_META_DETAIL, DEL_META_DETAIL} from '../constants/MetaDetailActions'
import {ADD_PROPERTY, DEL_PROPERTY} from '../constants/PropertyActions'

export const addMetaDetail = (code, name, description) => {
    return {
        type: ADD_META_DETAL,
        name,
        description,
    }
}

export const modMetaDetail = (code, value, name, description) => {
    return {
        type: MOD_META_DETAIL,
        value,
        name,
        description,
    }
}

export const delMetaDetail = (code, value) => {
    return {
        type: DEL_META_DETAIL,
        code,
        value,
    }
}

export const addProperty = () => {

}

export const delProperty = () => {

}
