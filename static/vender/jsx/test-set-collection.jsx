import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import Clipboard from 'clipboard'

import {chinese} from './full-width-chars';

require('../sass/base');
require('../sass/test-helper');

function hasValue(value) {
    return !(value == null || value == undefined || value == '');
}

/*
 * @param length The number of the length of the result string.
 * @param mode ('full' or 'half' or 'mix') to get a full-width or half-width or full/half-mixed result.
 * @param byte ('true' or 'false') Length of string is count by byte or character.
 */
function randomString(length, mode='full', byte=false) {
    var randomChineseChar = () => {
        // parts of chinese char field.
        var charFrom = 19968,
            charTo = 20968,
            maxLen = charTo - charFrom;
        return String.fromCharCode(charFrom + Math.floor(Math.random() * maxLen));
    };

    var randomFullWidthChar = () => {
        return chinese[Math.floor(Math.random() * chinese.length)];
    };

    var randomHalfChar = () => {
        var strRepo = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        return strRepo.charAt(Math.floor(Math.random() * strRepo.length));
    };

    var rest = length;
    var resultStr = '';

    while (true) {
        if (rest == 0) {
            break;
        }

        var getHalfChar = mode =='half'
            || (rest == 1 && byte)
            || (mode == 'mix' && Math.random() > 0.5);

        if (getHalfChar) {
            resultStr += randomHalfChar();
            rest--;
        }
        else {
            resultStr += randomFullWidthChar();
            rest -= byte ? 2 : 1;
        }
    }
    return resultStr;
}

var TestSet = React.createClass({
    propTypes: {
        edage: React.PropTypes.number,
        mode: React.PropTypes.string.isRequired,
        byte: React.PropTypes.bool.isRequired,
    },
    getInitialState: function () {
        return {
            edage: this.props.edage,
            indrop: this.props.edage - 1,
            outdrop: this.props.edage + 1,
            indropText: randomString(this.props.edage - 1, this.props.mode, this.props.byte),
            edageText: randomString(this.props.edage, this.props.mode, this.props.byte),
            outdropText: randomString(this.props.edage + 1, this.props.mode, this.props.byte),
        }
    },
    handleChange: function (event) {
        var value = event.target.value;
        if (!hasValue(value)) {
            this.setState({
                edage: '',
                indrop: '',
                outdrop: '',
                indropText: '',
                edageText: '',
                outdropText: '',
            });
            return;
        }
        if (isNaN(value) || value > this.props.max || value < this.props.min) {
            return;
        }
        var edage = parseInt(value);
        this.setState({
            edage: edage,
            indrop: edage - 1,
            outdrop: edage + 1,
            indropText: randomString(edage - 1),
            edageText: randomString(edage),
            outdropText: randomString(edage + 1),
        });
    },
    render: function () {
        return (
            <div className="test-set">
                <div className="tags">{this.props.tags.map((v, k) => <span key={k}>{v}</span>)}</div>
                <input className="edage" type="text" ref="edage" value={this.state.edage} onChange={this.handleChange} />
                <div>
                    <span className="title indrop">{this.state.indrop}</span>
                    <textarea className="text indrop" cols="80" rows="3" value={this.state.indropText} readOnly></textarea>
                    <button className="copy-btn" data-clipboard-text={this.state.indropText}>Copy</button>
                </div>
                <div>
                    <span className="title edage">{this.state.edage}</span>
                    <textarea className="text edage" cols="80" rows="3" value={this.state.edageText} readOnly></textarea>
                    <button className="copy-btn" data-clipboard-text={this.state.edageText}>Copy</button>
                </div>
                <div>
                    <span className="title outdrop">{this.state.outdrop}</span>
                    <textarea className="text outdrop" cols="80" rows="3" value={this.state.outdropText} readOnly></textarea>
                    <button className="copy-btn" data-clipboard-text={this.state.outdropText}>Copy</button>
                </div>
            </div>
        );
    },
});

var TestSetCollection = React.createClass({
    getInitialState: function() {
        return {
            loading: true,
            error: null,
            data: null,
        }
    },

    componentDidMount: function () {
        this.props.promise.then(
            value => this.setState({loading: false, data: value}),
            error => this.setState({loading: false, error: error})
        );
        var clipboard = new Clipboard('.copy-btn');
    },

    render: function () {
        if (this.state.loading) {
            return <div>Loading...</div>
        }
        else if (this.state.error != null) {
            return <div>Error: {this.state.error.message}</div>
        }

        var lengthDict = {};
        var data = this.state.data;
        for (var k in data) {
            var length = data[k]['length'];
            if (length in lengthDict) {
                lengthDict[length].tags.push(k);
            }
            else {
                lengthDict[length] = {tags: [k]};
            }
        }

        var testTextSetList = [];
        for (var k in lengthDict) {
            testTextSetList.push(
                <TestSet key={k} tags={lengthDict[k].tags} edage={parseInt(k)} max={1000} min={1} mode="full" byte={true} />
            )
        }

        return (
            <div>{testTextSetList}</div>
        );
    }
});

$(function() {
    ReactDom.render(
        // <TestSet edage={10} max={1000} min={1} />,
        <TestSetCollection promise={$.getJSON(data_url)} />,
        document.getElementById("example")
    );
});
