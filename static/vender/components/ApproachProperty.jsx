import React from 'react';
import $ from 'jquery';

import ApproachPropertyDetail from './ApproachPropertyDetail';

import {covertIntToBitArray, convertBitArrayToInt} from '../utils/common';

import './styles/approach-property';

class ApproachProperty extends React.Component {
    constructor(props) {
        super(props);

        this.multiSelect = this.props.meta.multiSelect;

        let valueList;
        if (this.props.value === null) {
            valueList = [];
        }
        else {
            if (this.multiSelect)
                valueList = covertIntToBitArray(this.props.value);
            else
                valueList = [this.props.value];
        }

        this.state = {
            valueList: valueList,
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
        nullable: false,
    }

    /**
     * Toggle the select status of {value}.
     */
    handleDetailClick(value: number) {
        let valueList = this.state.valueList;
        let indexOfValue = valueList.indexOf(value);
        if (this.multiSelect) {
            if (indexOfValue == -1) {
                valueList.push(value);
                this.setState({valueList: valueList});
            }
            else {
                if (valueList.length > 1 || this.props.nullable) {
                    valueList.splice(indexOfValue, 1);
                    this.setState({valueList: valueList});
                }
            }
        }
        else {
            if (indexOfValue == -1) {
                this.setState({valueList: [value]});
            }
            else if (this.props.nullable) {
                this.setState({valueList: []});
            }
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

    handleDetailDelete(deleteValue: number) {
        if (!confirm('Sure to delete?')) return;

        let metaDetails = this.props.meta.details;
        let deleteDetail = metaDetails.find(x => x.value == deleteValue);

        metaDetails.splice(metaDetails.indexOf(deleteDetail), 1);

        metaDetails.forEach(function(detail, index) {
            detail.value = index;
        }, this);

        let newValueList = [];
        this.state.valueList.forEach(function(value) {
            // value equals with deleteValue will be deleted
            // so it is not pushed to newValueArray.
            if (value < deleteValue) {
                newValueList.push(value);
            }
            else if (value > deleteValue) {
                // decrease value(s) by 1 which larger than deleteValue.
                newValueList.push(value - 1);
            }
        }, this);
        this.setState({valueList: newValueList});

        this.props.onRefresh();
        return true;
    }

    toggleDetails() {
        let $body = $(this.refBody);
        $body.slideToggle(150, () => {
            this.setState({bodyHidden: $body.css('display') == 'none' ? true : false});
        });
    }

    render() {
        let hasSelectedDetail = false;
        let valueList = $.extend([], this.state.valueList);

        let detailItems = this.props.meta.details.map(detail => {
            let indexOfValue = valueList.indexOf(detail.value);
            if (indexOfValue != -1) {
                valueList.splice(indexOfValue, 1);
                if (!hasSelectedDetail) hasSelectedDetail = true;
            }
            return (
                <ApproachPropertyDetail
                    key={detail.value}
                    value={detail.value}
                    name={detail.name}
                    selected={indexOfValue != -1}
                    description={detail.description}
                    onClick={this.handleDetailClick}
                    onSave={this.handleDetailSave}
                    onDelete={this.handleDetailDelete}
                />
            );
        });

        let noDetailSelectedMessage = (
            <div className="alert alert-info" role="alert">
                No item selected.
            </div>
        );

        let outOfRangeMessage = (
            <div className="alert alert-danger" role="alert">
                The range of value is out of the available detail items.
            </div>
        );

        let panelType = valueList.length > 0
            ? 'panel-danger'
            : !hasSelectedDetail
                ? 'panel-info'
                : 'panel-default';

        let navbarType = valueList.length > 0
            ? 'navbar-danger'
            : !hasSelectedDetail
                ? 'navbar-info'
                : 'navbar-default';

        return (
            <div className={'approach-property panel ' + panelType}>
                <div ref={(ref) => this.refHeading = ref} className="panel-heading">
                    <nav className={'navbar ' + navbarType}>
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <span className="navbar-brand">{this.props.meta.name}</span>
                                <button type="button" className="navbar-toggle" onClick={this.toggleDetails}>
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"/>
                                    <span className="icon-bar"/>
                                    <span className="icon-bar"/>
                                </button>
                            </div>
                            {/**<div className="collapse navbar-collapse" /> */}
                        </div>
                    </nav>
                </div>
                <div ref={(ref) => this.refBody = ref} className="panel-body">
                    {valueList.length == 0 ? '' : outOfRangeMessage}
                    {hasSelectedDetail ? '' : noDetailSelectedMessage}
                    <ul className="list-groups">
                        {detailItems}
                        <ApproachPropertyDetail onSave={this.handleDetailSave} />
                    </ul>
                </div>
            </div>
        );
    }
}

export default ApproachProperty;
