import React, {PropTypes} from 'react'

import ModalForm from './ModalForm'
import ExpressStatus from './ExpressStatus'

class ExpressStatusForm extends ModalForm {
    renderContent() {
        return <ExpressStatus expressInfo={this.props.expressInfo} />
    }
}

export default ExpressStatusForm
