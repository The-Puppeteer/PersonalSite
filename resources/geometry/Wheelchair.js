/* 
Code by Logan Smith and Bailey William
Code for Wheelchair creation
 */


function Wheelchair () {
    this.name = "wheelchair";
    
    //Position changes position of wheelchair
    this.position = 0;
    
    //Values determine big wheel size / location
    this.bigWheelRadius = 2;
    this.bigWheelWidth = 0.2;
    this.bigWheelDistance = 2.2;
    
    //Values determine seat size / location
    this.seatSize = 2;
    this.seatHeight = 2;
    this.seatDistance = 2;
    this.seatDepth = 0.2;
    
    //Values determine back size / location
    this.backSize = 2;
    this.backWidth = 0.2;
    this.backDistance = -0.2;
    this.backHeight = 3.9;
    
    //Values determine top bars size / location
    this.topBarsSize = 1;
    this.topBarsWidth = 0.2;
    this.topBarsBack = -1.4;
    this.topBarsHeight = 5.7;
    this.topBarsDistance = 1.8;
    
    //Values determine handle size / location
    //Handle Part 1
    this.handle1Size = 2;
    this.handle1Forward = 2;
    this.handle1Height = 4;
    this.handle1Width = 0.2;
    this.handle1Distance = 1.8;
    //Handle part 2
    this.handle2Size = 0.8;
    this.handle2Forward = 3.8;
    this.handle2Height = 3;
    this.handle2Width = 0.2;
    this.handle2Distance = 1.8;
    
    ////Values determine small wheel size / location
    this.smallWheelRadius = 1;
    this.smallWheelWidth = 0.2;
    this.smallWheelDistance = 2.2;
    this.smallWheelForward = 3.8;
    this.smallWheelDown = -1;
    
    //Values determine bottom bars size / location
    //Bar part 1
    this.bottomBars1Size = 1.1;
    this.bottomBars1Width = 0.2;
    this.bottomBars1Height = 0.9;
    this.bottomBars1Forward = 0;
    this.bottomBars1Distance = 1.8;
    //Bar part 2
    this.bottomBars2Size = 1.5;
    this.bottomBars2Width = 0.2;
    this.bottomBars2Height = 0.3;
    this.bottomBars2Forward = 3.8;
    this.bottomBars2Distance = 1.8;
    //Bar part 3
    this.bottomBars3Size = 2;
    this.bottomBars3Width = 0.2;
    this.bottomBars3Height = 0;
    this.bottomBars3Forward = 2;
    this.bottomBars3Distance = 1.8;
    
    //Values determine rotation of wheels
    this.bigWheelTurn = 0;
    this.smallWheelTurn = 0;
    
}

//Code to update position and wheel rotation on forward movement
Wheelchair.prototype.moveForward = function() {
    console.log("Called.");
    this.position = this.position+0.2;
    this.bigWheelTurn = this.bigWheelTurn-5.76;
    this.smallWheelTurn = this.smallWheelTurn-11.52;
    console.log(this.position);
}

//Code to update position and wheel rotation on backward movement
Wheelchair.prototype.moveBackward = function() {
    console.log("Called.");
    this.position = this.position-0.2;
    console.log(this.position);
    this.bigWheelTurn = this.bigWheelTurn+5.76;
    this.smallWheelTurn = this.smallWheelTurn+11.52;
}

//Code to create each part of the wheelchair
Wheelchair.prototype.draw = function() {
    stack.push();
    stack.multiply(translate(this.position, 0, 0));
    //stack.multiply(scalem(0.5, 0.5, 0.5));
    this.bigWheel();
    this.seat();
    this.back();
    this.topBars();
    this.smallWheel();
    this.handle();
    this.bottomBars();
    stack.pop();
}

//Code to create the big wheel
Wheelchair.prototype.bigWheel = function() {
    //Front wheel
    stack.push();
    stack.multiply(translate(0, 0, this.bigWheelDistance))
    stack.multiply(scalem(this.bigWheelRadius, this.bigWheelRadius, this.bigWheelWidth));
    stack.multiply(rotateX(90));
    stack.multiply(rotateY(this.bigWheelTurn));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cylinder);    // draw cube
    stack.pop();
    
    //Back wheel
    stack.push();
    stack.multiply(translate(0, 0, -this.bigWheelDistance))
    stack.multiply(scalem(this.bigWheelRadius, this.bigWheelRadius, this.bigWheelWidth));
    stack.multiply(rotateX(90));
    stack.multiply(rotateY(this.bigWheelTurn));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cylinder);    // draw cube
    stack.pop();
}

//Code to create the seat
Wheelchair.prototype.seat = function() {
    stack.push();
    stack.multiply(translate(this.seatDistance, this.seatHeight, 0));
    stack.multiply(scalem(this.seatSize, this.seatDepth, this.seatSize));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 0.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cube);    // draw cube
    stack.pop();
}

//Code to create the seat back
Wheelchair.prototype.back = function() {
    stack.push();
    stack.multiply(translate(this.backDistance, this.backHeight, 0));
    stack.multiply(scalem(this.backWidth, this.backSize, this.backSize));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 0.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cube);    // draw cube
    stack.pop();
}

