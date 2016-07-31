var React = require('react');
var ReactDom = require('react-dom');
var $ = require('jquery');

var fullWidthChars = require('./full-width-chars');

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
        return fullWidthChars.chinese[Math.floor(Math.random() * fullWidthChars.chinese.length)];
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

var TradePattern = React.createClass({
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
            <div className="trade-pattern">
                <input type="text" ref="edage" value={this.state.edage} onChange={this.handleChange} />
                <div>
                    <span>{this.state.indrop}</span>
                    <textarea name="" id="" cols="100" rows="5" value={this.state.indropText} readOnly></textarea>
                </div>
                <div>
                    <span>{this.state.edage}</span>
                    <textarea name="" id="" cols="100" rows="5" value={this.state.edageText} readOnly></textarea>
                </div>
                <div>
                    <span>{this.state.outdrop}</span>
                    <textarea name="" id="" cols="100" rows="5" value={this.state.outdropText} readOnly></textarea>
                </div>
            </div>
        );
    },
});

$(function() {
    ReactDom.render(
        <TradePattern edage={10} max={1000} min={1} />,
        document.getElementById("example")
    );
});