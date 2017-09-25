var canvas;       // HTML 5 canvas
var gl;           // webgl graphics context
var vPosition;    // shader variable attrib location for vertices 
var vColor;       // shader variable attrib location for color
var uColor;       //  shader uniform variable for color
var uProjection;  //  shader uniform variable for projection matrix
var uModel_view;  //  shader uniform variable for model-view matrix

var thetaY = 0;  // rotation around y axis
var viewMat;     // view matrix (will get to in Lab 4)
var actuators = [20,10,12,12,12];//thumb is i[0] 1-4 is index-pinky
var wristAngle = 30;
var rotAngle = 0;
var numtri = 30;

window.onload = function init()
{

    document.getElementById("viewslider").addEventListener("input", function(){//gets and changes value for sliders
        thetaY = document.getElementById("viewslider").value;
    });

    document.getElementById("thumbslider").addEventListener("input", function(){
        actuators[0] = document.getElementById("thumbslider").value;
    });

    document.getElementById("indexslider").addEventListener("input", function(){
        actuators[1] = document.getElementById("indexslider").value;
    });

    document.getElementById("midslider").addEventListener("input", function(){
        actuators[2] = document.getElementById("midslider").value;
    });

    document.getElementById("ringslider").addEventListener("input", function(){
        actuators[3] = document.getElementById("ringslider").value;
    });

    document.getElementById("pinkyslider").addEventListener("input", function(){
        actuators[4] = document.getElementById("pinkyslider").value;
    });

    document.getElementById("wristslider").addEventListener("input", function(){
        wristAngle = document.getElementById("wristslider").value;
    });

    document.getElementById("rotateslider").addEventListener("input", function(){
        rotAngle = document.getElementById("rotateslider").value;
    });

    document.getElementById("numtri").addEventListener("input", function(){
        numtri = document.getElementById("numtri".value;
    });




    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.7, 0.7, 0.7, 1.0);

    gl.enable(gl.DEPTH_TEST);

    shaderSetup();        // set up shaders

    Shapes.initShapes();  // create the primitive shapes    

    render();              // Go draw the scene!
};
/**
 *  Load shaders, attach shaders to program, obtain handles for 
 *  the attribute and uniform variables.
 * @return {undefined}
 */
function shaderSetup() {
    //  Load shaders
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // get handles for shader attribute variables. 
    // We will need these in setting up buffers.
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor");   // we won't use vertex here
                            // colors but we keep it in for possible use later.
    
    // get handles for shader uniform variables: 
    uColor = gl.getUniformLocation(program, "uColor");  // uniform color
    uProjection = gl.getUniformLocation(program, "uProjection"); // projection matrix
    uModel_view = gl.getUniformLocation(program, "uModel_view");  // model-view matrix
}

/**
 * Set the location and orientation of the camera. Compute 
 * the view and projection matrices, and set the value of the uniform
 * shader variable for the projection matrix.
 * @return {undefined}
 */
function cameraSetup() {
      // All of this is to get the camera set properly. We will 
    // learn about this in Lab 4
    // thetaY += 1.0;  // increase rotation about chosen axis
    var eye = vec3(0.0, 0.0, 12.0);  // location of camera
    var at = vec3(0, 0, 0);         // what the camera is looking at
    var up = vec3(0, 1, 0);         // the camera's up direction
    viewMat = lookAt(eye, at, up);  // view matrix
    var axisRot = rotateY(thetaY);  // rotation matrix for rotating around the y axis
    viewMat = mult(viewMat, axisRot); // combine the view matrix with rotation matrix
     
    // Calculate the projection matrix 
    var projMat = perspective(60, canvas.width / canvas.height, 0.1, 500.);
    // Set the value of the projection uniform variable in the shader
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat)); // set projection matrix
    
}

