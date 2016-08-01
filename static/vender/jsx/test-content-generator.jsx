import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import {chinese} from './full-width-chars';

var css = require('../sass/test-helper.scss');

function hasValue(value) {
    return !(value == null || value == undefined || value == '');
}

function randomString(length, mix=true, byte=false) {
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

        var getHalfChar = (!mix || rest == 1) || Math.random() > 0.5;

        if (getHalfChar && false) {
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
        edage: React.PropTypes.number
    },
    getInitialState: function () {
        return {
            edage: this.props.edage,
            indrop: this.props.edage - 1,
            outdrop: this.props.edage + 1,
            indropText: randomString(this.props.edage - 1),
            edageText: randomString(this.props.edage),
            outdropText: randomString(this.props.edage + 1),
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
            <div className="test-text-set">
                <h4>{this.props.description}</h4>
                <input type="text" ref="edage" value={this.state.edage} onChange={this.handleChange} />
                <div>
                    <span className="">{this.state.indrop}</span>
                    <textarea cols="80" rows="3" value={this.state.indropText} readOnly></textarea>
                </div>
                <div>
                    <span>{this.state.edage}</span>
                    <textarea cols="80" rows="3" value={this.state.edageText} readOnly></textarea>
                </div>
                <div>
                    <span>{this.state.outdrop}</span>
                    <textarea cols="80" rows="3" value={this.state.outdropText} readOnly></textarea>
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
                lengthDict[length].description = lengthDict[length].description + ', ' + k;
            }
            else {
                lengthDict[length] = {description: k};
            }
        }

        var testTextSetList = [];
        for (var k in lengthDict) {
            testTextSetList.push(
                <TestSet key={k} description={lengthDict[k].description} edage={parseInt(k)} max={1000} min={1} />
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
