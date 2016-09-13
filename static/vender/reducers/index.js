import {combineReducers} from 'redux'
import approaches from './approaches'
import metaCollection from './metaCollection'

const approachApp = combineReducers({
    approaches,
    metaCollection,
})

export default approachApp
