import React from 'react';

import './styles/approach-property-list';

import {meta} from './test-data';

export default class ApproachPropertyList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="prop-list">
                {
                    React.Children.map(meta, function() {
                        return <span>{meta.code}</span>;
                    })
                }
            </div>
        );
    }
}