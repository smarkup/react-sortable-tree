import { AutoSizer, List } from 'react-virtualized';
import isEqual from 'lodash.isequal';
import withScrolling, { createScrollingComponent, createVerticalStrength, createHorizontalStrength } from 'frontend-collective-react-dnd-scrollzone';
import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, DragSource, DropTarget, DragDropContextConsumer } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function componentWillMount() {
  // Call this.constructor.gDSFP to support sub-classes.
  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
  if (state !== null && state !== undefined) {
    this.setState(state);
  }
}

function componentWillReceiveProps(nextProps) {
  // Call this.constructor.gDSFP to support sub-classes.
  // Use the setState() updater to ensure state isn't stale in certain edge cases.
  function updater(prevState) {
    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
    return state !== null && state !== undefined ? state : null;
  }
  // Binding "this" is important for shallow renderer support.
  this.setState(updater.bind(this));
}

function componentWillUpdate(nextProps, nextState) {
  try {
    var prevProps = this.props;
    var prevState = this.state;
    this.props = nextProps;
    this.state = nextState;
    this.__reactInternalSnapshotFlag = true;
    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
      prevProps,
      prevState
    );
  } finally {
    this.props = prevProps;
    this.state = prevState;
  }
}

// React may warn about cWM/cWRP/cWU methods being deprecated.
// Add a flag to suppress these warnings for this special case.
componentWillMount.__suppressDeprecationWarning = true;
componentWillReceiveProps.__suppressDeprecationWarning = true;
componentWillUpdate.__suppressDeprecationWarning = true;

function polyfill(Component$$1) {
  var prototype = Component$$1.prototype;

  if (!prototype || !prototype.isReactComponent) {
    throw new Error('Can only polyfill class components');
  }

  if (
    typeof Component$$1.getDerivedStateFromProps !== 'function' &&
    typeof prototype.getSnapshotBeforeUpdate !== 'function'
  ) {
    return Component$$1;
  }

  // If new component APIs are defined, "unsafe" lifecycles won't be called.
  // Error if any of these lifecycles are present,
  // Because they would work differently between older and newer (16.3+) versions of React.
  var foundWillMountName = null;
  var foundWillReceivePropsName = null;
  var foundWillUpdateName = null;
  if (typeof prototype.componentWillMount === 'function') {
    foundWillMountName = 'componentWillMount';
  } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
    foundWillMountName = 'UNSAFE_componentWillMount';
  }
  if (typeof prototype.componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'componentWillReceiveProps';
  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
  }
  if (typeof prototype.componentWillUpdate === 'function') {
    foundWillUpdateName = 'componentWillUpdate';
  } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
    foundWillUpdateName = 'UNSAFE_componentWillUpdate';
  }
  if (
    foundWillMountName !== null ||
    foundWillReceivePropsName !== null ||
    foundWillUpdateName !== null
  ) {
    var componentName = Component$$1.displayName || Component$$1.name;
    var newApiName =
      typeof Component$$1.getDerivedStateFromProps === 'function'
        ? 'getDerivedStateFromProps()'
        : 'getSnapshotBeforeUpdate()';

    throw Error(
      'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' +
        componentName +
        ' uses ' +
        newApiName +
        ' but also contains the following legacy lifecycles:' +
        (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') +
        (foundWillReceivePropsName !== null
          ? '\n  ' + foundWillReceivePropsName
          : '') +
        (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') +
        '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' +
        'https://fb.me/react-async-component-lifecycle-hooks'
    );
  }

  // React <= 16.2 does not support static getDerivedStateFromProps.
  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
  // Newer versions of React will ignore these lifecycles if gDSFP exists.
  if (typeof Component$$1.getDerivedStateFromProps === 'function') {
    prototype.componentWillMount = componentWillMount;
    prototype.componentWillReceiveProps = componentWillReceiveProps;
  }

  // React <= 16.2 does not support getSnapshotBeforeUpdate.
  // As a workaround, use cWU to invoke the new lifecycle.
  // Newer versions of React will ignore that lifecycle if gSBU exists.
  if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
    if (typeof prototype.componentDidUpdate !== 'function') {
      throw new Error(
        'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'
      );
    }

    prototype.componentWillUpdate = componentWillUpdate;

    var componentDidUpdate = prototype.componentDidUpdate;

    prototype.componentDidUpdate = function componentDidUpdatePolyfill(
      prevProps,
      prevState,
      maybeSnapshot
    ) {
      // 16.3+ will not execute our will-update method;
      // It will pass a snapshot value to did-update though.
      // Older versions will require our polyfilled will-update value.
      // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
      // Because for <= 15.x versions this might be a "prevContext" object.
      // We also can't just check "__reactInternalSnapshot",
      // Because get-snapshot might return a falsy value.
      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
      var snapshot = this.__reactInternalSnapshotFlag
        ? this.__reactInternalSnapshot
        : maybeSnapshot;

      componentDidUpdate.call(this, prevProps, prevState, snapshot);
    };
  }

  return Component$$1;
}

// very simple className utility for creating a classname string...
// Falsy arguments are ignored:
//
// const active = true
// const className = classnames(
//    "class1",
//    !active && "class2",
//    active && "class3"
// ); // returns -> class1 class3";
//
function classnames() {
  for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
    classes[_key] = arguments[_key];
  }

  // Use Boolean constructor as a filter callback
  // Allows for loose type truthy/falsey checks
  // Boolean("") === false;
  // Boolean(false) === false;
  // Boolean(undefined) === false;
  // Boolean(null) === false;
  // Boolean(0) === false;
  // Boolean("classname") === true;
  return classes.filter(Boolean).join(' ');
}

var TreeNode =
/*#__PURE__*/
function (_Component) {
  _inherits(TreeNode, _Component);

  function TreeNode() {
    _classCallCheck(this, TreeNode);

    return _possibleConstructorReturn(this, _getPrototypeOf(TreeNode).apply(this, arguments));
  }

  _createClass(TreeNode, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          listIndex = _this$props.listIndex,
          swapFrom = _this$props.swapFrom,
          swapLength = _this$props.swapLength,
          swapDepth = _this$props.swapDepth,
          scaffoldBlockPxWidth = _this$props.scaffoldBlockPxWidth,
          lowerSiblingCounts = _this$props.lowerSiblingCounts,
          connectDropTarget = _this$props.connectDropTarget,
          isOver = _this$props.isOver,
          draggedNodes = _this$props.draggedNodes,
          canDrop = _this$props.canDrop,
          treeIndex = _this$props.treeIndex,
          treeId = _this$props.treeId,
          getPrevRow = _this$props.getPrevRow,
          node = _this$props.node,
          path = _this$props.path,
          rowDirection = _this$props.rowDirection,
          otherProps = _objectWithoutProperties(_this$props, ["children", "listIndex", "swapFrom", "swapLength", "swapDepth", "scaffoldBlockPxWidth", "lowerSiblingCounts", "connectDropTarget", "isOver", "draggedNodes", "canDrop", "treeIndex", "treeId", "getPrevRow", "node", "path", "rowDirection"]);

      var rowDirectionClass = rowDirection === 'rtl' ? 'rst__rtl' : null; // Construct the scaffold representing the structure of the tree

      var scaffoldBlockCount = lowerSiblingCounts.length;
      var scaffold = [];
      lowerSiblingCounts.forEach(function (lowerSiblingCount, i) {
        var lineClass = '';

        if (lowerSiblingCount > 0) {
          // At this level in the tree, the nodes had sibling nodes further down
          if (listIndex === 0) {
            // Top-left corner of the tree
            // +-----+
            // |     |
            // |  +--+
            // |  |  |
            // +--+--+
            lineClass = 'rst__lineHalfHorizontalRight rst__lineHalfVerticalBottom';
          } else if (i === scaffoldBlockCount - 1) {
            // Last scaffold block in the row, right before the row content
            // +--+--+
            // |  |  |
            // |  +--+
            // |  |  |
            // +--+--+
            lineClass = 'rst__lineHalfHorizontalRight rst__lineFullVertical';
          } else {
            // Simply connecting the line extending down to the next sibling on this level
            // +--+--+
            // |  |  |
            // |  |  |
            // |  |  |
            // +--+--+
            lineClass = 'rst__lineFullVertical';
          }
        } else if (listIndex === 0) {
          // Top-left corner of the tree, but has no siblings
          // +-----+
          // |     |
          // |  +--+
          // |     |
          // +-----+
          lineClass = 'rst__lineHalfHorizontalRight';
        } else if (i === scaffoldBlockCount - 1) {
          // The last or only node in this level of the tree
          // +--+--+
          // |  |  |
          // |  +--+
          // |     |
          // +-----+
          lineClass = 'rst__lineHalfVerticalTop rst__lineHalfHorizontalRight';
        }

        scaffold.push(React.createElement("div", {
          key: "pre_".concat(1 + i),
          style: {
            width: scaffoldBlockPxWidth
          },
          className: classnames('rst__lineBlock', lineClass, rowDirectionClass)
        }));

        if (treeIndex !== listIndex && i === swapDepth) {
          // This row has been shifted, and is at the depth of
          // the line pointing to the new destination
          var highlightLineClass = '';

          if (listIndex === swapFrom + swapLength - 1) {
            // This block is on the bottom (target) line
            // This block points at the target block (where the row will go when released)
            highlightLineClass = 'rst__highlightBottomLeftCorner';
          } else if (treeIndex === swapFrom) {
            // This block is on the top (source) line
            highlightLineClass = 'rst__highlightTopLeftCorner';
          } else {
            // This block is between the bottom and top
            highlightLineClass = 'rst__highlightLineVertical';
          }

          var _style;

          if (rowDirection === 'rtl') {
            _style = {
              width: scaffoldBlockPxWidth,
              right: scaffoldBlockPxWidth * i
            };
          } else {
            // Default ltr
            _style = {
              width: scaffoldBlockPxWidth,
              left: scaffoldBlockPxWidth * i
            };
          }

          scaffold.push(React.createElement("div", {
            // eslint-disable-next-line react/no-array-index-key
            key: i,
            style: _style,
            className: classnames('rst__absoluteLineBlock', highlightLineClass, rowDirectionClass)
          }));
        }
      });
      var style;

      if (rowDirection === 'rtl') {
        style = {
          right: scaffoldBlockPxWidth * scaffoldBlockCount
        };
      } else {
        // Default ltr
        style = {
          left: scaffoldBlockPxWidth * scaffoldBlockCount
        };
      }

      return connectDropTarget(React.createElement("div", _extends({}, otherProps, {
        className: classnames('rst__node', rowDirectionClass)
      }), scaffold, React.createElement("div", {
        className: "rst__nodeContent",
        style: style
      }, Children.map(children, function (child) {
        return cloneElement(child, {
          isOver: isOver,
          canDrop: canDrop,
          draggedNodes: draggedNodes
        });
      }))));
    }
  }]);

  return TreeNode;
}(Component);

TreeNode.defaultProps = {
  swapFrom: null,
  swapDepth: null,
  swapLength: null,
  canDrop: false,
  draggedNodes: null,
  rowDirection: 'ltr'
};
TreeNode.propTypes = {
  treeIndex: PropTypes.number.isRequired,
  treeId: PropTypes.string.isRequired,
  swapFrom: PropTypes.number,
  swapDepth: PropTypes.number,
  swapLength: PropTypes.number,
  scaffoldBlockPxWidth: PropTypes.number.isRequired,
  lowerSiblingCounts: PropTypes.arrayOf(PropTypes.number).isRequired,
  listIndex: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  // Drop target
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool,
  draggedNodes: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  // used in dndManager
  getPrevRow: PropTypes.func.isRequired,
  node: PropTypes.shape({}).isRequired,
  path: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  // rtl support
  rowDirection: PropTypes.string
};

/**
 * Performs a depth-first traversal over all of the node descendants,
 * incrementing currentIndex by 1 for each
 */
