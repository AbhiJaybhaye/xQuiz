const questions = [
    {
        text: "Which language is primarily used for web app development?",
        options: ["C#", "Python", "JavaScript", "Swift"],
        correct: 2
    },
    {
        text: "Which of the following is a relational database management system?",
        options: ["Oracle", "Scala", "Perl", "Java"],
        correct: 0
    },
    {
        text: "In which language is memory management provided by JVM?",
        options: ["Java", "C", "C++", "Python"],
        correct: 0
    },
    {
        text: "What does HTML stand for?",
        options: ["Hyperlink and Text Markup Language", "High Technology Modern Language", "Hyper Text Markup Language", "Home Tool Markup Language"],
        correct: 2
    },
    {
        text: "Which of the following is not a valid variable name in Python?",
        options: ["_myVar", "myVar2", "2myVar", "my_var"],
        correct: 2
    },
    {
        text: "Which of the following is not an object-oriented programming language?",
        options: ["Java", "C#", "Scala", "C"],
        correct: 3
    },
    {
        text: "Which tool is used to ensure code quality in JavaScript?",
        options: ["JSLint", "TypeScript", "Babel", "Webpack"],
        correct: 0
    },
    {
        text: "In which data structure, elements are added at one end and removed from the other?",
        options: ["Array", "Stack", "Queue", "LinkedList"],
        correct: 2
    },
    {
        text: "What is the primary use of the Git command 'clone'?",
        options: ["To stage changes", "To copy a repository", "To switch to a different branch", "To list all the files in a repository"],
        correct: 1
    },
    {
        text: "What does API stand for in the context of programming?",
        options: ["Apple Pie Interface", "Application Programming Interface", "Advanced Peripheral Integration", "Application Process Integration"],
        correct: 1
    }
];
let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerListElement = document.getElementById("answer-list");
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next");

function renderQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.text;
    answerListElement.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const listItem = document.createElement("li");
        const label = document.createElement("label");
        const input = document.createElement("input");

        input.type = "radio";
        input.name = "answer";
        input.value = index;

        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        listItem.appendChild(label);

        answerListElement.appendChild(listItem);
    });

    submitButton.style.display = "inline-block";
    nextButton.style.display = "none";
}

function highlightAnswers(selectedAnswerIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const answerOptions = document.querySelectorAll("#answer-list li");

    answerOptions.forEach((option, index) => {
        if (index === currentQuestion.correct) {
            option.style.backgroundColor = "rgb(144, 238, 144)"; 
        } else if (index === selectedAnswerIndex) {
            option.style.backgroundColor = "rgb(255, 99, 71)";
        }
    });
}

function attemptHighlight(selectedAnswerIndex) {
    const answerOptions = document.querySelectorAll("#answer-list li");

    answerOptions.forEach((option, index) => {
        if (index === selectedAnswerIndex) {
            option.style.backgroundColor = "rgb(255, 99, 71)"; 
        } else {
            option.style.backgroundColor = "";
        }
    });
}

submitButton.addEventListener("click", () => {
    const selectedOption = document.querySelector("input[name='answer']:checked");

    if (!selectedOption) {
        alert("Please select an answer!");
        return;
    }

    const selectedAnswerIndex = parseInt(selectedOption.value);
    if (selectedAnswerIndex === questions[currentQuestionIndex].correct) {
        score++;
    } else {
        attemptHighlight(selectedAnswerIndex);
    }

    highlightAnswers(selectedAnswerIndex);

    submitButton.style.display = "none";
    nextButton.style.display = "inline-block";
});

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        alert(`Quiz finished! Your score is: ${score}/${questions.length}`);
        currentQuestionIndex = 0;
        score = 0;
        renderQuestion();
    }
});

renderQuestion();

// submitButton.addEventListener("click", () => {
// });

// nextButton.addEventListener("click", () => {
// });
