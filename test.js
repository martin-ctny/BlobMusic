class Robot {
    constructor({name, height, speed}){
        this.name = name;
        this.height = height;
        this.speed = speed;
        this.isJumping = false;
    }
    makeCoffee(){
        console.log('Making coffee');
    }
    jump(){
        console.log('Jumping');
        this.isJumping = true;
        console.log(this.isJumping);
        setTimeout(() => {
            this.isJumping = false;
            console.log(this.isJumping);
        }, 1000);
        console.log(this.isJumping);
    }
}

const robot = new Robot({name: 'Robot', height: 50, speed: 10});
robot.jump()