function getNodeDataAtTreeIndexOrNextIndex(_ref) {
  var targetIndex = _ref.targetIndex,
      node = _ref.node,
      currentIndex = _ref.currentIndex,
      getNodeKey = _ref.getNodeKey,
      _ref$path = _ref.path,
      path = _ref$path === void 0 ? [] : _ref$path,
      _ref$lowerSiblingCoun = _ref.lowerSiblingCounts,
      lowerSiblingCounts = _ref$lowerSiblingCoun === void 0 ? [] : _ref$lowerSiblingCoun,
      _ref$ignoreCollapsed = _ref.ignoreCollapsed,
      ignoreCollapsed = _ref$ignoreCollapsed === void 0 ? true : _ref$ignoreCollapsed,
      _ref$isPseudoRoot = _ref.isPseudoRoot,
      isPseudoRoot = _ref$isPseudoRoot === void 0 ? false : _ref$isPseudoRoot;
  // The pseudo-root is not considered in the path
  var selfPath = !isPseudoRoot ? _toConsumableArray(path).concat([getNodeKey({
    node: node,
    treeIndex: currentIndex
  })]) : []; // Return target node when found

  if (currentIndex === targetIndex) {
    return {
      node: node,
      lowerSiblingCounts: lowerSiblingCounts,
      path: selfPath
    };
  } // Add one and continue for nodes with no children or hidden children


  if (!node.children || ignoreCollapsed && node.expanded !== true) {
    return {
      nextIndex: currentIndex + 1
    };
  } // Iterate over each child and their descendants and return the
  // target node if childIndex reaches the targetIndex


  var childIndex = currentIndex + 1;
  var childCount = node.children.length;

  for (var i = 0; i < childCount; i += 1) {
    var result = getNodeDataAtTreeIndexOrNextIndex({
      ignoreCollapsed: ignoreCollapsed,
      getNodeKey: getNodeKey,
      targetIndex: targetIndex,
      node: node.children[i],
      currentIndex: childIndex,
      lowerSiblingCounts: _toConsumableArray(lowerSiblingCounts).concat([childCount - i - 1]),
      path: selfPath
    });

    if (result.node) {
      return result;
    }

    childIndex = result.nextIndex;
  } // If the target node is not found, return the farthest traversed index


  return {
    nextIndex: childIndex
  };
}

function getDescendantCount(_ref2) {
  var node = _ref2.node,
      _ref2$ignoreCollapsed = _ref2.ignoreCollapsed,
      ignoreCollapsed = _ref2$ignoreCollapsed === void 0 ? true : _ref2$ignoreCollapsed;
  return getNodeDataAtTreeIndexOrNextIndex({
    getNodeKey: function getNodeKey() {},
    ignoreCollapsed: ignoreCollapsed,
    node: node,
    currentIndex: 0,
    targetIndex: -1
  }).nextIndex - 1;
}
/**
 * Walk all descendants of the given node, depth-first
 *
 * @param {Object} args - Function parameters
 * @param {function} args.callback - Function to call on each node
 * @param {function} args.getNodeKey - Function to get the key from the nodeData and tree index
 * @param {boolean} args.ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 * @param {boolean=} args.isPseudoRoot - If true, this node has no real data, and only serves
 *                                        as the parent of all the nodes in the tree
 * @param {Object} args.node - A tree node
 * @param {Object=} args.parentNode - The parent node of `node`
 * @param {number} args.currentIndex - The treeIndex of `node`
 * @param {number[]|string[]} args.path - Array of keys leading up to node to be changed
 * @param {number[]} args.lowerSiblingCounts - An array containing the count of siblings beneath the
 *                                             previous nodes in this path
 *
 * @return {number|false} nextIndex - Index of the next sibling of `node`,
 *                                    or false if the walk should be terminated
 */

function walkDescendants(_ref3) {
  var callback = _ref3.callback,
      getNodeKey = _ref3.getNodeKey,
      ignoreCollapsed = _ref3.ignoreCollapsed,
      _ref3$isPseudoRoot = _ref3.isPseudoRoot,
      isPseudoRoot = _ref3$isPseudoRoot === void 0 ? false : _ref3$isPseudoRoot,
      node = _ref3.node,
      _ref3$parentNode = _ref3.parentNode,
      parentNode = _ref3$parentNode === void 0 ? null : _ref3$parentNode,
      currentIndex = _ref3.currentIndex,
      _ref3$path = _ref3.path,
      path = _ref3$path === void 0 ? [] : _ref3$path,
      _ref3$lowerSiblingCou = _ref3.lowerSiblingCounts,
      lowerSiblingCounts = _ref3$lowerSiblingCou === void 0 ? [] : _ref3$lowerSiblingCou;
  // The pseudo-root is not considered in the path
  var selfPath = isPseudoRoot ? [] : _toConsumableArray(path).concat([getNodeKey({
    node: node,
    treeIndex: currentIndex
  })]);
  var selfInfo = isPseudoRoot ? null : {
    node: node,
    parentNode: parentNode,
    path: selfPath,
    lowerSiblingCounts: lowerSiblingCounts,
    treeIndex: currentIndex
  };

  if (!isPseudoRoot) {
    var callbackResult = callback(selfInfo); // Cut walk short if the callback returned false

    if (callbackResult === false) {
      return false;
    }
  } // Return self on nodes with no children or hidden children


  if (!node.children || node.expanded !== true && ignoreCollapsed && !isPseudoRoot) {
    return currentIndex;
  } // Get all descendants


  var childIndex = currentIndex;
  var childCount = node.children.length;

  if (typeof node.children !== 'function') {
    for (var i = 0; i < childCount; i += 1) {
      childIndex = walkDescendants({
        callback: callback,
        getNodeKey: getNodeKey,
        ignoreCollapsed: ignoreCollapsed,
        node: node.children[i],
        parentNode: isPseudoRoot ? null : node,
        currentIndex: childIndex + 1,
        lowerSiblingCounts: _toConsumableArray(lowerSiblingCounts).concat([childCount - i - 1]),
        path: selfPath
      }); // Cut walk short if the callback returned false

      if (childIndex === false) {
        return false;
      }
    }
  }

  return childIndex;
}
/**
 * Perform a change on the given node and all its descendants, traversing the tree depth-first
 *
 * @param {Object} args - Function parameters
 * @param {function} args.callback - Function to call on each node
 * @param {function} args.getNodeKey - Function to get the key from the nodeData and tree index
 * @param {boolean} args.ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 * @param {boolean=} args.isPseudoRoot - If true, this node has no real data, and only serves
 *                                        as the parent of all the nodes in the tree
 * @param {Object} args.node - A tree node
 * @param {Object=} args.parentNode - The parent node of `node`
 * @param {number} args.currentIndex - The treeIndex of `node`
 * @param {number[]|string[]} args.path - Array of keys leading up to node to be changed
 * @param {number[]} args.lowerSiblingCounts - An array containing the count of siblings beneath the
 *                                             previous nodes in this path
 *
 * @return {number|false} nextIndex - Index of the next sibling of `node`,
 *                                    or false if the walk should be terminated
 */


function mapDescendants(_ref4) {
  var callback = _ref4.callback,
      getNodeKey = _ref4.getNodeKey,
      ignoreCollapsed = _ref4.ignoreCollapsed,
      _ref4$isPseudoRoot = _ref4.isPseudoRoot,
      isPseudoRoot = _ref4$isPseudoRoot === void 0 ? false : _ref4$isPseudoRoot,
      node = _ref4.node,
      _ref4$parentNode = _ref4.parentNode,
      parentNode = _ref4$parentNode === void 0 ? null : _ref4$parentNode,
      currentIndex = _ref4.currentIndex,
      _ref4$path = _ref4.path,
      path = _ref4$path === void 0 ? [] : _ref4$path,
      _ref4$lowerSiblingCou = _ref4.lowerSiblingCounts,
      lowerSiblingCounts = _ref4$lowerSiblingCou === void 0 ? [] : _ref4$lowerSiblingCou;

  var nextNode = _objectSpread({}, node); // The pseudo-root is not considered in the path


  var selfPath = isPseudoRoot ? [] : _toConsumableArray(path).concat([getNodeKey({
    node: nextNode,
    treeIndex: currentIndex
  })]);
  var selfInfo = {
    node: nextNode,
    parentNode: parentNode,
    path: selfPath,
    lowerSiblingCounts: lowerSiblingCounts,
    treeIndex: currentIndex
  }; // Return self on nodes with no children or hidden children

  if (!nextNode.children || nextNode.expanded !== true && ignoreCollapsed && !isPseudoRoot) {
    return {
      treeIndex: currentIndex,
      node: callback(selfInfo)
    };
  } // Get all descendants


  var childIndex = currentIndex;
  var childCount = nextNode.children.length;

  if (typeof nextNode.children !== 'function') {
    nextNode.children = nextNode.children.map(function (child, i) {
      var mapResult = mapDescendants({
        callback: callback,
        getNodeKey: getNodeKey,
        ignoreCollapsed: ignoreCollapsed,
        node: child,
        parentNode: isPseudoRoot ? null : nextNode,
        currentIndex: childIndex + 1,
        lowerSiblingCounts: _toConsumableArray(lowerSiblingCounts).concat([childCount - i - 1]),
        path: selfPath
      });
      childIndex = mapResult.treeIndex;
      return mapResult.node;
    });
  }

  return {
    node: callback(selfInfo),
    treeIndex: childIndex
  };
}
/**
 * Count all the visible (expanded) descendants in the tree data.
 *
 * @param {!Object[]} treeData - Tree data
 *
 * @return {number} count
 */


function getVisibleNodeCount(_ref5) {
  var treeData = _ref5.treeData;

  var traverse = function traverse(node) {
    if (!node.children || node.expanded !== true || typeof node.children === 'function') {
      return 1;
    }

    return 1 + node.children.reduce(function (total, currentNode) {
      return total + traverse(currentNode);
    }, 0);
  };

  return treeData.reduce(function (total, currentNode) {
    return total + traverse(currentNode);
  }, 0);
}
/**
 * Get the <targetIndex>th visible node in the tree data.
 *
 * @param {!Object[]} treeData - Tree data
 * @param {!number} targetIndex - The index of the node to search for
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 *
 * @return {{
 *      node: Object,
 *      path: []string|[]number,
 *      lowerSiblingCounts: []number
 *  }|null} node - The node at targetIndex, or null if not found
 */

function getVisibleNodeInfoAtIndex(_ref6) {
  var treeData = _ref6.treeData,
      targetIndex = _ref6.index,
      getNodeKey = _ref6.getNodeKey;

  if (!treeData || treeData.length < 1) {
    return null;
  } // Call the tree traversal with a pseudo-root node


  var result = getNodeDataAtTreeIndexOrNextIndex({
    targetIndex: targetIndex,
    getNodeKey: getNodeKey,
    node: {
      children: treeData,
      expanded: true
    },
    currentIndex: -1,
    path: [],
    lowerSiblingCounts: [],
    isPseudoRoot: true
  });

  if (result.node) {
    return result;
  }

  return null;
}
/**
 * Walk descendants depth-first and call a callback on each
 *
 * @param {!Object[]} treeData - Tree data
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 * @param {function} callback - Function to call on each node
 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 *
 * @return void
 */

function walk(_ref7) {
  var treeData = _ref7.treeData,
      getNodeKey = _ref7.getNodeKey,
      callback = _ref7.callback,
      _ref7$ignoreCollapsed = _ref7.ignoreCollapsed,
      ignoreCollapsed = _ref7$ignoreCollapsed === void 0 ? true : _ref7$ignoreCollapsed;

  if (!treeData || treeData.length < 1) {
    return;
  }

  walkDescendants({
    callback: callback,
    getNodeKey: getNodeKey,
    ignoreCollapsed: ignoreCollapsed,
    isPseudoRoot: true,
    node: {
      children: treeData
    },
    currentIndex: -1,
    path: [],
    lowerSiblingCounts: []
  });
}
/**
 * Perform a depth-first transversal of the descendants and
 *  make a change to every node in the tree
 *
 * @param {!Object[]} treeData - Tree data
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 * @param {function} callback - Function to call on each node
 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 *
 * @return {Object[]} changedTreeData - The changed tree data
 */

function map(_ref8) {
  var treeData = _ref8.treeData,
      getNodeKey = _ref8.getNodeKey,
      callback = _ref8.callback,
      _ref8$ignoreCollapsed = _ref8.ignoreCollapsed,
      ignoreCollapsed = _ref8$ignoreCollapsed === void 0 ? true : _ref8$ignoreCollapsed;

  if (!treeData || treeData.length < 1) {
    return [];
  }

  return mapDescendants({
    callback: callback,
    getNodeKey: getNodeKey,
    ignoreCollapsed: ignoreCollapsed,
    isPseudoRoot: true,
    node: {
      children: treeData
    },
    currentIndex: -1,
    path: [],
    lowerSiblingCounts: []
  }).node.children;
}
/**
 * Expand or close every node in the tree
 *
 * @param {!Object[]} treeData - Tree data
 * @param {?boolean} expanded - Whether the node is expanded or not
 *
 * @return {Object[]} changedTreeData - The changed tree data
 */

