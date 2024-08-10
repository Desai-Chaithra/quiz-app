const questions = [
    {
        question: "which is largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Bule Whale", correct: true},
            {text: "Shark", correct: false},
            {text: "Shark", correct: false}
        ]
    },
    {
        question: "How many Years in a millennia has?",
        answers: [
            {text: "1000", correct: true},
            {text: "10000", correct: false},
            {text: "100", correct: false},
            {text: "1000000", correct: false}
        ]
    },
    {
        question: "Which planet is known as the Red Planet",
        answers: [
            {text: "Mars", correct: true},
            {text: "Satrun", correct: false},
            {text: "Jupiter", correct: false},
            {text: "Neptune", correct: false}
        ]
    },
    {
        question: "which is the shortest month of the year?",
        answers: [
            {text: "January", correct: false},
            {text: "June", correct: false},
            {text: "December", correct: false},
            {text: "February", correct: true}
        ]
    },
    {
        question: "The Sub rises in the?",
        answers: [
            {text: "North", correct: false},
            {text: "South", correct: false},
            {text: "West", correct: false},
            {text: "East", correct: true}
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0; // question index number
let score = 0

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion =questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
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
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
