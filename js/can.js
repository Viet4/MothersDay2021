class Can {

    constructor(x,y,w,h) {

        var options = {
            isStatic: true,
        }

        this.body = Bodies.rectangle(x,y,0,0,options);

        this.w = w;
        this.h = h;

        World.add(world, this.body);

    }

    display(img, img2) {

        var pos = this.body.position;


        noFill();
        strokeWeight(0);

        imageMode(CENTER);
        if (waterCanSwitch === 0){
            image(img,pos.x,pos.y,this.w,this.h);
        }
        else if (waterCanSwitch === 1){
            image(img2,pos.x,pos.y,this.w,this.h);
        }
        
    }
}