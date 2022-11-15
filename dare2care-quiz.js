


// We need to first display description and a button "Start quiz"
// We need to build the questions array first, taking random situations from each group and randomizing choices
// Then we need to add initial variables for calculating results
// We also need a variable for the question number
// Then we need to show first question. We can use event for this
// After clicking "start quiz" or "next question" we add results to the total and take the next question. This needs a function and 2 events
// If it's a last question, we show "show answer" instead of "submit and after clicking that we get all the results" 
// import questions from './questions.js';
(async() => {
const explanations = {
    1: `<span>Rezultatas:</span>
        <h3>Smurtiniai santykiai</h3>
        <p>
        Tai santykiai, kuriuose yra daug žodinio, psichologinio, emocinio ar fizinio smurto elementų.
        Kai partneris/ė:
        - komunikuoja skaudindamas/a, manipuliuodamas/a ar grasindamas/a.
        - negražiai elgiasi kito atžvilgiu (mistreating)
        - be pagrindo kaltina išdavyste (cheating)
        - nemano ir nepripažįsta, kad jo/s veiksmai yra smurtiniai
        - kontroliuoja
        - izoliuoja savo partnerį/ę nuo kitų
        `,
    2: `<span>Rezultatas:</span>
        <h3>Nesveiki santykiai</h3>
        <p>
        Tai santykiai, kuriems neretai trūksta pagarbos ir tolerancijos. Neretai partneriai/ės:
        - nebendrauja
        - negerbia
        - nepasitiki
        - nėra nuoširdūs/džios
        - mėgina kontroliuoti
        - spaudžia kažkokiom veiklom
        - sukuria ekonominį spaudimą`,
    3: `<span>Rezultatas:</span>
        <h3>Sveiki santykiai</h3>
        <p>
        Tai pagarbūs vienas kitam santykiai, kuomet tu ir tavo partneris/ė:
        - pasitiki vienas/a kitu/a
        - esate nuoširdūs/džios ir atviri/os vienas/a kitam/ai
        - lygūs
        - kur galite mėgautis laiku būnant atskirai
        - problemas ir svarbius klausimus sprendžiate kartu
        - nedarote vienas/a kitam/ai ekonominio/finansinio spaudimo
        - praktikuojate sutikimą (visais lygiais)
        - pripažįstama autonomija ir orumas
        - partnerio/ės asmenybės augimo palaikymas
        - problemos sprendžiamos adekvačiai prisiimant atsakomybę
    `
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

async function selectSituations() {

    const data = await import('./questions.js')

    const groups = data.questions.groups

    console.log("data: ", data)

    var situations = []

    for (let groupNumber in groups){
        let group = groups[groupNumber]
        let situationsNumbers = []
        
        let numbers = 0
        while (numbers < 3)
        {
            let number = randomInteger(1,10)
            if (!situationsNumbers.includes(number)) {
                numbers += 1
                situationsNumbers.push(number)
            } 
        }

        for (let situationNumber in situationsNumbers){
            situations.push(group.situations[situationsNumbers[situationNumber]])
        }
        

    }
    // shuffling the array, so that questions wouldn't be lumped by groups
    situations = situations
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

    return situations

}

const situations = await selectSituations()

var currentSituation = 0
var answers = []
var currentChoice = ""

const intro = document.getElementById("intro");
const startButton = document.getElementById("start")
const nextButton = document.getElementById("submit")

const situationDiv = document.getElementById("situation")
situationDiv.style.display = "none"

const imageDiv = document.getElementById("image")
const imageTag = document.getElementById("image-tag")
const imageBaseSource = imageTag.src
const descriptionDiv = document.getElementById("description")
const choicesDiv = document.getElementById("choices")

const choiceA = document.getElementById("A")
const choiceB = document.getElementById("B")
const choiceC = document.getElementById("C")

const resultsDiv = document.getElementById("results")

const explanationsDiv = document.getElementById("explanations")
const explanationDiv = document.getElementById("explanation")


function randomizeChoices(){
    // shuffling choices
    let ul = document.getElementById("choices")
    for (let i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0])
    }
}


function showSituation() {
    randomizeChoices()
    situationDiv.style.display = "block"
    intro.style.display = "none"
    let situation = situations[currentSituation]
    let image = situation["image"]
    let description = situation["description"]
    let choices = situation["choices"]
    // TODO: šitą sutvarkyti PHP dalyje, ir keisti tik tą dalį, kur pats paveiksliuko numeris. Tas pats kur explanation
    imageTag.src = imageBaseSource + image
    descriptionDiv.innerText = description
    for (let choice in choices)
    {
        let choiceDiv = document.getElementById(choice)
        choiceDiv.classList.remove("box")
        choiceDiv.innerText = choices[choice].text
    }
    
}

function showResults() {
    resultsDiv.style.display = "block";
    let results = 0
    for (let answer of answers){
        if (answer == "B")
        {
            results += 1
        }
        else if (answer == "A")
        {
            results += 2
        }
    }
    if (results <=6)
        {resultsDiv.innerHTML = explanations[1]}
    else if (results <= 12)
        {resultsDiv.innerHTML = explanations[2]}
    else 
        {resultsDiv.innerHTML = explanations[3]}

    // Showing selected answers and their explanations
    for (let situationNumber in situations)
        {
            let situation = situations[situationNumber]
            let answer = answers[situationNumber]
            let image = situation["image"]
            let description = situation["description"]
            let choices = situation["choices"]
            let explanation = situation["explanation"]

            let explanationCloneDiv = explanationDiv.cloneNode(true)
            explanationCloneDiv.style.display = "block"
            explanationDiv.classList.remove("hidden")
            explanationCloneDiv.id = explanationCloneDiv.id + "-" + situationNumber
            for (let child of explanationCloneDiv.children)
                {
                    if (child.id == "explanation-image"){
                        child.innerHTML = `<img src="${imageBaseSource+image}" alt="">`
                    }
                    if (child.id == "explanation-description"){
                        child.innerHTML = description
                    }
                    if (child.id == "explanation-text"){
                        child.innerHTML = explanation
                    }
                    if (child.id == "explanation-choices"){
                        for (let childChoice of child.children){
                            
                            console.log(choices)
                            let choiceLetter = childChoice.id[12]
                            childChoice.innerHTML = choices[choiceLetter].text
                            if (choiceLetter == answer){
                                childChoice.classList.add("box", "chosen")
                            }
                            else {
                                childChoice.classList.remove("box", "chosen")
                            }
                        }
                    }
                    child.id = child.id + "-" + situationNumber

                }

            explanationsDiv.appendChild(explanationCloneDiv)
        }

}

function choiceClicked(choice)
{
    currentChoice = choice
    let clickedDiv = document.getElementById(choice)
    choiceA.classList.remove("box", "chosen")
    choiceB.classList.remove("box", "chosen")
    choiceC.classList.remove("box", "chosen")
    clickedDiv.classList.add("box", "chosen")
    // TYTE: added quiz alert check
    let quiz_alert = document.querySelector(".quiz-alert");
    if (quiz_alert) {
        quiz_alert.remove();
    }
}

choiceA.addEventListener("click", ()=> choiceClicked("A"))
choiceB.addEventListener("click", ()=> choiceClicked("B"))
choiceC.addEventListener("click", ()=> choiceClicked("C"))

startButton.addEventListener("click", showSituation)
nextButton.addEventListener("click", ()=>{
    console.log(currentChoice)
    if (!currentChoice == "") {
        answers.push(currentChoice)
        currentSituation += 1
        if (currentSituation <9){

            showSituation()
        }
        else {
            situationDiv.style.display = "none"
            showResults()
        }
        currentChoice = ""
        // TYTE: added this to remove the chosen class from the choices after clicking next
        let chosen = document.querySelector('.chosen');
        if (chosen) {
            chosen.classList.remove('chosen');
        }
    // TYTE: added message that appears when no answer is selected    
    } else {
        nextButton.insertAdjacentHTML( 'afterEnd', '<span class="quiz-alert">Pasirinkite atsakymą!</span>' );
    }
});

})();
