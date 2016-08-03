import React from 'react';
import Clipboard from 'clipboard'

import {TestSet} from './test-set'
import ApproachProperty from './rismo/approach-property'

module.exports.TestSetCollection = React.createClass({
    getInitialState: function() {
        return {
            loading: true,
            error: null,
            data: null,
            mode: this.props.mode,
            byte: this.props.byte,
        }
    },
    componentDidMount: function () {
        this.props.promise.then(
            value => this.setState({loading: false, data: value}),
            error => this.setState({loading: false, error: error})
        );
        var clipboard = new Clipboard('.btn-default');
    },
    handleCountAsByte: function(event) {
        this.setState({
            byte: event.target.checked,
        });
    },
    handleModeChange: function(event) {
        this.setState({
            mode: event.target.value,
        });
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
            if (data[k]['type'] != 'nvarchar') continue;

            var length = data[k]['length'] / 2;
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
                <TestSet ref="TestSet" key={k} tags={lengthDict[k].tags} edage={parseInt(k)} max={1000} min={1} mode={this.state.mode} byte={this.state.byte} />
            )
        }

        let details = [
            {code: 0, value: '0%(税率)', description: '0%(税率)'},
            {code: 1, value: '3%(税率)', description: '3%(税率)'},
            {code: 2, value: '6%(税率)', description: '6%(税率)'},
            {code: 3, value: '11%(税率)', description: '11%(税率)'},
            {code: 4, value: '13%(税率)', description: '13%(税率)'},
            {code: 5, value: '17%(税率)', description: '17%(税率)'},
            {code: 6, value: '3%(征收率)', description: '3%(征收率)'},
            {code: 7, value: '4%(征收率)', description: '4%(征收率)'},
            {code: 8, value: '5%(征收率)', description: '5%(征收率)'},
            {code: 9, value: '6%(征收率)', description: '6%(征收率)'},
            {code: 10, value: '不适用', description: '不适用'},
        ];

        return (
            <div>
                <ApproachProperty title="税率/征收率" details={details} />
                <div className="ctl-panel">
                    <label htmlFor="count-as-byte"><input id="count-as-byte" type="checkbox" onClick={this.handleCountAsByte}/>Count as Byte</label>
                    <select name="" onChange={this.handleModeChange}>
                        <option value="full">Full-Width Chars</option>
                        <option value="half">Half-Width Chars</option>
                        <option value="mix">Mixed Chars</option>
                    </select>
                </div>
                {testTextSetList}
            </div>
        );
    }
});
