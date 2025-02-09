import ObjectGraphique from "./ObjectGraphique.js";

export default class ExitZone extends ObjectGraphique {
    constructor(x, y, w, h, couleur = "green") {
        super(x, y, w, h);
        this.couleur = couleur;
    }

    draw(ctx) {
        ctx.fillStyle = this.couleur;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}
