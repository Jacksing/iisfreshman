import React from 'react'

import $ from 'jQuery'

import ModalForm from './doodad/ModalForm'
import ExpressStatus from './ExpressStatus'

class ExpressStatusForm extends ModalForm {
    onClose() {
        // $('data-reactroot')
    }

    renderContent() {
        return <ExpressStatus expressInfo={this.props.expressInfo} />
    }
}

export default ExpressStatusForm
