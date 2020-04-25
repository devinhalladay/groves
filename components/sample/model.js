class Model {
  constructor(tree = {}, parent) {
    this.label = tree.label;
    this.parent = !tree.label ? null : parent.label;
    this.parentNode = parent;
    this.children = Array.isArray(tree.children)
      ? tree.children.map(t => new Model(t, this))
      : [];
    this.selectedChild = null;
  }

  get IsParentNode() {
    return !this.label && !this.parent;
  }

  IsNodeInChildren(label = this.selectedChild) {
    return this.children.find(child => child.label === label);
  }

  get NextNode() {
    return this.IsNodeInChildren();
  }

  UnsetSelected() {
    const localSelectedChild = this.selectedChild;
    if (localSelectedChild) {
      this.selectedChild = null;
      this.IsNodeInChildren(localSelectedChild).UnsetSelected();
    }
  }

  FindAndSetSelected(label) {
    if (this.IsNodeInChildren(label)) {
      this.IsNodeInChildren(label).UnsetSelected();
      this.selectedChild = label;
    } else if (this.selectedChild) {
      this.NextNode.FindAndSetSelected(label);
    } else if(this.parentNode.IsParentNode) {
      this.parentNode.UnsetSelected();
    }
  }
}

export default Model;
