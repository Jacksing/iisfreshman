import React from 'react';
import $ from 'jquery';

class ApproachPropertyDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            name: props.name,
            description: props.description,
        };

        this.handleBeginModify = this.handleBeginModify.bind(this);
        this.handleOnNameChange = this.handleOnNameChange.bind(this);
        this.handleOnDescriptionChange = this.handleOnDescriptionChange.bind(this);
        this.handleOnSave = this.handleOnSave.bind(this);
        this.handleOnCancel = this.handleOnCancel.bind(this);
        this.handleOnDelete = this.handleOnDelete.bind(this);
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
        value: undefined,
        name: '',
        description: '',
        selected: false,
        onClick: null,
        onSave: null,
    }

    isCreater = this.props.value === undefined

    handleBeginModify(event) {
        this.setState({isEditing: true});
        event.preventDefault();
        event.stopPropagation();
    }

    handleOnDelete(event) {
        event.stopPropagation();
    }

    handleOnNameChange () {
        this.setState({name: $(this.refs.name).val()});
    }

    handleOnDescriptionChange () {
        this.setState({description: $(this.refs.description).val()});
    }

    handleOnSave(event) {
        event.preventDefault();
        if (this.state.name.trim() == '') return;
        
        if (this.props.onSave != null) {
            var result = this.props.onSave({
                value: this.props.value,
                name: this.state.name,
                description: this.state.description,
            });
            if (result) {
                if (this.isCreater) {
                    this.setState({
                        isEditing: false,
                        name: '',
                        description: '',
                    });
                } else {
                    this.setState({isEditing: false});
                }
            }
        }
    }

    handleOnCancel(event) {
        event.preventDefault();
        if (this.isCreater) {
            this.setState({
                isEditing: false,
                name: '',
                description: '',
            });
        } else {
            this.setState({
                isEditing: false,
                name: this.props.name,
                description: this.props.description,
            });
        }
    }

    render() {
        if (this.state.isEditing) {
            let active = this.props.selected ? 'list-group-item creater active' : 'list-group-item creater';
            return (
                <li className={active}>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="name" className="col-sm-2 control-label">Name</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Name"
                                    ref="name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleOnNameChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="col-sm-2 control-label">Description</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    placeholder="Description"
                                    ref="description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleOnDescriptionChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default" onClick={this.handleOnSave}>Save</button> <button
                                    type="submit" className="btn btn-default" onClick={this.handleOnCancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </li>
            );
        }

        if (this.isCreater) {
            return <li className="list-group-item add-button" onClick={this.handleBeginModify}><span>+</span></li>;
        }

        let active = this.props.selected ? 'list-group-item active clearfix' : 'list-group-item clearfix';
        return (
            <li className={active} data-value={this.props.value} onClick={this.props.onClick}>
                <div className="col-sm-8">
                    <h4 className="list-group-item-heading">{this.props.name}</h4>
                    <p className="list-group-item-text">{this.props.description}</p>
                </div>
                <div className="col-sm-4 dominative">
                    <span className="glyphicon glyphicon-cog pull-right" onClick={this.handleBeginModify}></span>
                    <span className="glyphicon glyphicon-trash pull-right" onClick={this.handleOnDelete}></span>
                </div>
            </li>
        );
    }
}

export default ApproachPropertyDetail;
