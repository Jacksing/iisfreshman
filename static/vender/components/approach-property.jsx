import React from 'react'
import $ from 'jquery'

class ApproachPropertyDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let active = this.props.selected ? 'list-group-item active' : 'list-group-item';
        return (
            <div className={active} onClick={this.props.onClick} href="#">
                <h4 className="list-group-item-heading">{this.props.value}</h4>
                <p className="list-group-item-text">{this.props.description}</p>
            </div>
        );
    }
}

class ApproachProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            details: props.details,
        };
    }

    handleDetailOnClick(detail) {
        this.props.details.map(x => x !=detail ? x.selected=false : null);
        detail.selected = !detail.selected;
        this.setState({
            details: this.props.details,
        });
    }

    toggleDetails() {
        $(this.refs.body).slideToggle(250);
    }

    render() {
        let detailsItems = this.props.details.map(detail => {
            return (
                <ApproachPropertyDetail key={detail.code}
                                        value={detail.value}
                                        description={detail.description}
                                        selected={detail.selected}
                                        onClick={this.handleDetailOnClick.bind(this, detail)} />
            );
        });

        return (
            <div className="apro-prop panel panel-default">
                <div ref="heading" className="panel-heading">
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <span className="navbar-brand">{this.state.title}</span>
                            </div>
                            <div className="collapse navbar-collapse">
                                <input className="btn btn-default navbar-btn navbar-right" type="button" value="Hide" onClick={this.toggleDetails.bind(this)} />
                            </div>
                        </div>
                    </nav>
                </div>
                <div ref="body" className="panel-body list-groups">
                    {detailsItems}
                </div>
            </div>
        );
    }
}

export default ApproachProperty