//Code to create bars at top of wheelchair
Wheelchair.prototype.topBars = function() {
    //Front Bars
    stack.push();
    stack.multiply(translate(this.topBarsBack, this.topBarsHeight, this.topBarsDistance));
    stack.multiply(scalem(this.topBarsSize, this.topBarsWidth, this.topBarsWidth));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 1.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cube);    // draw cube
    stack.pop();
    
    //Back Bars
    stack.push();
    stack.multiply(translate(this.topBarsBack, this.topBarsHeight, -this.topBarsDistance));
    stack.multiply(scalem(this.topBarsSize, this.topBarsWidth, this.topBarsWidth));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 1.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cube);    // draw cube
    stack.pop();
}

//Code to create the small wheel
Wheelchair.prototype.smallWheel = function() {
    //Front wheel
    stack.push();
    stack.multiply(translate(this.smallWheelForward, this.smallWheelDown, this.smallWheelDistance))
    stack.multiply(scalem(this.smallWheelRadius, this.smallWheelRadius, this.smallWheelWidth));
    stack.multiply(rotateX(90));
    stack.multiply(rotateY(this.smallWheelTurn));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cylinder);    // draw cube
    stack.pop();
    
    //Back wheel
    stack.push();
    stack.multiply(translate(this.smallWheelForward, this.smallWheelDown, -this.smallWheelDistance))
    stack.multiply(scalem(this.smallWheelRadius, this.smallWheelRadius, this.smallWheelWidth));
    stack.multiply(rotateX(90));
    stack.multiply(rotateY(this.smallWheelTurn));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cylinder);    // draw cube
    stack.pop();
}

//Code to create handle bars
Wheelchair.prototype.handle = function() {
    //Front bar Part 1
    stack.push();
    stack.multiply(translate(this.handle1Forward, this.handle1Height, this.handle1Distance));
    stack.multiply(scalem(this.handle1Size, this.handle1Width, this.handle1Width));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 1.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cube);    // draw cube
    stack.pop();
    
    //Back bar Part 1
    stack.push();
    stack.multiply(translate(this.handle1Forward, this.handle1Height, -this.handle1Distance));
    stack.multiply(scalem(this.handle1Size, this.handle1Width, this.handle1Width));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 1.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cube);    // draw cube
    stack.pop();
    
    //Front bar Part 2
    stack.push();
    stack.multiply(translate(this.handle2Forward, this.handle2Height, this.handle2Distance));
    stack.multiply(scalem(this.handle2Width, this.handle2Size, this.handle2Width));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 1.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cube);    // draw cube
    stack.pop();
    
    //Back bar Part 1
    stack.push();
    stack.multiply(translate(this.handle2Forward, this.handle2Height, -this.handle2Distance));
    stack.multiply(scalem(this.handle2Width, this.handle2Size, this.handle2Width));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 1.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cube);    // draw cube
    stack.pop();
}

//Code to create bottom bars
Wheelchair.prototype.bottomBars = function() {
    //Front bar Part 1
    stack.push();
    stack.multiply(translate(this.bottomBars1Forward, this.bottomBars1Height, this.bottomBars1Distance));
    stack.multiply(scalem(this.bottomBars1Width, this.bottomBars1Size, this.bottomBars1Width));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 1.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cube);    // draw cube
    stack.pop();
    
    //Back bar Part 1
    stack.push();
    stack.multiply(translate(this.bottomBars1Forward, this.bottomBars1Height, -this.bottomBars1Distance));
    stack.multiply(scalem(this.bottomBars1Width, this.bottomBars1Size, this.bottomBars1Width));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 1.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cube);    // draw cube
    stack.pop();
    
    //Front Bar Part 2
    stack.push();
    stack.multiply(translate(this.bottomBars2Forward, this.bottomBars2Height, this.bottomBars2Distance));
    stack.multiply(scalem(this.bottomBars2Width, this.bottomBars2Size, this.bottomBars2Width));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 1.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cube);    // draw cube
    stack.pop();
    
    //Back bar Part 2
    stack.push();
    stack.multiply(translate(this.bottomBars2Forward, this.bottomBars2Height, -this.bottomBars2Distance));
    stack.multiply(scalem(this.bottomBars2Width, this.bottomBars2Size, this.bottomBars2Width));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 1.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cube);    // draw cube
    stack.pop();
    
    //Front bar Part 3
    stack.push();
    stack.multiply(translate(this.bottomBars3Forward, this.bottomBars3Height, this.bottomBars3Distance));
    stack.multiply(scalem(this.bottomBars3Size, this.bottomBars3Width, this.bottomBars3Width));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 1.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cube);    // draw cube
    stack.pop();
    
    //Back bar Part 3
    stack.push();
    stack.multiply(translate(this.bottomBars3Forward, this.bottomBars3Height, -this.bottomBars3Distance));
    stack.multiply(scalem(this.bottomBars3Size, this.bottomBars3Width, this.bottomBars3Width));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 1.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cube);    // draw cube
    stack.pop();
}