function render()
{
    
    red = vec4(1,0,0,1);//sets quick color values to be used as parameters later
    darkred = vec4(0.8,0,0,1);
    pink = vec4(1,0.2,0.2,1);


    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    cameraSetup();

    ms = new MatrixStack();//creates new matrix stack
    ms.multiply(viewMat);//they're dating <3 also, this is the palm
    ms.multiply(translate(-2.0,0.0,0.0));//moves palm left
    ms.multiply(rotateZ(wristAngle));//sets variable angle of palm and children elements. starts at 30 degrees
    ms.multiply(rotateX(rotAngle));//sets variable angle for the rotation of an imaginary wrist
    ms.multiply(scalem(0.4,2,2));//sets the size of the cylinder
    ms.push();//pushes our final matrix on the stack 
    drawCube(red);

    ms.multiply(translate(0.0,-0.48,1.18));//thumb stuff
    ms.multiply(scalem(1/0.4, .5, .5));//had to sandwich our rotates and translates between the inverse and regular scalem
    ms.multiply(rotateX(-45));//in order to rotate and translate without the skewing of our shape
    ms.multiply(translate(0.0,-0.5,0));
    ms.multiply(rotateZ(actuators[0]));//takes actuator value at index 0 which is for the thumb
    ms.multiply(translate(0.0,.5,0));
    ms.multiply(rotateY(-20));//<--- lmao "rotatey"
    ms.multiply(scalem(0.4,2,2));//undo inverse scalem
    ms.multiply(scalem(.95,0.5,.25));//scalem to set final value of shape scale
    drawCube(darkred);

    ms.multiply(scalem(1/0.4,.5,.5));//similar stuff here with inverses and such 
    ms.multiply(scalem(1/.95,1/.5,4));
    ms.multiply(translate(0,1,0))
    ms.multiply(rotateZ(actuators[0]*1.2));
    ms.multiply(translate(0,1,0));
    ms.multiply(scalem(.95,.5,.25));
    ms.multiply(scalem(0.4,2,2));
    drawCube(darkred);

    ms.pop();//pops our new matrix off the stack 
    ms.push();//pushes on a base matrix



    ms.multiply(translate(0,.8,0.8));
    drawFinger(1,-10,0.3,0.9,darkred);
    ms.push();
    ms.multiply(translate(0,.8,0.25));
    drawFinger(2,0,0.3,1.1,darkred);
    ms.push();
    ms.multiply(translate(0,0.8,-0.25));
    drawFinger(3,5,0.3,1,darkred);
    ms.push();
    ms.multiply(translate(0,0.8,-0.8));
    drawFinger(4,15,0.2,.75,pink);
    


   
    // Draw a red cube   


    
    // // draw a non-uniformly scaled and translated green cylinder.
    // viewMat = mult(viewMat, translate(-2.5,0,0)); // update modelview transform
    // viewMat = mult(viewMat, scalem(.5,2,1));   // update modelview transform
    // gl.uniformMatrix4fv(uModel_view, false, flatten(viewMat)); // set view transform
    // gl.uniform4fv(uColor, vec4(0.0, 1.0, 0.0, 1.0));  // set color to green
    // Shapes.drawPrimitive(Shapes.cylinder);  // draw cube

    requestAnimFrame(render);
}

function drawCube(c){ //needs oxygen
    gl.uniformMatrix4fv(uModel_view, false, flatten(ms.top())); // set modelview transform
    gl.uniform4fv(uColor, c);  // set color to red
    Shapes.drawPrimitive(Shapes.cylinder);    // draw cube
}

function drawFinger(n,r,s,t,c){//drawFinger(index of finger to be used with our angle actuation array, angle of offset for finger,
    ms.multiply(scalem(1/0.4,0.5,0.5));//sets scale and translation for cylinder size, sets translation to adjust for the previous scale
    ms.multiply(rotateZ(actuators[n]));//sets color)
    ms.multiply(rotateX(r));
    ms.multiply(translate(0,t,0));
    ms.multiply(scalem(0.4,2,2));
    ms.multiply(scalem(.95, s, .2));
    drawCube(c);

    ms.multiply(translate(0,s,0));//these are similar to the thumb except there is an extra cylinder and the values are 
    ms.multiply(scalem(1/0.4,0.5,0.5));//interchangeable to give the ability to easily create more
    ms.multiply(scalem(1/.95, 1/s, 1/.2));
    ms.multiply(rotateZ(actuators[n]*1.1));
    ms.multiply(translate(0,t,0));
    ms.multiply(scalem(.95, s, .2));
    ms.multiply(scalem(0.4,2,2));
    drawCube(c);

    ms.multiply(translate(0,s,0));
    ms.multiply(scalem(1/0.4,0.5,0.5));
    ms.multiply(scalem(1/.95, 1/s, 1/.2));
    ms.multiply(rotateZ(actuators[n]*1.1));
    ms.multiply(translate(0,t,0));
    ms.multiply(scalem(.95, s, .2));
    ms.multiply(scalem(0.4,2,2));
    drawCube(c);
    ms.pop();
}

