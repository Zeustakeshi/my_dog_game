const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvasWidth = (canvas.width = 1000);
const canvasHeight = (canvas.height = 600);

ctx.fillStyle = "red";

ctx.fillRect(canvasWidth / 2, canvasHeight / 2, 100, 100);
