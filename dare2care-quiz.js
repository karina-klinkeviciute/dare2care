(async() => {
const explanations = {
    1: `<span>Rezultatas:</span>
        <h3>Smurtiniai santykiai</h3>
        <p>
        Tai santykiai, kuriuose yra daug žodinio, psichologinio, emocinio ar fizinio smurto elementų.
        Kai partneris/ė:
        - komunikuoja skaudindamas/a, manipuliuodamas/a ar grasindamas/a;
        - negražiai elgiasi kito atžvilgiu (mistreating);
        - be pagrindo kaltina išdavyste (cheating);
        - nemano ir nepripažįsta, kad jo/s veiksmai yra smurtiniai;
        - kontroliuoja;
        - izoliuoja savo partnerį/ę nuo kitų.
        `,
    2: `<span>Rezultatas:</span>
        <h3>Nesveiki santykiai</h3>
        <p>
        Tai santykiai, kuriems neretai trūksta pagarbos ir tolerancijos. Neretai partneriai/ės:
        - nebendrauja;
        - negerbia;
        - nepasitiki;
        - nėra nuoširdūs/džios;
        - mėgina kontroliuoti;
        - spaudžia kažkokioms veikloms;
        - sukuria ekonominį spaudimą.`,
    3: `<span>Rezultatas:</span>
        <h3>Sveiki santykiai</h3>
        <p>
        Tai pagarbūs vienas kitam santykiai, kuomet tu ir tavo partneris/ė:
        - pasitiki vienas/a kitu/a;
        - esate nuoširdūs/džios ir atviri/os vienas/a kitam/ai;
        - lygūs;
        - kur galite mėgautis laiku būnant atskirai;
        - problemas ir svarbius klausimus sprendžiate kartu;
        - nedarote vienas/a kitam/ai ekonominio/finansinio spaudimo;
        - praktikuojate sutikimą (visais lygiais);
        - pripažįstama autonomija ir orumas;
        - partnerio/ės asmenybės augimo palaikymas;
        - problemos sprendžiamos adekvačiai prisiimant atsakomybę.
    `
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

async function selectSituations() {

    const data = await import('./questions.js')

    const groups = data.questions.groups

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

const intro = document.getElementById("d2c-intro");
const startButton = document.getElementById("d2c-start")
const nextButton = document.getElementById("d2c-submit")
const restartButton = document.getElementById("d2c-restart")

const situationDiv = document.getElementById("d2c-situation")

const imageDiv = document.getElementById("d2c-image")
const imageTag = document.getElementById("d2c-image-tag")
const imageBaseSource = imageTag.src
const descriptionDiv = document.getElementById("d2c-description")
const choicesDiv = document.getElementById("d2c-choices")

const choiceA = document.getElementById("A")
const choiceB = document.getElementById("B")
const choiceC = document.getElementById("C")

const resultsDiv = document.getElementById("d2c-results")

const explanationsDiv = document.getElementById("d2c-explanations")
const explanationDiv = document.getElementById("d2c-explanation")

let progress = 0
const progressDiv = document.getElementById("d2c-progress");

function randomizeChoices(){
    // shuffling choices
    let ul = document.getElementById("d2c-choices")
    for (let i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0])
    }
}


function showSituation() {
    randomizeChoices()
    situationDiv.removeAttribute("hidden");
    intro.style.display = "none"
    let situation = situations[currentSituation]
    let image = situation["image"]
    let description = situation["description"]
    let choices = situation["choices"]
    imageTag.src = imageBaseSource + image
    descriptionDiv.innerText = description
    for (let choice in choices)
    {
        let choiceDiv = document.getElementById(choice)
        choiceDiv.classList.remove("d2c-box")
        choiceDiv.innerText = choices[choice].text
    }
    
}

function showResults() {
    resultsDiv.style.display = "block";
    explanationsDiv.removeAttribute("hidden");
    restartButton.parentElement.removeAttribute("hidden");
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
                    if (child.id == "d2c-explanation-image"){
                        child.innerHTML = `<img src="${imageBaseSource+image}" alt="">`
                    }
                    if (child.id == "d2c-explanation-description"){
                        child.innerHTML = description
                    }
                    if (child.id == "d2c-explanation-text"){
                        child.innerHTML = explanation
                    }
                    if (child.id == "d2c-explanation-choices"){
                        for (let childChoice of child.children){
                            
                            let choiceLetter = childChoice.id[12]
                            childChoice.innerHTML = choices[choiceLetter].text
                            if (choiceLetter == answer){
                                childChoice.classList.add("d2c-box", "d2c-chosen")
                            }
                            else {
                                childChoice.classList.remove("d2c-box", "d2c-chosen")
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
    choiceA.classList.remove("d2c-box", "d2c-chosen")
    choiceB.classList.remove("d2c-box", "d2c-chosen")
    choiceC.classList.remove("d2c-box", "d2c-chosen")
    clickedDiv.classList.add("d2c-box", "d2c-chosen")
    // TYTE: added quiz alert check
    let quiz_alert = document.querySelector(".d2c-quiz-alert");
    if (quiz_alert) {
        quiz_alert.remove();
    }
}

choiceA.addEventListener("click", ()=> choiceClicked("A"))
choiceB.addEventListener("click", ()=> choiceClicked("B"))
choiceC.addEventListener("click", ()=> choiceClicked("C"))

startButton.addEventListener("click", showSituation)
nextButton.addEventListener("click", ()=>{
    if (!currentChoice == "") {
        answers.push(currentChoice)
        currentSituation += 1
        progress ++;
        progressDiv.querySelector(".d2c-progress-info span").innerText = `${progress}`;
        progressDiv.classList.replace(`d2c-progress-${progress - 1}`, `d2c-progress-${progress}`);
        if (currentSituation <9){

            showSituation()
        }
        else {
            situationDiv.style.display = "none"
            showResults()
        }
        currentChoice = ""
        // TYTE: added this to remove the chosen class from the choices after clicking next
        let chosen = document.querySelector('.d2c-chosen');
        if (chosen) {
            chosen.classList.remove('d2c-chosen');
        }
    // TYTE: added message that appears when no answer is selected    
    } else {
        nextButton.insertAdjacentHTML( 'afterEnd', '<span class="d2c-quiz-alert">Pasirinkite atsakymą!</span>' );
    }
});

restartButton.addEventListener("click", function() {
    window.location.reload();
});

})();
