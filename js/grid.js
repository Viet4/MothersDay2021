class Grid {
    constructor(x,y,l,size){

        var options = {
            isStatic: true
        }

        this.body = Bodies.rectangle(x,y,l,l,options);

        this.l = l;
        this.s = size;

        World.add(world,this.body);
    }
    display(){
        var pos = this.body.position;

        noFill();
        strokeWeight(10);
        rectMode(CENTER);
        rect(pos.x,pos.y,this.l,this.l);

        var halfL = this.l/2;
        
        for(var x = this.l/this.s+pos.x-halfL; x<pos.x+halfL; x+=this.l/this.s){
            line(x,pos.y-halfL,x,pos.y+halfL);
        }

        for(var y = this.l/this.s+pos.y-halfL; y<pos.y+halfL; y+=this.l/this.s){
            line(pos.x+halfL,y,pos.x-halfL,y);
        }
    }
}