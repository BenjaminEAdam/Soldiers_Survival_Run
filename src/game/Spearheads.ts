import { Container, Sprite } from "pixi.js";

export class Spearheads extends Container{

    constructor(number: number){
        super();

        const pinche1 = Sprite.from("pinche");
        pinche1.position.set(0,0);
        pinche1.scale.set(0.025,0.025);
        pinche1.angle = 45;

        const pinche2 = Sprite.from("pinche");
        pinche2.position.set(0,15);
        pinche2.scale.set(0.025,0.025);
        pinche2.angle = 45;

        const pinche3 = Sprite.from("pinche");
        pinche3.position.set(0,30);
        pinche3.scale.set(0.025,0.025);
        pinche3.angle = 45;

        const pinche4 = Sprite.from("pinche");
        pinche4.position.set(0,45);
        pinche4.scale.set(0.025,0.025);
        pinche4.angle = 45;

        const pinche5 = Sprite.from("pinche");
        pinche5.position.set(0,60);
        pinche5.scale.set(0.025,0.025);
        pinche5.angle = 45;

        const pinche6 = Sprite.from("pinche");
        pinche6.position.set(0,75);
        pinche6.scale.set(0.025,0.025);
        pinche6.angle = 45;

        const pinche7 = Sprite.from("pinche");
        pinche7.position.set(0,90);
        pinche7.scale.set(0.025,0.025);
        pinche7.angle = 45;

        const lanza1 = Sprite.from("lanza");
        lanza1.position.set(0,0);
        lanza1.scale.set(0.025,0.025);
        lanza1.angle = 180;

        const lanza2 = Sprite.from("lanza");
        lanza2.position.set(5,0);
        lanza2.scale.set(0.025,0.025);
        lanza2.angle = 180;

        const lanza3 = Sprite.from("lanza");
        lanza3.position.set(10,0);
        lanza3.scale.set(0.025,0.025);
        lanza3.angle = 180;

        const lanza4 = Sprite.from("lanza");
        lanza4.position.set(15,0);
        lanza4.scale.set(0.025,0.025);
        lanza4.angle = 180;

        const lanza5 = Sprite.from("lanza");
        lanza5.position.set(20,0);
        lanza5.scale.set(0.025,0.025);
        lanza5.angle = 180;

        const lanza6 = Sprite.from("lanza");
        lanza6.position.set(25,0);
        lanza6.scale.set(0.025,0.025);
        lanza6.angle = 180;

        const lanza7 = Sprite.from("lanza");
        lanza7.position.set(30,0);
        lanza7.scale.set(0.025,0.025);
        lanza7.angle = 180;

        const lanza8 = Sprite.from("lanza");
        lanza8.position.set(35,0);
        lanza8.scale.set(0.025,0.025);
        lanza8.angle = 180;

        const lanza9 = Sprite.from("lanza");
        lanza9.position.set(40,0);
        lanza9.scale.set(0.025,0.025);
        lanza9.angle = 180;

        const lanza10 = Sprite.from("lanza");
        lanza10.position.set(45,0);
        lanza10.scale.set(0.025,0.025);
        lanza10.angle = 180;

        const lanza11 = Sprite.from("lanza");
        lanza11.position.set(50,0);
        lanza11.scale.set(0.025,0.025);
        lanza11.angle = 180;

        const lanza12 = Sprite.from("lanza");
        lanza12.position.set(55,0);
        lanza12.scale.set(0.025,0.025);
        lanza12.angle = 180;

        switch(number){
            case 1:
                this.addChild(pinche1);
                break;
            case 2:
                this.addChild(pinche1);
                this.addChild(pinche2);
                break;
            case 3:
                this.addChild(pinche1);
                this.addChild(pinche2);
                this.addChild(pinche3);
                break;
            case 4:
                this.addChild(pinche1);
                this.addChild(pinche2);
                this.addChild(pinche3);
                this.addChild(pinche4);
                break;
            case 5:
                this.addChild(pinche1);
                this.addChild(pinche2);
                this.addChild(pinche3);
                this.addChild(pinche4);
                this.addChild(pinche5);
                break;
            case 6:
                this.addChild(pinche1);
                this.addChild(pinche2);
                this.addChild(pinche3);
                this.addChild(pinche4);
                this.addChild(pinche5);
                this.addChild(pinche6);
                break;
            case 7:
                this.addChild(pinche1);
                this.addChild(pinche2);
                this.addChild(pinche3);
                this.addChild(pinche4);
                this.addChild(pinche5);
                this.addChild(pinche6);
                this.addChild(pinche7);
                break;
            case 8:
                this.addChild(lanza1);
                this.addChild(lanza2);
                this.addChild(lanza3);
                this.addChild(lanza4);
                this.addChild(lanza5);
                this.addChild(lanza6);
                this.addChild(lanza7);
                this.addChild(lanza8);
                this.addChild(lanza9);
                this.addChild(lanza10);
                this.addChild(lanza11);
                this.addChild(lanza12);
                break;
            default:
                console.log("INGRESE UN NÚMERO DEL 1 AL 8 para crear un Spearheads");
                break;
        }
    }
}