import {ADD_DETAL, MOD_DETAIL, DEL_DETAIL} from '../constants/MetaDetailActions'

export default function metaDetail(state, action) {
    let details = state.meta.find(m => m.code == action.code).details
    let detail
    switch (action.type) {
    case ADD_DETAL:
        details.push({
            value: details.length,
            name: action.name,
            description: action.description,
        })
        return state

    case MOD_DETAIL:
        detail = details.find(d => d.value == action.value)
        detail.name = action.name
        detail.description = action.description
        return state

    case DEL_DETAIL:
        detail = details.find(d => d.value == action.value)
        details
            .splice(details.indexOf(detail), 1)
            .forEach((d, i) => d.value = i)
        return state
    }
}