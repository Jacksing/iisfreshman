import React, {PropTypes} from 'react'
import $ from 'jquery'

const Text = ({store}) => {
    function rerender() {
        $('#state-info').val(JSON.stringify(store.getState(), null, 2))
    }

    store.subscribe(rerender)

    return (
        <div style={{height: '200px'}}>
            <textarea
                id="state-info"
                style={{width: '100%', height: '200px', position: 'fixed', top: 0, zIndex: '99'}}
                value={JSON.stringify(store.getState(), null, 2)}
                readOnly
            />
        </div>
    )
}

Text.propTypes = {
    store: PropTypes.any,
}

export default Text
