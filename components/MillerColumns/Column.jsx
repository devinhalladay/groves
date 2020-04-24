import React, { Component } from 'react';

class Column extends Component {
    constructor(props) {
        super(props);
        this.getChildren = this.getChildren.bind(this);
    }

    getChildren() {
        const { children, style, ...others } = this.props;
        const { style: childrenStyle, ...otherChildrenProps } = children.props;
        return React.cloneElement(children, { style: childrenStyle, ...otherChildrenProps, ...others });
    }

    render() {
        return (
            <div style={this.props.style} className="column">
                {this.getChildren()}
            </div>
        )
    }
}

export default Column;