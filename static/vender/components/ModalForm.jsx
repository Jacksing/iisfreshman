import React from 'react';
import $ from 'jquery';

import './styles/modal-form';

export default class ModalForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleStopPropagation = this.handleStopPropagation.bind(this);
    }

    static propTypes = {
        content: React.PropTypes.any.isRequired,
    }

    componentDidMount() {
        // window.console.log('ModalForm did componentDidMount.');
        // $(this.g_modal_wrap).children().on('click', this.handleStopPropagation);
        $(document.body).css('overflow', 'hidden');
    }

    handleClick() {
        var $self = $(this.self);
        $self.find('.g_modal_wrap').fadeOut(150, function() {
            $self.remove();
            $(document.body).css('overflow', '');
        });
    }

    // Not in use.
    // If stop propagation is needed, content component events can stop propagation by itself.
    handleStopPropagation(event) {
        event.stopPropagation();
    }

    render() {
        return (
            <div ref={(c) => this.self = c} className="g_modal" onClick={this.handleClick}>
                <div className="g_modal_cell">
                    <div ref={(c) => this.g_modal_wrap = c} className="g_modal_wrap">
                        {this.props.content}
                    </div>
                </div>
            </div>
        );
    }
}