function toggleExpandedForAll(_ref9) {
  var treeData = _ref9.treeData,
      _ref9$expanded = _ref9.expanded,
      expanded = _ref9$expanded === void 0 ? true : _ref9$expanded;
  return map({
    treeData: treeData,
    callback: function callback(_ref10) {
      var node = _ref10.node;
      return _objectSpread({}, node, {
        expanded: expanded
      });
    },
    getNodeKey: function getNodeKey(_ref11) {
      var treeIndex = _ref11.treeIndex;
      return treeIndex;
    },
    ignoreCollapsed: false
  });
}
/**
 * Replaces node at path with object, or callback-defined object
 *
 * @param {!Object[]} treeData
 * @param {number[]|string[]} path - Array of keys leading up to node to be changed
 * @param {function|any} newNode - Node to replace the node at the path with, or a function producing the new node
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 *
 * @return {Object[]} changedTreeData - The changed tree data
 */

function changeNodeAtPath(_ref12) {
  var treeData = _ref12.treeData,
      path = _ref12.path,
      newNode = _ref12.newNode,
      getNodeKey = _ref12.getNodeKey,
      _ref12$ignoreCollapse = _ref12.ignoreCollapsed,
      ignoreCollapsed = _ref12$ignoreCollapse === void 0 ? true : _ref12$ignoreCollapse;
  var RESULT_MISS = 'RESULT_MISS';

  var traverse = function traverse(_ref13) {
    var _ref13$isPseudoRoot = _ref13.isPseudoRoot,
        isPseudoRoot = _ref13$isPseudoRoot === void 0 ? false : _ref13$isPseudoRoot,
        node = _ref13.node,
        currentTreeIndex = _ref13.currentTreeIndex,
        pathIndex = _ref13.pathIndex;

    if (!isPseudoRoot && getNodeKey({
      node: node,
      treeIndex: currentTreeIndex
    }) !== path[pathIndex]) {
      return RESULT_MISS;
    }

    if (pathIndex >= path.length - 1) {
      // If this is the final location in the path, return its changed form
      return typeof newNode === 'function' ? newNode({
        node: node,
        treeIndex: currentTreeIndex
      }) : newNode;
    }

    if (!node.children) {
      // If this node is part of the path, but has no children, return the unchanged node
      throw new Error('Path referenced children of node with no children.');
    }

    var nextTreeIndex = currentTreeIndex + 1;

    for (var i = 0; i < node.children.length; i += 1) {
      var _result = traverse({
        node: node.children[i],
        currentTreeIndex: nextTreeIndex,
        pathIndex: pathIndex + 1
      }); // If the result went down the correct path


      if (_result !== RESULT_MISS) {
        if (_result) {
          // If the result was truthy (in this case, an object),
          //  pass it to the next level of recursion up
          return _objectSpread({}, node, {
            children: _toConsumableArray(node.children.slice(0, i)).concat([_result], _toConsumableArray(node.children.slice(i + 1)))
          });
        } // If the result was falsy (returned from the newNode function), then
        //  delete the node from the array.


        return _objectSpread({}, node, {
          children: _toConsumableArray(node.children.slice(0, i)).concat(_toConsumableArray(node.children.slice(i + 1)))
        });
      }

      nextTreeIndex += 1 + getDescendantCount({
        node: node.children[i],
        ignoreCollapsed: ignoreCollapsed
      });
    }

    return RESULT_MISS;
  }; // Use a pseudo-root node in the beginning traversal


  var result = traverse({
    node: {
      children: treeData
    },
    currentTreeIndex: -1,
    pathIndex: -1,
    isPseudoRoot: true
  });

  if (result === RESULT_MISS) {
    throw new Error('No node found at the given path.');
  }

  return result.children;
}
/**
 * Removes the node at the specified path and returns the resulting treeData.
 *
 * @param {!Object[]} treeData
 * @param {number[]|string[]} path - Array of keys leading up to node to be deleted
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 *
 * @return {Object[]} changedTreeData - The tree data with the node removed
 */

function removeNodeAtPath(_ref14) {
  var treeData = _ref14.treeData,
      path = _ref14.path,
      getNodeKey = _ref14.getNodeKey,
      _ref14$ignoreCollapse = _ref14.ignoreCollapsed,
      ignoreCollapsed = _ref14$ignoreCollapse === void 0 ? true : _ref14$ignoreCollapse;
  return changeNodeAtPath({
    treeData: treeData,
    path: path,
    getNodeKey: getNodeKey,
    ignoreCollapsed: ignoreCollapsed,
    newNode: null // Delete the node

  });
}
/**
 * Removes the node at the specified path and returns the resulting treeData.
 *
 * @param {!Object[]} treeData
 * @param {number[]|string[]} path - Array of keys leading up to node to be deleted
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 *
 * @return {Object} result
 * @return {Object[]} result.treeData - The tree data with the node removed
 * @return {Object} result.node - The node that was removed
 * @return {number} result.treeIndex - The previous treeIndex of the removed node
 */

function removeNode(_ref15) {
  var treeData = _ref15.treeData,
      path = _ref15.path,
      getNodeKey = _ref15.getNodeKey,
      _ref15$ignoreCollapse = _ref15.ignoreCollapsed,
      ignoreCollapsed = _ref15$ignoreCollapse === void 0 ? true : _ref15$ignoreCollapse;
  var removedNode = null;
  var removedTreeIndex = null;
  var nextTreeData = changeNodeAtPath({
    treeData: treeData,
    path: path,
    getNodeKey: getNodeKey,
    ignoreCollapsed: ignoreCollapsed,
    newNode: function newNode(_ref16) {
      var node = _ref16.node,
          treeIndex = _ref16.treeIndex;
      // Store the target node and delete it from the tree
      removedNode = node;
      removedTreeIndex = treeIndex;
      return null;
    }
  });
  return {
    treeData: nextTreeData,
    node: removedNode,
    treeIndex: removedTreeIndex
  };
}
/**
 * Gets the node at the specified path
 *
 * @param {!Object[]} treeData
 * @param {number[]|string[]} path - Array of keys leading up to node to be deleted
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 *
 * @return {Object|null} nodeInfo - The node info at the given path, or null if not found
 */

function getNodeAtPath(_ref17) {
  var treeData = _ref17.treeData,
      path = _ref17.path,
      getNodeKey = _ref17.getNodeKey,
      _ref17$ignoreCollapse = _ref17.ignoreCollapsed,
      ignoreCollapsed = _ref17$ignoreCollapse === void 0 ? true : _ref17$ignoreCollapse;
  var foundNodeInfo = null;

  try {
    changeNodeAtPath({
      treeData: treeData,
      path: path,
      getNodeKey: getNodeKey,
      ignoreCollapsed: ignoreCollapsed,
      newNode: function newNode(_ref18) {
        var node = _ref18.node,
            treeIndex = _ref18.treeIndex;
        foundNodeInfo = {
          node: node,
          treeIndex: treeIndex
        };
        return node;
      }
    });
  } catch (err) {// Ignore the error -- the null return will be explanation enough
  }

  return foundNodeInfo;
}
/**
 * Adds the node to the specified parent and returns the resulting treeData.
 *
 * @param {!Object[]} treeData
 * @param {!Object} newNode - The node to insert
 * @param {number|string} parentKey - The key of the to-be parentNode of the node
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 * @param {boolean=} expandParent - If true, expands the parentNode specified by parentPath
 * @param {boolean=} addAsFirstChild - If true, adds new node as first child of tree
 *
 * @return {Object} result
 * @return {Object[]} result.treeData - The updated tree data
 * @return {number} result.treeIndex - The tree index at which the node was inserted
 */

function addNodeUnderParent(_ref19) {
  var treeData = _ref19.treeData,
      newNode = _ref19.newNode,
      _ref19$parentKey = _ref19.parentKey,
      parentKey = _ref19$parentKey === void 0 ? null : _ref19$parentKey,
      getNodeKey = _ref19.getNodeKey,
      _ref19$ignoreCollapse = _ref19.ignoreCollapsed,
      ignoreCollapsed = _ref19$ignoreCollapse === void 0 ? true : _ref19$ignoreCollapse,
      _ref19$expandParent = _ref19.expandParent,
      expandParent = _ref19$expandParent === void 0 ? false : _ref19$expandParent,
      _ref19$addAsFirstChil = _ref19.addAsFirstChild,
      addAsFirstChild = _ref19$addAsFirstChil === void 0 ? false : _ref19$addAsFirstChil;

  if (parentKey === null) {
    return {
      treeData: _toConsumableArray(treeData || []).concat([newNode]),
      treeIndex: (treeData || []).length
    };
  }

  var insertedTreeIndex = null;
  var hasBeenAdded = false;
  var changedTreeData = map({
    treeData: treeData,
    getNodeKey: getNodeKey,
    ignoreCollapsed: ignoreCollapsed,
    callback: function callback(_ref20) {
      var node = _ref20.node,
          treeIndex = _ref20.treeIndex,
          path = _ref20.path;
      var key = path ? path[path.length - 1] : null; // Return nodes that are not the parent as-is

      if (hasBeenAdded || key !== parentKey) {
        return node;
      }

      hasBeenAdded = true;

      var parentNode = _objectSpread({}, node);

      if (expandParent) {
        parentNode.expanded = true;
      } // If no children exist yet, just add the single newNode


      if (!parentNode.children) {
        insertedTreeIndex = treeIndex + 1;
        return _objectSpread({}, parentNode, {
          children: [newNode]
        });
      }

      if (typeof parentNode.children === 'function') {
        throw new Error('Cannot add to children defined by a function');
      }

      var nextTreeIndex = treeIndex + 1;

      for (var i = 0; i < parentNode.children.length; i += 1) {
        nextTreeIndex += 1 + getDescendantCount({
          node: parentNode.children[i],
          ignoreCollapsed: ignoreCollapsed
        });
      }

      insertedTreeIndex = nextTreeIndex;
      var children = addAsFirstChild ? [newNode].concat(_toConsumableArray(parentNode.children)) : _toConsumableArray(parentNode.children).concat([newNode]);
      return _objectSpread({}, parentNode, {
        children: children
      });
    }
  });

  if (!hasBeenAdded) {
    throw new Error('No node found with the given key.');
  }

  return {
    treeData: changedTreeData,
    treeIndex: insertedTreeIndex
  };
}

