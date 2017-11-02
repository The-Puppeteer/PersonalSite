


function drawHand(x,y,z){//allows multiple hands to be rendered
    //creates new matrix stack
    //stack.multiply(viewMat);//they're dating <3 also, this is the palm
    stack.multiply(translate(-2.0,0.0,0.0));//moves palm left
    //stack.multiply(rotateZ(wristAngle));//sets variable angle of palm and children elements. starts at 30 degrees
    //stack.multiply(rotateX(rotAngle));//sets variable angle for the rotation of an imaginary wrist
    stack.multiply(scalem(0.4,2,2));//sets the size of the cylinder
    stack.push();//pushes our final matrix on the stack 
    drawCube(red);

    stack.multiply(translate(0.0,-0.48,1.18));//thumb stuff
    stack.multiply(scalem(1/0.4, .5, .5));//had to sandwich our rotates and translates between the inverse and regular scalem
    stack.multiply(rotateX(-45));//in order to rotate and translate without the skewing of our shape
    stack.multiply(translate(0.0,-0.5,0));
   // stack.multiply(rotateZ(actuators[0]));//takes actuator value at index 0 which is for the thumb
    stack.multiply(translate(0.0,.5,0));
    stack.multiply(rotateY(-20));//<--- lmao "rotatey"
    stack.multiply(scalem(0.4,2,2));//undo inverse scalem
    stack.multiply(scalem(.95,0.5,.25));//scalem to set final value of shape scale
    drawCube(darkred);

    stack.multiply(scalem(1/0.4,.5,.5));//similar stuff here with inverses and such 
    stack.multiply(scalem(1/.95,1/.5,4));
    stack.multiply(translate(0,1,0))
   // stack.multiply(rotateZ(actuators[0]*1.2));
    stack.multiply(translate(0,1,0));
    stack.multiply(scalem(.95,.5,.25));
    stack.multiply(scalem(0.4,2,2));
    drawCube(darkred);

    stack.pop();//pops our new matrix off the stack 
    


    stack.push();
    stack.multiply(translate(0,.8,0.8));
    drawFinger(1,-10,0.3,0.9,darkred);
    stack.push();
    stack.multiply(translate(0,.8,0.25));
    drawFinger(2,0,0.3,1.1,darkred);
    stack.push();
    stack.multiply(translate(0,0.8,-0.25));
    drawFinger(3,5,0.3,1,darkred);
    stack.push();
    stack.multiply(translate(0,0.8,-0.8));
    drawFinger(4,15,0.2,.75,pink);
    stack.multiply(viewMat);
}



function drawFinger(n,r,s,t,c){//drawFinger(index of finger to be used with our angle actuation array, angle of offset for finger,
    
    stack.multiply(scalem(1/0.4,0.5,0.5));//sets scale and translation for cylinder size, sets translation to adjust for the previous scale
  //  stack.multiply(rotateZ(actuators[n]));//sets color)
    stack.multiply(rotateX(r));
    stack.multiply(translate(0,t,0));
    stack.multiply(scalem(0.4,2,2));
    stack.multiply(scalem(.95, s, .2));
    drawCube(c);

    stack.multiply(translate(0,s,0));//these are similar to the thumb except there is an extra cylinder and the values are 
    stack.multiply(scalem(1/0.4,0.5,0.5));//interchangeable to give the ability to easily create more
    stack.multiply(scalem(1/.95, 1/s, 1/.2));
   // stack.multiply(rotateZ(actuators[n]*1.1));
    stack.multiply(translate(0,t,0));
    stack.multiply(scalem(.95, s, .2));
    stack.multiply(scalem(0.4,2,2));
    drawCube(c);

    stack.multiply(translate(0,s,0));
    stack.multiply(scalem(1/0.4,0.5,0.5));
    stack.multiply(scalem(1/.95, 1/s, 1/.2));
   // stack.multiply(rotateZ(actuators[n]*1.1));
    stack.multiply(translate(0,t,0));
    stack.multiply(scalem(.95, s, .2));
    stack.multiply(scalem(0.4,2,2));
    drawCube(c);
    stack.pop();
}