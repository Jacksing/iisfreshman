import React from 'react';
import ReactDom from 'react-dom';

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
        this.handleShowPropertyList = this.handleShowPropertyList.bind(this);
        this.handleAddProperty = this.handleAddProperty.bind(this);
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

    handleAddProperty(code) {
        let properties = this.state.properties;
        if (properties.find(x => x.code == code)) {
            return 'Already had property <' + this.props.meta.find(x => x.code == code).name + '>.';
        }
        properties.push({code: code, value: -1});
        this.setState({properties: properties});
        return '';
    }

    handleShowPropertyList() {
        ReactDom.render(
            <ApproachPropertyList elements={this.props.meta} onSelect={this.handleAddProperty} />,
            this.refPopupContainer
        );
    }

    render() {
        let propertyComponents = this.state.properties.sort((x, y) => x.code > y.code).map(property => {
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
                <input type="button" className="btn btn-default" onClick={this.handleShowPropertyList} value="Add Property" />
                <div ref={(ref) => this.refPopupContainer = ref} />
                {propertyComponents}
            </div>
        );
    }
}
