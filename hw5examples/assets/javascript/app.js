    (function() {

        $(document).ready(function() {

            // make sure the page wrapper is always the height of the window
            $(".wrapper").css("min-height", $(window).height());

            // VARIABLES

            // global variable declarations
            var currentQuestion;
            var picOne;
            var picTwo;
            var correctAnswer;
            var correctShow;
            var q = 0;
            var userChoice;
            var correctCount = 0;
            var incorrectCount = 0;
            var intervalId;
            var theme = new Audio("assets/sounds/officetheme.mp3");
			

            // array with questions, answers, and images
            var questionsAnswersArray = [{
                    question: "Türk silahlı kuvvetlerinde hangi rütbe en yüksektir?",
                    answer: "Orgeneral",
                    incorrectAnswers: ["Tümgeneral", "Tuğgeneral", "Korgeneral"],
                    firstPic: "assets/images/orgeneral.png",
                    secondPic: "assets/images/orgeneral.png"
					

                },
                {
                    question: "Bu bayrak hangi ülkenin bayrağıdır?",
                    answer: "Jamaika",
                    incorrectAnswers: ["Hindistan", "Endonezya", "Güney Afrika Cumhuriyeti"],
                    firstPic: "assets/images/jamaika.png",
                    secondPic: "assets/images/jamaika.png"
                },
                {
                    question: "Hangisinin amblemidir? ",
                    answer: "NATO",
                    incorrectAnswers: ["WHO", "Avrupa birliği", "NASA", "OTO"],
                    firstPic: "assets/images/nato.png",
                    secondPic: "assets/images/nato.png"
                },
                
                {
                    question: "Fas’ın başkenti hangi şehirdir?",
                    answer: "Rabat",
                    incorrectAnswers: ["Kahire", "Fes", "Kazablanka"],
                    firstPic: "assets/images/rabat.jpg",
                    secondPic: "assets/images/rabat.jpg"
                },
                {
                    question: "Dinlediğiniz türkü kime aittir?",
                    answer: "Aşık Mahsuni Şerif",
                    incorrectAnswers: ["Aşık Gülabi", "Aşık Veysel", "Neşet Ertaş"],
                    firstPic: "assets/sounds/mahsuni.mp3",
                    secondPic: "assets/images/meredithpalmer.jpg"
                },{
                    question: "İstiklal Marşı kaç yılında yazılmıştır?",
                    answer: "1921",
                    incorrectAnswers: ["1919", "1920", "1922"],
                    firstPic: "assets/images/1921.jpg",
                    secondPic: "assets/images/1921.jpg"
                }
            ];


            // FUNCTIONS

            // function to shuffle the questions every time the game is played
            function shuffleQuestions() {

                var currIndex = questionsAnswersArray.length,
                    temporaryValue, randomIndex;

                // While there remain elements to shuffle...
                while (0 !== currIndex) {

                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currIndex);
                    currIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = questionsAnswersArray[currIndex];
                    questionsAnswersArray[currIndex] = questionsAnswersArray[randomIndex];
                    questionsAnswersArray[randomIndex] = temporaryValue;
                }
            }

            // function to spin the first picture and answers every time they load
            function spin() {
                $("#answer-list, #pic-field").addClass("flip");
                $("#answer-list, #pic-field").toggleClass("flipback", "flip");
            }

            // Timer Object and its functions

            var timer = {

                // initialize seconds to 10
                seconds: 20,

                // function to make timer count down
                decrement: function() {

                    // decrement by 1 second
                    timer.seconds--;

                    // display the number of seconds left
                    $("#time-left").html("&nbsp;&nbsp;" + timer.seconds);

                    // the seconds turn red once they reach 3
                    if (timer.seconds < 4) {
                        $("#time-left").css("color", "red");
                    }

                    // change text from 'seconds' to 'second' when timer reaches 1
                    if (timer.seconds === 1) {
                        $("#seconds").html("second&nbsp;&nbsp;");
                    } else {
                        $("#seconds").text("seconds");
                    }

                    // if user doesn't select an answer, increase their number of incorrect answers, show them the correct answer, and highlight the correct answer
                    if (timer.seconds === 0) {
                        incorrectCount++;
                        $("#" + correctShow).addClass("correct");
                        $("#right-wrong").html("<p>Süreniz bitti!</p><p>Cevap  <span class='correct-text'>" + correctAnswer + "</span>.</p>");
                        
                        // stop the timer
                        timer.stop();
                        
                        // remove active class from the answer <ul> so that user can't trigger click events
                        $("#answer-list").removeClass("active");

                        // display image for correct answer
                        $("#pic-field").html(picTwo);

                        // call function to display next question
                        setTimeout(displayQuestion, 3000);
                    }
                },

                // function to start timer
                run: function() {

                    // clear the interval each time the timer starts
                    clearInterval(intervalId);

                    // set the timer interval for the secrement function
                    intervalId = setInterval(timer.decrement, 1000);

                    // create the timer display
                    $("#timer").html("Süreniz: <span id='time-left'>10</span> <span id='seconds'>seconds</span>");

                    // always start with 10 seconds
                    $("#time-left").text(20);
                    timer.seconds = 20;
                },

                // fnuction to stop the timer and clear the interval
                stop: function() {

                    clearInterval(intervalId);
                }
            };

            // function to display questions and answers

            function displayQuestion() {

                // spin image and answers each time a new question appears
                spin();

                // keep displaying questions as long as the user hasn't seen all of them
                if (q < questionsAnswersArray.length) {

                    // empty all display fields and start timer
                    $("#current-question, #answer-list, #pic-field, #right-wrong").empty();
                    timer.run();

                    // assign current question to each question from the array 
                    currentQuestion = questionsAnswersArray[q].question;

                    // assign image variables
                    picOne = $("<img class='img-fluid'>").attr("src", questionsAnswersArray[q].firstPic);
                    picTwo = $("<img class='img-fluid'>").attr("src", questionsAnswersArray[q].secondPic);
					
                    // add the question and initial image
                    $("#current-question").append("<h2>" + currentQuestion + "</h2>");
                    $("#pic-field").append(picOne);

                    // declar array to hold potential answers for each question 
                    var answers = [];
                    answers = [questionsAnswersArray[q].answer, questionsAnswersArray[q].incorrectAnswers[0], questionsAnswersArray[q].incorrectAnswers[1], questionsAnswersArray[q].incorrectAnswers[2]];
					

                    // shuffle answers
                    var currentIndex = answers.length,
                        temporaryValue, randomIndex;

                    // While there remain elements to shuffle...
                    while (0 !== currentIndex) {

                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;

                        // And swap it with the current element.
                        temporaryValue = answers[currentIndex];
                        answers[currentIndex] = answers[randomIndex];
                        answers[randomIndex] = temporaryValue;
                    }

                    // assign correct answer to variable
                    correctAnswer = questionsAnswersArray[q].answer;

                    // assign variable for correct answer without spaces
                    correctShow = correctAnswer.replace(/\s/g, "");

                    // assign active class so that list items can be clicked
                    $("#answer-list").addClass("active");

                    // created list items from shuffled array and include unique ids without spaces
                    for (var i = 0; i < 4; i++) {
                        $("#answer-list").append("<li class='answer-item text-center' id='" + answers[i].replace(/\s/g, "") + "'>" + answers[i] + "</li>");
                    }

                    // increment the question number
                    q++;

                // end the game once the user has seen every question
                } else {
                    endGame();
                }
            }

            // function to start game, play theme music, shuffle questions, and display the first question
            function startGame() {
                theme.play();
                shuffleQuestions();
                displayQuestion();
            }

            // function to stop the game, empty the game displays, and create a button to show the user their results
            function endGame() {
                timer.stop();
                $("#current-question, #answer-list, #timer, #right-wrong, #pic-field").empty();
                $("#result-holder").html("<button id='results'><i class='fa fa-calculator'></i>&nbsp; Sonucunuzu görün</button>");
            }

            // function to display the number of correct and incorrect answers and display a unique message and image depending on well user answered questions
            function results() {
                $(".tally").append("<h2 class='mb-1'>Sonucunuz:</h2>").append("<p>Doğru Cevap: " + correctCount + "</p>").append("<p>Yanlış Cevap: " + incorrectCount + "</p>");
                // best score is between 8 and 10
                if (correctCount > 3 ) {
                    
                    $(".tally").append("<p class='mt-3'>Mükemmel !</p>");

                // poor score between 0 and 3
                } else {
                    
                    $(".tally").append("<p class='mt-3'>İdare Eder !</p>");
                }
            }


            // CLICK EVENTS

            // click events for right or wrong answers
            $(document).on("click", ".active .answer-item", function() {

                // stop timer and assign user choice to the clicked answer
                timer.stop();
                userChoice = $(this).text();

                // if the answer is correct
                if (userChoice === correctAnswer) {

                    // increase the correct answer count, highlight the correct answer, and display it as well
                    correctCount++;
                    $(this).addClass("correct");
                    $("#right-wrong").html("<p class='correct-text'>YESH!</p><p class='correct-text'>Correct!</p>");

                    // disable click events for list items
                    $("#answer-list").removeClass("active");

                    // change to correct answer image
                    $("#pic-field").html(picTwo);

                    // call function to display next question
                    setTimeout(displayQuestion, 3000);

                // if answer is incorrect
                } else {

                    // increase the incorrect answer count, highlight the correct and incorrect answers, and display the correct answer
                    incorrectCount++;
                    $(this).addClass("wrong");
                    $("#" + correctShow).addClass("correct");
                    $("#right-wrong").html("<p>Wrong!</p><p>It was <span class='correct-text'>" + correctAnswer + "</span></p>");

                    // disable click events for list items
                    $("#answer-list").removeClass("active");

                    // change to correct answer image
                    $("#pic-field").html(picTwo);

                    // call function to display next question
                    setTimeout(displayQuestion, 3000);
                }
            });

            // click event to start game
            $("#start-game").on("click", function() {
                $(".header-container").hide();
                $("main").show();
                startGame();
            });

            // click event to display results
            $(document).on("click", "#results", function() {
                $("#current-question").empty();
                $("main").hide();
                $(".endgame").show();
                results();
            });

            // click event to reset game
            $(document).on("click", "#reset-game", function() {
                $(".tally, #result-holder").empty();
                $(".endgame").hide();
                $(".header-container").show();
                q = 0;
                correctCount = 0;
                incorrectCount = 0;
            });

        });
    })();