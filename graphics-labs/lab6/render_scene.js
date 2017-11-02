var canvas;       // HTML 5 canvas
var gl;           // webgl graphics context
var vPosition;    // shader variable attrib location for vertices 
var vColor;       // shader variable attrib location for color
var uColor;       // shader uniform variable location for color
var uProjection;  //  shader uniform variable for projection matrix
var uModel_view;  //  shader uniform variable for model-view matrix
var vNormal;
var y = 0;
var camera = new Camera(); 
var stack = new MatrixStack();
var rotY = 0;
var drawing = 0;
var wheelchair = new Wheelchair();
var wheelchair2 = new Wheelchair();
var wheelchair3 = new Wheelchair();
var rotato = 0;
var light = new Lighting();
var program;
var viewMat;
window.onload = function init()
{   

    
    //set Event Handlers
    setKeyEventHandler();
    setMouseEventHandler();
    setSliderEventHandler();

    

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(0, 0, 0, 1.0);
    
    gl.enable(gl.DEPTH_TEST);

    //  Load shaders
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    

    
    console.log(y);
    shaderSetup();
    Shapes.initShapes();  // create the primitive and other shapes       
    light.setUp();
    render();
};


/**
 *  Load shaders, attach shaders to program, obtain handles for 
 *  the attribute and uniform variables.
 * @return {undefined}
 */
function shaderSetup() {
  
    // get handles for shader attribute variables. 
    // We will need these in setting up buffers.
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor"); // we won't use vertex here
                            // colors but we keep it in for possible use later.
    vNormal = gl.getAttribLocation(program, "vNormal");
   
    // get handles for shader uniform variables: 
    uColor = gl.getUniformLocation(program, "uColor");  // uniform color
    uProjection = gl.getUniformLocation(program, "uProjection"); // projection matrix
    uModel_view = gl.getUniformLocation(program, "uModel_view");  // model-view matrix
}

function render()
{

    viewMat = camera.calcViewMat();
    gl.uniform4fv(uLight_position, mult(mult(viewMat, rotateY(rotY)), light.light_position));
    gl.uniform4fv(uColor, vec4(0,0,0,1));
    red = vec4(1,0,0,1);//sets quick color values to be used as parameters later
    darkred = vec4(0.8,0,0,1);
    pink = vec4(1,0.2,0.2,1);

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projMat = camera.calcProjectionMat();   // Projection matrix  
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat));
    
      

    stack.clear();
    stack.multiply(viewMat);
    
    // Need these 2 lines since camera is sitting at origin. 
    // Without them, you would be sitting inside the cube.
    // REMOVE once camera controls are working
    stack.multiply(translate(0, 0, 0)); 
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    
    //Shapes.axis.draw();
    //This code creates the ground
    stack.push();
    stack.multiply(translate(-15,0,-15));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    // gl.uniform4fv(uColor, vec4(0.5, .5, 1.0, 1.0));  // set color to red
    stack.multiply(scalem(15, 15, 15));
    gl.uniform4fv(uColor, vec4(1, 0, 1, 1.0));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform

    Shapes.drawPrimitive(Shapes.fractal);
    stack.pop();
    // stack.push();
    // stack.multiply(translate(0, -3, 0))
    // stack.multiply(scalem(25, 0.5, 25));
    // gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    // gl.uniform4fv(uColor, vec4(0.5, .5, 1.0, 1.0));  // set color to red
    // Shapes.drawPrimitive(Shapes.cube);    // draw cube
    // stack.pop();

    stack.push();//light cube
    stack.multiply(rotateY(rotY));
    stack.multiply(translate(light.light_position[0], light.light_position[1], light.light_position[2]));
    stack.multiply(scalem(1, 1, 1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(0.5, .5, 1.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cube);    // draw cube
    stack.pop();

    


    // stack.push();
    // stack.multiply(translate(10,5,0));
    // stack.multiply(scalem(1, 1, 1));
    // gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    // gl.uniform4fv(uColor, vec4(1, 0, 1, 1.0));  // set color to red
    // Shapes.drawPrimitive(Shapes.cone);    // draw cube
    // stack.pop();
    
    // drawHand();
    
    //Code to control the car movements and turn camera rotation on/off
    
    /*window.onkeydown = function (event) {
        var c = event.keyCode;
        //Right arrow key moves the wheelchair forward
        if (c === 39) {
            console.log("Reached here.");
            wheelchair.moveForward();
            //canvas.setCanvasColor("rgb(200,250,250)");
        }
        //Left arrow key moves the wheelchar backward
        if (c === 37) {
            console.log("Reached here.");
            wheelchair.moveBackward();
            //canvas.setCanvasColor("rgb(200,250,250)");
        }
        //Up arrow key turns on camera rotation
        if (c === 38) {
            console.log("Reached here.");
            rotato = 0.5;
            //canvas.setCanvasColor("rgb(200,250,250)");
        }
        //Down arrow key turns off camera rotation
        if (c === 40) {
            console.log("Reached here.");
            rotato = 0;
            //canvas.setCanvasColor("rgb(200,250,250)");
        }
    };*/
        //Draws a default wheelchair
        //wheelchair.draw();
        
}

function drawCube(c){ //needs oxygen
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, c);  // set color to red
    Shapes.drawPrimitive(Shapes.cylinder);    // draw cube
}