const { DOMUtils, document } = require("./dom_traversal");

// Simulate a DOM structure
const root = document.createElement("div");
const child1 = document.createElement("p");
child1.id = "testElement";
const child2 = document.createElement("span");
child2.classList.add("testClass");

root.appendChild(child1);
root.appendChild(child2);
document.body.appendChild(root);

// Test getElementById
console.log("getElementById:", DOMUtils.getElementById("testElement"));

// Test getElementsByTagName
console.log("getElementsByTagName:", DOMUtils.getElementsByTagName("p"));

// Test getElementsByClassName
console.log("getElementsByClassName:", DOMUtils.getElementsByClassName("testClass"));

// Test convertDOMToTree
console.log("convertDOMToTree:", JSON.stringify(DOMUtils.convertDOMToTree(), null, 2));
