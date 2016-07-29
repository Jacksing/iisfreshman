var React = require('react');
var ReactDom = require('react-dom');
var $ = require('jquery');

var HelloMessage = React.createClass({
    render: function() {
        return <h1>Hello {this.props.name}</h1>
    },
});

var TradePattern = React.createClass({
    propTypes: {
        edage: React.PropTypes.number
    },
    getInitialState: function () {
        return {
            edage: this.props.edage,
        }
    },
    handleChange: function (event) {
        this.setState({
            edage: event.target.value,
        });
    },
    render: function () {
        return (
            <div className="trade-pattern">
                <input type="text" ref="indrop" value={this.state.edage - 1} readOnly />
                <input type="text" ref="edage" value={this.state.edage} onChange={this.handleChange} />
                <input type="text" ref="outdrop" value={this.state.edage + 1} readOnly />
            </div>
        );
    },
});

// $(function() {
//     ReactDom.render(
//         <HelloMessage name="jacksing" />,
//         document.getElementById("example")
//     );
// });

$(function() {
    ReactDom.render(
        <TradePattern edage={10} />,
        document.getElementById("example")
    );
});