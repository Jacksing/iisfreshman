import React from 'react';
import $ from 'jquery';

import './styles/modal-form';

export default class ModalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: ''
        };

        this.handleClick = this.handleClick.bind(this);
    }

    static propTypes = {
        content: React.PropTypes.any.isRequired
    }

    handleClick() {
        this.setState({hide: 'hide'});
    }

    render() {
        var className = 'g_modal ' + this.state.hide;
        return (
            <div className={className} onClick={this.handleClick}>
                <div className="g_modal_cell">
                    <div className="g_modal_wrap">
                        {this.props.content}
                    </div>
                </div>
            </div>
        );
    }
}