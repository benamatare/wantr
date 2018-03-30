
function landingPage() {
  document.body.style.background = "#F7F7F7"
  const hello = document.createElement('div')
  document.body.append(hello)
  hello.style.display = "none"
  hello.id = "landing-div"
  hello.style.color = "#1B1C1D"
  hello.style.margin = "-15% 0% 10% 20%"
  hello.innerHTML =
  `
  <h1 id="landing-header">W A N T R<h1>
  <h3 id="landing-sub"> a simple productivity dashboard <h3>
  `
  const runner = document.createElement('div')
  runner.id ="running-landing-div"
  runner.innerHTML = `<img id="running-landing" src="images/running2.gif">`
  runner.style.display = "none"
  document.body.append(runner)

  $('#landing-div')
  .transition('fly left');

  $('#running-landing-div')
  .transition('fly left');

  setTimeout(()=> {
    document.body.removeChild(hello)
    document.body.removeChild(runner)
    writeAMessage()
  }, 5000)
}

function writeAMessage() {
  document.body.style.background = "#1B1C1D"
  const hello = document.createElement('div')
  hello.style.color = "#F7F7F7"
  hello.id = "message-div"
  hello.style.margin = "-20% 10% 0% 20%"
  hello.style.display = "none"
  document.body.append(hello)
  setTimeout(()=> {
    $('#message-div')
    .transition('fade');
    hello.innerHTML += "We "
  }, 1000)
  setTimeout(()=> {
    hello.innerHTML += "help "
  }, 1400)
  setTimeout(()=> {
    hello.innerHTML += "you <br>"
  }, 1800)
  setTimeout(()=> {
    hello.innerHTML += "keep "
  }, 2200)
  setTimeout(()=> {
    hello.innerHTML += "your "
  }, 2600)
  setTimeout(()=> {
    hello.innerHTML += "goals <br>"
  }, 3000)
  setTimeout(()=> {
    hello.innerHTML += "in "
  }, 3400)
  setTimeout(()=> {
    hello.innerHTML += "sight."
  }, 3800)
  setTimeout(()=> {
    document.body.style.background = "#F7F7F7"
    document.body.removeChild(hello)
    $('#user-container')
    .transition('fade');
  }, 5000)
}


// WANTR
// a simple productivity dashboard

// We help you keep your goals in sight.
