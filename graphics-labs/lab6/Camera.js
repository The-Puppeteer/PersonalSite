/**
 * 
 * Code by Logan Smith and Dalton Haselgrove and Greg Callahan
 * Camera control scheme through button presses and mouse rotation
 * 
 * 
 * 
 * 
 * 
 * Contains all of the parameters needed for controlling the camera.
 * @return {Camera}
 */
function Camera() {

    this.fov = 80;           // Field-of-view in Y direction angle (in degrees)
    this.zNear = 0.1;        // camera's far plane
    this.zFar = 500;         // camera's near plane

// Camera *initial* location and orientation parameters
    this.eye_start = vec4([0, 4, 50, 1]); // initial camera location (needed for reseting)   
    this.VPN = vec4([0, 0, 1, 0]);  // used to initialize uvn
    this.VUP = vec4([0, 1, 0, 0]);  // used to initialize uvn  
    

// Current camera location and orientation parameters
    this.eye = vec4(this.eye_start);     // camera location
    this.viewRotation;  // rotational part of matrix that transforms between World and Camera coord   

    this.calcUVN();  // initializes viewRotation
}

/**
 * Reset the camera location and orientation
 * @return none
 */
Camera.prototype.reset = function () {
    this.eye = vec4(this.eye_start);
    this.calcUVN();
};

/**
 * Calculate the *initial* viewRotation matrix of camera
 * based on VPN and VUP
 * @return none
 */
Camera.prototype.calcUVN = function () {
    this.viewRotation = mat4(1);  // identity - placeholder only

// TO DO:  COMPLETE THIS CODE
    var n = vec4(normalize(this.VPN, true));
    var u = vec4(normalize(cross(this.VUP, this.VPN), false), 0);
    //var u = normalize(this.test1, true);
    //console.log(n);
    //console.log(u);
    var v = vec4(normalize(cross(n, u), false), 0);
    //console.log(v);
    var why = vec4(0, 0, 0, 1);
    this.viewRotation = mat4(u, v, n, why);
    //console.log(this.viewRotation);
    this.viewRotation.matrix = true;
};

/**
 * Calculate the camera's view matrix given the 
 * current eye and viewRotation
 * @return view matrix (mat4)
 */
Camera.prototype.calcViewMat = function () {
    var mv = mat4(1);  // identity - placeholder only
// TO DO:  COMPLETE THIS CODE
    var eyeTranslate = translate(this.eye[0], this.eye[1], this.eye[2]);
    //console.log(eyeTranslate);
    var mv = mult(this.viewRotation, inverse(eyeTranslate));
    //console.log(mv);
    return mv;
};

/** 
 * Calculate the camera's projection matrix. Here we 
 * use a perspective projection.
 * @return the projection matrix
 */
Camera.prototype.calcProjectionMat = function () {
    aspect = canvas.width / canvas.height;
    return perspective(this.fov, aspect, this.zNear, this.zFar);
};

/**
 * Update the camera's eye and viewRotation matrices 
 * based on the user's mouse actions
 * @return none
 */
Camera.prototype.motion = function () {

    switch (mouseState.action) {
        case mouseState.actionChoice.TUMBLE:  // left mouse button
            // amount of rotation around axes 
            var dy = -0.05 * mouseState.delx;  // angle around y due to mouse drag along x
            var dx = -0.05 * mouseState.dely;  // angle around x due to mouse drag along y

            var ry = rotateY(10 * dy);  // rotation matrix around y
            var rx = rotateX(10 * dx);  // rotation matrix around x

//          TO DO: NEED TO IMPLEMENT TUMBLE FUNCTION
            this.tumble(rx, ry);   //  <----  NEED TO IMPLEMENT THIS FUNCTION BELOW!!!
            mouseState.startx = mouseState.x;
            mouseState.starty = mouseState.y;
            break;
        case mouseState.actionChoice.TRACK:  // PAN   - right mouse button
            var dx = -0.05 * mouseState.delx; // amount to pan along x
            var dy = 0.05 * mouseState.dely;  // amount to pan along y
            //  TO DO: NEED TO IMPLEMENT HERE
            //  Calculate this.eye 
            var vx = scale(-dx, this.viewRotation[0]);
            this.eye = subtract(this.eye, vx);
            var vx = scale(-dy, this.viewRotation[1]);
            this.eye = subtract(this.eye, vx);
            mouseState.startx = mouseState.x;
            mouseState.starty = mouseState.y;
            break;
        case mouseState.actionChoice.DOLLY:   // middle mouse button
            var dx = 0.05 * mouseState.delx;  // amount to move backward/forward
            var dy = 0.05 * mouseState.dely;
            //   TO DO: NEED TO IMPLEMENT HERE
            //  Calculate this.eye 
            //this.eye = mult(translate(0, 0, dx), this.eye);
            var vx = scale(-dx, this.viewRotation[2]);
            this.eye = subtract(this.eye, vx);
            //this.eye = subtract(this.eye, vec4(dx*this.viewRotation[2]));
            mouseState.startx = mouseState.x;
            mouseState.starty = mouseState.y;
            break;
        default:
            console.log("unknown action: " + mouseState.action);
    }
    render();
};

