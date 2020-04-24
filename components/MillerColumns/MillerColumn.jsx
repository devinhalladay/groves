import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColumnMover from './ColumnMover';

const getStyleFromElement = (element, property) => {
    return element && property && Number(window.getComputedStyle(element)[property].replace('px', ''));
}

const debounce = (fn, context = null, delay) => {
    let timeout = null;
    return (...args) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    }
}

class MillerColumn extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.innerWrapper = React.createRef();
        this.notifyTransition = debounce(this.notifyTransition, this, this.props.animationSpeed);
        this.previousInvisibleColumns = null;
        this.state = {
            children: null,
        }
    }

    /* TODO:: Replace the following with other lifecycle methods */
    UNSAFE_componentWillReceiveProps(nextProps) {
        const diff = nextProps.children.length - this.props.children.length;
        if (nextProps.children.length !== this.props.children.length) {
            const previousPeek = this.columnMover.shouldShowPeek;
            this.columnMover.Update(nextProps.children.length);
            const ShouldMoveSlider = this.columnMover.ShouldMoveSlider(previousPeek);
            if ((!previousPeek && ShouldMoveSlider) || (diff > 1)) {
                this.moveToEnd();
            } else if (ShouldMoveSlider) {
                const moveTo = this.columnMover.MoveTo(diff, previousPeek);
                this.moveTo(`translateX(-${this.columnMover.currentPosition + moveTo}px)`);
                this.columnMover.currentPosition = this.columnMover.currentPosition + moveTo;
            }
        }
        this.setState({
            children: this.getChildren(
                nextProps,
                diff !== 0
            ),
        })
    }

    componentDidMount() {
        window.addEventListener('resize', (e) => {
            if (this.columnMover) {
                this.columnMover.UpdateTotalWidth(getStyleFromElement(this.wrapperRef.current, 'width'));
                this.updateChildrenAndMove(true);
            }
        })
        const { maxColumn, columnMagin, minColumnWidth, peekWidth, children } = this.props;
        const totalWidth = getStyleFromElement(this.wrapperRef.current, 'width');
        this.columnMover = new ColumnMover(totalWidth, children.length, maxColumn, columnMagin, minColumnWidth, peekWidth)
        this.updateChildrenAndMove();
    }

    updateChildrenAndMove(transitioning = false) {
        this.setState({
            children: this.getChildren(this.props, transitioning),
        }, () => {
            if (this.columnMover.shouldShowPeek) {
                if (this.previousInvisibleColumns !== this.columnMover.invisibleColumns) {
                    this.moveToEnd();
                } else this.notifyTransition();
            }
            else this.moveToFirst();
            this.previousInvisibleColumns = this.columnMover.invisibleColumns;
        })
    }

    moveTo(value) {
        if (this.innerWrapper.current) this.innerWrapper.current.style.transition = `transform ${this.props.animationSpeed}ms ease`;
        if (this.innerWrapper.current) this.innerWrapper.current.style.transform = value;
        this.notifyTransition();
    }

    moveToFirst() {
        this.moveTo(`translateX(0px)`);
        this.columnMover.currentPosition = 0;
    }

    moveToEnd() {
        const moveTo = this.columnMover.MoveToEnd();
        this.moveTo(`translateX(-${moveTo}px)`);
        this.columnMover.currentPosition = moveTo;
    }

    notifyTransition() {
        this.setState({
            children: this.getChildren(this.props, false),
        })
    }

    getChildren(props = this.props, transitioning = false) {
        return React.Children.map(props.children, (child, index) => {
            const width = this.columnMover.invisibleColumns
                ? index < this.columnMover.invisibleColumns
                    ? this.columnMover.invisibleColumnWidth
                    : this.columnMover.maxColumnWidth
                : this.columnMover.maxColumnWidth;

            const baseStyle = {
                width: width,
                height: this.props.height,
                margin: index === 0
                    ? `0px ${this.columnMover.marginRight}px 0px ${this.columnMover.marginRight}px`
                    : `0px ${this.columnMover.marginRight}px 0px 0px`
            };
            return React.cloneElement(child,
                {
                    ...child.props,
                    ...{
                        style: {
                            ...baseStyle,
                        },
                        transitioning,
                        peekColumn: index === this.columnMover.peekIndex,
                        column: this.columnMover,
                    },
                })
        })
    }

    render() {
        return (
            <div ref={this.wrapperRef} className="miller">
                <div ref={this.innerWrapper} className="wrapper">
                    {this.state.children}
                </div>
            </div>
        )
    }
}

MillerColumn.propTypes = {
    maxColumn: PropTypes.number.isRequired,
    columnMagin: PropTypes.number.isRequired,
    minColumnWidth: PropTypes.number.isRequired,
    peekWidth: PropTypes.number.isRequired,
    animationSpeed: PropTypes.number
}

MillerColumn.defaultProps = {
    animationSpeed: 200,
}

export default MillerColumn;