function addNodeAtDepthAndIndex(_ref21) {
  var targetDepth = _ref21.targetDepth,
      minimumTreeIndex = _ref21.minimumTreeIndex,
      newNode = _ref21.newNode,
      ignoreCollapsed = _ref21.ignoreCollapsed,
      expandParent = _ref21.expandParent,
      _ref21$isPseudoRoot = _ref21.isPseudoRoot,
      isPseudoRoot = _ref21$isPseudoRoot === void 0 ? false : _ref21$isPseudoRoot,
      isLastChild = _ref21.isLastChild,
      node = _ref21.node,
      currentIndex = _ref21.currentIndex,
      currentDepth = _ref21.currentDepth,
      getNodeKey = _ref21.getNodeKey,
      _ref21$path = _ref21.path,
      path = _ref21$path === void 0 ? [] : _ref21$path;

  var selfPath = function selfPath(n) {
    return isPseudoRoot ? [] : _toConsumableArray(path).concat([getNodeKey({
      node: n,
      treeIndex: currentIndex
    })]);
  }; // If the current position is the only possible place to add, add it


  if (currentIndex >= minimumTreeIndex - 1 || isLastChild && !(node.children && node.children.length)) {
    if (typeof node.children === 'function') {
      throw new Error('Cannot add to children defined by a function');
    } else {
      var extraNodeProps = expandParent ? {
        expanded: true
      } : {};

      var _nextNode = _objectSpread({}, node, extraNodeProps, {
        children: node.children ? [newNode].concat(_toConsumableArray(node.children)) : [newNode]
      });

      return {
        node: _nextNode,
        nextIndex: currentIndex + 2,
        insertedTreeIndex: currentIndex + 1,
        parentPath: selfPath(_nextNode),
        parentNode: isPseudoRoot ? null : _nextNode
      };
    }
  } // If this is the target depth for the insertion,
  // i.e., where the newNode can be added to the current node's children


  if (currentDepth >= targetDepth - 1) {
    // Skip over nodes with no children or hidden children
    if (!node.children || typeof node.children === 'function' || node.expanded !== true && ignoreCollapsed && !isPseudoRoot) {
      return {
        node: node,
        nextIndex: currentIndex + 1
      };
    } // Scan over the children to see if there's a place among them that fulfills
    // the minimumTreeIndex requirement


    var _childIndex = currentIndex + 1;

    var _insertedTreeIndex = null;
    var insertIndex = null;

    for (var i = 0; i < node.children.length; i += 1) {
      // If a valid location is found, mark it as the insertion location and
      // break out of the loop
      if (_childIndex >= minimumTreeIndex) {
        _insertedTreeIndex = _childIndex;
        insertIndex = i;
        break;
      } // Increment the index by the child itself plus the number of descendants it has


      _childIndex += 1 + getDescendantCount({
        node: node.children[i],
        ignoreCollapsed: ignoreCollapsed
      });
    } // If no valid indices to add the node were found


    if (insertIndex === null) {
      // If the last position in this node's children is less than the minimum index
      // and there are more children on the level of this node, return without insertion
      if (_childIndex < minimumTreeIndex && !isLastChild) {
        return {
          node: node,
          nextIndex: _childIndex
        };
      } // Use the last position in the children array to insert the newNode


      _insertedTreeIndex = _childIndex;
      insertIndex = node.children.length;
    } // Insert the newNode at the insertIndex


    var _nextNode2 = _objectSpread({}, node, {
      children: _toConsumableArray(node.children.slice(0, insertIndex)).concat([newNode], _toConsumableArray(node.children.slice(insertIndex)))
    }); // Return node with successful insert result


    return {
      node: _nextNode2,
      nextIndex: _childIndex,
      insertedTreeIndex: _insertedTreeIndex,
      parentPath: selfPath(_nextNode2),
      parentNode: isPseudoRoot ? null : _nextNode2
    };
  } // Skip over nodes with no children or hidden children


  if (!node.children || typeof node.children === 'function' || node.expanded !== true && ignoreCollapsed && !isPseudoRoot) {
    return {
      node: node,
      nextIndex: currentIndex + 1
    };
  } // Get all descendants


  var insertedTreeIndex = null;
  var pathFragment = null;
  var parentNode = null;
  var childIndex = currentIndex + 1;
  var newChildren = node.children;

  if (typeof newChildren !== 'function') {
    newChildren = newChildren.map(function (child, i) {
      if (insertedTreeIndex !== null) {
        return child;
      }

      var mapResult = addNodeAtDepthAndIndex({
        targetDepth: targetDepth,
        minimumTreeIndex: minimumTreeIndex,
        newNode: newNode,
        ignoreCollapsed: ignoreCollapsed,
        expandParent: expandParent,
        isLastChild: isLastChild && i === newChildren.length - 1,
        node: child,
        currentIndex: childIndex,
        currentDepth: currentDepth + 1,
        getNodeKey: getNodeKey,
        path: [] // Cannot determine the parent path until the children have been processed

      });

      if ('insertedTreeIndex' in mapResult) {
        insertedTreeIndex = mapResult.insertedTreeIndex;
        parentNode = mapResult.parentNode;
        pathFragment = mapResult.parentPath;
      }

      childIndex = mapResult.nextIndex;
      return mapResult.node;
    });
  }

  var nextNode = _objectSpread({}, node, {
    children: newChildren
  });

  var result = {
    node: nextNode,
    nextIndex: childIndex
  };

  if (insertedTreeIndex !== null) {
    result.insertedTreeIndex = insertedTreeIndex;
    result.parentPath = _toConsumableArray(selfPath(nextNode)).concat(_toConsumableArray(pathFragment));
    result.parentNode = parentNode;
  }

  return result;
}
/**
 * Insert a node into the tree at the given depth, after the minimum index
 *
 * @param {!Object[]} treeData - Tree data
 * @param {!number} depth - The depth to insert the node at (the first level of the array being depth 0)
 * @param {!number} minimumTreeIndex - The lowest possible treeIndex to insert the node at
 * @param {!Object} newNode - The node to insert into the tree
 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 * @param {boolean=} expandParent - If true, expands the parent of the inserted node
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 *
 * @return {Object} result
 * @return {Object[]} result.treeData - The tree data with the node added
 * @return {number} result.treeIndex - The tree index at which the node was inserted
 * @return {number[]|string[]} result.path - Array of keys leading to the node location after insertion
 * @return {Object} result.parentNode - The parent node of the inserted node
 */


function insertNode(_ref22) {
  var treeData = _ref22.treeData,
      targetDepth = _ref22.depth,
      minimumTreeIndex = _ref22.minimumTreeIndex,
      newNode = _ref22.newNode,
      _ref22$getNodeKey = _ref22.getNodeKey,
      getNodeKey = _ref22$getNodeKey === void 0 ? function () {} : _ref22$getNodeKey,
      _ref22$ignoreCollapse = _ref22.ignoreCollapsed,
      ignoreCollapsed = _ref22$ignoreCollapse === void 0 ? true : _ref22$ignoreCollapse,
      _ref22$expandParent = _ref22.expandParent,
      expandParent = _ref22$expandParent === void 0 ? false : _ref22$expandParent;

  if (!treeData && targetDepth === 0) {
    return {
      treeData: [newNode],
      treeIndex: 0,
      path: [getNodeKey({
        node: newNode,
        treeIndex: 0
      })],
      parentNode: null
    };
  }

  var insertResult = addNodeAtDepthAndIndex({
    targetDepth: targetDepth,
    minimumTreeIndex: minimumTreeIndex,
    newNode: newNode,
    ignoreCollapsed: ignoreCollapsed,
    expandParent: expandParent,
    getNodeKey: getNodeKey,
    isPseudoRoot: true,
    isLastChild: true,
    node: {
      children: treeData
    },
    currentIndex: -1,
    currentDepth: -1
  });

  if (!('insertedTreeIndex' in insertResult)) {
    throw new Error('No suitable position found to insert.');
  }

  var treeIndex = insertResult.insertedTreeIndex;
  return {
    treeData: insertResult.node.children,
    treeIndex: treeIndex,
    path: _toConsumableArray(insertResult.parentPath).concat([getNodeKey({
      node: newNode,
      treeIndex: treeIndex
    })]),
    parentNode: insertResult.parentNode
  };
}
/**
 * Get tree data flattened.
 *
 * @param {!Object[]} treeData - Tree data
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
 *
 * @return {{
 *      node: Object,
 *      path: []string|[]number,
 *      lowerSiblingCounts: []number
 *  }}[] nodes - The node array
 */

function getFlatDataFromTree(_ref23) {
  var treeData = _ref23.treeData,
      getNodeKey = _ref23.getNodeKey,
      _ref23$ignoreCollapse = _ref23.ignoreCollapsed,
      ignoreCollapsed = _ref23$ignoreCollapse === void 0 ? true : _ref23$ignoreCollapse;

  if (!treeData || treeData.length < 1) {
    return [];
  }

  var flattened = [];
  walk({
    treeData: treeData,
    getNodeKey: getNodeKey,
    ignoreCollapsed: ignoreCollapsed,
    callback: function callback(nodeInfo) {
      flattened.push(nodeInfo);
    }
  });
  return flattened;
}
/**
 * Generate a tree structure from flat data.
 *
 * @param {!Object[]} flatData
 * @param {!function=} getKey - Function to get the key from the nodeData
 * @param {!function=} getParentKey - Function to get the parent key from the nodeData
 * @param {string|number=} rootKey - The value returned by `getParentKey` that corresponds to the root node.
 *                                  For example, if your nodes have id 1-99, you might use rootKey = 0
 *
 * @return {Object[]} treeData - The flat data represented as a tree
 */

function getTreeFromFlatData(_ref24) {
  var flatData = _ref24.flatData,
      _ref24$getKey = _ref24.getKey,
      getKey = _ref24$getKey === void 0 ? function (node) {
    return node.id;
  } : _ref24$getKey,
      _ref24$getParentKey = _ref24.getParentKey,
      getParentKey = _ref24$getParentKey === void 0 ? function (node) {
    return node.parentId;
  } : _ref24$getParentKey,
      _ref24$rootKey = _ref24.rootKey,
      rootKey = _ref24$rootKey === void 0 ? '0' : _ref24$rootKey;

  if (!flatData) {
    return [];
  }

  var childrenToParents = {};
  flatData.forEach(function (child) {
    var parentKey = getParentKey(child);

    if (parentKey in childrenToParents) {
      childrenToParents[parentKey].push(child);
    } else {
      childrenToParents[parentKey] = [child];
    }
  });

  if (!(rootKey in childrenToParents)) {
    return [];
  }

  var trav = function trav(parent) {
    var parentKey = getKey(parent);

    if (parentKey in childrenToParents) {
      return _objectSpread({}, parent, {
        children: childrenToParents[parentKey].map(function (child) {
          return trav(child);
        })
      });
    }

    return _objectSpread({}, parent);
  };

  return childrenToParents[rootKey].map(function (child) {
    return trav(child);
  });
}
/**
 * Check if a node is a descendant of another node.
 *
 * @param {!Object} older - Potential ancestor of younger node
 * @param {!Object} younger - Potential descendant of older node
 *
 * @return {boolean}
 */

function isDescendant(older, younger) {
  return !!older.children && typeof older.children !== 'function' && older.children.some(function (child) {
    return child === younger || isDescendant(child, younger);
  });
}
/**
 * Get the maximum depth of the children (the depth of the root node is 0).
 *
 * @param {!Object} node - Node in the tree
 * @param {?number} depth - The current depth
 *
 * @return {number} maxDepth - The deepest depth in the tree
 */

function getDepth(node) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (!node.children) {
    return depth;
  }

  if (typeof node.children === 'function') {
    return depth + 1;
  }

  return node.children.reduce(function (deepest, child) {
    return Math.max(deepest, getDepth(child, depth + 1));
  }, depth);
}
/**
 * Find nodes matching a search query in the tree,
 *
 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
 * @param {!Object[]} treeData - Tree data
 * @param {?string|number} searchQuery - Function returning a boolean to indicate whether the node is a match or not
 * @param {!function} searchMethod - Function returning a boolean to indicate whether the node is a match or not
 * @param {?number} searchFocusOffset - The offset of the match to focus on
 *                                      (e.g., 0 focuses on the first match, 1 on the second)
 * @param {boolean=} expandAllMatchPaths - If true, expands the paths to any matched node
 * @param {boolean=} expandFocusMatchPaths - If true, expands the path to the focused node
 *
 * @return {Object[]} matches - An array of objects containing the matching `node`s, their `path`s and `treeIndex`s
 * @return {Object[]} treeData - The original tree data with all relevant nodes expanded.
 *                               If expandAllMatchPaths and expandFocusMatchPaths are both false,
 *                               it will be the same as the original tree data.
 */

