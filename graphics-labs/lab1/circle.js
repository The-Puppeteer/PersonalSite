var canvas; //init canvas variable
var rect; //init rect variable
var ctx; //init context variable
var clout = []; //init new global array
var eAngle = 0; //init start angle for cirlce
var sAngle = 2 * Math.PI; //init end angle for circle

window.onload = function init() { //begins during the loading of the page

    canvas = document.getElementById("swag"); //reads in canvas from html page
    var parent = document.getElementById("canvas-parent");
    rect = canvas.getBoundingClientRect(); //sets rectangle to canvas size
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    ctx = canvas.getContext("2d"); //sets the context for the canvas

    canvas.addEventListener("click", function (event) { // adds a click event listener for the canvas
        rect = canvas.getBoundingClientRect(); //sets rectangle to canvas size
        var circle = new Circle(event.x - rect.left, event.y - rect.top, Math.random() * 75, "black"); //creates new local variable circle and sets x & y from mouse pos, r to a random int*30 and the color to black
        clout.push(circle); // pushes the new circle onto the array
        circle.drawCirc(); //calls the drawCirc method and, well, draws the new circle

        if (canvas.oncontextmenu = function () { //when the user right clicks, call the ranColor() method and revent the RC menu 
            ranColor();
            return false;
        })
            ;

    });

    document.getElementById('clear').addEventListener('click', function () { //button stuff. essentially clears every point on the canvas and 
        ctx.clearRect(0, 0, canvas.width, canvas.height);//clears the array to completely clear the canvas
        clout = [];
    }, false);

    document.getElementById('ran').addEventListener('click', function(){
        ranColor();
        return false;
    }, false);




};

function Circle(x, y, r, color) { //defines circle object
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
}

Circle.prototype.drawCirc = function () { //method that draws the circle on the canvas
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, eAngle, sAngle);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();
};

function ranColor() { // creates a random color and sets a new color to each ith circle
    for (i = 0; i < clout.length; i++) {
        clout[i].color = "rgb(" +
                Math.floor(Math.random() * 256) + "," +
                Math.floor(Math.random() * 256) + "," +
                Math.floor(Math.random() * 256) + ")";
        clout[i].drawCirc();
    }
}









