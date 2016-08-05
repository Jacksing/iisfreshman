import React from 'react'
import $ from 'jquery'

import './styles/approach-property'

class ApproachPropertyDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        name: React.PropTypes.string,
        value: React.PropTypes.number,
        description: React.PropTypes.string,
        selected: React.PropTypes.bool,
        onClick: React.PropTypes.func,
    }

    static defaultProps = {
        selected: false
    }

    render() {
        let active = this.props.selected ? 'list-group-item active' : 'list-group-item';
        return (
            <li className={active} data-value={this.props.value} onClick={this.props.onClick}>
                <h4 className="list-group-item-heading">{this.props.name}</h4>
                <p className="list-group-item-text">{this.props.description}</p>
            </li>
        );
    }
}

class ApproachPropertyDetailCreater extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'button'
        };
    }


    static propTypes = {
        mode: React.PropTypes.string,
        onCreate: React.PropTypes.func,
        onSave: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }

    handleOnSwitchCreate() {
        this.setState({mode: 'input'});
    }

    handleOnSave() {
        return false;
    }

    handleOnCancel(event) {
        this.setState({mode: 'button'});
        event.preventDefault();
    }

    render() {
        if (this.state.mode == 'button') {
            return <li className="list-group-item add-button" onClick={this.handleOnSwitchCreate.bind(this)}><span>+</span></li>;
        }

        // mode == 'input'
        return (
            <li className="list-group-item creater">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="name" className="col-sm-2 control-label">Name</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="name" placeholder="Name" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="col-sm-2 control-label">Description</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="description" placeholder="Description" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default" onSubmit={() => {return false;}} onClick={this.handleOnSave.bind(this)}>Save</button>
                        <button type="submit" className="btn btn-default" onClick={this.handleOnCancel.bind(this)}>Cancel</button>
                        </div>
                    </div>
                </form>
            </li>
        );
    }
}

class ApproachProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            mode: 'button',
        };
    }

    static propTypes = {
        title: React.PropTypes.string,
        details: React.PropTypes.array,
        value: React.PropTypes.number,
        nullable: React.PropTypes.bool,
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

    toggleDetails() {
        $(this.refs.body).slideToggle(250);
    }

    render() {
        let selected = false;
        let detailItems = this.props.details.map(detail => {
            if (!selected && detail.value == this.state.value) {
                selected = true;
            }
            return (
                <ApproachPropertyDetail key={detail.value}
                                        value={detail.value}
                                        selected={detail.value == this.state.value}
                                        name={detail.name}
                                        description={detail.description}
                                        onClick={this.handleDetailOnClick.bind(this, detail)} />
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
                                <span className="navbar-brand">{this.props.title}</span>
                            </div>
                            <div className="collapse navbar-collapse">
                                <input className="btn btn-default navbar-btn navbar-right"
                                       type="button"
                                       value="Hide"
                                       onClick={this.toggleDetails.bind(this)} />
                            </div>
                        </div>
                    </nav>
                </div>
                <div ref="body" className="panel-body">
                    {selected ? '' : nonSelectedMsg}
                    <ul className="list-groups">
                        {detailItems}
                        <ApproachPropertyDetailCreater />
                    </ul>
                </div>
            </div>
        );
    }
}

export default ApproachProperty;
