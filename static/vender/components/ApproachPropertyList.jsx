import React from 'react';
import ModalForm from './ModalForm';

import './styles/approach-property-list';

export default class ApproachPropertyList extends ModalForm {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };

        this.handleSelect = this.handleSelect.bind(this);
    }
    
    static propTypes = {
        elements: React.PropTypes.array.isRequired,
        onSelect: React.PropTypes.func,
    }

    handleSelect(code) {
        return () => {
            if (this.props.onSelect != null) {
                let ret = this.props.onSelect(code);
                if (ret) {
                    this.setState({message: ret});
                }
                else {
                    this.setState({message: ''});
                    this.handleClose();
                }
            }
        };
    }

    getMessage(message) {
        return (
            <div className="alert alert-danger" role="alert">
                {message}
            </div>
        );
    }

    renderContent() {
        var propertyItems = this.props.elements.sort((x, y) => x.code > y.code).map(x => {
            return <li className="list-group-item clearfix" key={x.code} onClick={this.handleSelect(x.code)}>{x.name}</li>;
        });

        return (
            <div id="prop-list" className="panel panel-primary" onClick={this.stopPropagation} >
                <div className="panel-heading">Properties</div>
                <div className="panel-body">
                    {this.state.message ? this.getMessage(this.state.message) : ''}
                    <ul className="list-groups">
                        {propertyItems}
                    </ul>
                </div>
            </div>
        );
    }
}