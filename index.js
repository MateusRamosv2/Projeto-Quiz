const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente"
      break
    case (performance >= 70):
      message = "Muito bom"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar"
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Quem inventou a fórmula E=mc^2?",
    answers: [
      { text: "Nicolau Copérnio", correct: false },
      { text: "Macaulay Culkin", correct: false },
      { text: "Alber Einstein", correct: true },
      { text: "Steve Jobs", correct: false }
    ]
  },
  {
    question: "Em qual nasceu a linguagem Pompeu e Godê?",
    answers: [
      { text: "São João Nepomuceno", correct: true },
      { text: "Matias Barbosa", correct: false },
      { text: "Juiz de Fora", correct: false },
      { text: "Cataguases", correct: false }
    ]
  },
  {
    question: 'Em 1967, quantos dias durou a Guerra dos Seis Dias entre Israel e sesu vizinhos árabes ?',
    answers: [
      { text: '6', correct: true },
      { text: '60', correct: false },
      { text: '600', correct: false },
      { text: "Nenhuma das alternativas", correct: false }
    ]
  },
  {
    question: 'Quem cantou "No Woman, No Cry"',
    answers: [
      { text: "Nirvana", correct: false },
      { text: "Luva de Pedreiro", correct: false },
      { text: "Eric Clapton", correct: false },
      { text: "Bob Marley", correct: true }
    ]
  },
  {
    question: 'Quando a seleção Brasileira de futebol conquistou o seu priemrio mundial ?',
    answers: [
      { text: '1960', correct: false },
      { text: '1958', correct: true },
      { text: '1956', correct: false },
      { text: '1952', correct: false }
    ]
  },
  {
    question: 'Quem é o atleta olímpico mais premiado de todos os tempos ?',
    answers: [
      { text: 'Gert Fredriksson', correct: false },
      { text: 'Michael Phelps', correct: true },
      { text: 'Ronnie Coleman', correct: false },
      { text: 'Mark Spitz', correct: false }
    ]
  },
  {
    question: 'Qual o nome dado a um monte de areias acumuladas pelo vento ?',
    answers: [
      { text: 'Real', correct: false },
      { text: 'Praia', correct: false },
      { text: 'Deserto', correct: false },
      { text: 'Duna', correct: true },
    ]
  },
]