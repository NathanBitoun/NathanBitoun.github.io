import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import ObjetSouris from "./ObjetSouris.js";
import { circleRectCollision, circRectsOverlap, rectsOverlap } from "./collisions.js";
import { initListeners } from "./ecouteurs.js";
import ExitZone from "./ExitZone.js";

export default class Game {
    objetsGraphiques = [];

    constructor(canvas) {
        this.canvas = canvas;
        // etat du clavier
        this.inputStates = {
            mouseX: 0,
            mouseY: 0,
        };
    }
    beginX = 100;
    beginY = 100;
    niveau = 1;

    async init(canvas) {
        this.ctx = this.canvas.getContext("2d");

        this.player = new Player(this.beginX, this.beginY);
        this.objetsGraphiques.push(this.player);

        // Un objert qui suite la souris, juste pour tester
        this.objetSouris = new ObjetSouris(200, 200, 25, 25, "orange");
        this.objetsGraphiques.push(this.objetSouris);


        // On cree deux obstacles

        
        let obstacle1 = new Obstacle(0, 300, 1000,50, "red");
        this.objetsGraphiques.push(obstacle1);
        let obstacle2 = new Obstacle(500, 800, 1400,50, "red");
        this.objetsGraphiques.push(obstacle2);
        let obstacle3 = new Obstacle(900, 450, 20,300, "blue");
        this.objetsGraphiques.push(obstacle3);

        let exitZone = new Obstacle(200, 525, 100, 100, "green");
        this.objetsGraphiques.push(exitZone);      

        // On initialise les écouteurs de touches, souris, etc.
        initListeners(this.inputStates, this.canvas);

        console.log("Game initialisé");
    }

    start() {
        console.log("Game démarré");

        // On démarre une animation à 60 images par seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    mainAnimationLoop() {
        // 1 - on efface le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 2 - on dessine les objets à animer dans le jeu
        // ici on dessine le monstre
        this.drawAllObjects();

        // 3 - On regarde l'état du clavier, manette, souris et on met à jour
        // l'état des objets du jeu en conséquence
        this.update();

        // 4 - on demande au navigateur d'appeler la fonction mainAnimationLoop
        // à nouveau dans 1/60 de seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    drawAllObjects() {
        // Dessine tous les objets du jeu
        this.objetsGraphiques.forEach(obj => {
            obj.draw(this.ctx);
        });
    }

    update() {
        // Appelée par mainAnimationLoop
        // donc tous les 1/60 de seconde
        
        // Déplacement du joueur. 
        this.movePlayer();

        // on met à jouer la position de objetSouris avec la position de la souris
        // Pour un objet qui "suit" la souris mais avec un temps de retard, voir l'exemple
        // du projet "charQuiTire" dans le dossier COURS
        this.objetSouris.x = this.inputStates.mouseX;
        this.objetSouris.y = this.inputStates.mouseY;

        // On regarde si le joueur a atteint la sortie
        // TODO

    }

    movePlayer() {
        this.player.vitesseX = 0;
        this.player.vitesseY = 0;
        
        if(this.inputStates.ArrowRight) {
            this.player.vitesseX = 5;
        } 
        if(this.inputStates.ArrowLeft) {
            this.player.vitesseX = -5;
        } 

        if(this.inputStates.ArrowUp) {
            this.player.vitesseY = -5;
        } 

        if(this.inputStates.ArrowDown) {
            this.player.vitesseY = 5;
        } 

        this.player.move();

        this.testCollisionsPlayer();
    }

    testCollisionsPlayer() {
        // Teste collision avec les bords du canvas
        this.testCollisionPlayerBordsEcran();

        // Teste collision avec les obstacles
        this.testCollisionPlayerObstacles();
       
    }

    testCollisionPlayerBordsEcran() {
        // Raoppel : le x, y du joueur est en son centre, pas dans le coin en haut à gauche!
        if(this.player.x - this.player.w *1.9 < 0) {
            // On stoppe le joueur
            this.player.vitesseX = 0;
            // on le remet au point de contaxct
            this.player.x = this.player.w * 1.9;
        }
        if(this.player.x + this.player.w/1.15 > this.canvas.width) {
            this.player.vitesseX = 0;
            // on le remet au point de contact
            this.player.x = this.canvas.width - this.player.w/1.15;
        }

        if(this.player.y - this.player.w*1.5 < 0) {
            this.player.y = this.player.w*1.5;
            this.player.vitesseY = 0;

        }
       
        if(this.player.y + this.player.h/2 > this.canvas.height) {
            this.player.vitesseY = 0;
            this.player.y = this.canvas.height - this.player.h/2;
        }
    }

