/** Custom DOM Traversal Methods */

const { Tree, TreeNode } = require("./tree");

// Check if running in Node.js and create a fake DOM
let document;
if (typeof window === "undefined") {
  const { JSDOM } = require("jsdom");
  const { window } = new JSDOM(`<!DOCTYPE html><body></body>`);
  document = window.document;
} else {
  document = window.document; // Use actual browser document if available
}

class DOMUtils {
  /** getElementById(id): Recursively find an element by its ID. */
  static getElementById(id) {
    let foundElement = null;
    
    function searchElement(element) {
      if (element.id === id) {
        foundElement = element;
        return;
      }
      for (let child of element.children) {
        if (!foundElement) searchElement(child);
      }
    }
    
    searchElement(document.body);
    return foundElement;
  }

  /** getElementsByTagName(tagName): Return an array of elements with the specified tag name. */
  static getElementsByTagName(tagName) {
    let result = [];
    
    function searchElements(element) {
      if (element.tagName?.toLowerCase() === tagName.toLowerCase()) {
        result.push(element);
      }
      for (let child of element.children) {
        searchElements(child);
      }
    }
    
    searchElements(document.body);
    return result;
  }

  /** getElementsByClassName(className): Return an array of elements with the specified class name. */
  static getElementsByClassName(className) {
    let result = [];
    
    function searchElements(element) {
      if (element.classList?.contains(className)) {
        result.push(element);
      }
      for (let child of element.children) {
        searchElements(child);
      }
    }
    
    searchElements(document.body);
    return result;
  }

  /** convertDOMToTree(): Convert the DOM into a Tree structure */
  static convertDOMToTree(rootElement = document.body) {
    if (!rootElement) return null;
    
    function buildTree(element) {
      let node = new TreeNode(element.tagName.toLowerCase());
      for (let child of element.children) {
        node.children.push(buildTree(child));
      }
      return node;
    }
    
    return new Tree(buildTree(rootElement));
  }
}

module.exports = { DOMUtils, document };
