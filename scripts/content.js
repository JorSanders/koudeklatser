const klatsifyNode = (textNode) => {
  let nodeValue = textNode.nodeValue;

  nodeValue = nodeValue
    .replace(/\bbier\b/g, "koude klats")
    .replace(/\bBier\b/g, "Koude klats")
    .replace(/\bbiertje\b/, "koud klatsje")
    .replace(/\bBiertje\b/, "Koud klatsje")
    .replace(/\bkoffie\b/, "warme klats")
    .replace(/\bKoffie\b/, "Warme klats");

  textNode.nodeValue = nodeValue;
};

// Source: https://stackoverflow.com/questions/5904914/javascript-regex-to-replace-text-not-in-html-attributes/5904945#5904945
const klatsifyNodesRecursive = (node) => {
  let child;
  let next;

  switch (node.nodeType) {
    case 1: // Element
    case 9: // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        klatsifyNodesRecursive(child);
        child = next;
      }
      break;

    case 3: // Text node
      if (node.parentElement.tagName.toLowerCase() !== "script") {
        klatsifyNode(node);
      }
      break;
  }
};

klatsifyNodesRecursive(document.body);
