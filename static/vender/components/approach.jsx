import React from 'react'
import ApproachProperty from './approach-property'


export default class Approach extends React.Component {
    render() {
        return (
            <div>
                <ApproachProperty title="税率/征收率" details={details} />
                <ApproachProperty title="税率/征收率" details={details} />
                <ApproachProperty title="税率/征收率" details={details} />
            </div>
        );
    }
}
