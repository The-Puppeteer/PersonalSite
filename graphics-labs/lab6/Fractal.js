



function Fractal(){
	var frac = new FractalDEM(7);
	this.vertices = []; //empty array of vertices
    this.colors  = []; //empty array for color of vertices
    this.normals = []; //empty array for normal vector
    this.name = "fractal";
    this.numVertices = 6*frac.gridSize*frac.gridSize;
    norm = vec4(0,1,0,0);
    scal = 600/(frac.gridSize*frac.gridSize);
    var self = this;
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
    var red = vec4(1.0, 0.0, 0.0, 1.0);

    function pushVertices(verts, color, norm) { //push all vertices into arrays
        self.colors.push(color);
        self.vertices.push(verts);
        self.normals.push(norm);
    }

    function pushNormals(norm){
    	self.normals.push(norm);
    }



    for(var i = 0; i < frac.gridSize; i++){
    	for(var j = 0; j < frac.gridSize; j++){
    		pushVertices(vec4(i*scal,frac.getH(i,j),j*scal,1), getColor(frac.getH(i,j)), calcNorm(i,j));
			pushVertices(vec4(i*scal,frac.getH(i,j+1),(j+1)*scal,1), getColor(frac.getH(i,j+1)), calcNorm(i,j+1));
    		pushVertices(vec4((i+1)*scal,frac.getH(i+1,j+1),(j+1)*scal,1), getColor(frac.getH(i+1,j+1)), calcNorm(i+1,j+1));

    		pushVertices(vec4(i*scal,frac.getH(i,j),j*scal,1), getColor(frac.getH(i,j)), calcNorm(i,j));
    		pushVertices(vec4((i+1)*scal,frac.getH(i+1,j),j*scal,1), getColor(frac.getH(i+1,j)), calcNorm(i+1,j));
    		pushVertices(vec4((i+1)*scal,frac.getH(i+1,j+1),(j+1)*scal,1), getColor(frac.getH(i+1,j+1)), calcNorm(i+1,j+1));
    		//calcNorm();
    	}
}

function calcNorm(i,j){
		var a = vec4(scal*2, frac.getH(i+1,j) - frac.getH(i-1,j) , 0, 0)//east west
		var b = vec4(0, frac.getH(i,j+1) - frac.getH(i,j-1) , scal*2, 0)//north south
		var normal = vec4(cross(b,a),0);
		console.log(normal);
		return(normal);
	}


function getColor(h){
    if(h === 0){//water
        return(vert_colors[7]);
    }
    else if(h <= .1){
        return(vert_colors[4]);
    }
    else if(h <= .5){
        return(vert_colors[5]);
    }
    else if(h > .5){
        return(vert_colors[6]);
    }
}

	// function calcNorm(){
	// 	var east;
	// 	var west;
	// 	var north;
	// 	var south;
	// 	var vertex = vec3;
	// 	var weast = vec3;
	// 	var nouth = vec3;
	// 	for(var k = 0; k < 5; k++){
	// 		vertex = self.vertices[k];
	// 		console.log(vertex);
	// 		north = vec3(vertex[0], vertex[1], vertex[2] + 1);
	// 		south = vec3(vertex[0], vertex[1], vertex[2] - 1);
	// 		east = vec3(vertex[0] + 1, vertex[1], vertex[2]);
	// 		west = vec3(vertex[0] - 1, vertex[1], vertex[2]);

	// 		weast = subtract(east, west);
	// 		nouth = subtract(north, south);
	// 		console.log(weast);
	// 		var norman = vec4(cross(weast, nouth),0);
	// 		pushNormals(norman);

	// 	}

	
	// }

	
}









//SUBTRACT EAST AND WEST , AND NORTH AND SOUTH  CROSS PRODUCT 
