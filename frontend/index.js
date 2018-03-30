// HTML CONSTANTS

const userDashboard = document.getElementById('user-dashboard')
const userContainer = document.getElementById('user-container')
const goalContainer = document.getElementById('goal-container')
const goalDetail = document.getElementById('goal-detail')
const statContainer = document.getElementById('stat-container')
const navGoal = document.getElementById('nav-goal-link')
const navStat = document.getElementById('nav-stat-link')
const navCreate = document.getElementById('nav-create-link')
const navStep = document.getElementById('nav-step-link')
const navName = document.getElementById('user-name')
const donutChart = document.getElementById('show-donut-chart')
const lineChart = document.getElementById('show-line-chart')

const createGoalButton = document.getElementById('create-goal-button')
const createStepButton = document.getElementById('create-step-button')
const createGoalForm = document.getElementById('create-goal-form')
const createStepForm = document.getElementById('create-step-form')
const createGoalDropdown = document.getElementById('goal-dropdown')
const chartContainer = document.getElementById('my-chart')

const goalCalendar = document.getElementById('goal-calendar')
const gifContainer = document.getElementById('motivational-gif')

const BASE_URL = `http://localhost:3000/api/v1/users/`

document.addEventListener('DOMContentLoaded', () =>{
  landingPage()

  // event listeners
  // document.body.addEventListener("click", (e) => {
  //   if (clearClickLogic()) {
  //     goalDetail.style.display = "none"
  //   }
  // })

  navName.addEventListener('click', toggleAll)
  navGoal.addEventListener('click', toggleGoalCard)
  navStat.addEventListener('click', toggleStatCard)
  createGoalButton.addEventListener('click', createNewGoal)
  createStepButton.addEventListener('click', createNewStep)
  navCreate.addEventListener('click', goalModal)
  navStep.addEventListener('click', stepModal)
  donutChart.addEventListener('click', toggleDonutChart)
  lineChart.addEventListener('click', toggleLineChart)

  $('#nav-analytics-link')
    .dropdown();

  // Fetch user index
  function getUserFetch(userId = 1){
    return fetch(`${BASE_URL}${userId}`)
      .then(res => res.json())
  }
  // Fetch goals for user
  function getGoalFetch(userId = 1){
    return fetch(`${BASE_URL}${userId}/goals`)
      .then(res => res.json())
  }
  // Fetch single goal
  function fetchGoalDetail(goalId) {
    return fetch(BASE_URL + `1/goals/${goalId}`)
      .then(res => res.json())
  }

  function postGoalFetch(userId = 1, data) {
    return fetch(`${BASE_URL}${userId}/goals`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)

    }).then(res => res.json())
  }

  function postStepFetch(goalId = 1, data) {
    return fetch(`${BASE_URL}1/goals/${goalId}/steps`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)

    }).then(res => res.json())
  }

  function getStepFetch(goalId = 1) {
    return fetch(`${BASE_URL}1/goals/${goalId}/steps`).then(res => res.json())
  }


  getUserFetch(1).then((json) => {
    const user = json.data
    const newUser = new User(user.attributes.name, "images/logo.jpg", user.attributes.goals, user.relationships.steps.data)

    newUser.renderUser()
    newUser.renderStats()
  })

  getGoalFetch(1).then(json => {
    json.data.forEach(goalData => {
      const goalAttr = goalData.attributes
      const newGoal = new Goal(goalAttr.title, goalAttr.category, goalAttr.steps, goalData.relationships.user.data.id, goalAttr.completed, goalData.id)
      newGoal.renderGoal()
      // display donut chart
    })
    // displayDonutChart()
  })

  // app functions



  function clearClickLogic() {
    return event.target.className !== "ui green card" && event.target.tagName !== "DIV" && event.target.parentNode.tagName !== "DIV" && event.target.tagName !== "INPUT" && event.target.tagName !== "BUTTON"
  }

  function toggleDonutChart(event){
    displayDonutChart()
  }

  function toggleLineChart(event){
    displayLineChart()
  }

  function toggleAllCards() {
    displayDonutChart()
    $('#goal-container').transition('horizontal flip')
    $('#stat-container').transition('horizontal flip')
    // $('#goal-detail').transition('horizontal flip')

    // goalContainer.style.display = "block"
    // statContainer.style.display = "block"
    getUserFetch(1).then((json) => {
      const user = json.data
      const newUser = new User(user.attributes.name, "images/logo.jpg", user.attributes.goals, user.relationships.steps.data)
      resetOdometer()
      renderOdometer(newUser.steps.length)
    })
  }

  function toggleGoalCard(event) {
    $('#goal-container').transition('horizontal flip');
    (goalDetail.style.display !== "none") ? $('#goal-detail').transition('horizontal flip') : "dada"
    // $('#step-detail').transition('horizontal flip')

    // if (goalContainer.style.display === "none") {
    //    goalContainer.style.display = "block"
    //
    // } else {
      // goalContainer.style.display = "none"
      // goalDetail.style.display = "none"
      // stepOdometer.style.display = "none"
    // }
  }


  function toggleStatCard(event) {
    if (statContainer.style.display === "none") {
      statContainer.style.display = "block"
      getUserFetch(1).then((json) => {
        const user = json.data
        const newUser = new User(user.attributes.name, "images/logo.jpg", user.attributes.goals, user.relationships.steps.data)
        resetOdometer()
        renderOdometer(newUser.steps.length)
      })
    } else {
      statContainer.style.display = "none"
      goalDetail.style.display = "none"
    }
  }

  function toggleAll(event) {
    toggleStatCard()
    toggleGoalCard()
  }

  function renderOdometer(odometerNum) {
    let odometer = new Odometer({ el: $('.odometer')[0], value: -999, theme: 'train' });
    odometer.render()
    odometer.update(odometerNum)
  }

  function resetOdometer() {
    $('.odometer')[0].innerHTML = 0
    let odometer = new Odometer({ el: $('.odometer')[0], value: -999, theme: 'train' });
  }

  function goalModal(event){
    $('#create-goal')
      .modal('show')
  }

  function stepModal(event) {
    $('#create-step-modal')
      .modal('show')
  }

  function createNewGoal(event){
    const newGoaltitle = createGoalForm.children[0].value
    const newGoalcategory = createGoalDropdown.value
    const newGoalCompleteDate = goalCalendar.value
    const newGoalUserId = 1
    const newGoalData = {title: newGoaltitle, category: newGoalcategory, user_id: newGoalUserId, complete_by: newGoalCompleteDate}
      postGoalFetch(1, newGoalData)
        .then(json => {
          console.log(json)
          const goalAttr = json.data.attributes
          const userId = json.data.relationships.user.data.id
          const newGoal = new Goal(goalAttr.title, goalAttr.category, goalAttr.steps, userId, goalAttr.completed, json.data.id, goalAttr['complete-by'])
          console.log(newGoal)
          newGoal.renderGoal()
          displayDonutChart()
          const goalValue = document.getElementById('total-goal-stat-card')
            const parsedVal = parseInt(goalValue.innerText)
            goalValue.innerText = parsedVal + 1
            createGoalForm.reset()
        })
  }

  function createNewStep(event){
    event.preventDefault()
    const newStepTitle = createStepForm.children[0].value
    const newStepGoalId = parseInt(navStep.dataset.id)
    const newStepData = {title: newStepTitle, goal_id: newStepGoalId}
      postStepFetch(newStepGoalId, newStepData)
        .then(json => {
          // console.log(json)
          const statValue = $('.odometer-value')[0].innerText + $('.odometer-value')[1].innerText
          // const statValue = document.getElementById("total-step-stat")
          const stepStatValue = parseInt(statValue)
          resetOdometer()
          renderOdometer(stepStatValue + 1)

          fetchGoalDetail(newStepGoalId)
            .then(json => {
              const goalData = json.data.attributes
              const newGoal = new Goal(goalData.title, goalData.category, goalData.steps, json.data.relationships.user.data.id, goalData.completed, json.data.id)
              newGoal.renderDetail()
              $('.ui.toggle.checkbox').checkbox('attach events', '.toggle.button')
            })
          createStepForm.reset()
        })
  }

  function changeGif(){

    setTimeout(() => {
      gifContainer.style.display = 'block'
    }, 10000)
    setTimeout(() => {
      gifContainer.style.display = 'none'
      changeGif()
    }, 15000)
    // gifContainer.src = "images/runningMan"
  }

  let left = 1300
  function moveRunningMan(){
    const runningMan = document.getElementById("running-man")
    if (left > 0) {
      setTimeout(() => {
        runningMan.style.left = `${left -= .5}px`
        moveRunningMan()
      }, 10)
    } else if (left === 0) {
        left = 1300
        moveRunningMan()
    }
  }

setTimeout(() => {moveRunningMan()}, 1000)


setTimeout(() => { toggleAllCards() }, 10000)
setTimeout(() => { changeGif() }, 20000)

})
