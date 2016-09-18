import React, {PropTypes} from 'react'

const ExpressStatus = ({expressInfo}) => {
    let elements = expressInfo.data.map((data, index) => {
        return (
            <div key={index} style={{display: 'table-row'}}>
                <span style={{display: 'table-cell', width: '150px'}}>{data.time}</span>
                <span>{data.context}</span>
            </div>
        )
    })

    function handleClick(event) {
        event.stopPropagation()
    }

    return (
        <div className="panel panel-primary" onClick={handleClick}>
            <div className="panel-heading">
            {expressInfo.com}
            </div>
            <div className="panel-body" style={{display: 'table'}}>
                {elements}
            </div>
        </div>
    )
}

ExpressStatus.propTypes = {
    expressInfo: PropTypes.object,
}

export default ExpressStatus