function find(_ref25) {
  var getNodeKey = _ref25.getNodeKey,
      treeData = _ref25.treeData,
      searchQuery = _ref25.searchQuery,
      searchMethod = _ref25.searchMethod,
      searchFocusOffset = _ref25.searchFocusOffset,
      _ref25$expandAllMatch = _ref25.expandAllMatchPaths,
      expandAllMatchPaths = _ref25$expandAllMatch === void 0 ? false : _ref25$expandAllMatch,
      _ref25$expandFocusMat = _ref25.expandFocusMatchPaths,
      expandFocusMatchPaths = _ref25$expandFocusMat === void 0 ? true : _ref25$expandFocusMat;
  var matchCount = 0;

  var trav = function trav(_ref26) {
    var _ref26$isPseudoRoot = _ref26.isPseudoRoot,
        isPseudoRoot = _ref26$isPseudoRoot === void 0 ? false : _ref26$isPseudoRoot,
        node = _ref26.node,
        currentIndex = _ref26.currentIndex,
        _ref26$path = _ref26.path,
        path = _ref26$path === void 0 ? [] : _ref26$path;
    var matches = [];
    var isSelfMatch = false;
    var hasFocusMatch = false; // The pseudo-root is not considered in the path

    var selfPath = isPseudoRoot ? [] : _toConsumableArray(path).concat([getNodeKey({
      node: node,
      treeIndex: currentIndex
    })]);
    var extraInfo = isPseudoRoot ? null : {
      path: selfPath,
      treeIndex: currentIndex
    }; // Nodes with with children that aren't lazy

    var hasChildren = node.children && typeof node.children !== 'function' && node.children.length > 0; // Examine the current node to see if it is a match

    if (!isPseudoRoot && searchMethod(_objectSpread({}, extraInfo, {
      node: node,
      searchQuery: searchQuery
    }))) {
      if (matchCount === searchFocusOffset) {
        hasFocusMatch = true;
      } // Keep track of the number of matching nodes, so we know when the searchFocusOffset
      //  is reached


      matchCount += 1; // We cannot add this node to the matches right away, as it may be changed
      //  during the search of the descendants. The entire node is used in
      //  comparisons between nodes inside the `matches` and `treeData` results
      //  of this method (`find`)

      isSelfMatch = true;
    }

    var childIndex = currentIndex;

    var newNode = _objectSpread({}, node);

    if (hasChildren) {
      // Get all descendants
      newNode.children = newNode.children.map(function (child) {
        var mapResult = trav({
          node: child,
          currentIndex: childIndex + 1,
          path: selfPath
        }); // Ignore hidden nodes by only advancing the index counter to the returned treeIndex
        // if the child is expanded.
        //
        // The child could have been expanded from the start,
        // or expanded due to a matching node being found in its descendants

        if (mapResult.node.expanded) {
          childIndex = mapResult.treeIndex;
        } else {
          childIndex += 1;
        }

        if (mapResult.matches.length > 0 || mapResult.hasFocusMatch) {
          matches = _toConsumableArray(matches).concat(_toConsumableArray(mapResult.matches));

          if (mapResult.hasFocusMatch) {
            hasFocusMatch = true;
          } // Expand the current node if it has descendants matching the search
          // and the settings are set to do so.


          if (expandAllMatchPaths && mapResult.matches.length > 0 || (expandAllMatchPaths || expandFocusMatchPaths) && mapResult.hasFocusMatch) {
            newNode.expanded = true;
          }
        }

        return mapResult.node;
      });
    } // Cannot assign a treeIndex to hidden nodes


    if (!isPseudoRoot && !newNode.expanded) {
      matches = matches.map(function (match) {
        return _objectSpread({}, match, {
          treeIndex: null
        });
      });
    } // Add this node to the matches if it fits the search criteria.
    // This is performed at the last minute so newNode can be sent in its final form.


    if (isSelfMatch) {
      matches = [_objectSpread({}, extraInfo, {
        node: newNode
      })].concat(_toConsumableArray(matches));
    }

    return {
      node: matches.length > 0 ? newNode : node,
      matches: matches,
      hasFocusMatch: hasFocusMatch,
      treeIndex: childIndex
    };
  };

  var result = trav({
    node: {
      children: treeData
    },
    isPseudoRoot: true,
    currentIndex: -1
  });
  return {
    matches: result.matches,
    treeData: result.node.children
  };
}

var NodeRendererDefault =
/*#__PURE__*/
function (_Component) {
  _inherits(NodeRendererDefault, _Component);

  function NodeRendererDefault() {
    _classCallCheck(this, NodeRendererDefault);

    return _possibleConstructorReturn(this, _getPrototypeOf(NodeRendererDefault).apply(this, arguments));
  }

  _createClass(NodeRendererDefault, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          scaffoldBlockPxWidth = _this$props.scaffoldBlockPxWidth,
          toggleChildrenVisibility = _this$props.toggleChildrenVisibility,
          connectDragPreview = _this$props.connectDragPreview,
          connectDragSource = _this$props.connectDragSource,
          isDragging = _this$props.isDragging,
          canDrop = _this$props.canDrop,
          canDrag = _this$props.canDrag,
          node = _this$props.node,
          title = _this$props.title,
          subtitle = _this$props.subtitle,
          draggedNodes = _this$props.draggedNodes,
          path = _this$props.path,
          treeIndex = _this$props.treeIndex,
          isSearchMatch = _this$props.isSearchMatch,
          isSearchFocus = _this$props.isSearchFocus,
          buttons = _this$props.buttons,
          className = _this$props.className,
          style = _this$props.style,
          didDrop = _this$props.didDrop,
          treeId = _this$props.treeId,
          isOver = _this$props.isOver,
          parentNode = _this$props.parentNode,
          rowDirection = _this$props.rowDirection,
          otherProps = _objectWithoutProperties(_this$props, ["scaffoldBlockPxWidth", "toggleChildrenVisibility", "connectDragPreview", "connectDragSource", "isDragging", "canDrop", "canDrag", "node", "title", "subtitle", "draggedNodes", "path", "treeIndex", "isSearchMatch", "isSearchFocus", "buttons", "className", "style", "didDrop", "treeId", "isOver", "parentNode", "rowDirection"]);

      var nodeTitle = title || node.title;
      var nodeSubtitle = subtitle || node.subtitle;
      var rowDirectionClass = rowDirection === 'rtl' ? 'rst__rtl' : null;
      var handle;

      if (canDrag) {
        if (typeof node.children === 'function' && node.expanded) {
          // Show a loading symbol on the handle when the children are expanded
          //  and yet still defined by a function (a callback to fetch the children)
          handle = React.createElement("div", {
            className: "rst__loadingHandle"
          }, React.createElement("div", {
            className: "rst__loadingCircle"
          }, _toConsumableArray(new Array(12)).map(function (_, index) {
            return React.createElement("div", {
              // eslint-disable-next-line react/no-array-index-key
              key: index,
              className: classnames('rst__loadingCirclePoint', rowDirectionClass)
            });
          })));
        } else {
          // Show the handle used to initiate a drag-and-drop
          handle = connectDragSource(React.createElement("div", {
            className: "rst__moveHandle"
          }), {
            dropEffect: 'copy'
          });
        }
      }

      var isDraggedDescendant = draggedNodes && isDescendant(draggedNodes, node);
      var isLandingPadActive = !didDrop && isDragging;
      var buttonStyle = {
        left: -0.5 * scaffoldBlockPxWidth
      };

      if (rowDirection === 'rtl') {
        buttonStyle = {
          right: -0.5 * scaffoldBlockPxWidth
        };
      }

      return React.createElement("div", _extends({
        style: {
          height: '100%'
        }
      }, otherProps), toggleChildrenVisibility && node.children && (node.children.length > 0 || typeof node.children === 'function') && React.createElement("div", null, React.createElement("button", {
        type: "button",
        "aria-label": node.expanded ? 'Collapse' : 'Expand',
        className: classnames(node.expanded ? 'rst__collapseButton' : 'rst__expandButton', rowDirectionClass),
        style: buttonStyle,
        onClick: function onClick() {
          return toggleChildrenVisibility({
            node: node,
            path: path,
            treeIndex: treeIndex
          });
        }
      }), node.expanded && !isDragging && React.createElement("div", {
        style: {
          width: scaffoldBlockPxWidth
        },
        className: classnames('rst__lineChildren', rowDirectionClass)
      })), React.createElement("div", {
        className: classnames('rst__rowWrapper', rowDirectionClass)
      }, connectDragPreview(React.createElement("div", {
        className: classnames('rst__row', isLandingPadActive && 'rst__rowLandingPad', isLandingPadActive && !canDrop && 'rst__rowCancelPad', isSearchMatch && 'rst__rowSearchMatch', isSearchFocus && 'rst__rowSearchFocus', rowDirectionClass, className),
        style: _objectSpread({
          opacity: isDraggedDescendant ? 0.5 : 1
        }, style)
      }, handle, React.createElement("div", {
        className: classnames('rst__rowContents', !canDrag && 'rst__rowContentsDragDisabled', rowDirectionClass)
      }, React.createElement("div", {
        className: classnames('rst__rowLabel', rowDirectionClass)
      }, React.createElement("span", {
        className: classnames('rst__rowTitle', node.subtitle && 'rst__rowTitleWithSubtitle')
      }, typeof nodeTitle === 'function' ? nodeTitle({
        node: node,
        path: path,
        treeIndex: treeIndex
      }) : nodeTitle), nodeSubtitle && React.createElement("span", {
        className: "rst__rowSubtitle"
      }, typeof nodeSubtitle === 'function' ? nodeSubtitle({
        node: node,
        path: path,
        treeIndex: treeIndex
      }) : nodeSubtitle)), React.createElement("div", {
        className: "rst__rowToolbar"
      }, buttons.map(function (btn, index) {
        return React.createElement("div", {
          key: index // eslint-disable-line react/no-array-index-key
          ,
          className: "rst__toolbarButton"
        }, btn);
      })))))));
    }
  }]);

  return NodeRendererDefault;
}(Component);

NodeRendererDefault.defaultProps = {
  isSearchMatch: false,
  isSearchFocus: false,
  canDrag: false,
  toggleChildrenVisibility: null,
  buttons: [],
  className: '',
  style: {},
  parentNode: null,
  draggedNodes: null,
  canDrop: false,
  title: null,
  subtitle: null,
  rowDirection: 'ltr'
};
NodeRendererDefault.propTypes = {
  node: PropTypes.shape({}).isRequired,
  title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  subtitle: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  path: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  treeIndex: PropTypes.number.isRequired,
  treeId: PropTypes.string.isRequired,
  isSearchMatch: PropTypes.bool,
  isSearchFocus: PropTypes.bool,
  canDrag: PropTypes.bool,
  scaffoldBlockPxWidth: PropTypes.number.isRequired,
  toggleChildrenVisibility: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.string,
  style: PropTypes.shape({}),
  // Drag and drop API functions
  // Drag source
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  parentNode: PropTypes.shape({}),
  // Needed for dndManager
  isDragging: PropTypes.bool.isRequired,
  didDrop: PropTypes.bool.isRequired,
  draggedNodes: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  // Drop target
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool,
  // rtl support
  rowDirection: PropTypes.string
};

var TreePlaceholder =
/*#__PURE__*/
function (_Component) {
  _inherits(TreePlaceholder, _Component);

  function TreePlaceholder() {
    _classCallCheck(this, TreePlaceholder);

    return _possibleConstructorReturn(this, _getPrototypeOf(TreePlaceholder).apply(this, arguments));
  }

  _createClass(TreePlaceholder, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          connectDropTarget = _this$props.connectDropTarget,
          treeId = _this$props.treeId,
          drop = _this$props.drop,
          otherProps = _objectWithoutProperties(_this$props, ["children", "connectDropTarget", "treeId", "drop"]);

      return connectDropTarget(React.createElement("div", null, Children.map(children, function (child) {
        return cloneElement(child, _objectSpread({}, otherProps));
      })));
    }
  }]);

  return TreePlaceholder;
}(Component);

TreePlaceholder.defaultProps = {
  canDrop: false,
  draggedNodes: null
};
TreePlaceholder.propTypes = {
  children: PropTypes.node.isRequired,
  // Drop target
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool,
  draggedNodes: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  treeId: PropTypes.string.isRequired,
  drop: PropTypes.func.isRequired
};

var PlaceholderRendererDefault = function PlaceholderRendererDefault(_ref) {
  var isOver = _ref.isOver,
      canDrop = _ref.canDrop;
  return React.createElement("div", {
    className: classnames('rst__placeholder', canDrop && 'rst__placeholderLandingPad', canDrop && !isOver && 'rst__placeholderCancelPad')
  });
};

PlaceholderRendererDefault.defaultProps = {
  isOver: false,
  canDrop: false
};
PlaceholderRendererDefault.propTypes = {
  isOver: PropTypes.bool,
  canDrop: PropTypes.bool
};

var memoize = function memoize(f) {
  var savedArgsArray = [];
  var savedKeysArray = [];
  var savedResult = null;
  return function (args) {
    var keysArray = Object.keys(args).sort();
    var argsArray = keysArray.map(function (key) {
      return args[key];
    }); // If the arguments for the last insert operation are different than this time,
    // recalculate the result

    if (argsArray.length !== savedArgsArray.length || argsArray.some(function (arg, index) {
      return arg !== savedArgsArray[index];
    }) || keysArray.some(function (key, index) {
      return key !== savedKeysArray[index];
    })) {
      savedArgsArray = argsArray;
      savedKeysArray = keysArray;
      savedResult = f(args);
    }

    return savedResult;
  };
};
var memoizedGetFlatDataFromTree = memoize(getFlatDataFromTree);

