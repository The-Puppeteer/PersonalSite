/*
 Carlos Luevanos
 Dalton Haselgrove
 CS-445 Lab 2
 Cone geometry
 */

function Cylinder (n) {
    this.name = "cylinder";
    this.vertices = []; //empty array of vertices
    this.colors  = []; //empty array for color of vertices
    this.normals = []; //empty array for normal vector
    this.numVertices = (3 * n) * 4; //3 times as many vertices as triangles, but a cylinder has 4 times as many vertices as a disk
    this.numTriangles = (n * 4); // cylinder has 4 times as many triangles as a disk


    var incAngle = ((2 * Math.PI)/n); // Increment angle on unit circle

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
    var self = this;

    function pushVertices(verts, color) { //push all vertices into arrays
        self.colors.push(color);
        self.vertices.push(verts);
        self.normals.push(norm);
    }


    for(var i = 0; i < n; i++){
        var ang =  incAngle * i; //creates angle for first vertex of triangle
        var ang2 = incAngle  * (i + 1);// creates angle for second vertex of triangle
        pushVertices(vec4(0,1,0,1), vert_colors[0]); //make the first disk. Flat. Creates the first vertex of the triangle
        pushVertices(vec4(Math.cos(ang),1, Math.sin(ang),1), vert_colors[5]); //calculates the actual vertex values for the second vertex of the triangle
        pushVertices(vec4(Math.cos(ang2),1,Math.sin(ang2),1),vert_colors[5]); //calculates the actual vertex for the final point on the triangle

        pushVertices(vec4(0,-1,0,1),vert_colors[6]);// same as previous set except translated down 1 unit
        pushVertices(vec4(Math.cos(ang),-1, Math.sin(ang),1), vert_colors[7]);
        pushVertices(vec4(Math.cos(ang2),-1,Math.sin(ang2),1),vert_colors[7]);
//Triangle pairs
        pushVertices(vec4(Math.cos(ang),1,Math.sin(ang),1),vert_colors[5]);// creates the first of a pair of triangles using the second and third vectors from the top disc and the second
        pushVertices(vec4(Math.cos(ang2),1,Math.sin(ang2),1),vert_colors[5]);// vector of the bottom disc
        pushVertices(vec4(Math.cos(ang2),-1, Math.sin(ang2),1),vert_colors[2]);


        pushVertices(vec4(Math.cos(ang),-1,Math.sin(ang),1),vert_colors[7]);// creates the second triangle to create one rectangular face on the side of the cylinder using the second and
        pushVertices(vec4(Math.cos(ang2),-1, Math.sin(ang2),1),vert_colors[7]);// third vectors of the bottom disc and the third of the top
        pushVertices(vec4(Math.cos(ang),1,Math.sin(ang),1),vert_colors[5]);
        
        
        //cool color combos for the triangle pairs 2,2,7 && 5,5,7; 2,2,5 && 5,5,2;  7,7,5 && 5,5,7; 
        //


    }
}