    changeLevel(niveau){
        switch(niveau){
            case 1:
                this.resetNiveau();
                this.niveau1();
                break;
                
            case 2:
                this.resetNiveau();
                this.niveau2();
                break;
            case 3:
                this.resetNiveau();
                this.niveau3();
                break;
        }
    }

    resetNiveau(){
        // On remet le joueur à sa position de départ
        this.player.x = this.beginX;
        this.player.y = this.beginY;

        this.player.vitesseX = 0;
        this.player.vitesseY = 0;

        // On remet les objets à leur position de départ   
        this.objetsGraphiques = this.objetsGraphiques.filter(obj => !(obj instanceof Obstacle));
    }


    niveau1(){
        
        // Génération de nouveaux obstacles
        // premiere boite
        let obstacle1 = new Obstacle(0, 300, 550, 50, "red");
        this.objetsGraphiques.push(obstacle1);
        let obstacle2 = new Obstacle(500, 0, 50, 300, "red");
        this.objetsGraphiques.push(obstacle2);
        let obstacle3 = new Obstacle(400, 50, 20, 150, "blue");
        this.objetsGraphiques.push(obstacle3);
        
        // deuxième boite
        let obstacle4 = new Obstacle(650, 0, 50, 300, "red");
        this.objetsGraphiques.push(obstacle4);
        let obstacle5 = new Obstacle(650, 300, 600, 50, "red");
        this.objetsGraphiques.push(obstacle5);
        let obstacle6 = new Obstacle(1200, 0, 50, 300, "red");
        this.objetsGraphiques.push(obstacle6);
        let obstacle7 = new Obstacle(1150, 50, 20, 150, "blue");
        this.objetsGraphiques.push(obstacle7);

        // troisième boite
        let obstacle8 = new Obstacle(1350, 0, 50, 300, "red");
        this.objetsGraphiques.push(obstacle8);
        let obstacle9 = new Obstacle(1350, 300, 600, 50, "red");
        this.objetsGraphiques.push(obstacle9);
        let obstacle10 = new Obstacle(1700, 260, 150, 20, "blue");
        this.objetsGraphiques.push(obstacle10);
        
        // troisième boite
        let obstacle11 = new Obstacle(1350, 500, 50, 300, "red");
        this.objetsGraphiques.push(obstacle11);
        let obstacle12 = new Obstacle(1350, 500, 600, 50, "red");
        this.objetsGraphiques.push(obstacle12);
        let obstacle13 = new Obstacle(1450, 600, 20, 150, "blue");
        this.objetsGraphiques.push(obstacle13);
        let obstacle14 = new Obstacle(1350, 800, 600, 50, "red");
        this.objetsGraphiques.push(obstacle14);

        // quatrième boite
        let obstacle15 = new Obstacle(1200, 500, 50, 300, "red");
        this.objetsGraphiques.push(obstacle15);
        let obstacle16 = new Obstacle(650, 500, 50, 300, "red");
        this.objetsGraphiques.push(obstacle16);
        let obstacle17 = new Obstacle(650, 800, 600, 50, "red");
        this.objetsGraphiques.push(obstacle17);
        let obstacle18 = new Obstacle(750, 600, 20, 150, "blue");
        this.objetsGraphiques.push(obstacle18);
        let obstacle19 = new Obstacle(650, 500, 600, 50, "red");
        this.objetsGraphiques.push(obstacle19);

        // cinquième boite
        let obstacle20 = new Obstacle(500, 500, 50, 300, "red");
        this.objetsGraphiques.push(obstacle20);
        let obstacle21 = new Obstacle(0, 500, 50, 300, "red");
        this.objetsGraphiques.push(obstacle21);
        let obstacle22 = new Obstacle(0, 800, 550, 50, "red");
        this.objetsGraphiques.push(obstacle22);
        let obstacle24 = new Obstacle(0, 500, 550, 50, "red");
        this.objetsGraphiques.push(obstacle24);

        // arrivée
        let exitZone = new Obstacle(100, 625, 100, 100, "green");
        this.objetsGraphiques.push(exitZone);

    }