function defaultGetNodeKey(_ref) {
  var treeIndex = _ref.treeIndex;
  return treeIndex;
} // Cheap hack to get the text of a react object

function getReactElementText(parent) {
  if (typeof parent === 'string') {
    return parent;
  }

  if (_typeof(parent) !== 'object' || !parent.props || !parent.props.children || typeof parent.props.children !== 'string' && _typeof(parent.props.children) !== 'object') {
    return '';
  }

  if (typeof parent.props.children === 'string') {
    return parent.props.children;
  }

  return parent.props.children.map(function (child) {
    return getReactElementText(child);
  }).join('');
} // Search for a query string inside a node property


function stringSearch(key, searchQuery, node, path, treeIndex) {
  if (typeof node[key] === 'function') {
    // Search within text after calling its function to generate the text
    return String(node[key]({
      node: node,
      path: path,
      treeIndex: treeIndex
    })).indexOf(searchQuery) > -1;
  }

  if (_typeof(node[key]) === 'object') {
    // Search within text inside react elements
    return getReactElementText(node[key]).indexOf(searchQuery) > -1;
  } // Search within string


  return node[key] && String(node[key]).indexOf(searchQuery) > -1;
}

function defaultSearchMethod(_ref2) {
  var node = _ref2.node,
      path = _ref2.path,
      treeIndex = _ref2.treeIndex,
      searchQuery = _ref2.searchQuery;
  return stringSearch('title', searchQuery, node, path, treeIndex) || stringSearch('subtitle', searchQuery, node, path, treeIndex);
}

var DndManager =
/*#__PURE__*/
function () {
  function DndManager(treeRef) {
    _classCallCheck(this, DndManager);

    this.treeRef = treeRef;
  }

  _createClass(DndManager, [{
    key: "getTargetDepth",
    value: function getTargetDepth(dropTargetProps) {
      // get current node or parent node
      if (this.treeRef.canNodeHaveChildren(dropTargetProps.node)) {
        return dropTargetProps.path.length;
      }

      return dropTargetProps.path.length - 1;
    }
  }, {
    key: "canDrop",
    value: function canDrop(dropTargetProps, monitor) {
      // is not reliable https://github.com/react-dnd/react-dnd/issues/996
      // if (!monitor.isOver()) {
      //   return false;
      // }
      if (typeof this.customCanDrop === 'function') {
        var _monitor$getItem = monitor.getItem(),
            nodes = _monitor$getItem.nodes,
            paths = _monitor$getItem.paths,
            treeIndexes = _monitor$getItem.treeIndexes,
            treeId = _monitor$getItem.treeId;

        return this.customCanDrop({
          dragResult: {
            nodes: nodes,
            paths: paths,
            treeIndexes: treeIndexes,
            // Contains -1 when dragged from external tree
            treeId: treeId
          },
          dropResult: {
            node: dropTargetProps.node,
            path: dropTargetProps.path,
            treeIndex: dropTargetProps.treeIndex,
            treeId: dropTargetProps.treeId
          }
        });
      }

      return true;
    }
  }, {
    key: "wrapSource",
    value: function wrapSource(el) {
      var _this = this;

      var hoveredPath;
      var hoveredNode;

      function getHoveredItems() {
        return {
          hoveredPath: hoveredPath,
          hoveredNode: hoveredNode
        };
      }

      var nodeDragSource = {
        beginDrag: function beginDrag(props) {
          _this.startDrag();

          var nodeKeys = props.selectedNodeKeys;

          if (!nodeKeys.includes(props.node.id)) {
            return {
              getHoveredItems: getHoveredItems,
              nodes: [props.node],
              paths: [props.path],
              treeIndexes: [props.treeIndex],
              treeId: props.treeId
            };
          }

          var _find = find({
            getNodeKey: _this.getNodeKey,
            treeData: _this.treeData,
            searchMethod: function searchMethod(item) {
              return nodeKeys.includes(_this.getNodeKey(item));
            },
            expandFocusMatchPaths: false,
            expandAllMatchPaths: false
          }),
              nodeInfos = _find.matches;

          var nodes = nodeInfos.map(function (nodeInfo) {
            return nodeInfo.node;
          });
          var paths = nodeInfos.map(function (nodeInfo) {
            return nodeInfo.path;
          });
          var treeIndexes = nodeInfos.map(function (nodeInfo) {
            return nodeInfo.treeIndex;
          });
          return {
            getHoveredItems: getHoveredItems,
            nodes: nodes,
            paths: paths,
            treeIndexes: treeIndexes,
            treeId: props.treeId
          };
        },
        endDrag: function endDrag(props, monitor) {
          hoveredPath = null;
          hoveredNode = null;

          _this.endDrag(monitor.getDropResult());
        },
        isDragging: function isDragging(props, monitor) {
          var dropTargetNodes = monitor.getItem().nodes;

          var key = _this.getNodeKey(props);

          return !!dropTargetNodes.find(function (dropTargetNode) {
            return _this.getNodeKey({
              node: dropTargetNode
            }) === key;
          });
        },
        canDrag: function canDrag(props) {
          return props.canDrag;
        }
      };

      function nodeDragSourcePropInjection(connect, monitor, props) {
        // eslint-disable-next-line prefer-destructuring
        hoveredPath = props.hoveredPath; // eslint-disable-next-line prefer-destructuring

        hoveredNode = props.hoveredNode;
        return {
          connectDragSource: connect.dragSource(),
          connectDragPreview: connect.dragPreview(),
          isDragging: monitor.isDragging(),
          didDrop: monitor.didDrop()
        };
      }

      return DragSource(this.dndType, nodeDragSource, nodeDragSourcePropInjection)(el);
    }
  }, {
    key: "wrapTarget",
    value: function wrapTarget(el) {
      var _this2 = this;

      var nodeDropTarget = {
        drop: function drop(dropTargetProps, monitor, component) {
          var result = {
            nodes: monitor.getItem().nodes,
            paths: monitor.getItem().paths,
            treeIndexes: monitor.getItem().treeIndexes,
            treeId: _this2.treeId,
            minimumTreeIndex: dropTargetProps.treeIndex + 1,
            depth: _this2.getTargetDepth(dropTargetProps, monitor, component)
          };

          _this2.drop(result);

          return result;
        },
        hover: function hover(dropTargetProps) {
          _this2.dragHover({
            hoveredNode: dropTargetProps.node,
            hoveredPath: dropTargetProps.path
          });
        },
        canDrop: this.canDrop.bind(this)
      };

      function nodeDropTargetPropInjection(connect, monitor) {
        var dragged = monitor.getItem();
        return {
          connectDropTarget: connect.dropTarget(),
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
          draggedNodes: dragged ? dragged.nodes : null
        };
      }

      return DropTarget(this.dndType, nodeDropTarget, nodeDropTargetPropInjection)(el);
    }
  }, {
    key: "wrapPlaceholder",
    value: function wrapPlaceholder(el) {
      var _this3 = this;

      var placeholderDropTarget = {
        drop: function drop(dropTargetProps, monitor) {
          var _monitor$getItem2 = monitor.getItem(),
              nodes = _monitor$getItem2.nodes,
              paths = _monitor$getItem2.paths,
              treeIndexes = _monitor$getItem2.treeIndexes;

          var result = {
            nodes: nodes,
            paths: paths,
            treeIndexes: treeIndexes,
            treeId: _this3.treeId,
            minimumTreeIndex: 0,
            depth: 0
          };

          _this3.drop(result);

          return result;
        }
      };

      function placeholderPropInjection(connect, monitor) {
        var dragged = monitor.getItem();
        return {
          connectDropTarget: connect.dropTarget(),
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
          draggedNodes: dragged ? dragged.nodes : null
        };
      }

      return DropTarget(this.dndType, placeholderDropTarget, placeholderPropInjection)(el);
    }
  }, {
    key: "startDrag",
    get: function get() {
      return this.treeRef.startDrag;
    }
  }, {
    key: "dragHover",
    get: function get() {
      return this.treeRef.dragHover;
    }
  }, {
    key: "endDrag",
    get: function get() {
      return this.treeRef.endDrag;
    }
  }, {
    key: "drop",
    get: function get() {
      return this.treeRef.drop;
    }
  }, {
    key: "treeId",
    get: function get() {
      return this.treeRef.treeId;
    }
  }, {
    key: "dndType",
    get: function get() {
      return this.treeRef.dndType;
    }
  }, {
    key: "treeData",
    get: function get() {
      return this.treeRef.state.draggingTreeData || this.treeRef.props.treeData;
    }
  }, {
    key: "getNodeKey",
    get: function get() {
      return this.treeRef.props.getNodeKey;
    }
  }, {
    key: "customCanDrop",
    get: function get() {
      return this.treeRef.props.canDrop;
    }
  }, {
    key: "maxDepth",
    get: function get() {
      return this.treeRef.props.maxDepth;
    }
  }], [{
    key: "wrapRoot",
    value: function wrapRoot(el) {
      return DragDropContext(HTML5Backend)(el);
    }
  }]);

  return DndManager;
}();

var treeIdCounter = 1;

var mergeTheme = function mergeTheme(props) {
  var merged = _objectSpread({}, props, {
    style: _objectSpread({}, props.theme.style, props.style),
    innerStyle: _objectSpread({}, props.theme.innerStyle, props.innerStyle),
    reactVirtualizedListProps: _objectSpread({}, props.theme.reactVirtualizedListProps, props.reactVirtualizedListProps)
  });

  var overridableDefaults = {
    nodeContentRenderer: NodeRendererDefault,
    placeholderRenderer: PlaceholderRendererDefault,
    rowHeight: 62,
    scaffoldBlockPxWidth: 44,
    slideRegionSize: 100,
    treeNodeRenderer: TreeNode
  };
  Object.keys(overridableDefaults).forEach(function (propKey) {
    // If prop has been specified, do not change it
    // If prop is specified in theme, use the theme setting
    // If all else fails, fall back to the default
    if (props[propKey] === null) {
      merged[propKey] = typeof props.theme[propKey] !== 'undefined' ? props.theme[propKey] : overridableDefaults[propKey];
    }
  });
  return merged;
};

