var rwx=0;
var lwx=0;
var rwy=0;
var lwy=0;
var srw=0;
var slw=0;

function preload(){
song=loadSound("music.mp3");
}
function setup(){
 canvas=createCanvas(650,500);
 canvas.center();
 video=createCapture(VIDEO);
 video.hide();
 x=ml5.poseNet(video,mpl);
 x.on('pose',pd);
}
function mpl(){
    console.log("poseNet is intialized");
}
function pd(result){
 if(result.length>0){
console.log(result);
srw=result[0].pose.keypoints[9].score;
slw=result[0].pose.keypoints[10].score;
console.log("score of right wrist is ",srw);
console.log("the score of left wrist is ",slw);
lwx=result[0].pose.leftWrist.x;
rwx=result[0].pose.rightWrist.x;
lwy=result[0].pose.leftWrist.y;
rwy=result[0].pose.rightWrist.y;
console.log(lwx);
console.log(rwx);
console.log(lwy);
console.log(rwy);
 }
}
function draw(){
    image(video,0,0,650,500);
    fill("red");
    stroke("black");
 if(srw>0.2){
    circle(rwx,rwy,20);

if(rwy>0 && rwy<=100){
    song.rate(0.5);
    document.getElementById("speed").innerHTML="Speed = 0.5x";
}
else if(rwy>100 && rwy<=200){
song.rate(1);
document.getElementById("speed").innerHTML="Speed = 1x";
}
else if(rwy>200 && rwy<=300){
song.rate(1.5);
document.getElementById("speed").innerHTML="Speed = 1.5x";
}
else if(rwy>300 && rwy<=400){
    song.rate(2);
    document.getElementById("speed").innerHTML="Speed = 2x";
    }
    else if(rwy>400){
        song.rate(2.5);
        document.getElementById("speed").innerHTML="Speed = 2.5x";
    }
    }
    if(slw>0.2){
circle(lwx,lwy,20);
n1=Number(lwy);
j=floor(n1);
d=j/500;
song.setVolume(d);
document.getElementById("volume").innerHTML="Volume = "+d;
    }
}
function p(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}