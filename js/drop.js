class Drop{

    constructor(x,y,radius){

        var options = {

            'restitution': 0.2,
            'friction': 0.8,
            'density': 1,
        }

        this.body = Bodies.circle(x,y,radius/2,options);

        this.radius = radius;

        this.colour = "#7bdde3";

        World.add(world,this.body);
    }

    display(){

        var pos = this.body.position;
        var angle = this.body.angle;
        var color = "#7bdde3"

        push();

        translate(pos.x,pos.y);
        rotate(angle);

        fill(this.colour);
        strokeWeight(0);
        ellipseMode(CENTER);
        ellipse(0,0,this.radius,this.radius);

        pop();

        if (pos.y > displayHeight) {
            World.remove(world,this.body);
            this.colour = "#ffffff";
        }
    }

}