/**
 * Rotate about the world coordinate system about y (left/right mouse drag) and/or 
 * about a line parallel to the camera's x-axis and going through the WCS origin 
 * (up/down mouse drag).
 * @param {mat4} rx  rotation matrix around x
 * @param {mat4} ry  rotation matrix around y
 * @return none
 */
Camera.prototype.tumble = function (rx, ry) {
    // TO DO:  IMPLEMENT THIS FUNCTION
    // We want to rotate about the world coordinate system along a direction parallel to the
    // camera's x axis. We first determine the coordinates of the WCS origin expressed in the eye coordinates.
    // We then translate this point to the camera (origin in camera coordinates) and do a rotation about x.
    // We then translate back. The result is then composed with the view matrix to give a new view matrix.
    //  When done, should have new value for eye and viewRotation

    //Logan Smith Notes:
       // Ignore A and B for now, focus on Ry. Multiply view by ry to get new mv.
       // Extract view rotation from new mv. Calculate eye using formula.


    // DO THIS CONTROL LAST - IT IS THE MOST DIFFICULT PART
    tumblePoint = vec4(0, 0, 0, 1);
    var view = this.calcViewMat();  // current view matrix
    
    var eyea = this.eye;
    
    
    var A = mult(mult(translate(tumblePoint[0], tumblePoint[1], tumblePoint[2]), ry), translate(-tumblePoint[0], -tumblePoint[1], -tumblePoint[2]));
    var tumblePoint2 = mult(view, tumblePoint);
    console.log(tumblePoint2);
    var B = mult(mult(translate(tumblePoint2[0], tumblePoint2[1], tumblePoint2[2]), rx), translate(-tumblePoint2[0], -tumblePoint2[1], -tumblePoint2[2]));
   //var A = mult(mult(eyea.translate(-this.eye[0], -this.eye[1], -this.eye[2]), ry), eyea.translate(this.eye[0]), this.eye[1], this.eye[2]);
   //var B = mult(mult(translate(-this.eye[0], -this.eye[1], -this.eye[2]), rx), translate(this.eye[0]), this.eye[1], this.eye[2]);
    
    console.log(B);
    
    //var newmv = mult(view, ry);
    var newmv = mult(mult(B, view), A);
    console.log(ry)
    console.log(newmv);
    
    var line1 = vec4(vec3(newmv[0]), 0);
    var line2 = vec4(vec3(newmv[1]), 0);
    var line3 = vec4(vec3(newmv[2]), 0);
    var line4 = vec4(0, 0, 0, 1);
    
    var rotnew = mat4(line1, line2, line3, line4);
    
    console.log(rotnew);
    var eyeinv = mult(inverse(rotnew), newmv);
    var eyenew = vec4(-eyeinv[0][3], -eyeinv[1][3], -eyeinv[2][3], 1);
    //console.log(eyeinv);
    //console.log(eyenew);
    
    this.eye = eyenew;
    this.viewRotation = rotnew;
    
    console.log(this.viewRotation)
    console.log("break")
    //this.calcViewMat();
    // X Rotate about tumble point in Camera Coord Sys
    
   

    // Y Rotate about tumble point in WCS
    

    // need to get eye position back
    //  Here, rotInverse is the inverse of the rotational part of the view matrix.
      //console.log(this.viewRotation);
      //var eye = mult(inverse(this.viewRotation), this.mv);  //-> this gives the location of the WCS origin in the eye coordinates
      //console.log(this.eye);
   
};

// Controls viewrotation and eye coordinatates through button presses


Camera.prototype.keyAction = function (key) {
    var alpha = 1.0;  // used to control the amount of a turn during the flythrough 
    switch (key) {     // different keys should be used because these do things in browser
        case 'D':  // turn right - this is implemented
            console.log("turn right");
            this.viewRotation = mult(rotateY(alpha), this.viewRotation);
            break;
        case 'A':   // turn left
            console.log("turn left");
            this.viewRotation = mult(rotateY(-alpha), this.viewRotation);
            break;
        case 'W':  // turn up   
            console.log(" turn up");
            this.viewRotation = mult(rotateX(-alpha), this.viewRotation);
            break;
        case 'S':  // turn down
            console.log("turn down");
            this.viewRotation = mult(rotateX(alpha), this.viewRotation);
            break;
        case 'Q':  // bank right
            console.log("bank right");
            this.viewRotation = mult(rotateZ(-alpha), this.viewRotation);
            break;
        case 'E':  // bank left
            console.log("bank left");
            this.viewRotation = mult(rotateZ(alpha), this.viewRotation);
            // IMPLEMENT
            break;
        case '&':  // move forward
            console.log("move forward");
            var vx = scale(1, this.viewRotation[2]);
            this.eye = subtract(this.eye, vx);
            break;
        case '(':  //  move backward
            console.log("move backward");
            var vx = scale(-1, this.viewRotation[2]);
            this.eye = subtract(this.eye, vx);
            break;
        case '%':  //  move backward
            //console.log("move backward");
            var vx = scale(1, this.viewRotation[0]);
            this.eye = subtract(this.eye, vx);
            break;
        case '\'':  //  move backward
            //console.log("move backward");
            var vx = scale(-1, this.viewRotation[0]);
            this.eye = subtract(this.eye, vx);
            break;
        case 'R':  //  reset
            console.log("reset");
            this.reset();
            break;
    }
};