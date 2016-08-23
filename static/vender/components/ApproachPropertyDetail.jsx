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

        this.handleClick = this.handleClick.bind(this);
        this.handleBeginEditing = this.handleBeginEditing.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    static propTypes = {
        value: React.PropTypes.number,
        name: React.PropTypes.string,
        description: React.PropTypes.string,
        selected: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        onSave: React.PropTypes.func,
        onDelete: React.PropTypes.func,
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

    handleClick() {
        if (this.props.onClick != null) {
            this.props.onClick(this.props.value);
        }
    }

    handleBeginEditing(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            isEditing: true,
            name: this.props.name,
            description: this.props.description
        });
    }

    handleDelete(event) {
        event.stopPropagation();

        if (this.props.onDelete == null) return;

        var result = this.props.onDelete(this.props.value);
        if (result) {
            this.setState({isEditing: false});
        }
    }

    handleNameChange () {
        this.setState({name: $(this.refs.name).val()});
    }

    handleDescriptionChange () {
        this.setState({description: $(this.refs.description).val()});
    }

    handleSave(event) {
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

    handleCancel(event) {
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
                                    onChange={this.handleNameChange}
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
                                    onChange={this.handleDescriptionChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-default" onClick={this.handleSave}>Save
                                </button> <button type="submit" className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </li>
            );
        }

        if (this.isCreater) {
            return <li className="list-group-item add-button" onClick={this.handleBeginEditing}><span>+</span></li>;
        }

        let active = this.props.selected ? 'list-group-item active clearfix' : 'list-group-item clearfix';
        return (
            <li className={active} data-value={this.props.value} onClick={this.handleClick}>
                <div className="col-sm-8">
                    <h4 className="list-group-item-heading">{this.props.name}</h4>
                    <p className="list-group-item-text">{this.props.description}</p>
                </div>
                <div className="col-sm-4 dominative">
                    <span className="glyphicon glyphicon-cog pull-right" onClick={this.handleBeginEditing}/>
                    <span className="glyphicon glyphicon-trash pull-right" onClick={this.handleDelete}/>
                </div>
            </li>
        );
    }
}

export default ApproachPropertyDetail;
