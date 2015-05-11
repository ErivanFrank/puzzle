var numImage = 0;
var soucers = [];
var efs = [];		// easing functions

function areaCanvas() {
	// body...
	//canvas = document.getElementById("myCanvas");
	//ctx = canvas.getContext("2d");
	var imageLoader = document.getElementById('imageLoader');
	imageLoader.addEventListener('change', handleImage, false);
}

function copy() {

	var tileWidth = 600;
	var tileHeight = 400;
	var col = 600 / 6;
	var lin = 400 / 5;

	for (var i = 0; i < tileHeight; i += lin) {
		
		for (var j = 0; j < tileWidth; j += col) {
			
			var canvasRececorte = document.createElement('canvas'); 
			var ctxRecorte = canvasRececorte.getContext('2d');			
			canvasRececorte.width = col;
			canvasRececorte.height = lin;		
			var divCopy = document.createElement('div');
			divCopy.setAttribute('class', 'divNova');
			divCopy.style.left =  Math.random()* 400 +'px';
			divCopy.style.top =   Math.random()* 300 +'px';			
			var imgData = ctx.getImageData(j, i, col, lin);
			ctxRecorte.putImageData(imgData, 0, 0);			
			$(divCopy).append(canvasRececorte);
			$('#content').append(divCopy);	

			onMD(divCopy);

			$(function() {

   				 $( divCopy ).draggable({ cursor: "move", cursorAt: { top: 30, left: 30 } });

 			});
 			
		};
	};

	ctx.clearRect(0,0,600,400);	
	desenharLinhas(col, lin, tileWidth, tileHeight);
}


function handleImage(e){

	var reader = new FileReader();

	reader.onload = function(event){

		var img = new Image();
		img.onload = function(){

			img.w = img.width;
			img.h = img.height;
			desenharImagem(img, img.w, img.h);			
		}

		img.src = event.target.result;
		
	}

	reader.readAsDataURL(e.target.files[0]);
}


function desenharImagem (value, largura, altura) {

	// body...	
	var canvas = document.createElement('canvas');
	ctx = canvas.getContext("2d");	
	canvas.setAttribute('class', 'myCanvas')
	canvas.width = 600;
	canvas.height = 400;	
 	$('#content').append(canvas);

	ctx.clearRect(0,0, 600, 400);					
	ctx.drawImage(value, 0, 0, 600, 400);

}


function desenharLinhas (col, lin, tileWidth, tileHeight) {

// body...
	var linha  = lin;
	var coluna = col;	
	for (var i = 0; i < tileHeight; i += linha) {
		
		for (var j = 0; j < tileWidth; j += coluna) {

			ctx.rect(j,i, coluna, linha);
			ctx.strokeStyle='#f00'
			ctx.stroke();	

		};
	};
}


function onMD(div)
{
   var sw = -100;
   var sh = -100;
   var r = Math.random;
   var ef = efs[Math.floor(r()*40)];

   //for(var i=0; i<balls.length; i++)
        Tweener.addTween(div, {x:r()*sw, y:r()*sh, transition:ef, time:1});
}