    niveau2(){

        let obstacle1 = new Obstacle(450, 0, 50,350, "red");
        this.objetsGraphiques.push(obstacle1);
        let obstacle2 = new Obstacle(0, 450, 350,50, "red");
        this.objetsGraphiques.push(obstacle2);

        let obstacle3 = new Obstacle(1450, 500, 50,350, "red");
        this.objetsGraphiques.push(obstacle3);
        let obstacle4 = new Obstacle(1550, 350, 350,50, "red");
        this.objetsGraphiques.push(obstacle4);

        let exitZone = new Obstacle(1750, 650, 100,100, "green");
        this.objetsGraphiques.push(exitZone);

    }

    niveau3(){

        
        let obstacle1 = new Obstacle(0, 150, 100, 50, "red");
        this.objetsGraphiques.push(obstacle1);
        let obstacle2 = new Obstacle(100, 150, 50, 150, "red");
        this.objetsGraphiques.push(obstacle2);
        let obstacle3 = new Obstacle(100, 250, 150, 50, "red");
        this.objetsGraphiques.push(obstacle3);
        let obstacle4 = new Obstacle(200, 250, 50, 150, "red");
        this.objetsGraphiques.push(obstacle4);
        let obstacle5 = new Obstacle(200, 350, 150, 50, "red");
        this.objetsGraphiques.push(obstacle5);
        let obstacle6 = new Obstacle(300, 350, 50, 150, "red");
        this.objetsGraphiques.push(obstacle6);
        let obstacle7 = new Obstacle(300, 450, 150, 50, "red");
        this.objetsGraphiques.push(obstacle7);
        let obstacle8 = new Obstacle(400, 450, 50, 150, "red");
        this.objetsGraphiques.push(obstacle8);
        let obstacle9 = new Obstacle(400, 550, 150, 50, "red");
        this.objetsGraphiques.push(obstacle9);
        let obstacle10 = new Obstacle(500, 550, 50, 150, "red");
        this.objetsGraphiques.push(obstacle10);
        let obstacle11 = new Obstacle(500, 650, 150, 50, "red");
        this.objetsGraphiques.push(obstacle11);
        let obstacle12 = new Obstacle(600, 650, 50, 150, "red");
        this.objetsGraphiques.push(obstacle12);
        let obstacle13 = new Obstacle(600, 750, 700, 50, "red");
        this.objetsGraphiques.push(obstacle13);
        let obstacle14 = new Obstacle(1300, 125, 50, 675, "red");
        this.objetsGraphiques.push(obstacle14);
        let obstacle15 = new Obstacle(800, 125, 500, 50, "red");
        this.objetsGraphiques.push(obstacle15);
        let obstacle16 = new Obstacle(325, 0, 50, 150, "red");
        this.objetsGraphiques.push(obstacle16);
        let obstacle17 = new Obstacle(325, 100, 150, 50, "red");
        this.objetsGraphiques.push(obstacle17);
        let obstacle18 = new Obstacle(425, 100, 50, 150, "red");
        this.objetsGraphiques.push(obstacle18);
        let obstacle19 = new Obstacle(425, 200, 150, 50, "red");
        this.objetsGraphiques.push(obstacle19);
        let obstacle20 = new Obstacle(525, 200, 50, 150, "red");
        this.objetsGraphiques.push(obstacle20);
        let obstacle21 = new Obstacle(525, 300, 150, 50, "red");
        this.objetsGraphiques.push(obstacle21);
        let obstacle22 = new Obstacle(625, 300, 50, 150, "red");
        this.objetsGraphiques.push(obstacle22);
        let obstacle23 = new Obstacle(625, 400, 150, 50, "red");
        this.objetsGraphiques.push(obstacle23);
        let obstacle24 = new Obstacle(725, 400, 50, 150, "red");
        this.objetsGraphiques.push(obstacle24);
        let obstacle25 = new Obstacle(725, 500, 400, 50, "red");
        this.objetsGraphiques.push(obstacle25);
        let obstacle26 = new Obstacle(1125, 350, 50, 200, "red");
        this.objetsGraphiques.push(obstacle26);
        let obstacle27 = new Obstacle(675, 300, 500, 50, "red");
        this.objetsGraphiques.push(obstacle27);
        let obstacle28 = new Obstacle(625, 0, 50, 350, "red");
        this.objetsGraphiques.push(obstacle28);
        let obstacle29 = new Obstacle(1500, 0, 50, 150, "red");
        this.objetsGraphiques.push(obstacle29);
        let obstacle30 = new Obstacle(1500, 125, 400, 50, "red");
        this.objetsGraphiques.push(obstacle30);
        let obstacle31 = new Obstacle(1900, 0, 50, 350, "red");
        this.objetsGraphiques.push(obstacle31);
        let obstacle32 = new Obstacle(1300, 300, 450, 50, "red");
        this.objetsGraphiques.push(obstacle32);
        let obstacle33 = new Obstacle(1700, 350, 50, 350, "red");
        this.objetsGraphiques.push(obstacle33);
        let obstacle34 = new Obstacle(1500, 675, 250, 50, "red");
        this.objetsGraphiques.push(obstacle34);
        let obstacle35 = new Obstacle(1300, 500, 250, 50, "red");
        this.objetsGraphiques.push(obstacle35);
        let obstacle36 = new Obstacle(1450, 350, 20, 150, "blue");
        this.objetsGraphiques.push(obstacle36); 

        let exitZone = new Obstacle(800, 375, 100,100, "green");
        this.objetsGraphiques.push(exitZone);

    }

