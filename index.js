var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
level = 0;

function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * (4-0));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  level++
  $("#level-title").text("Level " + level);

}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});


function playSound(name){
  var audio = new Audio('sounds/' + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
  var activeButton= $("." + currentColour).addClass("pressed");

  setTimeout(function() {
    activeButton.removeClass("pressed");
    }, 100);

}

$(document).keypress(function(){
  if (!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

function checkAnswer(currentLevel){
  if ( gamePattern[currentLevel] == userClickedPattern[currentLevel] ){
    console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

  } else {
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
      audio.play();

      var fail = $("body").addClass("game-over");

      setTimeout(function() {
        fail.removeClass("game-over");
      }, 200);

      startOver();

  };

};


function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
  $("#level-title").text("Press A Key to Start");
};
