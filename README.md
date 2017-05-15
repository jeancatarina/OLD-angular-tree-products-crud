# angular-tree-products-crud

# Tree features:
  - Filter displaying only the nodes that contain the search term and all their parents so that it maintains a hierarchy;
  - When deleting a node all children are removed;
  - When registering or editing a node, code, description and observation fields can be informed and only code and description are required;
  - No limits of levels and registered nodes;
  - In the tree view it only shows the description of the nodes and when placing the mouse on a node it displayed a tooltip with the code, the description and the observation of the node;
  - You can expand and close each node and also expand and close all nodes at the same time;
  
# Requirements

 - NodeJS (https://nodejs.org/en/)
 
 - Bower (npm install -g bower)
 
# Running

$ npm install http-server -g

choose a directory, 

$ git clone https://github.com/jeancatarina/angular-tree-products-crud.git

$ cd angular-tree-products-crud

$ http-server -a localhost

Running: http://localhost:8080/#!/

![alt text](https://github.com/jeancatarina/angular-tree-products-crud/blob/master/gifs/arvore.gif)
![alt text](https://github.com/jeancatarina/angular-tree-products-crud/blob/master/gifs/incluir.gif)
