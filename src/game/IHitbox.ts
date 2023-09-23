import { Rectangle } from "pixi.js";

export interface IHitbox{
    getHitbox() : Rectangle;
}

export function checkCollision(objA: IHitbox, objB: IHitbox): Rectangle | null{
    const rectA = objA.getHitbox();
    const rectB = objB.getHitbox();

    const rightmostLeft = rectA.left < rectB.left ? rectB.left : rectA.left;
    const leftmostRight = rectA.right > rectB.right ? rectB.right : rectA.right;
    const bottommostTop = rectA.top < rectB.top ? rectB.top : rectA.top;
    const topmostBottom = rectA.bottom > rectB.bottom ? rectB.bottom : rectA.bottom;

    if(rightmostLeft < leftmostRight && bottommostTop < topmostBottom){
        const rectangle = new Rectangle();
        rectangle.x = rightmostLeft;
        rectangle.y = bottommostTop;
        rectangle.width = leftmostRight - rightmostLeft;
        rectangle.height = topmostBottom - bottommostTop;
        return rectangle;
    }
    else{
        return null;
    }
}