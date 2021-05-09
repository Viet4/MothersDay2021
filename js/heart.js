class Heart {
    
    constructor(x,y,diameter) {

        var options = {
            "restitution": 0.2,
            "friction": 0.8,
            "density": 1,
        }

        this.body = Bodies.circle(x,y,diameter,options);

        this.radius = diameter/2;

        World.add(world, this.body);
    }

    display() {

        var pos = this.body.position;

        imageMode(CENTER);
        image(heartsImg,pos.x,pos.y,this.radius,this.radius);

        if (pos.y > displayHeight*1.1) {
            heartsAmount = heartsAmount-1
            World.remove(world, this.body);
        }
    }
}