var ReactSortableTree =
/*#__PURE__*/
function (_Component) {
  _inherits(ReactSortableTree, _Component);

  function ReactSortableTree(props) {
    var _this;

    _classCallCheck(this, ReactSortableTree);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactSortableTree).call(this, props));

    var _mergeTheme = mergeTheme(props),
        dndType = _mergeTheme.dndType,
        nodeContentRenderer = _mergeTheme.nodeContentRenderer,
        treeNodeRenderer = _mergeTheme.treeNodeRenderer,
        isVirtualized = _mergeTheme.isVirtualized,
        slideRegionSize = _mergeTheme.slideRegionSize;

    _this.dndManager = new DndManager(_assertThisInitialized(_assertThisInitialized(_this))); // Wrapping classes for use with react-dnd

    _this.treeId = "rst__".concat(treeIdCounter);
    treeIdCounter += 1;
    _this.dndType = dndType || _this.treeId;
    _this.nodeContentRenderer = _this.dndManager.wrapSource(nodeContentRenderer);
    _this.treePlaceholderRenderer = _this.dndManager.wrapPlaceholder(TreePlaceholder);
    _this.treeNodeRenderer = _this.dndManager.wrapTarget(treeNodeRenderer); // Prepare scroll-on-drag options for this list

    if (isVirtualized) {
      _this.scrollZoneVirtualList = (createScrollingComponent || withScrolling)(List);
      _this.vStrength = createVerticalStrength(slideRegionSize);
      _this.hStrength = createHorizontalStrength(slideRegionSize);
    }

    _this.state = {
      draggingTreeData: null,
      draggedNodes: null,
      draggedMinimumTreeIndex: null,
      draggedDepth: null,
      searchMatches: [],
      searchFocusTreeIndex: null,
      dragging: false,
      hoveredNode: null,
      hoveredPath: null,
      // props that need to be used in gDSFP or static functions will be stored here
      instanceProps: {
        treeData: [],
        ignoreOneTreeUpdate: false,
        searchQuery: null,
        searchFocusOffset: null
      }
    };
    _this.toggleChildrenVisibility = _this.toggleChildrenVisibility.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.moveNode = _this.moveNode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.startDrag = _this.startDrag.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.dragHover = _this.dragHover.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.endDrag = _this.endDrag.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.drop = _this.drop.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDndMonitorChange = _this.handleDndMonitorChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ReactSortableTree, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      ReactSortableTree.loadLazyChildren(this.props, this.state);
      var stateUpdate = ReactSortableTree.search(this.props, this.state, true, true, false);
      this.setState(stateUpdate); // Hook into react-dnd state changes to detect when the drag ends
      // TODO: This is very brittle, so it needs to be replaced if react-dnd
      // offers a more official way to detect when a drag ends

      this.clearMonitorSubscription = this.props.dragDropManager.getMonitor().subscribeToStateChange(this.handleDndMonitorChange);
    }
  }, {
    key: "componentDidUpdate",
    // listen to dragging
    value: function componentDidUpdate(prevProps, prevState) {
      // if it is not the same then call the onDragStateChanged
      if (this.state.dragging !== prevState.dragging) {
        if (this.props.onDragStateChanged) {
          this.props.onDragStateChanged({
            isDragging: this.state.dragging,
            draggedNodes: this.state.draggedNodes
          });
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clearMonitorSubscription();
    }
  }, {
    key: "getRows",
    value: function getRows(treeData) {
      return memoizedGetFlatDataFromTree({
        ignoreCollapsed: true,
        getNodeKey: this.props.getNodeKey,
        treeData: treeData
      });
    }
  }, {
    key: "getRenderedRows",
    value: function getRenderedRows() {
      var treeData = this.state.draggingTreeData || this.state.instanceProps.treeData;
      return this.getRows(treeData);
    }
  }, {
    key: "handleDndMonitorChange",
    value: function handleDndMonitorChange() {
      var monitor = this.props.dragDropManager.getMonitor(); // If the drag ends and the tree is still in a mid-drag state,
      // it means that the drag was canceled or the dragSource dropped
      // elsewhere, and we should reset the state of this tree

      if (!monitor.isDragging() && this.state.draggingTreeData) {
        this.endDrag();
      }
    }
  }, {
    key: "toggleChildrenVisibility",
    value: function toggleChildrenVisibility(_ref) {
      var targetNode = _ref.node,
          path = _ref.path;
      var instanceProps = this.state.instanceProps;
      var treeData = changeNodeAtPath({
        treeData: instanceProps.treeData,
        path: path,
        newNode: function newNode(_ref2) {
          var node = _ref2.node;
          return _objectSpread({}, node, {
            expanded: !node.expanded
          });
        },
        getNodeKey: this.props.getNodeKey
      });
      this.props.onChange(treeData);
      this.props.onVisibilityToggle({
        treeData: treeData,
        node: targetNode,
        expanded: !targetNode.expanded,
        path: path
      });
    }
  }, {
    key: "moveNode",
    value: function moveNode(_ref3) {
      var _this2 = this;

      var nodes = _ref3.nodes,
          prevPaths = _ref3.paths,
          prevTreeIndexes = _ref3.treeIndexes,
          depth = _ref3.depth,
          minimumTreeIndex = _ref3.minimumTreeIndex;
      if (!nodes.length) return;
      var instanceProps = this.state.instanceProps;
      var treeData = instanceProps.treeData;
      var nextParentNode;
      var nextPath;
      var nextTreeIndex;
      nodes.forEach(function (node) {
        var _insertNode = insertNode({
          treeData: treeData,
          newNode: node,
          depth: depth,
          minimumTreeIndex: minimumTreeIndex,
          expandParent: true,
          getNodeKey: _this2.props.getNodeKey
        });

        treeData = _insertNode.treeData;
        nextPath = _insertNode.path;
        nextParentNode = _insertNode.parentNode;
        nextTreeIndex = _insertNode.treeIndex;
      });
      this.props.onChange(treeData);
      this.props.onMoveNode({
        dragResult: {
          nodes: nodes,
          paths: prevPaths,
          treeIndexes: prevTreeIndexes
        },
        dropResult: {
          node: nextParentNode,
          path: nextPath,
          treeIndex: nextTreeIndex
        }
      });
    } // returns the new state after search

  }, {
    key: "startDrag",
    value: function startDrag() {
      this.setState({
        dragging: true
      });
    }
  }, {
    key: "dragHover",
    value: function dragHover(_ref4) {
      var hoveredNode = _ref4.hoveredNode,
          hoveredPath = _ref4.hoveredPath;

      if (this.state.hoveredNode === hoveredNode) {
        return;
      }

      this.setState({
        hoveredNode: hoveredNode,
        hoveredPath: hoveredPath
      });
    }
  }, {
    key: "endDrag",
    value: function endDrag() {
      this.setState({
        dragging: false
      });
    }
  }, {
    key: "drop",
    value: function drop(dropResult) {
      this.moveNode(dropResult);
    }
  }, {
    key: "canNodeHaveChildren",
    value: function canNodeHaveChildren(node) {
      var canNodeHaveChildren = this.props.canNodeHaveChildren;

      if (canNodeHaveChildren) {
        return canNodeHaveChildren(node);
      }

      return true;
    } // Load any children in the tree that are given by a function
    // calls the onChange callback on the new treeData

  }, {
    key: "renderRow",
    value: function renderRow(row, _ref5) {
      var listIndex = _ref5.listIndex,
          style = _ref5.style,
          getPrevRow = _ref5.getPrevRow,
          matchKeys = _ref5.matchKeys,
          swapFrom = _ref5.swapFrom,
          swapDepth = _ref5.swapDepth,
          swapLength = _ref5.swapLength,
          selectedNodeKeys = _ref5.selectedNodeKeys;
      var node = row.node,
          parentNode = row.parentNode,
          path = row.path,
          lowerSiblingCounts = row.lowerSiblingCounts,
          treeIndex = row.treeIndex;
      var _this$state = this.state,
          hoveredNode = _this$state.hoveredNode,
          hoveredPath = _this$state.hoveredPath;

      var _mergeTheme2 = mergeTheme(this.props),
          canDrag = _mergeTheme2.canDrag,
          generateNodeProps = _mergeTheme2.generateNodeProps,
          scaffoldBlockPxWidth = _mergeTheme2.scaffoldBlockPxWidth,
          searchFocusOffset = _mergeTheme2.searchFocusOffset,
          rowDirection = _mergeTheme2.rowDirection;

      var TreeNodeRenderer = this.treeNodeRenderer;
      var NodeContentRenderer = this.nodeContentRenderer;
      var nodeKey = path[path.length - 1];
      var isSearchMatch = nodeKey in matchKeys;
      var isSearchFocus = isSearchMatch && matchKeys[nodeKey] === searchFocusOffset;
      var callbackParams = {
        node: node,
        parentNode: parentNode,
        path: path,
        lowerSiblingCounts: lowerSiblingCounts,
        treeIndex: treeIndex,
        isSearchMatch: isSearchMatch,
        isSearchFocus: isSearchFocus
      };
      var nodeProps = !generateNodeProps ? {} : generateNodeProps(callbackParams);
      var rowCanDrag = typeof canDrag !== 'function' ? canDrag : canDrag(callbackParams);
      var sharedProps = {
        treeIndex: treeIndex,
        scaffoldBlockPxWidth: scaffoldBlockPxWidth,
        node: node,
        path: path,
        treeId: this.treeId,
        rowDirection: rowDirection
      };
      return React.createElement(TreeNodeRenderer, _extends({
        style: style,
        key: nodeKey,
        listIndex: listIndex,
        getPrevRow: getPrevRow,
        lowerSiblingCounts: lowerSiblingCounts,
        swapFrom: swapFrom,
        swapLength: swapLength,
        swapDepth: swapDepth
      }, sharedProps), React.createElement(NodeContentRenderer, _extends({
        parentNode: parentNode,
        isSearchMatch: isSearchMatch,
        isSearchFocus: isSearchFocus,
        canDrag: rowCanDrag,
        hoveredNode: hoveredNode,
        hoveredPath: hoveredPath,
        toggleChildrenVisibility: this.toggleChildrenVisibility,
        selectedNodeKeys: selectedNodeKeys
      }, sharedProps, nodeProps)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _mergeTheme3 = mergeTheme(this.props),
          dragDropManager = _mergeTheme3.dragDropManager,
          style = _mergeTheme3.style,
          className = _mergeTheme3.className,
          innerStyle = _mergeTheme3.innerStyle,
          rowHeight = _mergeTheme3.rowHeight,
          isVirtualized = _mergeTheme3.isVirtualized,
          placeholderRenderer = _mergeTheme3.placeholderRenderer,
          reactVirtualizedListProps = _mergeTheme3.reactVirtualizedListProps,
          rowDirection = _mergeTheme3.rowDirection,
          selectedNodeKeys = _mergeTheme3.selectedNodeKeys;

      var _this$state2 = this.state,
          searchMatches = _this$state2.searchMatches,
          searchFocusTreeIndex = _this$state2.searchFocusTreeIndex,
          draggedDepth = _this$state2.draggedDepth,
          instanceProps = _this$state2.instanceProps;
      var treeData = this.state.draggingTreeData || instanceProps.treeData;
      var rowDirectionClass = rowDirection === 'rtl' ? 'rst__rtl' : null;
      var rows = this.getRows(treeData);
      var swapFrom = null;
      var swapLength = null; // Get indices for rows that match the search conditions

      var matchKeys = {};
      searchMatches.forEach(function (_ref6, i) {
        var path = _ref6.path;
        matchKeys[path[path.length - 1]] = i;
      }); // Seek to the focused search result if there is one specified

      var scrollToInfo = searchFocusTreeIndex !== null ? {
        scrollToIndex: searchFocusTreeIndex
      } : {};
      var containerStyle = style;
      var list;

      if (rows.length < 1) {
        var Placeholder = this.treePlaceholderRenderer;
        var PlaceholderContent = placeholderRenderer;
        list = React.createElement(Placeholder, {
          treeId: this.treeId,
          drop: this.drop
        }, React.createElement(PlaceholderContent, null));
      } else if (isVirtualized) {
        containerStyle = _objectSpread({
          height: '100%'
        }, containerStyle);
        var ScrollZoneVirtualList = this.scrollZoneVirtualList; // Render list with react-virtualized

        list = React.createElement(AutoSizer, null, function (_ref7) {
          var height = _ref7.height,
              width = _ref7.width;
          return React.createElement(ScrollZoneVirtualList, _extends({}, scrollToInfo, {
            dragDropManager: dragDropManager,
            verticalStrength: _this3.vStrength,
            horizontalStrength: _this3.hStrength,
            speed: 30,
            scrollToAlignment: "start",
            className: "rst__virtualScrollOverride",
            width: width,
            onScroll: function onScroll(_ref8) {
              var scrollTop = _ref8.scrollTop;
              _this3.scrollTop = scrollTop;
            },
            height: height,
            style: innerStyle,
            rowCount: rows.length,
            estimatedRowSize: typeof rowHeight !== 'function' ? rowHeight : undefined,
            rowHeight: typeof rowHeight !== 'function' ? rowHeight : function (_ref9) {
              var index = _ref9.index;
              return rowHeight({
                index: index,
                treeIndex: index,
                node: rows[index].node,
                path: rows[index].path
              });
            },
            rowRenderer: function rowRenderer(_ref10) {
              var index = _ref10.index,
                  rowStyle = _ref10.style;
              return _this3.renderRow(rows[index], {
                listIndex: index,
                style: rowStyle,
                getPrevRow: function getPrevRow() {
                  return rows[index - 1] || null;
                },
                matchKeys: matchKeys,
                swapFrom: swapFrom,
                swapDepth: draggedDepth,
                swapLength: swapLength,
                selectedNodeKeys: selectedNodeKeys
              });
            }
          }, reactVirtualizedListProps));
        });
      } else {
        // Render list without react-virtualized
        list = rows.map(function (row, index) {
          return _this3.renderRow(row, {
            listIndex: index,
            style: {
              height: typeof rowHeight !== 'function' ? rowHeight : rowHeight({
                index: index,
                treeIndex: index,
                node: row.node,
                path: row.path
              })
            },
            getPrevRow: function getPrevRow() {
              return rows[index - 1] || null;
            },
            matchKeys: matchKeys,
            swapFrom: swapFrom,
            swapDepth: draggedDepth,
            swapLength: swapLength,
            selectedNodeKeys: selectedNodeKeys
          });
        });
      }

      return React.createElement("div", {
        className: classnames('rst__tree', className, rowDirectionClass),
        style: containerStyle
      }, list);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var instanceProps = prevState.instanceProps;
      var newState = {};
      var isTreeDataEqual = isEqual(instanceProps.treeData, nextProps.treeData); // make sure we have the most recent version of treeData

      instanceProps.treeData = nextProps.treeData;

      if (!isTreeDataEqual) {
        if (instanceProps.ignoreOneTreeUpdate) {
          instanceProps.ignoreOneTreeUpdate = false;
        } else {
          newState.searchFocusTreeIndex = null;
          ReactSortableTree.loadLazyChildren(nextProps, prevState);
          Object.assign(newState, ReactSortableTree.search(nextProps, prevState, false, false, false));
        }

        newState.draggingTreeData = null;
        newState.draggedNodes = null;
        newState.draggedMinimumTreeIndex = null;
        newState.draggedDepth = null;
        newState.dragging = false;
        newState.hoveredNode = null;
        newState.hoveredPath = null;
      } else if (!isEqual(instanceProps.searchQuery, nextProps.searchQuery)) {
        Object.assign(newState, ReactSortableTree.search(nextProps, prevState, true, true, false));
      } else if (instanceProps.searchFocusOffset !== nextProps.searchFocusOffset) {
        Object.assign(newState, ReactSortableTree.search(nextProps, prevState, true, true, true));
      }

      instanceProps.searchQuery = nextProps.searchQuery;
      instanceProps.searchFocusOffset = nextProps.searchFocusOffset;
      newState.instanceProps = instanceProps;
      return newState;
    }
  }, {
    key: "search",
    value: function search(props, state, seekIndex, expand, singleSearch) {
      var onChange = props.onChange,
          getNodeKey = props.getNodeKey,
          searchFinishCallback = props.searchFinishCallback,
          searchQuery = props.searchQuery,
          searchMethod = props.searchMethod,
          searchFocusOffset = props.searchFocusOffset,
          onlyExpandSearchedNodes = props.onlyExpandSearchedNodes;
      var instanceProps = state.instanceProps; // Skip search if no conditions are specified

      if (!searchQuery && !searchMethod) {
        if (searchFinishCallback) {
          searchFinishCallback([]);
        }

        return {
          searchMatches: []
        };
      }

      var newState = {}; // if onlyExpandSearchedNodes collapse the tree and search

      var _find = find({
        getNodeKey: getNodeKey,
        treeData: onlyExpandSearchedNodes ? toggleExpandedForAll({
          treeData: instanceProps.treeData,
          expanded: false
        }) : instanceProps.treeData,
        searchQuery: searchQuery,
        searchMethod: searchMethod || defaultSearchMethod,
        searchFocusOffset: searchFocusOffset,
        expandAllMatchPaths: expand && !singleSearch,
        expandFocusMatchPaths: !!expand
      }),
          expandedTreeData = _find.treeData,
          searchMatches = _find.matches; // Update the tree with data leaving all paths leading to matching nodes open


      if (expand) {
        newState.ignoreOneTreeUpdate = true; // Prevents infinite loop

        onChange(expandedTreeData);
      }

      if (searchFinishCallback) {
        searchFinishCallback(searchMatches);
      }

      var searchFocusTreeIndex = null;

      if (seekIndex && searchFocusOffset !== null && searchFocusOffset < searchMatches.length) {
        searchFocusTreeIndex = searchMatches[searchFocusOffset].treeIndex;
      }

      newState.searchMatches = searchMatches;
      newState.searchFocusTreeIndex = searchFocusTreeIndex;
      return newState;
    }
  }, {
    key: "loadLazyChildren",
    value: function loadLazyChildren(props, state) {
      var instanceProps = state.instanceProps;
      walk({
        treeData: instanceProps.treeData,
        getNodeKey: props.getNodeKey,
        callback: function callback(_ref11) {
          var node = _ref11.node,
              path = _ref11.path,
              lowerSiblingCounts = _ref11.lowerSiblingCounts,
              treeIndex = _ref11.treeIndex;

          // If the node has children defined by a function, and is either expanded
          //  or set to load even before expansion, run the function.
          if (node.children && typeof node.children === 'function' && (node.expanded || props.loadCollapsedLazyChildren)) {
            // Call the children fetching function
            node.children({
              node: node,
              path: path,
              lowerSiblingCounts: lowerSiblingCounts,
              treeIndex: treeIndex,
              // Provide a helper to append the new data when it is received
              done: function done(childrenArray) {
                return props.onChange(changeNodeAtPath({
                  treeData: instanceProps.treeData,
                  path: path,
                  newNode: function newNode(_ref12) {
                    var oldNode = _ref12.node;
                    return (// Only replace the old node if it's the one we set off to find children
                      //  for in the first place
                      oldNode === node ? _objectSpread({}, oldNode, {
                        children: childrenArray
                      }) : oldNode
                    );
                  },
                  getNodeKey: props.getNodeKey
                }));
              }
            });
          }
        }
      });
    }
  }]);

  return ReactSortableTree;
}(Component);

ReactSortableTree.propTypes = {
  dragDropManager: PropTypes.shape({}).isRequired,
  // Tree data in the following format:
  // [{title: 'main', subtitle: 'sub'}, { title: 'value2', expanded: true, children: [{ title: 'value3') }] }]
  // `title` is the primary label for the node
  // `subtitle` is a secondary label for the node
  // `expanded` shows children of the node if true, or hides them if false. Defaults to false.
  // `children` is an array of child nodes belonging to the node.
  treeData: PropTypes.arrayOf(PropTypes.object).isRequired,
  // Style applied to the container wrapping the tree (style defaults to {height: '100%'})
  style: PropTypes.shape({}),
  // Class name for the container wrapping the tree
  className: PropTypes.string,
  // Style applied to the inner, scrollable container (for padding, etc.)
  innerStyle: PropTypes.shape({}),
  // Used by react-virtualized
  // Either a fixed row height (number) or a function that returns the
  // height of a row given its index: `({ index: number }): number`
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  // Size in px of the region near the edges that initiates scrolling on dragover
  slideRegionSize: PropTypes.number,
  // Custom properties to hand to the react-virtualized list
  // https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md#prop-types
  reactVirtualizedListProps: PropTypes.shape({}),
  // The width of the blocks containing the lines representing the structure of the tree.
  scaffoldBlockPxWidth: PropTypes.number,
  // Maximum depth nodes can be inserted at. Defaults to infinite.
  maxDepth: PropTypes.number,
  // The method used to search nodes.
  // Defaults to a function that uses the `searchQuery` string to search for nodes with
  // matching `title` or `subtitle` values.
  // NOTE: Changing `searchMethod` will not update the search, but changing the `searchQuery` will.
  searchMethod: PropTypes.func,
  // Used by the `searchMethod` to highlight and scroll to matched nodes.
  // Should be a string for the default `searchMethod`, but can be anything when using a custom search.
  searchQuery: PropTypes.any,
  // eslint-disable-line react/forbid-prop-types
  // Outline the <`searchFocusOffset`>th node and scroll to it.
  searchFocusOffset: PropTypes.number,
  // Get the nodes that match the search criteria. Used for counting total matches, etc.
  searchFinishCallback: PropTypes.func,
  // Generate an object with additional props to be passed to the node renderer.
  // Use this for adding buttons via the `buttons` key,
  // or additional `style` / `className` settings.
  generateNodeProps: PropTypes.func,
  // Set to false to disable virtualization.
  // NOTE: Auto-scrolling while dragging, and scrolling to the `searchFocusOffset` will be disabled.
  isVirtualized: PropTypes.bool,
  treeNodeRenderer: PropTypes.func,
  // Override the default component for rendering nodes (but keep the scaffolding generator)
  // This is an advanced option for complete customization of the appearance.
  // It is best to copy the component in `node-renderer-default.js` to use as a base, and customize as needed.
  nodeContentRenderer: PropTypes.func,
  // Override the default component for rendering an empty tree
  // This is an advanced option for complete customization of the appearance.
  // It is best to copy the component in `placeholder-renderer-default.js` to use as a base,
  // and customize as needed.
  placeholderRenderer: PropTypes.func,
  theme: PropTypes.shape({
    style: PropTypes.shape({}),
    innerStyle: PropTypes.shape({}),
    reactVirtualizedListProps: PropTypes.shape({}),
    scaffoldBlockPxWidth: PropTypes.number,
    slideRegionSize: PropTypes.number,
    rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    treeNodeRenderer: PropTypes.func,
    nodeContentRenderer: PropTypes.func,
    placeholderRenderer: PropTypes.func
  }),
  // Determine the unique key used to identify each node and
  // generate the `path` array passed in callbacks.
  // By default, returns the index in the tree (omitting hidden nodes).
  getNodeKey: PropTypes.func,
  selectedNodeKeys: PropTypes.arrayOf(PropTypes.string),
  // Called whenever tree data changed.
  // Just like with React input elements, you have to update your
  // own component's data to see the changes reflected.
  onChange: PropTypes.func.isRequired,
  // Called after node move operation.
  onMoveNode: PropTypes.func,
  // Determine whether a node can be dragged. Set to false to disable dragging on all nodes.
  canDrag: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  // Determine whether a node can be dropped based on its path and parents'.
  canDrop: PropTypes.func,
  // Determine whether a node can have children
  canNodeHaveChildren: PropTypes.func,
  // When true, or a callback returning true, dropping nodes to react-dnd
  // drop targets outside of this tree will not remove them from this tree
  shouldCopyOnOutsideDrop: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  // Called after children nodes collapsed or expanded.
  onVisibilityToggle: PropTypes.func,
  dndType: PropTypes.string,
  // Called to track between dropped and dragging
  onDragStateChanged: PropTypes.func,
  // Specify that nodes that do not match search will be collapsed
  onlyExpandSearchedNodes: PropTypes.bool,
  // rtl support
  rowDirection: PropTypes.string
};
ReactSortableTree.defaultProps = {
  canDrag: true,
  canDrop: null,
  canNodeHaveChildren: function canNodeHaveChildren() {
    return true;
  },
  className: '',
  dndType: null,
  generateNodeProps: null,
  getNodeKey: defaultGetNodeKey,
  innerStyle: {},
  isVirtualized: true,
  maxDepth: null,
  treeNodeRenderer: null,
  nodeContentRenderer: null,
  selectedNodeKeys: [],
  onMoveNode: function onMoveNode() {},
  onVisibilityToggle: function onVisibilityToggle() {},
  placeholderRenderer: null,
  reactVirtualizedListProps: {},
  rowHeight: null,
  scaffoldBlockPxWidth: null,
  searchFinishCallback: null,
  searchFocusOffset: null,
  searchMethod: null,
  searchQuery: null,
  shouldCopyOnOutsideDrop: false,
  slideRegionSize: null,
  style: {},
  theme: {},
  onDragStateChanged: function onDragStateChanged() {},
  onlyExpandSearchedNodes: false,
  rowDirection: 'ltr'
};
polyfill(ReactSortableTree);
var SortableTreeWithoutDndContext = React.forwardRef(function (props, ref) {
  return React.createElement(DragDropContextConsumer, null, function (_ref13) {
    var dragDropManager = _ref13.dragDropManager;
    return dragDropManager === undefined ? null : React.createElement(ReactSortableTree, _extends({}, props, {
      dragDropManager: dragDropManager,
      ref: ref
    }));
  });
}); // Export the tree component without the react-dnd DragDropContext,
var SortableTree = DndManager.wrapRoot(SortableTreeWithoutDndContext);

export default SortableTree;
export { SortableTreeWithoutDndContext, defaultGetNodeKey, defaultSearchMethod, getDescendantCount, getVisibleNodeCount, getVisibleNodeInfoAtIndex, walk, map, toggleExpandedForAll, changeNodeAtPath, removeNodeAtPath, removeNode, getNodeAtPath, addNodeUnderParent, insertNode, getFlatDataFromTree, getTreeFromFlatData, isDescendant, getDepth, find };
