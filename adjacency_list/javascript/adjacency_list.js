/* jshint loopfunc: true */

'use strict';

module.exports = List;

function List(info) {
    this.a = constructArray(info);
}

List.prototype.breadthFirstSearch = function(start, vertexCallback) {
    breadthFirstSearch(this.a, start, vertexCallback);
};

List.prototype.depthFirstSearch = function(start, vertexCallback) {
    depthFirstSearch(this.a, start, vertexCallback);
};

function constructArray(info) {
    var a = initArray(info.vertexCount);
    info.edges.forEach(function(edge) {
        insertEdge(a, edge[0], edge[1], false);
    });
    return a;
}

function initArray(vertexCount) {
    var a = new Array(vertexCount);
    for (var i = 0; i < vertexCount; i++) {
        a[i] = [];
    }
    return a;
}

function insertEdge(a, x, y, directed) {
    a[x].push(y);
    if (!directed) {
        insertEdge(a, y, x, true);
    }
}

function breadthFirstSearch(a, start, vertexCallback) {
    if (!a.length) {
        return;
    }

    var processed = new Array(a.length);
    var queue = [];

    vertexCallback(start);
    processed[start] = true;
    queue.push(start);

    while (queue.length) {
        var x = queue.shift();
        var edges = a[x];
        edges.forEach(function(y) {
            if (processed[y]) {
                return;
            }
            vertexCallback(y);
            processed[y] = true;
            queue.push(y);
        });
    }
}

function depthFirstSearch(a, start, vertexCallback) {
    var processed = new Array(a.length);

    function dfs(x) {
        if (processed[x]) {
            return;
        }
        vertexCallback(x);
        processed[x] = true;
        var edges = a[x];
        edges.forEach(dfs);
    }

    dfs(start);
}

// List.prototype.log = function() {
//     log(this.a);
// };

// function log(a) {
//     a.forEach(function(edges, x) {
//         var str = 'Vertex ' + x + ': ';
//         edges.forEach(function(y) {
//             str += y + ' ';
//         });
//         console.log(str);
//     });
// }
