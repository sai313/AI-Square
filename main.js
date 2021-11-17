nose_x = 0;
nose_y = 0;
difference = 0;
left_wrist_x = 0;
right_wrist_x = 0;

function setup() {
    Video = createCapture(VIDEO);
    Video.size(550,500);
    canvas= createCanvas(550,550);
    canvas.position(560,150);
    poseNet = ml5.poseNet(Video,modelLoaded);
    //Switching on PoseNet
    poseNet.on("pose",gotPoses);
}

function modelLoaded() {
    console.log("PoseNet has started");
}

function gotPoses(results) {
    if (results.length>0) {
        console.log(results);
        nose_x = results[0].pose.nose.x;
        nose_y = results[0].pose.nose.y;
        console.log("Nose x = "+nose_x+", Nose y = "+nose_y);
        left_wrist_x = results[0].pose.leftWrist.x;
        right_wrist_x = results[0].pose.rightWrist.x;
        difference = floor(left_wrist_x-right_wrist_x);
    }
}

function draw() {
    background("#F5F8DE");
    document.getElementById("square_side").innerHTML = "Width and height of the Square will be = "+difference+"px";
    fill("#e2856e");
    stroke("#e2856e");
    square(nose_x,nose_y,difference);
}