const User = (function() {

  return class User {
    constructor(name, image = "images/logo.jpg", goals, steps) {
      this.name = name
      this.image = image
      this.goals = goals
      this.steps = steps
    }

    renderUser (){
      // const userContent = document.getElementById('user-content')
      const name = document.getElementById('user-name')
      // const img = document.getElementById('user-image')
      // const bio = document.getElementById('user-bio')
      name.innerText = this.name
      // img.src = this.image
      // bio.innerText = this.bio
    }

    renderStats() {
      const statDiv1 = document.getElementsByClassName("statistic")[0]
      const statDiv2 = document.getElementsByClassName("statistic")[1]
      const statDiv3 = document.getElementsByClassName("statistic")[2]

      statDiv1.innerHTML +=`<div id="total-goal-stat-card" class="value">${this.goals.length}</div><div class="label"> Total Goals </div>`
      statDiv2.innerHTML += `<div class="value">${this.completedGoals().length}</div><div class="label">  Goals Completed  </div>`
      // statDiv3.innerHTML += `<div id="total-step-stat" class="value">${this.steps.length}</div><div class="label">  Total Steps  </div>`
    }

    completedGoals() {
      // filter the goals array and get all the ones with completed === true
      const completedGoals = this.goals.filter(goal => {
        return goal.completed === true
      })
      return completedGoals
    }


  }

})()
