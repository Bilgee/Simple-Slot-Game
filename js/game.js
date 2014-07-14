var IMAGE_WIDTH = 80;
var IMAGE_TOP_MARGIN = 3;
var IMAGE_BOTTOM_MARGIN = 3;
var IMAGE_NUM = 5;
var DRAW_OFFSET = 45;
var W = 110;
var H = 800;
var POSITION_Y = [];
var IMAGE_FRAME_WIDTH = 10;
var SPEED_Y = 10;

function gameRun() {

    var game = new Game();
    var user = new User();
    user.first_time = true;



    loadBet( user, game );

    var items = [
        {id: 'pic1'},
        {id: 'pic2'},
        {id: 'pic3'},
        {id: 'pic4'},
        {id: 'pic5'}
    ];

    var startButton = document.getElementById("start");

    startButton.addEventListener("click", restart, false);


    function restart() {
        if(user.bet_money_element.value > 0){
            startButton.disabled = true;
            game.slot1_running = true;
            game.slot2_running = true;
            game.slot3_running = true;
            
            update();
        }
    }

//    var canvas4 = document.getElementById("canvas4");
//    var ctx = canvas4.getContext('2d');
//    ctx.beginPath();
//    ctx.moveTo(0, 200);
//    ctx.lineTo(100, 200);
//    ctx.lineWidth = 5;
//    ctx.strokeStyle = '#ff0000';
//    ctx.stroke();
//    ctx.closePath();
//
//    ctx.beginPath();
//    ctx.moveTo(0, 300);
//    ctx.lineTo(100, 300);
//    ctx.lineWidth = 5;
//    ctx.strokeStyle = '#000000';
//    ctx.stroke();
//
//    ctx.moveTo(0, 400);
//    ctx.lineTo(100, 400);
//    ctx.lineWidth = 5;
//    ctx.stroke();

    update();
    //画像読み込み
    function update() {


        preloadImages(items, function() {
            // 画像の読み込みが終わったら、canvas上に画像を描画

            function clearCanvas(canvas) {
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            // 配列をシャッフルし、描画する
            game.items1 = copyArray(items);
            game.item1_positionY = copyArray(POSITION_Y);
            shuffleArray(game.items1);
            clearCanvas(game.canvas1);
            rolling(game.canvas1, game.items1, game.item1_positionY, game.slot1_running, "stop1", game.slot1_id, game.item1_minY, game.item1_offsetY);


            game.items2 = copyArray(items);
            game.item2_positionY = copyArray(POSITION_Y);
            shuffleArray(game.items2);
            clearCanvas(game.canvas2);
            rolling(game.canvas2, game.items2, game.item2_positionY, game.slot2_running, "stop2", game.slot2_id, game.item2_minY, game.item2_offsetY);

            game.items3 = copyArray(items);
            game.item3_positionY = copyArray(POSITION_Y);
            shuffleArray(game.items3);
            clearCanvas(game.canvas3);
            rolling(game.canvas3, game.items3, game.item3_positionY, game.slot3_running && game.slot3_running && game.slot3_running, "stop3", game.slot3_id, game.item3_minY, game.item3_offsetY);

            function rolling(canvas, items, positionY, running, button_id, slot_id, minY, offsetY) {
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = '#ddd';
                //var minY = 800;s
                
                //var offsetY = 0;
                var button = document.getElementById(button_id);
                //button.addEventListener("click", stop_click, false);


                loop();
                function loop() {
                    button.addEventListener("click", stop_click, false);
                    function stop_click() {
                        running = false;
                    }

                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    for (var i = 0; i < items.length; i++) {
                        if (!running && positionY[i] >= ((IMAGE_WIDTH + IMAGE_FRAME_WIDTH) * (-0.1)) && positionY[i] <= ((IMAGE_WIDTH + IMAGE_FRAME_WIDTH) * 1.1)) {
                            //alert(items[i].id);

                            slot_id = items[i].id;
                            //offsetY = (IMAGE_WIDTH * 2) - positionY[i];
                            var tmp = i;
                            var myarray = [];
                            var array = [];

                            switch (tmp) {
                                case 2:
                                    //alert(slot_id);
                                    myarray = [1, 2, 3, 4, 0 ];
                                    break;
                                case 1:
                                    //alert(slot_id);
                                    myarray = [0, 1, 2, 3, 4];
                                    break;

                                case 0:
                                    //alert(slot_id);
                                    myarray = [4, 0, 1, 2, 3];
                                    break;
                                case 4:
                                    //alert(slot_id);
                                    myarray = [3, 4, 0, 1, 2];
                                    break;
                                case 3:
                                    //alert(slot_id);
                                    myarray = [2, 3, 4, 0, 1];
                                    break;
                            }
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            for (var i = 0; i < items.length; i++) {
                                var asset = items[ myarray[i] ];
                                positionY[i] = i * (IMAGE_WIDTH + IMAGE_FRAME_WIDTH * 2);

                                ctx.drawImage(asset.img, IMAGE_FRAME_WIDTH, positionY[i] + IMAGE_FRAME_WIDTH, IMAGE_WIDTH, IMAGE_WIDTH);

                                drawLine(ctx, positionY[i], (IMAGE_WIDTH + IMAGE_FRAME_WIDTH*3));
                            }
                            //alert(positionY[0] + " " + positionY[1] + " " + positionY[2]);
                        }
                        else {
                            if (positionY[i] < ((IMAGE_WIDTH + IMAGE_FRAME_WIDTH * 2) * 4)) {
                                positionY[i] += SPEED_Y;

                                //hamgiin deed taliin zahiin Y coordinate
                                if (minY > positionY[i]) {
                                    minY = positionY[i];
                                }
                            } else {
                                positionY[i] = minY;
                            }
                            var asset = items[i];
                            //ctx.save();
                            //draw images
                            ctx.drawImage(asset.img, IMAGE_FRAME_WIDTH, positionY[i] + IMAGE_FRAME_WIDTH, IMAGE_WIDTH, IMAGE_WIDTH);
                            drawLine(ctx, positionY[i], (IMAGE_WIDTH + IMAGE_FRAME_WIDTH * 3));
                            //ctx.restore(); 
                        }
                    }

                    if (running) {
                        //offsetY = 0;
                        requestAnimFrame(function() {
                            loop();
                        });
                    } else {

                        //ali slot iin ali item?
                        switch (button_id) {
                            case "stop1":
                                //alert(slot_id);
                                game.slot1_id = slot_id;
                                game.slot1_running = false;
                                break;
                            case "stop2":
                                //alert(slot_id);
                                game.slot2_id = slot_id;
                                game.slot2_running = false;
                                break;

                            case "stop3":
                                //alert(slot_id);
                                game.slot3_id = slot_id;
                                game.slot3_running = false;
                                break;
                            default:
                                alert("ERROR");
                                break;
                        }
                        //bugd zogsson bol
                        if (game.slot1_id != null && game.slot2_id != null && game.slot3_id != null && user.first_time == false) {

                           if(game.slot1_running == false && game.slot2_running == false && game.slot3_running == false){

                            //alert("YEAH");
                            if (game.slot1_id == game.slot2_id && game.slot1_id == game.slot3_id) {
                                alert("You won");
                                game.slot1_id = null; 
                                game.slot2_id = null; 
                                game.slot3_id = null;
                                //if(game.slot1_running == false && game.slot2_running == false && game.slot3_running == false){
                                    startButton.disabled = false;
                                
                                    user.win_money = user.bet_money * 3;
                                    user.bet_money = 0;
                                    user.bet_money_element.value = user.bet_money;
                                    user.win_money_element.value = user.win_money;
                                    user.current_money = user.current_money + user.win_money;
                                    user.current_money_element.value = user.current_money ;
                                //}
                            } else {
                                game.slot1_id = null; 
                                game.slot2_id = null; 
                                game.slot3_id = null;
                                //if(game.slot1_running == false && game.slot2_running == false && game.slot3_running == false){
                                    startButton.disabled = false;
                                
                                

                                //user.current_money = user.current_money - user.bet_money;
                                    user.current_money_element.value = user.current_money_element.value;
                                    user.current_money = user.current_money_element.value;
                                    user.win_money = 0;
                                    user.win_money_element.value = user.win_money;
                                    user.bet_money = 0;

                                    user.bet_money_element.value = user.bet_money;
                                //}
                                //alert("You lose");
                                if ( user.current_money <= 0 && !game.slot1_running && !game.slot2_running && !game.slot3_running) {
                                    document.getElementById("title").innerHTML = "GAME OVER";
                                }
                            }
                           }
                        }
                    }
                }
            }

        });
    }
}

function Game() {
    this.canvas1 = document.getElementById('canvas1');
    this.canvas2 = document.getElementById('canvas2');
    this.canvas3 = document.getElementById('canvas3');

    

    this.item1_positionY = [];
    this.item2_positionY = [];
    this.item3_positionY = [];

    this.slot1_running = false;
    this.slot2_running = false;
    this.slot3_running = false;

    this.item1_minY = 800;
    this.item2_minY = 800;
    this.item3_minY = 800;


    this.item1_offsetY = 0;
    this.item2_offsetY = 0;
    this.item3_offsetY = 0;

    this.slot1_id = null;
    this.slot2_id = null;
    this.slot3_id = null;

}


function preloadImages(images, callback) {
    images.forEach(function(asset) {
        preload(asset);
    });
    var loadImages = 0;
    function preload(asset) {
        asset.img = new Image();
        asset.img.src = 'img/' + asset.id + '.png';

        asset.img.onload = function() {
            POSITION_Y[loadImages] = loadImages * (IMAGE_WIDTH + IMAGE_FRAME_WIDTH * 2) - (IMAGE_WIDTH + IMAGE_FRAME_WIDTH * 2);
            loadImages++;
            if (images.length == loadImages) {
                //alert(positionY[2]);
                return callback();
            }
        };
    }
}

function drawLine(ctx, positionY, width) {
    ctx.beginPath();
    ctx.moveTo(0, positionY);
    ctx.lineTo(width, positionY);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#ddd';
    ctx.stroke();


}

function copyArray(array) {
    var copy = [];
    for (var i = 0; i < array.length; i++) {
        copy.push(array[i]);
    }
    return copy;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var r = parseInt(Math.floor(i * Math.random()));
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
}

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
})();


