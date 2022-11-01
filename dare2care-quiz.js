const data = await import('./questions.js')

const groups = data.default.groups


// We need to first display description and a button "Start quiz"
// We need to build the questions array first, taking random situations from each group and randomizing choices
// Then we need to add initial variables for calculating results
// We also need a variable for the question number
// Then we need to show first question. We can use event for this
// After clicking "start quiz" or "next question" we add results to the total and take the next question. This needs a function and 2 events
// If it's a last question, we show "show answer" instead of "submit and after clicking that we get all the results" 


for (let group in groups)
    {
    
        let situations_group = groups[group]
        for (let situation in situations_group.situations)
        {
            // console.log(situation, " klausimas:")
            console.log(situations_group.situations[situation])
            
            // adding image
            let image = situations_group.situations[situation]["image"]
            let imageDiv = document.getElementById("image")
            imageDiv.innerHTML = `<img src="images/${image}" alt="">`

            // adding description
            let description = situations_group.situations[situation]["description"]
            let descriptionDiv = document.getElementById("description")
            descriptionDiv.innerText = description

            // adding answers
            let choicesDiv = document.getElementById("choices")
            for(let choice in situations_group.situations[situation]["choices"])
                {
                    console.log(situations_group.situations[situation].choices[choice])
                    let choiceDiv = document.createElement("div")
                    choiceDiv.innerText = situations_group.situations[situation].choices[choice].text
                    choicesDiv.appendChild(choiceDiv)
                }

        }



    }
