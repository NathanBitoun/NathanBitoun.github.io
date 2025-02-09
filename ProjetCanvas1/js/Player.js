import ObjectGraphique from "./ObjectGraphique.js";
import { drawCircleImmediat } from "./utils.js";   

export default class Player extends ObjectGraphique {
    constructor(x, y) {
        super(x, y, 50, 50);
        this.vitesseX = 0;
        this.vitesseY = 0;
        this.couleur = "pink";
        this.angle = 0;
    }

    draw(ctx) {
        // Ici on dessine un monstre
        ctx.save();
        // on déplace le systeme de coordonnées pour placer
        // le monstre en x, y.Tous les ordres de dessin
        // dans cette fonction seront par rapport à ce repère
        // translaté
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        // on recentre le monstre. Par défaut le centre de rotation est dans le coin en haut à gauche
        // du rectangle, on décale de la demi largeur et de la demi hauteur pour 
        // que le centre de rotation soit au centre du rectangle.
        // Les coordonnées x, y du monstre sont donc au centre du rectangle....
        ctx.translate(-this.w / 2, -this.h / 2);
        //this.ctx.scale(0.5, 0.5);

        ctx.rotate(-0.2);
        this.drawEllipseImmediat(-25,45,20,10,"red",ctx);
        ctx.rotate(0.4);
        this.drawEllipseImmediat(25,45,20,10,"red",ctx);
        ctx.rotate(-0.2);

        // Corps (tête)
        this.drawEllipseImmediat(0, 0, 50,50, "pink",ctx);
        // yeux

        this.drawEllipseImmediat(-12,-10,10,16,"white",ctx);
        this.drawEllipseImmediat(12,-10,10,16,"white",ctx);
        this.drawEllipseImmediat(-12,-10,5,8,"black",ctx);
        this.drawEllipseImmediat(12,-10,5,8,"black",ctx);
        
        // bouche

        this.drawEllipseImmediat(0,20,7,9,"black",ctx);

        // les paumettes

        ctx.rotate(0.2);
        this.drawEllipseImmediat(-20,17,9,6,"#FF69B4",ctx);
        ctx.rotate(-0.4);
        this.drawEllipseImmediat(20,17,9,6,"#FF69B4",ctx);
        ctx.rotate(0.2);
        
        // Les bras

        ctx.rotate(0.2);
        this.drawEllipseImmediat(-50,10,20,10,"pink",ctx);
        ctx.rotate(-0.4);
        this.drawEllipseImmediat(50,10,20,10,"pink",ctx);
        ctx.rotate(0.2);

        // restore
        ctx.restore();

        // super.draw() dessine une croix à la position x, y
        // pour debug
        super.draw(ctx);
    }

    move() {
        this.x += this.vitesseX;
        this.y += this.vitesseY;

        if (this.x - this.w / 2 < 0) this.x = this.w / 2;
        if (this.y - this.h / 2 < 0) this.y = this.h / 2;
    }
    /*
    drawMonstre(ctx) {
        // Ici on dessine un monstre
        ctx.save();

        ctx.rotate(this.angle);

        
        
        // restore
        ctx.restore();
    }
        */

    drawEllipseImmediat(x, y, radiusX, radiusY, color,ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }
}