function User() {
    this.first_time = true;
    this.current_money = 30;
    this.bet_money = 0;
    this.win_money = 0;

    this.increaseButton =       document.getElementById("increase");
    this.decreaseButton =       document.getElementById("decrease");
    this.startButton =          document.getElementById("start");

    this.current_money_element =    document.getElementById("current_money");
    this.bet_money_element =        document.getElementById("bet_money");
    this.win_money_element =        document.getElementById("win_money");
}
;

function loadBet(user, game) {
    
    user.increaseButton.addEventListener("click", function() {
        increaseBet(user, game)
    }, false);
    user.decreaseButton.addEventListener("click", function() {
        decreaseBet(user, game)
    }, false);
}
;

function increaseBet(user, game) {
    if(game.slot1_running == false && game.slot2_running == false && game.slot3_running == false){
        if (user.bet_money >= 0 && user.bet_money < 10 && user.current_money > 0) {
            //alert("increase");
            user.first_time = false;
            user.startButton.disabled = false;
            user.bet_money += 2;
            user.current_money -= 2;
            user.bet_money_element.value = user.bet_money;
            user.current_money_element.value = user.current_money;
            
        }
    }
//else{
//        user.increaseButton.disabled = true;
//   }        
}
;

function decreaseBet(user,game) {
    if(game.slot1_running == false && game.slot2_running == false && game.slot3_running == false){
    //alert(user.current_money);
        if (user.bet_money > 2) {
            user.bet_money -= 2;
            //user.current_money += 2;
            user.bet_money_element.value = user.bet_money;
            user.current_money += 2;
            user.current_money_element.value = user.current_money;
        }
    }
}
;



