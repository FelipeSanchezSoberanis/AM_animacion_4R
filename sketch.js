/// <reference path="TSDef/p5.global-mode.d.ts"/>

var O2, O4, A, B;           // Coordenadas de los puntos del mecanismo
var theta2, theta3, theta4; // Ángulos de las barras
var beta, delta, phi;       // Ángulos complementarios para los cálculos
var O2O4, O4B, BA, AO2;     // Longitudes de las barras
var O4A;                    // Longitud complementaria para los cálculos
var pointsA, pointsB;       // Coordenadas para trazar movimiento

function setup() {
    createCanvas(400, 400);

    // Longitudes iniciales de las barras
    O2O4 = 100;
    O4B = 150;
    BA = 150;
    AO2 = 50;

    // Inicializar arrays vacíos
    pointsA = [];
    pointsB = [];

    // Iniciar el ángulo en 0
    theta2 = 0;
}

function draw() {
    // Color de fondo
    background(255);

    // Poner el origen en el centro de la pantalla
    translate(width / 2, height / 2);

    // Cálculos complementarios para las coordenadas
    O4A = sqrt(O2O4**2 + AO2**2 - 2 * O2O4 * AO2 * cos(theta2));

    beta = asin(AO2 / O4A * sin(theta2));
    phi = acos((BA**2 + O4A**2 - O4B**2) / (2 * BA * O4A));
    delta = asin(BA / O4B * sin(phi));

    theta3 = phi - beta;
    theta4 = -(beta + delta);

    // Coordenadas de los puntos
    O2 = createVector(0, 0);
    O4 = createVector(O2.x + O2O4, O2.y);
    A = createVector(O2.x + AO2 * cos(-theta2), O2.y + AO2 * sin(-theta2));
    B = createVector(A.x + BA * cos(-theta3), A.y + BA * sin(-theta3));

    // GUardar coordenadas de las trayectorias
    if(theta2 < 2*PI) {
        append(pointsA, A);
        append(pointsB, B);
    }

    // Color y relleno de las trayectorias
    fill(139, 241, 139);
    stroke(139, 241, 139);

    // Trazar la trayectoria de A
    beginShape(LINES);
        for (var i = 0; i < pointsA.length; i++) {
            var point = pointsA[i];
            vertex(point.x, point.y);
        }
    endShape();

    // Trazar la trayectoria de B
    beginShape(LINES);
        for (var i = 0; i < pointsB.length; i++) {
            var point = pointsB[i];
            vertex(point.x, point.y);
        }
    endShape();

    // Color y relleno de las líneas que unen los puntos
    fill(255, 134, 80);
    stroke(255, 134, 80);

    // Líneas para unir los puntos
    line(O2.x, O2.y, O4.x, O4.y);
    line(O4.x, O4.y, B.x, B.y);
    line(B.x, B.y, A.x, A.y);
    line(A.x, A.y, O2.x, O2.y);

    // Color y relleno de los puntos
    fill(255, 85, 94);
    stroke(255, 85, 94);

    // Círculos en las coordenadas
    ellipse(O2.x, O2.y, 10);
    ellipse(O4.x, O4.y, 10);
    ellipse(A.x, A.y, 10);
    ellipse(B.x, B.y, 10);

    // Mover el ángulo
    theta2 += 0.01;
}