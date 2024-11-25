// RUNNING LINE
const runningLine = document.getElementById('running-line')
const cloneRunningLine = runningLine.cloneNode(true)

const runningLineContainer = document.getElementById('running-line-container')
runningLineContainer.append(cloneRunningLine)

const repeatRunningLine = document.getElementById('repeat-running-line')
const cloneRunningLineContainer = runningLineContainer.cloneNode(true)
repeatRunningLine.append(cloneRunningLineContainer)

// MESSAGES
const messages = {
    'support-1': 'ПОСЕТИТЕ ЛЕКЦИЮ НА ТЕМУ:',
    'support-2': '«ПЛОДОТВОРНАЯ ДЕБЮТНАЯ ИДЕЯ»',
    'stage-1': 'Строительство железнодорожной магистрали Москва-Васюки',
    'stage-2': 'Открытие фешенебельной гостиницы «Проходная пешка» и других небоскрёбов',
    'stage-3': 'Поднятие сельского хозяйства в радиусе на тысячу километров: производство овощей, фруктов, икры, шоколадных конфет',
    'stage-4': 'Строительство дворца для турнира',
    'stage-5': 'Размещение гаражей для гостевого автотранспорта',
    'stage-6': 'Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов',
    'stage-7': 'Создание аэропорта «Большие Васюки» с регулярным отправлением почтовых самолётов и дирижаблей во все концы света, включая Лос-Анжелос и Мельбурн',
}

document
    .querySelectorAll('[data-text]')
    .forEach(el => el.textContent = messages[el.getAttribute("data-text")])

// STAGES
const stagesList = document.querySelector('#stages-list')
const previousStageButton = document.querySelector('#previous-stage-button')
const nextStageButton = document.querySelector('#next-stage-button')
const dots = document.querySelectorAll('.main__stages__separator')
const dotActiveClass = 'main__stages__separator_active'

let currentStageIndex = 0
let maxStageIndex = 4

function updateButtonsLimit() {
    previousStageButton.disabled = currentStageIndex === 0
    nextStageButton.disabled = currentStageIndex === maxStageIndex
}

function updateDotsState() {
    dots.forEach(d => d.classList.remove(dotActiveClass))
    dots[currentStageIndex].classList.add(dotActiveClass)
}

function changeStage(newIndex) {
    console.log(currentStageIndex)

    currentStageIndex = newIndex
    stagesList.style.right = `${currentStageIndex}00%`

    updateButtonsLimit()
    updateDotsState()
}

function previousStage() {
    changeStage(currentStageIndex - 1)
}

function nextStage() {
    changeStage(currentStageIndex + 1)
}

changeStage(currentStageIndex)

// PARTICIPANTS
const breakpoints = {
    'sm': window.matchMedia('(max-width: 425px)'),
    'md': window.matchMedia('(min-width: 426px) and (max-width: 871px)'),
    'lg': window.matchMedia('(min-width: 872px) and (max-width: 1225px)'),
    'xl': window.matchMedia('(min-width: 1226px)'),
}

const  participantsList= document.querySelector('#participants-list')

let participantsCountValue = document.querySelectorAll('.main__participants__header__pages-count')
let participantAutoChange = null
let currentParticipantsPage = 0
let participantsPagesCount = 2

function updateParticipantsPagesCount() {
    if (breakpoints['sm'].matches)
        participantsPagesCount = 6

    if (breakpoints['md'].matches)
        participantsPagesCount = 6

    if (breakpoints['lg'].matches)
        participantsPagesCount = 3

    if (breakpoints['xl'].matches)
        participantsPagesCount = 2

    changeParticipant(Math.min(currentParticipantsPage, participantsPagesCount - 1))
}

updateParticipantsPagesCount()
window.addEventListener('resize', updateParticipantsPagesCount, { passive: true })

function startAutoChange() {
    if (participantAutoChange != null)
        clearInterval(participantAutoChange)

    participantAutoChange = setInterval(nextParticipant, 4000)
}

function changeParticipant(newIndex) {
    currentParticipantsPage = (newIndex + participantsPagesCount) % participantsPagesCount

    participantsCountValue.forEach(
        v => v.textContent = `${(6 / participantsPagesCount) * (currentParticipantsPage + 1)}`
    )

    participantsList.style.right = `${currentParticipantsPage}00%`
    startAutoChange()
}

function previousParticipant() {
    changeParticipant(currentParticipantsPage - 1)
}

function nextParticipant() {
     changeParticipant(currentParticipantsPage + 1)
}

changeParticipant(currentParticipantsPage)
