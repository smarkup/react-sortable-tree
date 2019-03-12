import {
  DragDropContext as dragDropContext,
  DragSource as dragSource,
  DropTarget as dropTarget,
} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { findDOMNode } from 'react-dom';
import { getDepth } from './tree-data-utils';

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

  getTargetDepth(dropTargetProps, monitor, component) {
    let dropTargetDepth = 0;

    const rowAbove = dropTargetProps.getPrevRow();
    if (rowAbove) {
      let { path } = rowAbove;
      const aboveNodeCannotHaveChildren = !this.treeRef.canNodeHaveChildren(
        rowAbove.node
      );
      if (aboveNodeCannotHaveChildren) {
        path = path.slice(0, path.length - 1);
      }

      // Limit the length of the path to the deepest possible
      dropTargetDepth = Math.min(path.length, dropTargetProps.path.length);
    }

    let blocksOffset;
    let dragSourceInitialDepth = (monitor.getItem().path || []).length;

    // When adding node from external source
    if (monitor.getItem().treeId !== this.treeId) {
      // Ignore the tree depth of the source, if it had any to begin with
      dragSourceInitialDepth = 0;

      if (component) {
        const relativePosition = findDOMNode(component).getBoundingClientRect(); // eslint-disable-line react/no-find-dom-node
        const leftShift =
          monitor.getSourceClientOffset().x - relativePosition.left;
        blocksOffset = Math.round(
          leftShift / dropTargetProps.scaffoldBlockPxWidth
        );
      } else {
        blocksOffset = dropTargetProps.path.length;
      }
    } else {
      // handle row direction support
      const direction = dropTargetProps.rowDirection === 'rtl' ? -1 : 1;

      blocksOffset = Math.round(
        (direction * monitor.getDifferenceFromInitialOffset().x) /
          dropTargetProps.scaffoldBlockPxWidth
      );
    }

    let targetDepth = Math.min(
      dropTargetDepth,
      Math.max(0, dragSourceInitialDepth + blocksOffset - 1)
    );

    // If a maxDepth is defined, constrain the target depth
    if (typeof this.maxDepth !== 'undefined' && this.maxDepth !== null) {
      const draggedNode = monitor.getItem().node;
      const draggedChildDepth = getDepth(draggedNode);

      targetDepth = Math.max(
        0,
        Math.min(targetDepth, this.maxDepth - draggedChildDepth - 1)
      );
    }

    return targetDepth;
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
          minimumTreeIndex: dropTargetProps.treeIndex,
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
