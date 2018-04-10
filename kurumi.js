window.setInterval(myCallback, 1000);
function myCallback() {
  kurumiChwaaaan();
}
let images=[]
let path="images/tokisaki_kurumi_";
let files=[];
for(let i=1;i<8;i++){
	files.push(i+'.jpg');
}

function kurumiChwaaaan(){
	let tmp=document.getElementsByTagName('img');
	for(let image of tmp){
		if(images.indexOf(image)==-1){
			images.push(image);
			let index = Math.floor(Math.random()*files.length);
			image.src = browser.extension.getURL(path+files[index]);
		}
	}
}
kurumiChwaaaan();