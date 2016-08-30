import React from 'react';

import ApproachProperty from './ApproachProperty';
import ApproachPropertyList from './ApproachPropertyList';

import './styles/approach';

export default class Approach extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            properties: props.properties,
        };

        this.handleRefresh = this.handleRefresh.bind(this);
        this.getMetaProperty = this.getMetaProperty.bind(this);
    }

    static propTypes = {
        meta: React.PropTypes.array,
        properties: React.PropTypes.array,
        propertyNullable: React.PropTypes.bool,
        onRefresh: React.PropTypes.func,
    }

    getMetaProperty(code) {
        if (this.props.meta == null) return null;
        return this.props.meta.find(x => x.code == code);
    }

    handleRefresh() {
        this.props.onRefresh();
        return true;
    }

    render() {
        let propertyComponents = this.state.properties.map(property => {
            return (
                <ApproachProperty
                    key={property.code}
                    meta={this.getMetaProperty(property.code)}
                    value={property.value}
                    nullable={this.props.propertyNullable}
                    onRefresh={this.handleRefresh}
                />
            );
        });

        return (
            <div className="approach">
                {propertyComponents}
            </div>
        );
    }
}
