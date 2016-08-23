import React from 'react';
import $ from 'jquery';

import ApproachPropertyDetail from './ApproachPropertyDetail';

import './styles/approach-property';

class ApproachProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            bodyHidden: true,
        };
        
        this.handleDetailClick = this.handleDetailClick.bind(this);
        this.handleDetailSave = this.handleDetailSave.bind(this);
        this.handleDetailDelete = this.handleDetailDelete.bind(this);
        this.toggleDetails = this.toggleDetails.bind(this);
    }

    static propTypes = {
        meta: React.PropTypes.object,
        value: React.PropTypes.number,
        nullable: React.PropTypes.bool,
        onRefresh: React.PropTypes.func.isRequired,
    }

    static defaultProps = {
        nullable: false
    }

    handleDetailClick(value) {
        if (value != this.state.value) {
            this.setState({
                value: value,
            });
        }
        else if (this.props.nullable) {
            this.setState({
                value: -1
            });
        }
    }

    handleDetailSave(detail) {
        var {value, name, description, ...other} = detail;

        let metaDetails = this.props.meta.details;

        if (value === undefined) {
            let newValue = metaDetails.length;
            metaDetails.push({
                value: newValue,
                name: name,
                description: description,
            });
        }
        else {
            let metaDetail = metaDetails.find(x => x.value == value);
            metaDetail.name = name;
            metaDetail.description = description;
        }

        this.props.onRefresh();
        return true;
    }

    handleDetailDelete(value) {
        if (!confirm('Sure to delete?')) return;

        let metaDetails = this.props.meta.details;
        let toDelete = metaDetails.find(x => x.value == value);

        metaDetails.splice(metaDetails.indexOf(toDelete), 1);

        this.props.onRefresh();
        return true;
    }

    toggleDetails() {
        let $body = $(this.refs.body);
        $body.slideToggle(150, () => {
            this.setState({bodyHidden: $body.css('display') == 'none' ? true : false});
        });
    }

    render() {
        let selected = false;
        let detailItems = this.props.meta.details.map(detail => {
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
                    onClick={this.handleDetailClick}
                    onSave={this.handleDetailSave}
                    onDelete={this.handleDetailDelete}
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
                                <span className="navbar-brand">{this.props.meta.name}</span>
                            </div>
                            <div className="collapse navbar-collapse">
                                <input 
                                    className="btn btn-default navbar-btn navbar-right"
                                    type="button"
                                    value={this.state.bodyHidden ? 'Show' : 'Hide'}
                                    onClick={this.toggleDetails}
                                />
                            </div>
                        </div>
                    </nav>
                </div>
                <div ref="body" className="panel-body">
                    {selected ? '' : nonSelectedMsg}
                    <ul className="list-groups">
                        <ApproachPropertyDetail onSave={this.handleDetailSave} />
                        {detailItems}
                        <ApproachPropertyDetail onSave={this.handleDetailSave} />
                    </ul>
                </div>
            </div>
        );
    }
}

export default ApproachProperty;
