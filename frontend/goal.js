const Goal = (function (){

  return class Goal {
    constructor(title, category, steps, user_id, completed = false, id, completeBy) {
      this.title = title
      this.category = category
      this.steps = steps
      this.user_id = user_id
      this.completed = completed
      this.id = id
      this.completeBy = completeBy
    }

    renderGoal() {
      const content = document.getElementById('goal-content')
      const title = document.createElement('div')
      title.addEventListener('click', showGoalDetail)
      title.className = "goal-content-card"
      title.innerHTML =
        `<h4 data-id="${this.id}"> ${this.title} </h4>`
      let breakElement = document.createElement('br')

      const category = document.createElement('p')
      category.innerText = this.category

      title.append(category, breakElement)
      content.append(title);
      (this.completed) ? title.style.textDecoration = 'line-through' : title.style.textDecoration = "none";
    }

    getStepPercentage() {
      const stepCount = this.steps.length
      const stepsCompleted = this.steps.filter(step => {
        return step.completed === true
      }).length

      if (this.steps.length !== 0) {
        const intToPass = (stepsCompleted/stepCount) * 100
        return intToPass
      } else {
        const intToPass = 0
        return intToPass
      }
    }

    renderDetail(){
      goalDetail.innerHTML = "";
      (goalDetail.style.display === "none") ? $('#goal-detail').transition('horizontal flip') : "tada"

      const content = document.createElement('div')
      content.className = "content"
      content.id = "goal-detail-content"

      const title = document.createElement('div')
      title.innerHTML =
        `<h2 class="ui centered dividing header" data-id="${this.id}"> ${this.title} </h2><br>`

      const breakElement = document.createElement('br')
      const steps = document.createElement('div')

      this.steps.forEach(step => {
        const stepToggle = createSteps(step)
        stepToggle.addEventListener('click', updateStep)
        steps.append(stepToggle)
      })
      const markCompleteButton = getMarkCompleteButton(this)
      const intToPass = this.getStepPercentage()
      const progressBar = getProgressBar(intToPass)

      content.append(title, steps)
      goalDetail.append(content, progressBar, markCompleteButton)
      $('.ui.toggle.checkbox').checkbox('attach events', '.toggle.button')
      getProgress(intToPass)
    }

    completedSteps(){
      const completedSteps = this.steps.filter(step => {
        return step.completed === true
      })
      return completedSteps
    }
  }


  function getProgress(integer){
    $('#progress-bar').progress({
      percent: integer
    });
  }

  function createSteps(step){
    const stepToggle = document.createElement('div')
    stepToggle.className = "ui toggle checkbox"
    stepToggle.style.width = "80%"
    stepToggle.style.margin = "1%"
    if (step.completed) {
      stepToggle.innerHTML =
      `<input type="checkbox" data-id="${step.id}" checked="">
      <label data-id="${step.id}">${step.title}</label>`
    } else {
      stepToggle.innerHTML =
      `<input type="checkbox" data-id="${step.id}">
      <label data-id="${step.id}">${step.title}</label>`
    }
    return stepToggle
  }

  function getMarkCompleteButton(goal) {
    const markCompleteButton = document.createElement('div')
    markCompleteButton.className = "ui center aligned "
    markCompleteButton.setAttribute('data-checked', goal.completed)

      if (markCompleteButton.dataset.checked === "true") {
        markCompleteButton.innerHTML =`<button data-id="${goal.id}" class="ui red button"> Mark Goal Incomplete  </button>`
        markCompleteButton.addEventListener('click', toggleGoalCompletion)
      } else {
        markCompleteButton.innerHTML =`<button data-id="${goal.id}" class="ui green button"> Mark Goal Complete</button>`
        markCompleteButton.addEventListener('click', toggleGoalCompletion)
      }
    return markCompleteButton
  }

  function getProgressBar(intToPass) {
    const progressBar = document.createElement('div')
    progressBar.className = "content"
    progressBar.id = "progress-bar-content"
    progressBar.innerHTML =
      `
      <div id="progress-bar" class="ui indicating progress">
        <div class="bar">
        </div>
      <div class="label"> ${intToPass.toFixed(0)}% Complete </div>
      `
    return progressBar
  }

  function showGoalDetail(event) {
    if (event.target.tagName === 'H4'){
      const goalId = parseInt(event.target.dataset.id)
      navStep.style.display = 'block'
      navStep.dataset.id = goalId

      fetchGoalDetail(goalId)
        .then(json => {
          const goalData = json.data.attributes
          const newGoal = new Goal(goalData.title, goalData.category, goalData.steps, json.data.relationships.user.data.id, goalData.completed, json.data.id)
          newGoal.renderDetail()
        })
    }
  }

  function fetchGoalDetail(goalId) {
    return fetch(BASE_URL + `1/goals/${goalId}`)
      .then(res => res.json())
  }

  function getHeaders() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  // update goal with completed status
  function updateGoalFetch(goalId, goalData) {
    return fetch(BASE_URL + `1/goals/${goalId}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(goalData)
    }).then(res => res.json())
  }

  function updateStepFetch(goalId, data, stepId) {
    return fetch(`${BASE_URL}1/goals/${goalId}/steps/${stepId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(res => res.json())
  }

  function updateStep(event){
    const stepId = parseInt(event.target.dataset.id)
    const stepTrue = {completed: true}
    const stepFalse = {completed: false}
    const goalId = parseInt(goalDetail.firstChild.firstChild.firstChild.dataset.id)
    const parentNode = event.target.parentNode

    if (parentNode.className === "ui toggle checkbox") {
      if (!parentNode.firstChild.checked) {
      updateStepFetch(goalId, stepTrue, stepId).then(json => {
        fetchGoalDetail(goalId)
          .then(json => {
            // turn this into function
            const goalData = json.data.attributes
            const newGoal = new Goal(goalData.title, goalData.category, goalData.steps, json.data.relationships.user.data.id, goalData.completed, json.data.id)
            newGoal.renderDetail()
          })
      })
      } else {
        updateStepFetch(goalId, stepFalse, stepId).then(json => {
          fetchGoalDetail(goalId)
            .then(json => {
              const goalData = json.data.attributes
              const newGoal = new Goal(goalData.title, goalData.category, goalData.steps, json.data.relationships.user.data.id, goalData.completed, json.data.id)
              newGoal.renderDetail()
            })
        })
      }
    }
  }

  function toggleGoalCompletion(event) {
    const goalId = parseInt(event.target.dataset.id)
    const goalTrue = {completed: true}
    const goalFalse = {completed: false}
      const statDiv2 = document.getElementsByClassName("statistic")[1]
      const statsValue = parseInt(statDiv2.children[0].innerText)
      const cardGoals = document.getElementsByClassName('goal-content-card')

      if (event.target.parentNode.dataset.checked === "true") {
          addLineThrough(cardGoals, goalId)
          event.target.parentNode.dataset.checked = false
          updateGoalFetch(goalId, goalFalse)
          statDiv2.innerHTML = `<div class="value">${statsValue - 1}</div><div class="label">  Goals Completed  </div>`
          event.target.innerText = "Mark Goal Complete"
          event.target.className = "ui green button"
      } else {
          addLineThrough(cardGoals, goalId)
          updateGoalFetch(goalId, goalTrue)
          event.target.parentNode.dataset.checked = true
          statDiv2.innerHTML = `<div class="value">${statsValue + 1}</div><div class="label">  Goals Completed  </div>`
          event.target.innerText = "Mark Goal Incomplete"
          event.target.className = "ui red button"
      }
  }

  function addLineThrough(cardGoals, goalId) {
    for (let i of cardGoals) {
      const cardId = parseInt(i.children[0].dataset.id)
      if (cardId === goalId) {
        if (i.style.textDecoration != "line-through") {
          i.style.textDecoration = "line-through"
        } else {
            i.style.textDecoration = "none"
        }
      }
    }
  }




})()
