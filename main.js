sound1 = "";
sound2 = "";
leftwristX = "";
rightwristX = "";
leftwristY = "";
rightwristY = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
status1 = 0;
status2 = 0;
song = "";

function preload() {
    sound1 = loadSound("music.mp3");
    sound2 = loadSound("music1.mp3")
}

function setup() {
    canvas = createCanvas(600, 450);
    canvas.position(500, 200);
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 450);
    fill("cyan");
    stroke("lime");
    status1 = sound1.isPlaying()
    status2 = sound2.isPlaying()
    if (scoreLeftWrist > 0.2) {
        circle(leftwristX, leftwristY, 30);
        sound2.stop()
        if (status1 == false) {
            sound1.play()
            document.getElementById("songPlaying").innerHTML = "Song = See You Again"
        }
    }
    if (scoreRightWrist > 0.2) {
        circle(rightwristX, rightwristY, 30);
        sound1.stop()
        if (status1 == false) {
            sound2.play()
            document.getElementById("songPlaying").innerHTML = "Song = Blue (Da Ba Dee)"
        }
    }
    //if (scoreLeftWrist > 0.2) {
    //inNumberLeftWristY = Number(leftwristY);
    //removeDecimals = floor(inNumberLeftWristY);
    //volume = removeDecimals / 500;
    //document.getElementById("volume").innerHTML = "VOLUME = " + volume;
    //sound.setVolume(volume);
    //}
}

function gotPoses(results) {
    if (results.length > 0) {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log(results);
        console.log("The X for Left is: " + leftwristX + ", The Y for Left is: " + leftwristY + ", The X for right is: " + rightwristX + " and the Y of right is: " + rightwristY);
        console.log(scoreLeftWrist);
        console.log(scoreRightWrist);
    }
}

//function play() {
//    sound1.play();
//}

function modelLoaded() {
    console.log("The Model is Loaded");
}