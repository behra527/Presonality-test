// Function to shuffle questions
function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Questions (5 per category)
const questions = shuffleQuestions([
    // Love Category
    { text: "How do you show affection to loved ones?", category: "love" },
    { text: "How often do you find joy in small things?", category: "love" },
    { text: "Do you express your feelings openly?", category: "love" },
    { text: "Do you prioritize loved ones over yourself?", category: "love" },
    { text: "Do you make time to connect with loved ones regularly?", category: "love" },

    // Loyalty Category
    { text: "How important is it for you to keep promises?", category: "loyalty" },
    { text: "Do you stand by your friends during tough times?", category: "loyalty" },
    { text: "Do you avoid betraying someone's trust?", category: "loyalty" },
    { text: "Do you ensure confidentiality when someone shares a secret?", category: "loyalty" },
    { text: "Do you value long-term relationships?", category: "loyalty" },

    // Friendliness Category
    { text: "You notice someone avoids eye contact often. What might this indicate?", category: "friendliness" },
    { text: "How would you describe your patience level?", category: "friendliness" },
    { text: "Do you easily forgive others?", category: "friendliness" },
    { text: "Are you approachable to new people?", category: "friendliness" },
    { text: "Do you listen attentively when someone speaks?", category: "friendliness" },

    // Rudeness Category
    { text: "How do you react when someone criticizes you?", category: "rudeness" },
    { text: "Do you find it hard to apologize when you're wrong?", category: "rudeness" },
    { text: "Do you often criticize others without reason?", category: "rudeness" },
    { text: "Do you raise your voice during arguments?", category: "rudeness" },
    { text: "Do you speak harshly to others when upset?", category: "rudeness" },

    // Depression Category
    { text: "You often feel overwhelmed in large gatherings. True or False?", category: "depression" },
    { text: "How do you react to stressful situations?", category: "depression" },
    { text: "Do you struggle to find joy in everyday activities?", category: "depression" },
    { text: "Do you feel isolated even when among people?", category: "depression" },
    { text: "Do you often feel unmotivated or exhausted?", category: "depression" },
]);

let currentQuestionIndex = 0;
let scores = { love: 0, loyalty: 0, friendliness: 0, rudeness: 0, depression: 0 };

// Start the quiz
function startQuiz() {
    document.getElementById("welcome-container").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    loadQuestion();
}

// Load the current question
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }

    const question = questions[currentQuestionIndex];
    document.getElementById("question").innerText = question.text;
    document.getElementById("progress").innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    document.getElementById("progress-bar-fill").style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    // Reset button states for the next question
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach((btn) => {
        btn.disabled = false;
    });
}

// Handle answer selection
function selectAnswer(score) {
    const question = questions[currentQuestionIndex];
    if (question) {
        scores[question.category] += score; // Add score to the appropriate category
        currentQuestionIndex++;
        loadQuestion(); // Load the next question
    }
}

// Show the result
function showResult() {
    const quizContainer = document.getElementById("quiz-container");
    const resultContainer = document.getElementById("result-container");
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    const ctx = document.getElementById("resultChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Love", "Loyalty", "Friendliness", "Rudeness", "Depression"],
            datasets: [
                {
                    label: "Personality Traits",
                    data: [
                        scores.love,
                        scores.loyalty,
                        scores.friendliness,
                        scores.rudeness,
                        scores.depression,
                    ],
                    backgroundColor: ["#ff758c", "#36a2eb", "#4caf50", "#ffcc00", "#ff5733"],
                },
            ],
        },
    });

    document.getElementById("result-text").innerText = `
        Love: ${scores.love}, Loyalty: ${scores.loyalty}, 
        Friendliness: ${scores.friendliness}, Rudeness: ${scores.rudeness}, Depression: ${scores.depression}
    `;
}

// Restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    scores = { love: 0, loyalty: 0, friendliness: 0, rudeness: 0, depression: 0 };
    document.getElementById("result-container").classList.add("hidden");
    document.getElementById("welcome-container").classList.remove("hidden");
}
