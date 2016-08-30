import React from 'react';

import Approach from './Approach';
import ApproachPropertyList from './ApproachPropertyList';

import {meta, approaches} from './test-data';

export default class ApproachCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            meta: null,
            approaches: null,
            error: null,
        };

        this.handleRefresh = this.handleRefresh.bind(this);
    }

    static propTypes = {
        promise: React.PropTypes.any,
        meta: React.PropTypes.any,
        propertyNullable: React.PropTypes.bool,
    }

    static defaultProps = {
        propertyNullable: false,  // Property can be left unselected or not.
    }

    handleRefresh() {
        this.setState({meta: this.state.meta});
    }

    // Get json data through web api, otherwise use the test data.
    componentDidMount() {
        this.props.promise.then(
            value => this.setState({loading: false, meta: value.meta, approaches: value.elements}),
            error => this.setState({loading: false, error: error, meta: meta, approaches: approaches})
        );
    }

    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        }

        let approachComponents = this.state.approaches.map((approach, index) => {
            return (
                <Approach
                    key={index}
                    meta={this.state.meta}
                    properties={approach.filter(x => x.value != null)}  // Excluded approach(es) that not configured properly.
                    propertyNullable={this.props.propertyNullable}
                    onRefresh={this.handleRefresh}
                />
            );
        });

        return (
            <div>
                {approachComponents}
                <ApproachPropertyList elements={this.state.meta}/>
            </div>
        );
    }
}