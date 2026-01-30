
const questions = [
    {
        question: "1. HTML stands for?",
        options: ["Hyper Text Markup Language", "HighText Machine Language", "Hyper Tool Multi Language", "Home Tool Markup Language"],
        answer: 0
    },

    {
        question: "2. Which HTML tag is used to create a hyperlink?",
        options: ["<a>", "<link>", "<href>", "<hyper>"],
        answer: 0
    },

    {
        question: "3. Which tag is used to insert an image in HTML?",
        options: ["<img>", "<src>", "<picture>", "<image>"],
        answer: 0
    },

    {
        question: "4. Which tag is used for the largest heading?",
        options: ["<h6>", "<heading>", "<h1>", "<head>"],
        answer: 2
    },

    {
        question: "5. Which tag is used to insert a line break?",
        options: ["<lb>", "<br>", "<break>", "<newline>"],
        answer: 1
    },

        {
        question: "6. What does CSS stand for?",
        options: ["<Creative Style Sheets>", "<Cascading Style Sheets>", "<Computer Style Sheets>", "<Colorful Style Sheets>"],
        answer: 1
    },

        {
        question: "7. Which CSS property is used to set the background color of an element?",
        options: ["<color>", "<bgcolor>", "<background-color>", "<background>"],
        answer: 2
    },
        {
        question: "8. Which CSS property is used to center-align text?",
        options: ["<align-text>", "<text-align>", "<center-text>", "<font-align>"],
        answer: 1
    },
        {
        question: "9. Which CSS property is used to change the font size?",
        options: ["<text-size>", "<font-weight>", "<font-size>", "<size>"],
        answer: 2
    },
        {
        question: "10. Which HTML tag is used to link an external CSS file?",
        options: ["<<style>>", "<<css>>", "<<script>>", "<<link>>"],
        answer: 3
    },
        {
        question: "11. What is JavaScript mainly used for?",
        options: ["<Creating web page structure>", "<Styling web pages>", "<Making web pages interactive>", "<Managing databases>"],
        answer: 2
    },
        {
        question: "12. Which keyword is used to declare variables in JavaScript?",
        options: ["<var>", "<let>", "<const>", "<All of the above>"],
        answer: 3
    },
        {
        question: "13. Which function is used to display a message box in the browser?",
        options: ["<msg()>", "<console.log()>", "<alert()>", "<promptBox()>"],
        answer: 2
    },
        {
        question: "14. What does the === operator do in JavaScript?",
        options: ["<Compares only values>", "<Compares only types>", "<Compares both value and type>", "<Performs addition>"],
        answer: 2
    },
        {
        question: "15. Which is the correct syntax to create a function in JavaScript?",
        options: ["<function = myFunc()>", "<function myFunc() {}>", "<create myFunc()>", "<def myFunc()>"],
        answer: 1
    },


];

let currentQ = 0;
let userAnswers = Array(questions.length).fill(null);

const quizBox = document.getElementById("quiz-box");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");

// ✅ Function to load question
function loadQuestion() {
    const q = questions[currentQ];

    // Clear quiz box
    quizBox.innerHTML = "";

    // Add question
    const questionEl = document.createElement("h5");
    questionEl.textContent = q.question;
    quizBox.appendChild(questionEl);

    // Add options
    q.options.forEach((opt, i) => {
        const div = document.createElement("div");
        div.className = "form-check mt-2";

        const input = document.createElement("input");
        input.className = "form-check-input";
        input.type = "radio";
        input.name = "option";
        input.id = `opt${i}`;
        input.value = i;
        if (userAnswers[currentQ] === i) input.checked = true;

        const label = document.createElement("label");
        label.className = "form-check-label";
        label.setAttribute("for", `opt${i}`);
        label.textContent = opt;   // ✅ Safe text (tags dikhai denge)

        div.appendChild(input);
        div.appendChild(label);
        quizBox.appendChild(div);
    });

    // Buttons
    backBtn.disabled = currentQ === 0;
    nextBtn.classList.toggle("d-none", currentQ === questions.length - 1);
    submitBtn.classList.toggle("d-none", currentQ !== questions.length - 1);
}

// ✅ Save selected option
function saveAnswer() {
    const selected = document.querySelector("input[name='option']:checked");
    if (selected) {
        userAnswers[currentQ] = parseInt(selected.value);
    }
}

// ✅ Next button
nextBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentQ < questions.length - 1) {
        currentQ++;
        loadQuestion();
    }
});

// ✅ Back button
backBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentQ > 0) {
        currentQ--;
        loadQuestion();
    }
});

// ✅ Submit button
submitBtn.addEventListener("click", () => {
    saveAnswer();
    let score = 0;
    questions.forEach((q, i) => {
        if (userAnswers[i] === q.answer) score++;
    });
    quizBox.innerHTML = "";
    backBtn.style.display = "none";
    nextBtn.style.display = "none";
    submitBtn.style.display = "none";
    result.innerHTML = `🎉 Your Score: ${score} / ${questions.length}`;
});

// ✅ First question load
loadQuestion();
