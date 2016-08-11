import React from 'react'
import $ from 'jquery'

import './styles/approach-property'

class ApproachPropertyDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            name: props.name,
            description: props.description,
        };
    }

    static propTypes = {
        value: React.PropTypes.number,
        name: React.PropTypes.string,
        description: React.PropTypes.string,
        selected: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        onSave: React.PropTypes.func,
    }

    static defaultProps = {
        value: null,
        name: null,
        description: null,
        selected: false,
        onClick: null,
        onSave: null,
    }

    handleBeginModify(event) {
        this.setState({isEditing: true});
        event.preventDefault();
        event.stopPropagation();
    }

    handleOnDelete() {

    }

    handleOnNameChange (event) {
        this.setState({name: $(this.refs.name).val()});
    }

    handleOnDescriptionChange (event) {
        this.setState({description: $(this.refs.description).val()});
    }

    handleOnSave() {
        if (this.props.onSave != null) {
            this.props.onSave();
        }
    }

    handleOnCancel(event) {
        this.setState({isEditing: false});
        event.preventDefault();
    }

    render() {
        if (this.state.isEditing) {
            return (
                <li className="list-group-item creater">
                    <form className="form-horizontal">
                        <input type="hidden" name="value" value={this.props.value}/>
                        <div className="form-group">
                            <label htmlFor="name" className="col-sm-2 control-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text"
                                       className="form-control"
                                       id="name"
                                       placeholder="Name"
                                       ref="name"
                                       name="name"
                                       value={this.state.name}
                                       onChange={this.handleOnNameChange.bind(this)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="col-sm-2 control-label">Description</label>
                            <div className="col-sm-10">
                                <input type="text"
                                       className="form-control"
                                       id="description"
                                       placeholder="Description"
                                       ref="description"
                                       name="description"
                                       value={this.state.description}
                                       onChange={this.handleOnDescriptionChange.bind(this)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default" onClick={this.handleOnSave.bind(this)}>Save</button>
                            <button type="submit" className="btn btn-default" onClick={this.handleOnCancel.bind(this)}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </li>
            );
        }

        if (this.props.value == null) {
            return <li className="list-group-item add-button" onClick={this.handleBeginModify.bind(this)}><span>+</span></li>;
        }

        let active = this.props.selected ? 'list-group-item active clearfix' : 'list-group-item clearfix';
        return (
            <li className={active} data-value={this.props.value} onClick={this.props.onClick}>
                <div className="col-sm-8">
                    <h4 className="list-group-item-heading">{this.props.name}</h4>
                    <p className="list-group-item-text">{this.props.description}</p>
                </div>
                <div className="col-sm-4 dominative">
                    <span className="glyphicon glyphicon-cog pull-right" onClick={this.handleBeginModify.bind(this)}></span>
                    <span className="glyphicon glyphicon-trash pull-right" onClick={this.handleOnDelete.bind(this)}></span>
                </div>
            </li>
        );
    }
}

class ApproachPropertyDetailEditer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: props.mode,
            value: props.value,
            name: props.name,
            description: props.description,
        };
    }

    static propTypes = {
        mode: React.PropTypes.string,
        value: React.PropTypes.number,
        name: React.PropTypes.string,
        description: React.PropTypes.string,

        onCreate: React.PropTypes.func,
        onSave: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }

    static defaultProps = {
        mode: 'button',
        value: -1,
        name: '',
        description: '',
    }

    handleOnSwitchCreate() {
        this.setState({mode: 'edit'});
    }

    handleOnSave() {
        return false;
    }

    handleOnCancel(event) {
        event.preventDefault();
        if (this.state.value == -1) {
            this.setState({mode: 'button'});
        }
        else {
            this.setState({mode: 'view'});
        }
    }

    render() {
        if (this.state.mode == 'button') {
            return <li className="list-group-item add-button" onClick={this.handleOnSwitchCreate.bind(this)}><span>+</span></li>;
        }

        // mode == 'edit'
        return (
            <li className="list-group-item creater">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="name" className="col-sm-2 control-label">Name</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="name" placeholder="Name" value={this.state.name} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="col-sm-2 control-label">Description</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="description" placeholder="Description" value={this.state.description} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default" onClick={this.handleOnSave.bind(this)}>Save</button>
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

    handleDetailOnSave(detail) {
        alert(detail.name + ' ' + detail.description);
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
                                        onClick={this.handleDetailOnClick.bind(this, detail)}
                                        onSave={this.handleDetailOnSave.bind(this, detail)} />
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
                        <ApproachPropertyDetail />
                        {detailItems}
                        <ApproachPropertyDetail />
                    </ul>
                </div>
            </div>
        );
    }
}

export default ApproachProperty;
