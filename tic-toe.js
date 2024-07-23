const winPatterns = [[0, 1, 2],[0, 3, 6],[0, 4, 8],[1, 4, 7],[2, 5, 8],[2, 4, 6],[3, 4, 5],[6, 7, 8]];
var playero = true;
var count = 0;
var boxes = $(".box");
var reset = $("#reset-btn");

$(".box").on( "click" , function() {
 var clickedBox= $(this);
 var isWinner;
    if ( playero) {
        clickedBox.text("O");
        playSound();
        playero = false;
       }  
    else {
       clickedBox.text("X");
       playSound();
       playero = true;
      }
      clickedBox.prop("disabled", true);
      count++;
      console.log(count);

    var isWinner = checkWinner();
     if ( count == 9 &&  !isWinner) {
        gameDraw()
     }
    })

function gameDraw() {
    $("#msg").text("Let's Play Again");
    $(".msgbox").removeClass("hide"); 
    $(".emoji1").css("visibility", "hidden");
    $(".msg").css("letter-spacing" , "0rem");
    $(".emoji2").css("visibility", "visible");
    playSound3();
}

function playSound() {
    var audio = document.getElementById("sound");
    audio.play();
}

function playSound2() {
    var audio = document.getElementById("sound3");
    audio.play();
}

function playSound3() {
    var audio = document.getElementById("sound4");
    setTimeout ( function() {
        audio.play();
    } , 300 );
   
}

function playSound4Times() {
    var audio = document.getElementById("sound2");
    var count = 0;

    function playNext() {
        if (count < 3) {
            audio.play();
            count++;
            // setTimeout(playNext, 500);
        }
    }
    setTimeout(playNext,0.01);
    audio.addEventListener("ended", playNext);
    playNext(); // Start the first playback
}


function flash() {
    $("#new-btn").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
    $("#reset-btn").fadeIn(700).fadeOut(700).fadeIn(700).fadeOut(700).fadeIn(700);
}
const showWinner = (winner) => {
    $(".msgbox").removeClass("hide"); 
    $("#msg").text(`Congratulations, Winner is ${winner}`);
    $(".emoji1").css("visibility", "visible");
    $(".emoji2").css("visibility", "hidden");
    flash();
    playSound4Times();
    disableBoxes();
    };

function disableBoxes() {
    $(".box").prop("disabled" , true);
}

function enableBoxes() {
    $(".box").prop("disabled" , false);
    $(".box").text("");
}

function reset() {
    playero = true;
    count=0;
    enableBoxes();
    $(".msgbox").addClass("hide");
   
}

function checkWinner() {
    for ( let pattern of winPatterns) {
        var pos1Val = $(".box")[pattern[0]].innerText; 
        var pos2Val = $(".box")[pattern[1]].innerText;
        var pos3Val = $(".box")[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
              if (pos1Val === pos2Val && pos2Val === pos3Val) {
              showWinner(pos1Val);
               animate();
             }
       }
    }
}

$('#new-btn').on("click", function reset() {
    playSound2();
    playero = true;
    count=0;
    enableBoxes();
    $(".msgbox").addClass("hide");

});

$("#reset-btn").on("click", function reset() {
    playSound2();
    playero = true;
    count=0;
    enableBoxes();
    $(".msgbox").addClass("hide");
});

// function animate() {
// document.querySelectorAll('.emoji').forEach(function(emoji) {
//     emoji.classList.add('animate');
// })
// };