    colisionNeutre(obj){
        let saut = 400;
        // Collision sur la gauche
        if(this.player.x - this.player.w * 1.9 < obj.x + obj.w && this.player.vitesseX < 0) {
            this.player.vitesseX = 0;
            this.player.x = obj.x -saut; // Le joueur est repoussé à droite de l'obstacle
        }
        // Collision sur la droite
        if(this.player.x + this.player.w / 1.15 > obj.x && this.player.vitesseX > 0) {
            this.player.vitesseX = 0;
            this.player.x = obj.x + obj.w + saut; // Le joueur est repoussé à gauche de l'obstacle
        }
        // Collision en haut
        if(this.player.y - this.player.w * 1.5 < obj.y + obj.h && this.player.vitesseY < 0) {
            this.player.vitesseY = 0;
            this.player.y = obj.y - saut; // Le joueur est repoussé en bas de l'obstacle
        }
        // Collision en bas
        if(this.player.y + this.player.h / 2 > obj.y && this.player.vitesseY > 0) {
            this.player.vitesseY = 0;
            this.player.y = obj.y + obj.h + saut; // Le joueur est repoussé au dessus de l'obstacle
        }
    }
    

    testCollisionPlayerObstacles() {
        this.objetsGraphiques.forEach(obj => {
                if(circleRectCollision(this.player.x,this.player.y,this.player.w/2,obj.x,obj.y,obj.w,obj.h) || circleRectCollision(this.player.x-this.player.w,this.player.y-this.player.w/1.15,this.player.w/2,obj.x,obj.y,obj.w,obj.h)) {
                    if (obj.couleur == "green") {
                        if(this.niveau == 4) {
                            console.log("Bravo, vous avez fini le jeu !");
                            alert("Bravo, vous avez fini le jeu !");
                            this.resetNiveau();
                        }
                        console.log("Niveau réussi !");
                        this.changeLevel(this.niveau);
                        this.niveau++;
                    }
                    if (obj.couleur == "red") {
                        
                        // collision

                        // ICI TEST BASIQUE QUI ARRETE LE JOUEUR EN CAS DE COLLIION.
                        // SI ON VOULAIT FAIRE MIEUX, ON POURRAIT PAR EXEMPLE REGARDER OU EST LE JOUEUR
                        // PAR RAPPORT A L'obstacle courant : il est à droite si son x est plus grand que le x de l'obstacle + la largeur de l'obstacle
                        // il est à gauche si son x + sa largeur est plus petit que le x de l'obstacle
                        // etc.
                        // Dans ce cas on pourrait savoir comment le joueur est entré en collision avec l'obstacle et réagir en conséquence
                        // par exemple en le repoussant dans la direction opposée à celle de l'obstacle...
                        // Là par défaut on le renvoie en x=10 y=10 et on l'arrête
                        console.log("Collision détectée !");

                        // Vérifier la direction du mouvement pour ajuster la position
                        this.player.x = this.beginX;
                        this.player.y = this.beginY;

                        this.player.vitesseX = 0;
                        this.player.vitesseY = 0;
                    }
                    if(obj.couleur == "blue") {
                        this.colisionNeutre(obj);
                    }
                }
        });
    }

}