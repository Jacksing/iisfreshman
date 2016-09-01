import React from 'react';
import $ from 'jquery';

import './styles/modal-form';

export default class ModalForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    static propTypes = {
        content: React.PropTypes.any.isRequired,
    }

    componentDidMount() {
        $(document.body).css('overflow', 'hidden');
    }

    stopPropagation(event) {
        event.stopPropagation();
    }

    handleClose() {
        var $self = $(this.self);
        $self.find('.g_modal_wrap').fadeOut(150, function() {
            $self.remove();
            $(document.body).css('overflow', '');
        });
    }

    render() {
        let content = this.renderContent ? this.renderContent() : null; 

        return (
            <div ref={(c) => this.self = c} className="g_modal" onClick={this.handleClose}>
                <div className="g_modal_cell">
                    <div ref={(c) => this.g_modal_wrap = c} className="g_modal_wrap">
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}