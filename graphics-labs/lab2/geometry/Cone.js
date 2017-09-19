/*
 Carlos Luevanos
 Dalton Haselgrove
 CS-445 Lab 2
 Cone geometry
 */

function Cone (n) {
    this.name = "cone";
    this.vertices = []; //empty array of vertices
    this.colors  = []; //empty array for color of vertices
    this.normals = []; //empty array for normal vector
    this.numVertices = (3 * n) *2; //there's always 3 times as many vertices as there are triangles but a cone has 2 twice as many vertices
    this.numTriangles = (n * 2); //triangles, the more there are the smoother the image is. And like above, twice the amount of vertices is twice the amount of triangles


    var incAngle = ((2 * Math.PI)/n);

    var vert_colors = [ //colors
        vec4(0.0, 0.0, 0.0, 1.0), // black   - v0
        vec4(1.0, 0.0, 0.0, 1.0), // red     - v1
        vec4(1.0, 1.0, 0.0, 1.0), // yellow  - v2
        vec4(0.0, 1.0, 0.0, 1.0), // green   - v3
        vec4(0.0, 0.0, 1.0, 1.0), // blue    - v4
        vec4(1.0, 0.0, 1.0, 1.0), // magenta - v5
        vec4(1.0, 1.0, 1.0, 1.0), // white   - v6
        vec4(0.0, 1.0, 1.0, 1.0)  // cyan    - v7
    ];

    var norm = vec4(0,1,0,0); //normal vector pointing out in positive y direction
   // var norm2 = vec4(0,-1,0,0);
    var self = this;

    function pushVertices(verts, color) { //push all vertices into arrays
        self.colors.push(color);
        self.vertices.push(verts);
        self.normals.push(norm);
        //self.normals.push(norm2);
    }

    for(var i = 0; i < n; i++){
        var ang =  incAngle * i;
        var ang2 = incAngle  * (i + 1);
        pushVertices(vec4(0,0,0,1), vert_colors[2]); //make the first disk,center vertex is flat
        pushVertices(vec4(Math.cos(ang),0, Math.sin(ang),1), vert_colors[4]);
        pushVertices(vec4(Math.cos(ang2),0, Math.sin(ang2),1),vert_colors[5]);
        
        pushVertices(vec4(0,1,0,1),vert_colors[2]); //make the next disk, stretch center vertex in the y direction
        pushVertices(vec4(Math.cos(ang),0,Math.sin(ang),1), vert_colors[4]);
        pushVertices(vec4(Math.cos(ang2),0,Math.sin(ang2),1),vert_colors[5]);

    }
}


