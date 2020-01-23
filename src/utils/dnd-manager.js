import {
  DragDropContext as dragDropContext,
  DragSource as dragSource,
  DropTarget as dropTarget,
} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { find } from './tree-data-utils';

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
      const { nodes, paths, treeIndexes, treeId } = monitor.getItem();

      return this.customCanDrop({
        dragResult: {
          nodes,
          paths,
          treeIndexes, // Contains -1 when dragged from external tree
          treeId,
        },
        dropResult: {
          node: dropTargetProps.node,
          path: dropTargetProps.path,
          treeIndex: dropTargetProps.treeIndex,
          treeId: dropTargetProps.treeId,
        }
      });
    }

    return true;
  }

  wrapSource(el) {
    let hoveredPath;
    let hoveredNode;

    function getHoveredItems() {
      return { hoveredPath, hoveredNode }
    }

    const nodeDragSource = {
      beginDrag: props => {
        this.startDrag();

        const nodeKeys = props.selectedNodeKeys;

        if (!nodeKeys.includes(props.node.id)) {
          return {
            getHoveredItems,
            nodes: [props.node],
            paths: [props.path],
            treeIndexes: [props.treeIndex],
            treeId: props.treeId
          }
        }

        const { matches: nodeInfos } = find({
          getNodeKey: this.getNodeKey,
          treeData: this.treeData,
          searchMethod: item =>
            nodeKeys.includes(this.getNodeKey(item)),
          expandFocusMatchPaths: false,
          expandAllMatchPaths: false,
        });

        const nodes = nodeInfos.map(nodeInfo => nodeInfo.node);
        const paths = nodeInfos.map(nodeInfo => nodeInfo.path);
        const treeIndexes = nodeInfos.map(nodeInfo => nodeInfo.treeIndex);

        return {
          getHoveredItems,
          nodes,
          paths,
          treeIndexes,
          treeId: props.treeId,
        };
      },

      endDrag: (props, monitor) => {
        hoveredPath = null;
        hoveredNode = null;

        this.endDrag(monitor.getDropResult());
      },

      isDragging: (props, monitor) => {
        const dropTargetNodes = monitor.getItem().nodes;
        const key = this.getNodeKey(props);

        return !!dropTargetNodes.find(dropTargetNode =>
          this.getNodeKey({ node: dropTargetNode }) === key);
      },

      canDrag: (props) => props.canDrag
    };

    function nodeDragSourcePropInjection(connect, monitor, props) {
      // eslint-disable-next-line prefer-destructuring
      hoveredPath = props.hoveredPath;
      // eslint-disable-next-line prefer-destructuring
      hoveredNode = props.hoveredNode;

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
          nodes: monitor.getItem().nodes,
          paths: monitor.getItem().paths,
          treeIndexes: monitor.getItem().treeIndexes,
          treeId: this.treeId,
          minimumTreeIndex: dropTargetProps.treeIndex + 1,
          depth: this.getTargetDepth(dropTargetProps, monitor, component),
        };

        this.drop(result);

        return result;
      },

      hover: (dropTargetProps) => {
        this.dragHover({
          hoveredNode: dropTargetProps.node,
          hoveredPath: dropTargetProps.path
        });
      },

      canDrop: this.canDrop.bind(this),
    };

    function nodeDropTargetPropInjection(connect, monitor) {
      const dragged = monitor.getItem();
      return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggedNodes: dragged ? dragged.nodes : null,
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
        const { nodes, paths, treeIndexes } = monitor.getItem();
        const result = {
          nodes,
          paths,
          treeIndexes,
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
        draggedNodes: dragged ? dragged.nodes : null,
      };
    }

    return dropTarget(
      this.dndType,
      placeholderDropTarget,
      placeholderPropInjection
    )(el);
  }
}
