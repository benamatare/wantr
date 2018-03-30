
function notGoalFetch(){
  return fetch(`${BASE_URL}1/goals`).then(res => res.json())
}

function someUserFetch(){
  return fetch(`${BASE_URL}1`).then(res => res.json())
}

function displayDonutChart(){
  chartContainer.style.display = "block"
    notGoalFetch().then(json => {
      let data = json.data
      const filteredData = data.map(goal => {
        return goal.attributes.category
      })
      let counts = {};
      // filteredData.forEach(function(category) { counts[category] = (counts[category] || 0)+1; });
      filteredData.forEach(category => {
        if (counts[category]) {
          counts[category] += 1
        } else {
          counts[category] = 1
        }
      })
      let finalCats = []
      let finalCount = []
      for (let i in counts) {
        finalCount.push(counts[i])
        finalCats.push(i)
      }
      showDonutChart(finalCount, finalCats)
      // return finalCount
    }
  )
}

function displayLineChart() {
  chartContainer.style.display = "block"
    someUserFetch().then(json => {
      const goalsArray = json.data.attributes.goals
      const totalGoals = goalsArray.length
      // "2018-03-28T18:47:13.157Z"
      const january = goalsArray.filter(goal =>  {
        return goal.created_at.slice(5,7) === "01"
      }).length
      const febuary = goalsArray.filter(goal =>  {
        return goal.created_at.slice(5,7) === "02"
      }).length
      const march = goalsArray.filter(goal =>  {
        return goal.created_at.slice(5,7) === "03"
      }).length
      const april = goalsArray.filter(goal =>  {
        return goal.created_at.slice(5,7) === "04"
      }).length
      const may = goalsArray.filter(goal =>  {
        return goal.created_at.slice(5,7) === "05"
      }).length
      const june = goalsArray.filter(goal =>  {
        return goal.created_at.slice(5,7) === "06"
      }).length
      const july = goalsArray.filter(goal =>  {
        return goal.created_at.slice(5,7) === "07"
      }).length
      const august = goalsArray.filter(goal =>  {
        return goal.created_at.slice(5,7) === "08"
      }).length
      const september = goalsArray.filter(goal =>  {
        return goal.created_at.slice(5,7) === "09"
      }).length
      const october = goalsArray.filter(goal =>  {
        return goal.created_at.slice(5,7) === "10"
      }).length
      const november = goalsArray.filter(goal =>  {
        return goal.created_at.slice(5,7) === "11"
      }).length
      const december = goalsArray.filter(goal =>  {
        return goal.created_at.slice(5,7) === "12"
      }).length


      const monthsArray = [january, febuary, march, april, may, june, july, august, september, october, november, december]
      showLineChart(monthsArray)
    })
}


function showLineChart(dataArray) {
  const chartContent = document.getElementById("chart-content")
  chartContent.innerHTML = `<canvas id="myChart" height="130px"></canvas>`
  const ctx = document.getElementById('myChart')

  const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          datasets: [{
              label: "# of Goals",
              data: dataArray,
              backgroundColor: [
                '#3B6354',
                '#0D1831',
                '#3C1B3B',
                '#702D5C',
                '#973C5F',
                '#D2A455',
                '#FEC8D7',
                '#43313B',
                '#616863',
                '#A6B7D9',
                '#D3D4D8',
                '#F0E7E3',

            ],
            borderColor: [
              '#3B6354',
              '#0D1831',
              '#3C1B3B',
              '#702D5C',
              '#973C5F',
              '#D2A455',
              '#FEC8D7',
              '#43313B',
              '#616863',
              '#A6B7D9',
              '#D3D4D8',
              '#F0E7E3',
            ],
              borderWidth: 1
          }]
      },
      options: {
        legend: {
          display: false,
          position: "left"
        },
        tooltips: {
          enabled: true
        },
        title: {
            display: true,
            text: 'Monthly Goals'
        },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
}

function showDonutChart(numbers, categories) {

  const chartContent = document.getElementById("chart-content")
  chartContent.innerHTML = `<canvas id="myChart" height="130px"></canvas>`
  const ctx = document.getElementById('myChart')

  const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: categories,
          datasets: [{
              data: numbers,
              backgroundColor: [
                  '#FD8B55',
                  '#B2362C',
                  '#1E2032',
                  '#909EAF',
                  '#C3CDD6',
                  '#E1E4E9'
              ],
              borderColor: [
                  '#FD8B55',
                  '#B2362C',
                  '#1E2032',
                  '#909EAF',
                  '#C3CDD6',
                  '#E1E4E9'
              ],
              borderWidth: 2
            }]
      },
      options: {
        legend: {
          display: true,
          position: "left"
        },
        tooltips: {
          enabled: true
        }
      }
  })
}
