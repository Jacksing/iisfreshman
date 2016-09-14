import {PropTypes} from 'react'
import {connect} from 'react-redux'

import {covertIntToBitArray, convertBitArrayToInt} from '../utils/common'

import {setPropertyValue} from '../actions'
import {default as Presentation} from '../components/ApproachProperty'

const getValueList = (value, multiSelect) => {
    if (value === undefined)
        return undefined
    else if (multiSelect)
        return covertIntToBitArray(value)
    else
        return [value]
}

const mapStateToProps = (state, ownProps) => {
    let meta = state.metaCollection.find(meta => meta.code == ownProps.code)
    let multiSelect = meta.multiSelect
    return {
        meta: meta,
        multiSelect: multiSelect,
        valueList: getValueList(ownProps.value, multiSelect)
    }
}

const handleDetailClick = (dispatch, multiSelect) => {
    if (multiSelect) {
        
    } else {
        dispatch(setPropertyValue())
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onDetailClick: handleDetailClick,
    }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {

    }
}

const ApproachProperty = connect(
    mapStateToProps,
    mapDispatchToProps
)(Presentation)

ApproachProperty.propTypes = {
    code: PropTypes.string.isRequired,
    value: PropTypes.number,
}

ApproachProperty.defaultProps = {
    value: undefined,
}

export default ApproachProperty
