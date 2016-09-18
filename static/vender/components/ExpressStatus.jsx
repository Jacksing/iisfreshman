import React, {PropTypes} from 'react'

const ExpressStatus = ({expressInfo}) => {
    let elements = expressInfo.data.map((data) => {
        return (
            <div>
                <span>{data.time}</span>
                <span>{data.context}</span>
            </div>
        )
    })

    return (
        <div>{elements}</div>
    )
}

ExpressStatus.propTypes = {
    expressInfo: PropTypes.object,
}

export default ExpressStatus
