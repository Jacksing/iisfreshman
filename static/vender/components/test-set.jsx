import React from 'react';
import {randomString} from './rand-str'

function hasValue(value) {
    return !(value == null || value == undefined || value == '');
}

module.exports.TestSet = React.createClass({
    propTypes: {
        edage: React.PropTypes.number,
        mode: React.PropTypes.string.isRequired,
        byte: React.PropTypes.bool.isRequired,
    },
    getInitialState: function () {
        return {
            edage: this.props.edage,
            mode: this.props.mode,
            byte: this.props.byte,
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            byte: nextProps.byte,
            mode: nextProps.mode,
        })
    },
    handleChange: function (event) {
        var value = event.target.value;
        if (!hasValue(value)) {
            this.setState({edage: -1});
            return;
        }
        if (isNaN(value) || value > this.props.max || value < this.props.min) {
            return;
        }
        this.setState({edage: parseInt(value)});
    },
    render: function () {
        var indropText = randomString(this.state.edage - 1, this.state.mode, this.state.byte),
            edageText = randomString(this.state.edage, this.state.mode, this.state.byte),
        	outdropText = randomString(this.state.edage + 1, this.state.mode, this.state.byte);

        return (
            <div className="test-set panel panel-default">
                <div className="tags panel-heading">{this.props.tags.map((v, k) => <span key={k} className="text-uppercase">{v}</span>)}</div>
                <div className="panel-body">
                    <input className="edage" type="text" ref="edage" value={this.state.edage} onChange={this.handleChange} />
                    <div>
                        <span className="title indrop">{this.state.edage - 1}</span>
                        <textarea className="text indrop" cols="80" rows="3" value={indropText} readOnly></textarea>
                        <button className="btn btn-default" data-clipboard-text={indropText}>Copy</button>
                    </div>
                    <div>
                        <span className="title edage">{this.state.edage}</span>
                        <textarea className="text edage" cols="80" rows="3" value={edageText} readOnly></textarea>
                        <button className="btn btn-default" data-clipboard-text={edageText}>Copy</button>
                    </div>
                    <div>
                        <span className="title outdrop">{this.state.edage + 1}</span>
                        <textarea className="text outdrop" cols="80" rows="3" value={outdropText} readOnly></textarea>
                        <button className="btn btn-default" data-clipboard-text={outdropText}>Copy</button>
                    </div>
                </div>
            </div>
        );
    },
});
