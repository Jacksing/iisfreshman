import React from 'react'
import ModalForm from './ModalForm'

import {AlertDanger} from './doodad'

import './styles/approach-property-list'

export default class ApproachPropertyList extends ModalForm {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
        }

        this.handleItemClick = this.handleItemClick.bind(this)
    }
    
    static propTypes = {
        elements: React.PropTypes.array.isRequired,
        onItemClick: React.PropTypes.func,
    }

    handleItemClick(code) {
        return () => {
            let {onItemClick, onClosing} = this.props
            if (onItemClick != null) {
                let result = onItemClick(code)
                if (result.message) {
                    this.setState({ message: result.message })
                }
                else {
                    this.setState({ message: '' })
                    this.handleClose()
                }
            }
        }
    }

    renderContent() {
        var propertyItems = this.props.elements.sort((x, y) => x.code > y.code).map(x => {
            return <li className="list-group-item clearfix" key={x.code} onClick={this.handleItemClick(x.code)}>{x.name}</li>
        })

        return (
            <div id="prop-list" className="panel panel-primary" onClick={this.stopPropagation} >
                <div className="panel-heading">Properties</div>
                <div className="panel-body">
                    {this.state.message ? <AlertDanger message={this.state.message} /> : ''}
                    <ul className="list-groups">
                        {propertyItems}
                    </ul>
                </div>
            </div>
        )
    }
}