import {
  DragDropContext as dragDropContext,
  DragSource as dragSource,
  DropTarget as dropTarget,
} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export default class DndManager {
  constructor(treeRef) {
    this.treeRef = treeRef;
  }

  static wrapRoot(el) {
    return dragDropContext(HTML5Backend)(el);
  }

  get startDrag() {
    return this.treeRef.startDrag;
  }

  get dragHover() {
    return this.treeRef.dragHover;
  }

  get endDrag() {
    return this.treeRef.endDrag;
  }

  get drop() {
    return this.treeRef.drop;
  }

  get treeId() {
    return this.treeRef.treeId;
  }

  get dndType() {
    return this.treeRef.dndType;
  }

  get treeData() {
    return this.treeRef.state.draggingTreeData || this.treeRef.props.treeData;
  }

  get getNodeKey() {
    return this.treeRef.props.getNodeKey;
  }

  get customCanDrop() {
    return this.treeRef.props.canDrop;
  }

  get maxDepth() {
    return this.treeRef.props.maxDepth;
  }

  getTargetDepth(dropTargetProps) {
    // get current node or parent node
    if (this.treeRef.canNodeHaveChildren(dropTargetProps.node)) {
      return dropTargetProps.path.length
    }

    return dropTargetProps.path.length - 1
  }

  canDrop(dropTargetProps, monitor) {
    // is not reliable https://github.com/react-dnd/react-dnd/issues/996
    // if (!monitor.isOver()) {
    //   return false;
    // }

    if (typeof this.customCanDrop === 'function') {
      const { node, path, treeIndex } = monitor.getItem();

      return this.customCanDrop({
        draggedNode: node,
        draggedPath: path,
        draggedTreeIndex: treeIndex, // Equals -1 when dragged from external tree
        overNode: dropTargetProps.node,
        overPath: dropTargetProps.path,
        overTreeIndex: dropTargetProps.treeIndex,
      });
    }

    return true;
  }

  wrapSource(el) {
    const nodeDragSource = {
      beginDrag: props => {
        this.startDrag(props);

        return {
          node: props.node,
          parentNode: props.parentNode,
          path: props.path,
          treeIndex: props.treeIndex,
          treeId: props.treeId,
        };
      },

      endDrag: (props, monitor) => {
        this.endDrag(monitor.getDropResult());
      },

      isDragging: (props, monitor) => {
        const dropTargetNode = monitor.getItem().node;
        const draggedNode = props.node;

        return draggedNode === dropTargetNode;
      },
    };

    function nodeDragSourcePropInjection(connect, monitor) {
      return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
        didDrop: monitor.didDrop(),
      };
    }

    return dragSource(
      this.dndType,
      nodeDragSource,
      nodeDragSourcePropInjection
    )(el);
  }

  wrapTarget(el) {
    const nodeDropTarget = {
      drop: (dropTargetProps, monitor, component) => {
        const result = {
          node: monitor.getItem().node,
          path: monitor.getItem().path,
          treeIndex: monitor.getItem().treeIndex,
          treeId: this.treeId,
          minimumTreeIndex: dropTargetProps.treeIndex + 1,
          depth: this.getTargetDepth(dropTargetProps, monitor, component),
        };

        this.drop(result);

        return result;
      },

      hover: (dropTargetProps) => {
        this.dragHover({ hoveredNode: dropTargetProps.node, hoveredPath: dropTargetProps.path });
      },

      canDrop: this.canDrop.bind(this),
    };

    function nodeDropTargetPropInjection(connect, monitor) {
      const dragged = monitor.getItem();
      return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggedNode: dragged ? dragged.node : null,
      };
    }

    return dropTarget(
      this.dndType,
      nodeDropTarget,
      nodeDropTargetPropInjection
    )(el);
  }

  wrapPlaceholder(el) {
    const placeholderDropTarget = {
      drop: (dropTargetProps, monitor) => {
        const { node, path, treeIndex } = monitor.getItem();
        const result = {
          node,
          path,
          treeIndex,
          treeId: this.treeId,
          minimumTreeIndex: 0,
          depth: 0,
        };

        this.drop(result);

        return result;
      },
    };

    function placeholderPropInjection(connect, monitor) {
      const dragged = monitor.getItem();
      return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggedNode: dragged ? dragged.node : null,
      };
    }

    return dropTarget(
      this.dndType,
      placeholderDropTarget,
      placeholderPropInjection
    )(el);
  }
}
