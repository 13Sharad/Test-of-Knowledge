const questions = [
    {
        question: "What does the abbreviation HTML stand for?",
        answers: [
            { text: "HyperText Markup Language", correct: true},
            { text: "HighText Markup Language", correct: false},
            { text: "HyperText Markdown Language", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "What is the smallest header in HTML by default?",
        answers: [
            { text: "h1", correct: false},
            { text: "h2", correct: false},
            { text: "h6", correct: true},
            { text: "h4", correct: false},
        ]
    },
    {
        question: "How to create an ordered list in HTML",
        answers: [
            { text: "ul", correct: false},
            { text: "ol", correct: true},
            { text: "href", correct: false},
            { text: "b", correct: false},
        ]
    },
    {
        question: "What are the attributes used to change the size of an image?",
        answers: [
            { text: "Width and height", correct: true},
            { text: "Big and Small", correct: false},
            { text: "Top and Bottom", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "Colors are defined in HTML using?",
        answers: [
            { text: "RGB Values", correct: false},
            { text: "HEX Values", correct: false},
            { text: "RGBA Values", correct: false},
            { text: "All of the above", correct: true},
        ]
    },
    {
        question: "What are the main components of the frontend of any working website?",
        answers: [
            { text: "HTML,CSS,JavaScript", correct: true},
            { text: "HTML only", correct: false},
            { text: "JavaScript", correct: false},
            { text: "Node.js", correct: false},
        ]
    },
    {
        question: "The Full Form of CSS is:",
        answers: [
            { text: "Cascading Style Sheets", correct: true},
            { text: "Coloured Special Sheets", correct: false},
            { text: "Color and Style Sheets", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "How can we change the background color of an element?",
        answers: [
            { text: "Background-color", correct: true},
            { text: "Color", correct: false},
            { text: "Both A and B", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "In how many ways can CSS be written in?",
        answers: [
            { text: "1", correct: false},
            { text: "2", correct: false},
            { text: "4", correct: false},
            { text: "3", correct: true},
        ]
    },
    {
        question: "The CSS property used to specify the transparency of an element is?",
        answers: [
            { text: "Filter", correct: false},
            { text: "Visibility", correct: false},
            { text: "Opacity", correct: true},
            { text: "None of the above", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(buttton => {
        if(buttton.dataset.correct === "true"){
            buttton.classList.add("correct");
        }
        buttton.disabled = true;
    });
    nextButton.style.display = "block";
}

function showscore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showscore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();