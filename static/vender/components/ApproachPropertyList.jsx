import React from 'react';
import ModalForm from './ModalForm';

import './styles/approach-property-list';

export default class ApproachPropertyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };

        this.handleClick = this.handleClick.bind(this);
    }
    
    static propTypes = {
        elements: React.PropTypes.array.isRequired,
        onSelect: React.PropTypes.func,
    }

    handleClick(code) {
        return event => {
            if (this.props.onSelect == null) {
                event.stopPropagation();
            }
            else {
                let ret = this.props.onSelect(code);
                if (ret) {
                    this.setState({message: ret});
                    event.stopPropagation();
                }
                else {
                    this.setState({message: ''});
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

    stopPropagation(event) {
        // event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
    }

    render() {
        var propertyItems = this.props.elements.map(x => {
            return <li className="list-group-item clearfix" key={x.code} onClick={this.handleClick(x.code)}>{x.name}</li>;
        });

        var content = (
            <div id="prop-list" onClick={this.stopPropagation} >
                {this.state.message ? this.getMessage(this.state.message) : ''}
                <ul className="list-groups">
                    {propertyItems}
                </ul>
            </div>
        );

        return <ModalForm content={content} />;
    }
}