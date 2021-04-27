/// <reference path="TSDef/p5.global-mode.d.ts"/>

var O2, O4, A, B, pextra;      // Coordenadas de los puntos del mecanismo
var theta2, theta3, theta4;    // Ángulos de las barras
var beta, delta, phi;          // Ángulos complementarios para los cálculos
var O2O4, O4B, BA, AO2, extra; // Longitudes de las barras
var O4A;                       // Longitud complementaria para los cálculos
var pointsA, pointsExtra;      // Coordenadas para trazar movimiento
var step;                      // Valor del step del ángulo
var omega2, omega3, omega4;    // Velocidades de las barras
var omega3length;

function setup() {
	createCanvas(400, 500);

	// Step del ángulo
	step = 0.01;

	// Longitudes iniciales de las barras
	O2O4 = 100;
	O4B = 150;
	BA = 150;
	AO2 = 50;
	extra = 140;

	// Inicializar arrays vacíos
	pointsA = [];
	pointsExtra = [];

	// Iniciar el ángulo en 0
	theta2 = 0;

	// Velocidad constante
	omega2 = step / (1 / 60);
}

function draw() {
	// Color de fondo
	background(0);

	// Poner el origen en el centro de la pantalla
	translate(width / 2 - 100, height / 2 + 50);

	// Cálculos complementarios para las coordenadas
	O4A = sqrt(O2O4**2 + AO2**2 - 2 * O2O4 * AO2 * cos(theta2));

	beta = asin(AO2 / O4A * sin(theta2));
	phi = acos((BA**2 + O4A**2 - O4B**2) / (2 * BA * O4A));
	delta = asin(BA / O4B * sin(phi));

	theta3 = phi - beta;
	theta4 = -(beta + delta);

	// Valores de las velocidades
	omega3 = abs((AO2 * omega2 * sin(theta4 - theta2)) / (BA * sin(theta3 - theta4)));
	omega4 = abs((AO2 * omega2 * sin(theta3 - theta2)) / (O4B * sin(theta3 - theta4)));

	// Valores de la longitud de las barras de velocidad
	omega3length = map(omega3, 0, 0.7, 0, 250);
	omega4length = map(omega4, 0, 0.7, 0, 250);

	// Coordenadas de los puntos
	O2 = createVector(0, 0);
	O4 = createVector(O2.x + O2O4, O2.y);
	A = createVector(O2.x + AO2 * cos(-theta2), O2.y + AO2 * sin(-theta2));
	B = createVector(A.x + BA * cos(-theta3), A.y + BA * sin(-theta3));
	pextra = createVector(B.x + extra * cos(-theta3), B.y + extra * sin(-theta3));

	// GUardar coordenadas de las trayectorias
	if(theta2 < 2*PI) {
		append(pointsA, A);
		append(pointsExtra, pextra);
	}

	// Color y relleno de la trayectoria de A
	noFill();
	stroke(255);

	// Trazar la trayectoria de A
	beginShape();
		for (var i = 0; i < pointsA.length; i++) {
			var point = pointsA[i];
			vertex(point.x, point.y);
		}
	endShape();

	// Color y relleno de la trayectoria de extra
	noFill();
	stroke(255);

	// Trazar la trayectoria de extra
	beginShape();
		for (var i = 0; i < pointsExtra.length; i++) {
			var point = pointsExtra[i];
			vertex(point.x, point.y);
		}
	endShape();

	// Color y relleno de las líneas que unen los puntos
	fill(255);
	stroke(255);

	// Líneas para unir los puntos
	line(O2.x, O2.y, O4.x, O4.y);
	line(O4.x, O4.y, B.x, B.y);
	line(B.x, B.y, A.x, A.y);
	line(A.x, A.y, O2.x, O2.y);
	line(B.x, B.y, pextra.x, pextra.y);

	// Color y relleno de los puntos
	fill(255);
	stroke(255);

	// Círculos en las coordenadas
	ellipse(O2.x, O2.y, 10);
	ellipse(O4.x, O4.y, 10);
	ellipse(A.x, A.y, 10);
	ellipse(B.x, B.y, 10);
	ellipse(pextra.x, pextra.y, 10);

	// Acomodar para poder poner las líneas de velocidades
	translate(-width / 2 + 100, 100);

	// Lineas de velocidades
	line(50, 0, 350, 0);
	line(50, 50, 350, 50);

	// Líneas gordas de las barras
	strokeWeight(4);
	line(50, 0, 50 + omega3length, 0);
	line(50, 50, 50 + omega4length, 50);
	strokeWeight(1);

	// Texto de la barra de omega3
	text("ω3", 20, 3);          // Omega3
	text("0 rad/s", 30, 20);    // Min
	text("0.7 rad/s", 325, 20); // Max

	// Texto de la barra de omega4
	text("ω4", 20, 53);         // Omega4
	text("0 rad/s", 30, 70);    // Min
	text("0.7 rad/s", 325, 70); // Max

	// Mover el ángulo
	theta2 += step;
}