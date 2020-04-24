class ColumnMover {
    constructor(totalWidth, totalChilden, maxColumn, columnMagin, minColumnWidth, peekWidth) {
        this.maxColumn = maxColumn;
        this.columnMagin = columnMagin;
        this.minColumnWidth = minColumnWidth;
        this.peekWidth = peekWidth;
        this.totalWidth = totalWidth;
        this.totalChilden = totalChilden;
        this.currentPosition = 0;
    }

    UpdateTotalWidth(value) {
        this.totalWidth = value;
    }

    Update(childrenLen) {
        this.totalChilden = childrenLen;
    }

    get peekIndex() {
        return this.shouldShowPeek
            ? this.totalChilden - this.visibleColumns - 1
            : -1;
    }

    get marginRight() {
        return Math.floor(this.columnMagin / 2);
    }

    get shouldShowPeek() {
        let visibleColumn = this.GetColumns();
        return this.totalChilden > visibleColumn;
    }

    get visibleColumns() {
        let visibleColumn = this.GetColumns();
        if (this.shouldShowPeek) {
            visibleColumn = this.GetColumns(this.peekWidth);
        }
        return visibleColumn;
    }

    get invisibleColumnWidth() {
        return this.minColumnWidth;
    }

    get maxColumnsInContainer() {
        return this.GetColumns(this.shouldShowPeek ? this.peekWidth : 0, this.maxColumn);
    }

    get maxColumnWidth() {
        let numberOfColumns = this.maxColumnsInContainer;
        let margin = numberOfColumns * Math.floor(this.columnMagin / 2) + Math.floor(this.columnMagin / 2);
        const total = this.shouldShowPeek ? this.totalWidth - this.peekWidth : this.totalWidth;
        return Math.floor((total - margin) / numberOfColumns);
    }

    get invisibleColumns() {
        if (this.shouldShowPeek) {
            return this.totalChilden - this.visibleColumns;
        }
        return 0;
    }

    ShouldMoveSlider(previousPeek) {
        if (previousPeek !== this.shouldShowPeek) {
            return true;
        }
        return this.totalChilden > this.maxColumn || this.shouldShowPeek
    }

    MoveToEnd() {
        const diff = this.totalChilden - this.visibleColumns;
        let move = (this.invisibleColumnWidth * diff) + (Math.floor(this.columnMagin / 2) * diff) - this.peekWidth;
        return move;
    }

    MoveTo(columnDiff, previousPeek) {
        const currentPeek = this.shouldShowPeek;
        if (previousPeek === !currentPeek && this.totalChilden === this.visibleColumns) {
            this.currentPosition = 0;
            return 0;
        }

        let base = (this.invisibleColumnWidth + Math.floor(this.columnMagin / 2)) * Math.abs(columnDiff);
        if (previousPeek === false && currentPeek) {
            base -= this.peekWidth
        } else if (previousPeek && !currentPeek) {
            base += this.peekWidth
        }
        if (columnDiff > 0) {
            return base;
        } else {
            return -base;
        }
    }

    GetColumns(offset = 0, totalChilden = this.totalChilden) {
        let visibleColumn = 1;
        for (let i = 1; i < totalChilden + 1; i++) {
            let minWidth = (this.minColumnWidth * i) + (Math.floor(this.columnMagin / 2) * i);
            minWidth += Math.floor(this.columnMagin / 2);
            if (minWidth > (this.totalWidth - offset) || this.maxColumn + 1 === i) {
                break;
            }
            visibleColumn = i;
        }
        return visibleColumn;
    }
}

export default ColumnMover;
