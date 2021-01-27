
// gloabl variables
let socket = io.connect('/');
let fullname = '<%=profile.fullname%>';
let currect_question_id = 0;
let gamepin = 0;
let index = 0;
let resp_sent = false;
let timer_done = false;
let server_is_submitted = undefined;
let userid = '<%=profile.userid%>';

let joined = false;
socket.on('connect', () => {
    console.log('connected to server');
});

socket.emit('whoami', function (message) {
    console.log(message);
});

async function onhandlesubmit(e) {
    e.preventDefault();
    gamepin = document.getElementById('gamepin').value;
    console.log(gamepin);
    socket.emit('join', { roompin: gamepin, username: fullname }, (response) => {
        console.log(response);
    });
}

socket.on('newMessage', function (message) {
    console.log(message);
});
/* ready in 5seconds event */
socket.on('ready_in_5', function (ready) {
    ready_in_5sec(ready);
});

socket.on('player_joined', function (player, playersInfo) {
    if (joined) {
        new_player_joined(player);
    } else {
        renderlist(playersInfo);
        joined = true;
    }

    console.log(player);
});
socket.on('questions', function (question) {
    resp_sent = false;
    loadQuestion(question);
});
socket.on('roomUsers', function (message) {
    console.log('roomUsers', message);
});
socket.on('leaderboard', function ({ leaderBoardArray }) {
    console.log('this is leader board', leaderBoardArray);
    if (server_is_submitted == undefined) {
        leaderboard(leaderBoardArray);
    } else {
        response_status(); //nodal co
        leaderboard(leaderBoardArray);
    }
});
socket.on('timer', function (counter) {
    if (counter == 0) {
        timer_done = true;
    }
    update_timer(counter);
});
socket.on('nextQuestion', function (message) {
    console.log('timer', message);
});

socket.on('disconnect', function () {
    // console.log("disconnected from server");
});

function new_player_joined(player) {
    $('#pin').hide();
    $('#player_waiting_room').show();
    var player_list = $('#player_waiting_room').children();
    var newPlayer = $('#player').clone();
    var name = newPlayer.children().children('.card-body').children();
    console.log(name);
    name.html(player.player_name);
    player_list.append(newPlayer);
}

function renderlist(playersInfo) {
    $('#pin').hide();
    $('#player_waiting_room').show();
    for (let i = 0; i < playersInfo.length; i++) {
        console.log(playersInfo[i]);
        let player_list = $('#player_waiting_room').children();
        let newPlayer = $('#player').clone();
        let name = newPlayer.children().children('.card-body').children();
        name.html(playersInfo[i]);
        player_list.append(newPlayer);
    }
}

function loadpage() {
    $('#questions').hide();
    $('#player_waiting_room').hide();
    $('#leaderboard').hide();
    $('#spinner').hide();
}

function loadQuestion({ question }) {
    $('#player_waiting_room').hide();
    console.log('options array', question.options);
    currect_question_id = question.question_id;

    $('#question').html(question.question_statement); //statement
    $('#1').attr('class', 'alert alert-primary');
    $('#1').html(question.options[0].option_statement); //options
    $('#1').attr('value', question.options[0].option_id);

    $('#2').attr('class', 'alert alert-primary');
    $('#2').html(question.options[1].option_statement);
    $('#2').attr('value', question.options[1].option_id);

    $('#3').attr('class', 'alert alert-primary');
    $('#3').html(question.options[2].option_statement);
    $('#3').attr('value', question.options[2].option_id);

    $('#4').attr('class', 'alert alert-primary');
    $('#4').html(question.options[3].option_statement);
    $('#4').attr('value', question.options[3].option_id);
    $('#questions').show();
}

function update_timer(counter) {
    $('#timer').html(counter);
}

function convertSeconds(s) {
    var hour = Math.floor(s / 3600);
    var minute = Math.floor(s / 60);
    var second = s % 60;
    return (
        minute.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) +
        ':' +
        second.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    );
}

function ready_in_5sec(ready) {
    $('#exampleModalLabel').html(ready);
    let counter = 4;
    $('#modal_open').click();
    let interval = setInterval(() => {
        $('#temp_timer').html(counter);
        if (counter < 0) {
            clearInterval(interval);
            $('#modal_close').click();
        }
        counter--;
    }, 900);
}

function handleClick(e) {
    if (resp_sent == false) {
        console.log(e.target);
        console.log(e, e.value);
        e.setAttribute('class', 'alert alert-success bg-primary');
        var statement = $(e).html();
        var resp_id = e.getAttribute('value');
        console.log(resp_id);
        var timer = $('#timer').html();
        let response = {
            option_id: resp_id,
            timer: timer,
            question_id: currect_question_id,
            roompin: gamepin,
            responseStatement: statement,
        };
        setTimeout(() => {
            $('#questions').hide();
            $('#leaderboard').hide();
            $('#spinner').show();
            socket.emit('response', response, (callback) => {
                server_is_submitted = callback;
                resp_sent = true;
            });
        }, 1000);

        console.log($(e).html());
    }
}

function response_status() {
    $('#questions').css('display', 'none');
    $('#timer').html('good');
    let msg = '';
    if (server_is_submitted.status && server_is_submitted.is_correct) {
        msg = 'congrats your answer is correct';
    } else if (server_is_submitted.status && server_is_submitted.is_correct === false) {
        msg = 'sorry your answer is incorrect better luck next time';
    } else if (server_is_submitted.status === false) {
        msg = "Time's up try harder and in time respose";
    }
    $('#exampleModalLabel').html(msg);
    $('#modal_open').click();
    setTimeout(() => {
        $('#modal_close').click();
    }, 2000);
}

function leaderboard(leader_array) {
    $('#spinner').hide();
    let list = $('#list');
    list.children('#dummy_list').children().remove();
    let dlist = $('#dummy_list');

    for (let i = 0; i < leader_array.length; i++) {
        if (userid == leader_array[i].player_id) {
            $('#myrank').html(i + 1);
            $('#myname').html(leader_array[i].player_name);
            $('#mymarks').html(leader_array[i].totalMarks);
        }
        let position = $('#rank_box').clone();
        position.css('display', 'block');
        position.children('#rank').html(i + 1);
        position.children('#player_name').html(leader_array[i].player_name);
        position.children('#totalMarks').html(leader_array[i].totalMarks);

        dlist.append(position);
    }
    $('#leaderboard').css('display', 'block');
    server_is_submitted = {};
}
