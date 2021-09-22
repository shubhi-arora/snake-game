var board_border='black';
var board_background='#150485';
var snake_color="#FF4301";
var snake_border="purple";
var snake=[{x:200,y:200},{x:190,y:200},{x:180,y:200},{x:170,y:200},{x:160,y:200}];
var dx=10;
var dy=0;
var score=0;

// var snakeboard=$("#canvas")
// var ctx=snakeboard[0].getContext("2d");
// ctx.fillStyle=board_background;
// ctx.strokeStyle=board_border;
// ctx.fillRect(0,0,snakeboard[0].width,snakeboard[0].height);
// ctx.strokeRect(0,0,snakeboard[0].width,snakeboard[0].height);
var snakeboard=document.getElementById("canvas");
var ctx=snakeboard.getContext("2d");
var food_x;
var food_y;
clearCanvas();
drawSnake();
gen_food();
draw_food();
var started=0;
var level=1;
// $(document).keypress(function(){
//   if(!started)
//   {
//     main();
//     started=1;
//   }
// });
$(".btn-success").click(function(){
if(!started)
{
  $("h1").text("Level:"+level);
      main();
      started=1;
}

});


$(".btn-primary").click(function(){
window.location.reload();
});


$(document).keydown(function(e){
  changedirection(e);
});
function main(){

if(game_ended())
{
 $("h1").text("GAME OVER! PRESS RESTART");
return;
}


//changing_dir=false;
  setTimeout(function(){
    clearCanvas();
    drawSnake();
    movesnake();
    draw_food();
    main();
  },100);

}


function clearCanvas(){
  ctx.fillStyle=board_background;
  ctx.strokeStyle=board_border;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.strokeRect(0,0,canvas.width,canvas.height);
}
function drawSnake(){
  snake.forEach(drawsnakepart);
}
function drawsnakepart(snakepart){
  ctx.fillStyle=snake_color;
  ctx.strokestyle=snake_border;
  ctx.fillRect(snakepart.x,snakepart.y,10,10);
  ctx.strokeRect(snakepart.x,snakepart.y,10,10);
}

//*****************move snake***********************
function movesnake(){

  const head={x:snake[0].x+dx,y:snake[0].y+dy};
  snake.unshift(head);
  if(snake[0].x===food_x && snake[0].y===food_y)
  {
    level++;
    score+=5;
    $("h3").text("Score:"+score);
    $("h1").text("Level:"+level);
    sound_play();
    gen_food();
}
  else
  snake.pop();

}

//********************************
function changedirection(event){
  // if(changing_dir)
  // return;
  // changing_dir=true;
  var goingleft=dx=== -10;
  var goingup=dy=== -10;
  var goingright=dx===10;
  var goingdown=dy===10;
  var k=event.keyCode;
  switch(k){
    case 37: if(!goingright)
              {dx=-10;
              dy=0;}
              break;
   case 38: if(!goingdown)
             {dx=0;
             dy=-10;}
             break;
   case 39: if(!goingleft)
            {dx=10;
            dy=0;}
            break;
   case 40: if(!goingup)
           {dx=0;
           dy=10;}
           break;
  }

  }

  function rand_food(min,max){
    var food_loc=Math.floor((Math.random()*((max-min)+min)/10))*10;
    return food_loc;
  }
  function gen_food()
  {
    food_x=rand_food(0,snakeboard.width-10);
    food_y=rand_food(0,snakeboard.height-10);
    snake.forEach(function(part){
      if(part.x===food_x && part.y===food_y)
      {
        gen_food();
      }
    });
  }
  function draw_food(){

    ctx.fillStyle='yellow';
    ctx.fillRect(food_x,food_y,10,10);
  }
  function game_ended(){
    for(var i=4;i<snake.length;i++)
    {
      if(snake[0].x===snake[i].x && snake[0].y===snake[i].y)
      {

        makesound_over();
        $("body").addClass("game-over");
        $("body").fadeIn(100).fadeOut(100).fadeIn(100);
        setTimeout(function(){
        $("body").removeClass("game-over");
        },1000);
        return true;
      }

    }
    var hitleft=snake[0].x<0;
    var hitright=snake[0].x > snakeboard.width-10;
    var hittop=snake[0].y<0;
    var hitdown=snake[0].y > snakeboard.height-10;
    if(hitleft||hitright||hittop||hitdown)
    {
       makesound_over();
       $("body").addClass("game-over");
       $("body").fadeIn(100).fadeOut(100).fadeIn(100);
       setTimeout(function(){
         $("body").removeClass("game-over");
       },1000);

      return true;
    }

    //return hitleft||hitright||hittop||hitdown;
  }
  function makesound_over(){
    var audio=new Audio("gameover.wav");
    audio.play();

    // // Show loading animation.
    //   var playPromise = audio.play();
    //
    //   if (playPromise !== undefined) {
    //     playPromise.then(_ => {
    //       // Automatic playback started!
    //       // Show playing UI.
    //     })
    //     .catch(error => {
    //       // Auto-play was prevented
    //       // Show paused UI.
    //     });
    //   }
    //



  }
  function sound_play(){
    var audio1=new Audio("click-sound.wav");
    audio1.play();
  }
