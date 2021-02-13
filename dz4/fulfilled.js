// Task 1:
function createDivWithText(text) {
  let div = document.createElement('div')
  div.textContent = text
  return div
}

// Task 2:
function prepend(what, where) {
  let child = where.firstChild
  where.insertBefore(what, child)
}

// Task 3:
 function findAllPSiblings(where) {
  let siblings = []

  for (let elem of where.children) {
    if (elem.nodeName === 'P') {
      siblings.push(elem.previousElementSibling)
    }
  }

  return siblings
}

// Task 4:
function findError(where) {
    var result = [];

    for (var child of where.children) {
        result.push(child.innerText);
    }

    return result;
}

// Task 5:
 function deleteTextNodes(where) {
  for (let elem of where.childNodes) {
    if (elem.nodeName === '#text') {
      elem.remove()
    }
  }
}

// Task 6:
function deleteTextNodesRecursive(where) {

  for (let elem of where.childNodes) {
    
    if (elem.hasChildNodes()) {
      deleteTextNodesRecursive(elem)
    }

    for (let node of elem.childNodes) {
      
      if (node.nodeName === '#text') {
        node.remove()
      }
    }
  }
}

// Task 7:
function collectDOMStat(root) {
    let obj = {
    tags: {},
    classes: {},
    texts: 0
  }

  recursionFunction(root)

  function recursionFunction(elem) {

    for (let node of elem.childNodes) {
      // texts
      if (node.nodeName === '#text') {
        obj.texts++
      }
      // tags
      if (obj.tags.hasOwnProperty(node.tagName)) {
        obj.tags[node.tagName]++
      } else if (node.tagName !== undefined) {
        obj.tags[node.tagName] = 1
      }
      // classes
      if (node.classList) {
        for (let className of node.classList) {
          if (obj.classes.hasOwnProperty(className)) {
            obj.classes[className]++
          } else {
            obj.classes[className] = 1
          }
        }
      }
      // recursion
      if (node.hasChildNodes()) {
        recursionFunction(node)
      }
    }
  }

  return obj
}

// Task 8:
function observeChildNodes(where, fn) {

  let observer = new MutationObserver(function(mutationRecords) {

    let insertArray = []
    let removeArray = [] 

    for (let mutation of mutationRecords) {

      for (let node of mutation.addedNodes) {
        insertArray.push(node)
      }

      for (let node of mutation.removedNodes) {
        removeArray.push(node)
      }
    }

    fn( { type: 'insert', nodes: insertArray } )
    fn( { type: 'remove', nodes: removeArray } )
  });

  observer.observe(where, {
    childList: true, 
    subtree: true 
  });
}