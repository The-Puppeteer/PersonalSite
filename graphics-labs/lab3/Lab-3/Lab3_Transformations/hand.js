


function drawHand(x,y,z){//allows multiple hands to be rendered
    //creates new matrix stack
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
    


    ms.push();
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
    ms.multiply(viewMat);
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