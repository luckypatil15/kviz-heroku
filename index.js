//require all modules

require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;
var cors = require('cors');
const path = require('path');
var bodyParser = require('body-parser');
var uniqid = require('uniqid');
var session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var multer = require('multer');
const exportUsersToExcel = require('./models1/exportService');
const helpers = require('./controllers/helpers')
const storage = require('./controllers/storageImg')
let upload = multer({ storage: storage, fileFilter: helpers.imageFilter });

//require js file from other folders to use their function

const { deserializeUserCallback } = require('./controllers/deserializeUserController.js');
const { serializeUserCallback } = require('./controllers/serializeUserController.js');
const { LocalStrategyCallback } = require('./controllers/LocalStrategyController.js');
const { GoogleStrategyCallback } = require('./controllers/GoogleStrategyController.js');
const homePageRouter = require('./routes/homePageRoute');
const SignupRouter = require('./routes/signupRoute');
const verifyemailRouter = require('./routes/verifyEmailRoute');
const loginRouter = require('./routes/loginRoute');
const checkPlagRouter = require('./routes/checkPlagairismRoute');
const resetPasswordRouter = require('./routes/resetPasswordRoute');
const doneQuizRouter = require('./routes/doneQuizRoute');
const savingQuizInitialsRouter = require('./routes/savingQuizInitialsRouter');
const paymentRouter = require('./routes/paymentRoute');
const logoutRouter = require('./routes/logoutRoute');
const forgetPasswordRouter = require('./routes/forgetPasswordRoute');
const addQuestionRouter = require('./routes/addQuestionRoute');
const offlineQuizRouter = require('./routes/offlineQuizRoute');
const startQuizRouter = require('./routes/startQuizRoute');
const createQuizRouter = require('./routes/createQuizRoute');
const fetchquizRouter = require('./routes/fetchquizRoute');
const profileRouter = require('./routes/profileRoute');
const premiumRouter = require('./routes/premiumRoute');
const  editprofileRouter  = require('./routes/editprofileRoute.js');
const paymentSuccessRouter = require('./routes/paymentSuccessRoute.js');
const paymentSuccess1Router = require('./routes/paymentSuccess1Route.js')
const joinQuizRouter = require('./routes/joinQuizRoute.js');
const addResponseRouter = require('./routes/addResponseRouter');
const deletequestionRouter = require('./routes/deletequestionRouter');
const getQuestionsRouter = require('./routes/getQuestionsRouter');
const joinquizRouter = require('./routes/joinQuizRoute');
const editQuestionRouter = require('./routes/editquestionRouter')
const uploadProfileImageRouter = require('./routes/uploadProfileImageRouter')
const uploadQuizImageRouter = require('./routes/uploadQuizImageRouter');
const uploadQestionImageRouter = require('./routes/uploadQestionImageRouter');

const viewResponseRouter = require('./routes/viewResponseRoute')
const downloadRouter = require('./routes/downloadRoute');
const { Question, Option, Player, Quiz, Game, Mcq , Fill, Poll } = require('./models1/class');
const { getQuizByid } = require('./models1/getquiz');
const { insert_response } = require('./models1/dbresponses');
const hostingRouter = require('./routes/hostingRoute');
const viewliveResponseRouter = require('./routes/viewliveResponseRoute');
let games = new Map();

