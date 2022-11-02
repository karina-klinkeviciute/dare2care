


// We need to first display description and a button "Start quiz"
// We need to build the questions array first, taking random situations from each group and randomizing choices
// Then we need to add initial variables for calculating results
// We also need a variable for the question number
// Then we need to show first question. We can use event for this
// After clicking "start quiz" or "next question" we add results to the total and take the next question. This needs a function and 2 events
// If it's a last question, we show "show answer" instead of "submit and after clicking that we get all the results" 


results = {
    1: "pirmas paaiškinimas",
    2: "antras paaiškinimas",
    3: "trečias paaiškinimas"
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

async function selectSituations() {

    const data = await import('./questions.js')

    const groups = data.default.groups

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

    // TODO: randomizuojam atsakymus (ka=kur, gal prieš rodant)

}

const situations = await selectSituations()
console.log(situations)

var currentSituation = 0
var pointsTotal = 0
var answers = []

const startButton = document.getElementById("start")
const nextButton = document.getElementById("submit")

const situationDiv = document.getElementById("situation")
situationDiv.style.display = "none"

const imageDiv = document.getElementById("image")
const descriptionDiv = document.getElementById("description")
const choicesDiv = document.getElementById("choices")


function showSituation() {
    console.log("showing situation: ", currentSituation)
    situationDiv.style.display = "block"
    let situation = situations[currentSituation]
    let image = situation["image"]
    imageDiv.innerHTML = `<img src="images/${image}" alt="">`

    let description = situation["description"]

    descriptionDiv.innerText = description
    
}


function showResults() {
    // TODO: parodom atsakymą pagal surinktus taškų skaičius. 
    // Taip pat parodom atsakytus atsakymus ir situacijų paaiškinimus.
}

function addPoints(){
    // TODO: pridedam tiek points, kiek turi currentSituation 
    // ir pasižymim, kuris variantas buvo pasirinktas, į "answers"
}


startButton.addEventListener("click", showSituation);
nextButton.addEventListener("click", ()=>{
    addPoints()
    currentSituation += 1
    if (currentSituation <9){

        showSituation()
    }
    else {
        showResults()
    }
    
});



// for (let group in groups)
//     {
    
//         let situations_group = groups[group]
//         for (let situation in situations_group.situations)
//         {
//             // console.log(situation, " klausimas:")
//             console.log(situations_group.situations[situation])
            
//             // adding image
//             let image = situations_group.situations[situation]["image"]
//             let imageDiv = document.getElementById("image")
//             imageDiv.innerHTML = `<img src="images/${image}" alt="">`

//             // adding description
//             let description = situations_group.situations[situation]["description"]
//             let descriptionDiv = document.getElementById("description")
//             descriptionDiv.innerText = description

//             // adding answers
//             let choicesDiv = document.getElementById("choices")
//             for(let choice in situations_group.situations[situation]["choices"])
//                 {
//                     console.log(situations_group.situations[situation].choices[choice])
//                     let choiceDiv = document.createElement("div")
//                     choiceDiv.innerText = situations_group.situations[situation].choices[choice].text
//                     choicesDiv.appendChild(choiceDiv)
//                 }
//         }
//     }
