import React from 'react';
import ModalForm from './ModalForm';

import './styles/approach-property-list';

export default class ApproachPropertyList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    static propTypes = {
        elements: React.PropTypes.array.isRequired,
    }

    render() {
        var propertyItems = this.props.elements.map(x => {
            return <li className="list-group-item clearfix" key={x.code}>{x.code}</li>;
        });

        var content = (
            <ul id="prop-list" className="list-groups">
                {propertyItems}
            </ul>
        );

        return <ModalForm content={content} />;
    }
}