/*                                                                              
MIDDLEWARE STACK

*/
app.set('view engine', 'ejs');//embedded javascript
app.use(cors());
passport.use(new LocalStrategy({ usernameField: 'email' }, LocalStrategyCallback));

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_API_URL}/auth/google/callback`,
        },
        GoogleStrategyCallback
    )
);

// app.listen(process.env.PORT || 3000, function () {
//     console.log(' server is Running at Port 3000');
// });

//set() is used to store the variable name...//
app.set('view engine', 'pug'); //view engine ==pug
app.set('views', path.join(__dirname, 'views')); //view == ___dirname/views

//app.use() is used to push the module in a middleware stack

app.use('', express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json

app.use(bodyParser.json());

let sessionMiddleware = session({
        genid: function (req) {
            console.log('inside session middleware');
            console.log(req.sessionID);

            console.log('-----------------');
            return uniqid(); // use UUIDs for session IDs
        },

        store: new FileStore(),

        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        //  cookie: { secure: true }
    });
    app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(serializeUserCallback);

passport.deserializeUser(deserializeUserCallback);
app.get('/api/v1/sendfile', (req, res) => {
    console.log(req.userid, 'abbbb');
    res.sendFile(path.join(__dirname, '/public', 'index1.html'));
});
app.use('/', homePageRouter);
app.use('/api/v1', homePageRouter);
app.use('/api/v1/signup', SignupRouter);
app.use('/api/v1/verify', verifyemailRouter);
app.use('/api/v1/login', loginRouter);
//app.use(`${process.env.BASE_API_URL}/auth/google`);
app.use('/api/v1/forgotpassword', forgetPasswordRouter);
app.use('/api/v1/resetpassword', resetPasswordRouter);
app.use('/api/v1/checkplag', checkPlagRouter);
app.use('/api/v1/upload-multiple-files', startQuizRouter);
app.use('/api/v1/saveQuizdetails', savingQuizInitialsRouter);
app.use('/api/v1/addQuestion', addQuestionRouter);
app.use('/api/v1/offlineQuiz', offlineQuizRouter);
app.use('/api/v1/fetchquiz', fetchquizRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/logout', logoutRouter);
app.use('api/v1/startquiz', startQuizRouter);
app.use('/api/v1/createQuiz', createQuizRouter);
app.use('/api/v1/doneQuiz', doneQuizRouter);
app.use('/api/v1/profile', profileRouter); ///api/v1/premium
app.use('/api/v1/premium', premiumRouter);
app.use("/api/v1/editprofile", editprofileRouter);
app.use("/api/v1/paymentsuccess",paymentSuccessRouter);
app.use("/api/v1/paymentsuccess1",paymentSuccess1Router);
app.use("/api/v1/joinquiz", joinQuizRouter);
app.use('/api/v1/insertResponse',addResponseRouter);
app.use('/api/v1/deletequestion', deletequestionRouter);
app.use('/api/v1/getquestions', getQuestionsRouter);
app.use('/api/v1/editquestion', editQuestionRouter);
app.use('/api/v1/upload_profile_image', upload.single('profile_image'), uploadProfileImageRouter);
app.use('/api/v1/upload_quiz_image', upload.single('quiz_image'), uploadQuizImageRouter);
app.use('/api/v1/upload_question_image', upload.single('question_image'), uploadQestionImageRouter);

app.use('/api/v1/viewResponses',viewResponseRouter);//viewResponses
app.use('/api/v1/download',downloadRouter);
app.use('/api/v1/preparetohost',hostingRouter);
app.use('/api/v1/viewliveResponse',viewliveResponseRouter);
const io = require('socket.io')(server);

const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
    if (socket.request.session.user) {
       // console.log('i am there in socket middleware');
        next();
    } else {
        next(new Error('unauthorized'));
    }
});

io.on('connection', (socket) => {
   // console.log(`new connection ${socket.id}`);
    socket.on('whoami', (cb) => {
        cb(socket.request.session.user ? socket.request.session.email : '');
    });

    const session = socket.request.session;
   // console.log(`saving sid ${socket.id} in session ${session.id}`);
    session.socketId = socket.id;
    session.save();

    socket.on('generatePin', async (quiz_id, callback) => {
        //console.log('generating pin');
        let questionList = await getQuizByid(quiz_id);
        console.log(quiz_id,questionList)
        gamepin = Math.floor(Math.random() * 100000);

        let game = new Game();
        game.Host_id = socket.request.session.userid;
        game.quiz_id = quiz_id;
        game.game_pin = gamepin;
        game.questions = questionList;
        game.players = new Map();
        game.is_started = false;
        games.set(gamepin.toString(), game);

       // console.log(io.sockets.socket);
        //games.push(game);

        socket.join(gamepin.toString());
        io.to(gamepin).emit('newMessage','host is connected');
        socket.emit('newMessage', socket.id);

        callback({
            gamepin: gamepin,
        });
    });
    socket.on('join', async ({ roompin, username }, callback) => {
        io.to(roompin).emit('newMessage','player is connected');
        let player = new Player();
        player.player_id = socket.request.session.userid;
        player.player_name = username || socket.request.session.email;
        player.socket_id = socket.id;
        player.responses = [];
        player.totalMarks=0;
        player.correct_answers = 0;

        let game = await games.get(roompin.toString());

        if (game === undefined) {
            socket.emit('error', 'invalid game code');
        } else {
            game.players.set(player.socket_id.toString(), player);
        }
       //console.log(game);
        socket.join(roompin);
        // Welcome current user

        // Broadcast when a user connects
        
        //console.log(io.sockets.adapter.rooms[roompin]);
        //console.log(io.sockets.adapter.rooms[roompin].length);

        // Send users and room info
        
        let playersInfo = [];
        for (const [key, player] of game.players.entries()) {
            playersInfo.push(player.player_name);
        }
        io.to(roompin).emit('roomUsers', {
            playersCount: game.players.length,
            currentlyJoinedplayer: player.player_name,
            playersInfo: playersInfo,
        });

        io.to(roompin).emit('player_joined', player,playersInfo,game.is_started);
        socket.request.session.currentgame = roompin;

        socket.request.session.save();
        callback({
            text: 'welcome to open Trivia',
        });
    });
    socket.on('startgame', async (roompin, callback) => {
        //fetch data from
        roompin = roompin.toString();
        if (games.has(roompin)) {
            let game = games.get(roompin);
          //  console.log(game);
            if (socket.request.session.userid == game.Host_id) {
                let question_index = 0;
                let question = game.questions[question_index];

                /* const question = questions_array.find((question) => {
                    question_index++;
                    if (question.serial_no === 1) return question;
                }); */
                // const question_index = questions_array.findIndex((question) => question.serial_no === 1); 
                socket.emit('starting', 'Welcome to openTrivia');
                game.is_started = true;
                // Broadcast when a user connects
               // socket.broadcast.to(roompin).emit('ready_in_5', `ready to start the game in 5 seconds`);
               socket.broadcast.to(roompin).emit('ready_in_5', `Ready to start the game in 5 seconds`);
               
                // Send users and room info
                await setTimeout(() => {
                    game.running_question_index = question_index;
                    console.log('inside starting',question)
                    io.to(roompin).emit('questions', {
                        question: question,
                    });
                    emitserverTimer(question.question_timer, roompin);
                }, 5000);

               // console.log(game.running_question_index);
                // function to emit timer event

                function emitserverTimer(timer, roompin) {
                    let counter = timer;
                    let clrinterval;

                    clrinterval = setInterval(() => {
                        if (counter == 0) {
                            clearInterval(clrinterval);
                            question.is_done= true;
                            let leaderBoardArray = game.sortByPlayerMarks();
                           // console.log('sorteed array',leaderBoardArray);
                            io.to(roompin).emit('leaderboard', {
                                leaderBoardArray,
                            });
                            console.log('done with start game');
                        }
                       // console.log(counter);
                        io.to(roompin).emit('timer', counter);
                        counter--;
                    }, 1000);
                }

                //io.to(roompin).emit('roomUsers', {});
            } else {
                socket.emit('event', 'you are not to host this game');
            }
        } else {
            socket.emit('event', 'invalid game pin');
        }

        // Welcome current user
    });
    socket.on('response', async ({ roompin, ...rest },callback) => {    
        console.log("inside rest",rest);
        if (roompin === socket.request.session.currentgame) {
            if (games.has(roompin)) {
                let game = games.get(roompin);

                players_map = game.players;
                if (players_map.has(socket.id)) {
                    player = players_map.get(socket.id);
                    if (player.player_id === socket.request.session.userid) {
                        let question = game.questions[game.running_question_index];                       
                        if (!question.is_done && question.question_id === rest.question_id) {//
                            console.log()
                            if(player.responses.length == 0 || player.responses[player.responses.length - 1].question_id !=rest.question_id ){
                                if (question.question_type.toLowerCase() === 'mcq') {
                                    mcq = new Mcq(question);
                                    let earns_point = await mcq.eval(rest);
                                    player.updatePlayerMarks(earns_point);
                                    let correct = false;
                                    rest['quiz_id'] = game.quiz_id;
                                    rest['participant_id'] = player.player_id;
                                    rest['response_time'] = question.question_timer - rest.timer;
                                    console.log('pushed into response array');
                                    if(earns_point != 0){
                                        correct = true;
                                    }
                                    rest['is_correct']=correct;
                                    player.responses.push(rest);
                                    
                                        callback({
                                            status : true ,
                                            msg:"your response submitted succesffuly",
                                            question_id :question.question_id,
                                            marks: player.totalMarks,
                                            is_correct: correct,
                                        });
                                    console.log(player.responses.length);
                                } else if (question.question_type.toLowerCase() === 'fill') {
                                fill = new Fill(question);
                                let earns_point = fill.eval(response);
                                player.updatePlayerMarks(earns_point);
                                } else if (question.question_type.toLowerCase() === 'poll') {
                                poll = new Poll(question);
                                let earns_point = poll.eval(response);
                                //player.updatePlayerMarks(earns_point);
                                }
                            }else{
                                callback({
                                    status : false ,
                                    msg:" response for this question is already submitted",
                                    is_done:question.is_done,
                                    is_sent:true,
                                    question_id :question.question_id,
                                    marks: 0,
                                    is_correct: false,
                                 });
                            }
                               
                        }else{
                            console.log('inside the question_ id check ',)
                            callback({
                                status : false ,
                                msg:"times up",
                                is_done:question.is_done,
                                question_id :question.question_id,
                                marks: 0,
                                is_correct: false,
                             });
                        }
                    } else {
                        callback({
                            status : false ,
                            msg:"you are part of the quiz",
                            question_id :question.question_id,
                            marks: 0,
                            is_correct: false,
                         });
                    }
                } else {
                    callback({
                        status : false ,
                        msg:"you are part of the quiz",
                        question_id :question.question_id,
                        marks: 0,
                        is_correct: false,
                     });
                    socket.emit('event', 'no player with this id');
                }
            } else {
                socket.emit('event', 'current game is no logner exist');
            }
        }
    });
    socket.on('nextQuestion', (roompin) => {
        console.log('entering the next question');
        roompin = roompin.toString();
        if (games.has(roompin)) {
            let game = games.get(roompin);
            //console.log(game);
            if (socket.request.session.userid === game.Host_id) {
                let question_index = game.running_question_index;
                question_index++;

                if (question_index < game.questions.length) {
                    let question = game.questions[question_index];
                    socket.emit('newMessage', 'next question is on your way');
                    game.running_question_index = question_index;
                    io.to(roompin).emit('questions', {
                        question: question,
                    });

                    function emitserverTimer(timer, roompin) {
                        let counter = timer;
                        let clrinterval;

                        clrinterval = setInterval(() => {
                            if (counter == 0) {
                                clearInterval(clrinterval);
                                question.is_done= true;
                                let leaderBoardArray = game.sortByPlayerMarks();
                                io.to(roompin).emit('leaderboard', {
                                    leaderBoardArray,
                                });
                                console.log('done with nextquestion');
                            }
                            io.to(roompin).emit('timer', counter);
                            counter--;
                        }, 1000);
                    }

                    emitserverTimer(question.question_timer, roompin);
                } else {
                    let leaderBoardArray = game.sortByPlayerMarks();
                    console.log(leaderBoardArray);
                    io.to(roompin).emit('finalleaderboard', {
                        leaderBoardArray
                    },game.quiz_id);
                    for (const [key, value] of game.players.entries()) {
                        value.responses.forEach(async (response) => {
                            await insert_response(response);
                        });
                    }
                }
            } else {
                socket.emit('event', 'you are not to host this game');
            }
        } else {
            socket.emit('event', 'invalid game pin');
        }
    });

    socket.on('disconnect', () => {
        console.log(`user${socket.userId} disconnected`);
        // if(socket.request.session.currentgame=== undefined){
        //     console.log(`user${socket.userId} disconnected`);
        // }
        // else{
        //     let roompin = socket.request.session.currentgame.toString();
        //     if (games.has(roompin)) {
        //         let game = games.get(roompin);
    
        //         players_map = game.players;
        //         players_map.delete(socket.id.toString());
    
        //         let playersInfo = [];
        //         for (const [key, player] of game.players.entries()) {
        //             playersInfo.push(player.player_name);
        //         }
        //         io.to(roompin).emit('roomUsers', {
        //             playersCount: game.players.length,
        //             playersInfo: playersInfo,
        //         });
        //     }
        // }
       
    });
});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/signup');
    }
}
server.listen(port, () => {
    console.log(`application is running at: http://localhost:${port}`);
});
