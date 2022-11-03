


// We need to first display description and a button "Start quiz"
// We need to build the questions array first, taking random situations from each group and randomizing choices
// Then we need to add initial variables for calculating results
// We also need a variable for the question number
// Then we need to show first question. We can use event for this
// After clicking "start quiz" or "next question" we add results to the total and take the next question. This needs a function and 2 events
// If it's a last question, we show "show answer" instead of "submit and after clicking that we get all the results" 


const explanations = {
    1: `
        Smurtiniai santykiai.
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
    2: `
        Nesveiki santykiai
        <p>
        Tai santykiai, kuriems neretai trūksta pagarbos ir tolerancijos. Neretai partneriai/ės:
        - nebendrauja
        - negerbia
        - nepasitiki
        - nėra nuoširdūs/džios
        - mėgina kontroliuoti
        - spaudžia kažkokiom veiklom
        - sukuria ekonominį spaudimą`,
    3: `Sveiki santykiai
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
var choice = ""
var currentChoice = ""

const startButton = document.getElementById("start")
const nextButton = document.getElementById("submit")

const situationDiv = document.getElementById("situation")
situationDiv.style.display = "none"

const imageDiv = document.getElementById("image")
const descriptionDiv = document.getElementById("description")
const choicesDiv = document.getElementById("choices")
const choiceA = document.getElementById("A")
const choiceB = document.getElementById("B")
const choiceC = document.getElementById("C")
const resultsDiv = document.getElementById("results")


function showSituation() {
    console.log("showing situation: ", currentSituation)
    situationDiv.style.display = "block"
    startButton.style.display = "none"
    let situation = situations[currentSituation]
    let image = situation["image"]
    imageDiv.innerHTML = `<img src="images/${image}" alt="">`

    let description = situation["description"]

    descriptionDiv.innerText = description

    let choices = situation["choices"]
    console.log("choices: ", choices)

    for (let choice in choices)
    {
        let choiceDiv = document.getElementById(choice)
        choiceDiv.innerText = choices[choice].text
    }
    
}

function showResults() {
    let results = 0
    for (let answer in answers){
        if (answers[answer] == "B")
        {
            results += 1
        }
        else if (answers[answer] == "A")
        {
            results += 2
        }
    }
    console.log("results: ", results)
    if (results <=6)
        {resultsDiv.innerHTML = explanations[1]}
    else if (results <= 12)
        {resultsDiv.innerHTML = explanations[2]}
    else 
        {resultsDiv.innerHTML = explanations[3]}

    // TODO: parodom atsakymą pagal surinktus taškų skaičius. 
    // Taip pat parodom atsakytus atsakymus ir situacijų paaiškinimus.
}

function choiceClicked(choice)
{
    currentChoice = choice
    console.log(choice)
    // TODO: save this choice to some separate variable and only push it when the "submit" button is pressed
}

choiceA.addEventListener("click", ()=> choiceClicked("A"))
choiceB.addEventListener("click", ()=> choiceClicked("B"))
choiceC.addEventListener("click", ()=> choiceClicked("C"))

startButton.addEventListener("click", showSituation);
nextButton.addEventListener("click", ()=>{
    answers.push(currentChoice)
    console.log(answers)
    currentSituation += 1
    if (currentSituation <9){

        showSituation()
    }
    else {
        situationDiv.style.display = "none"
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
