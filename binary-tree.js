/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(value, leftChild = null, rightChild = null) {
    this.val = value;
    this.left = leftChild;
    this.right = rightChild;
  }
}

class BinaryTree {
  constructor(rootNode = null) {
    this.root = rootNode;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;

    function computeMinDepth(node) {
      if (!node.left && !node.right) return 1;
      if (!node.left) return computeMinDepth(node.right) + 1;
      if (!node.right) return computeMinDepth(node.left) + 1;
      return Math.min(computeMinDepth(node.left), computeMinDepth(node.right)) + 1;
    }

    return computeMinDepth(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    function computeMaxDepth(node) {
      if (!node.left && !node.right) return 1;
      return Math.max(computeMaxDepth(node.left), computeMaxDepth(node.right)) + 1;
    }

    return computeMaxDepth(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let maxPathSum = 0;

    function calculateMaxSum(node) {
      if (!node) return 0;
      const leftMax = calculateMaxSum(node.left);
      const rightMax = calculateMaxSum(node.right);
      maxPathSum = Math.max(maxPathSum, node.val + leftMax + rightMax);
      return Math.max(0, leftMax + node.val, rightMax + node.val);
    }

    calculateMaxSum(this.root);
    return maxPathSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;
    let queue = [this.root], smallestLarger = null;

    while (queue.length) {
      let node = queue.shift();
      if (node.val > lowerBound && (smallestLarger === null || node.val < smallestLarger)) {
        smallestLarger = node.val;
      }
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return smallestLarger;
  }

  /** areCousins(node1, node2): determine whether two nodes are cousins */

  areCousins(nodeA, nodeB) {
    if (nodeA === this.root || nodeB === this.root) return false;

    function getLevelAndParent(targetNode, currentNode, level = 0, result = { level: 0, parent: null }) {
      if (result.parent) return result;
      if (currentNode.left === targetNode || currentNode.right === targetNode) {
        result.level = level + 1;
        result.parent = currentNode;
      }
      if (currentNode.left) getLevelAndParent(targetNode, currentNode.left, level + 1, result);
      if (currentNode.right) getLevelAndParent(targetNode, currentNode.right, level + 1, result);
      return result;
    }

    let dataA = getLevelAndParent(nodeA, this.root);
    let dataB = getLevelAndParent(nodeB, this.root);
    return dataA.level === dataB.level && dataA.parent !== dataB.parent;
  }

  /** serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const output = [];

    function preOrderTraversal(node) {
      if (node) {
        output.push(node.val);
        preOrderTraversal(node.left);
        preOrderTraversal(node.right);
      } else {
        output.push("#");
      }
    }

    preOrderTraversal(tree.root);
    return output.join(" ");
  }

  /** deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    if (!stringTree) return null;
    const values = stringTree.split(" ");

    function constructTree() {
      if (!values.length) return null;
      const val = values.shift();
      if (val === "#") return null;
      let node = new BinaryTreeNode(Number(val));
      node.left = constructTree();
      node.right = constructTree();
      return node;
    }

    return new BinaryTree(constructTree());
  }

  /** lowestCommonAncestor(node1, node2): find the lowest common ancestor */

  lowestCommonAncestor(nodeX, nodeY, current = this.root) {
    if (!current) return null;
    if (current === nodeX || current === nodeY) return current;

    const leftSearch = this.lowestCommonAncestor(nodeX, nodeY, current.left);
    const rightSearch = this.lowestCommonAncestor(nodeX, nodeY, current.right);

    return leftSearch && rightSearch ? current : leftSearch || rightSearch;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
