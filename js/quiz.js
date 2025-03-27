
document.addEventListener("DOMContentLoaded", () => {
  
  const quizQuestions = [
    {
      id: 1,
      question: "In which year was the first textile mill established in Kanpur?",
      options: ["1847", "1861", "1875", "1890"],
      correctAnswer: "1861",
    },
    {
      id: 2,
      question: "Which leader was associated with the Kanpur Bolshevik Conspiracy of 1919?",
      options: ["Mahatma Gandhi", "Bhagat Singh", "M.N. Roy", "Subhas Chandra Bose"],
      correctAnswer: "M.N. Roy",
    },
    {
      id: 3,
      question: "What was Kanpur formerly known as during the British colonial period?",
      options: ["Khanpur", "Cawnpore", "Kanpuri", "Kashipur"],
      correctAnswer: "Cawnpore",
    },
    {
      id: 4,
      question: "Which river flows through Kanpur?",
      options: ["Yamuna", "Ganges", "Brahmaputra", "Godavari"],
      correctAnswer: "Ganges",
    },
    {
      id: 5,
      question: "In which year was IIT Kanpur established?",
      options: ["1950", "1959", "1960", "1965"],
      correctAnswer: "1959",
    },
    {
      id: 6,
      question: "Which famous freedom fighter was born in Kanpur?",
      options: ["Chandrashekhar Azad", "Bhagat Singh", "Ganesh Shankar Vidyarthi", "Sardar Patel"],
      correctAnswer: "Ganesh Shankar Vidyarthi",
    },
    {
      id: 7,
      question: "What was the original purpose of the Kanpur Memorial Church?",
      options: [
        "Regular worship for British officials",
        "Memorial for those who died in the 1857 rebellion",
        "Educational institution",
        "Military headquarters",
      ],
      correctAnswer: "Memorial for those who died in the 1857 rebellion",
    },
    {
      id: 8,
      question: "Which industry was Kanpur most famous for during the British period?",
      options: ["Cotton textiles", "Leather", "Steel", "Sugar"],
      correctAnswer: "Leather",
    },
  ]

  const quizContainer = document.querySelector(".quiz-card")
  let currentQuestion = 0
  let score = 0
  let isAnswered = false

 
  function renderQuestion() {
    const question = quizQuestions[currentQuestion]

    quizContainer.innerHTML = `
            <div class="quiz-header">
                <span>Question ${currentQuestion + 1} of ${quizQuestions.length}</span>
                <span>Score: ${score}</span>
            </div>
            <div class="quiz-progress">
                <div class="quiz-progress-bar" style="width: ${((currentQuestion + 1) / quizQuestions.length) * 100}%"></div>
            </div>
            <div class="quiz-question">${question.question}</div>
            <div class="quiz-options">
                ${question.options
                  .map(
                    (option) => `
                    <div class="quiz-option" data-option="${option}">
                        <span>${option}</span>
                        <i class="fas fa-check-circle"></i>
                        <i class="fas fa-times-circle"></i>
                    </div>
                `,
                  )
                  .join("")}
            </div>
            <button class="btn primary-btn next-btn" disabled>
                ${currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
            </button>
        `

    
    const options = quizContainer.querySelectorAll(".quiz-option")
    options.forEach((option) => {
      option.addEventListener("click", () => {
        if (isAnswered) return

        const selectedOption = option.dataset.option
        const correctAnswer = question.correctAnswer

        isAnswered = true

       
        options.forEach((opt) => {
          if (opt.dataset.option === correctAnswer) {
            opt.classList.add("correct")
          } else if (opt.dataset.option === selectedOption) {
            if (selectedOption !== correctAnswer) {
              opt.classList.add("incorrect")
            }
          }
        })

        
        if (selectedOption === correctAnswer) {
          score++
        }

       
        const nextBtn = quizContainer.querySelector(".next-btn")
        nextBtn.disabled = false
      })
    })

   
    const nextBtn = quizContainer.querySelector(".next-btn")
    nextBtn.addEventListener("click", () => {
      if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++
        isAnswered = false
        renderQuestion()
      } else {
        renderResult()
      }
    })
  }

  
  function renderResult() {
    const percentage = (score / quizQuestions.length) * 100
    let message = ""

    if (percentage >= 80) {
      message = "Excellent! You're a Kanpur history expert!"
    } else if (percentage >= 60) {
      message = "Good job! You know quite a bit about Kanpur's heritage."
    } else {
      message = "Keep learning about Kanpur's rich heritage!"
    }

    quizContainer.innerHTML = `
            <div class="quiz-result">
                <div class="result-icon">
                    <i class="fas fa-award"></i>
                </div>
                <h3 class="result-title">Quiz Completed!</h3>
                <p class="result-score">You scored ${score} out of ${quizQuestions.length}</p>
                <div class="result-bar">
                    <div class="result-progress" style="width: ${percentage}%"></div>
                </div>
                <p class="result-message">${message}</p>
                <button class="btn primary-btn" id="restart-quiz">Try Again</button>
            </div>
        `

   
    const restartBtn = document.getElementById("restart-quiz")
    restartBtn.addEventListener("click", () => {
      currentQuestion = 0
      score = 0
      isAnswered = false
      renderQuestion()
    })

    
    if (percentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  
  const confetti = window.confetti || (() => {})

  
  renderQuestion()
})

