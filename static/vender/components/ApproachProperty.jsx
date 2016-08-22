import React from 'react';
import $ from 'jquery';

import ApproachPropertyDetail from './ApproachPropertyDetail'

import './styles/approach-property';

class ApproachProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        };
        
        // this.handleDetailOnClick = this.handleDetailOnClick.bind(this);
        this.handleDetailOnSave = this.handleDetailOnSave.bind(this);
        this.toggleDetails = this.toggleDetails.bind(this);
    }

    static propTypes = {
        data: React.PropTypes.object,
        value: React.PropTypes.number,
        nullable: React.PropTypes.bool,
        onSave: React.PropTypes.func,
    }

    static defaultProps = {
        nullable: false
    }

    handleDetailOnClick(detail) {
        if (detail.value != this.state.value) {
            this.setState({
                value: detail.value,
            });
        }
        else if (this.props.nullable) {
            this.setState({
                value: -1
            });
        }
    }

    handleDetailOnSave(data) {
        var {value, name, description, ...other} = data;
        return this.props.onSave({
            index: this.props.data.index,
            value: value,
            name: name,
            description: description,
        });
    }

    toggleDetails() {
        $(this.refs.body).slideToggle(250);
    }

    render() {
        let selected = false;
        let detailItems = this.props.data.details.map(detail => {
            if (!selected && detail.value == this.state.value) {
                selected = true;
            }
            return (
                <ApproachPropertyDetail
                    key={detail.value}
                    value={detail.value}
                    name={detail.name}
                    selected={detail.value == this.state.value}
                    description={detail.description}
                    onClick={this.handleDetailOnClick.bind(this, detail)}
                    onSave={this.handleDetailOnSave}
                />
            );
        });

        let nonSelectedMsg = (
            <div className="alert alert-danger" role="alert">
                <strong>Oh snap!</strong> Change a few things up and try submitting again.
            </div>
        );

        return (
            <div className={'approach-property panel ' + (selected ? 'panel-default' : 'panel-danger')}>
                <div ref="heading" className="panel-heading">
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <span className="navbar-brand">{this.props.data.name}</span>
                            </div>
                            <div className="collapse navbar-collapse">
                                <input 
                                    className="btn btn-default navbar-btn navbar-right"
                                    type="button"
                                    value="Hide"
                                    onClick={this.toggleDetails}
                                />
                            </div>
                        </div>
                    </nav>
                </div>
                <div ref="body" className="panel-body">
                    {selected ? '' : nonSelectedMsg}
                    <ul className="list-groups">
                        <ApproachPropertyDetail onSave={this.handleDetailOnSave} />
                        {detailItems}
                        <ApproachPropertyDetail onSave={this.handleDetailOnSave} />
                    </ul>
                </div>
            </div>
        );
    }
}

export default ApproachProperty;
