const data = await import('./questions.js')

const groups = data.default.groups

for (let group in groups)
    {
    
        let situations_group = groups[group]
        for (let situation in situations_group.situations)
        {
            console.log(situation, " klausimas:")
            console.log(situations_group.situations[situation])
            
            // adding image
            let image = situations_group.situations[situation]["image"]
            let imageDiv = document.getElementById("image")
            imageDiv.innerHTML = `<img scr="images/${image}" alt="">`
            // imageDiv.style.display="inline-block"

            // adding description
            let description = situations_group.situations[situation]["description"]
            let descriptionDiv = document.getElementById("description")
            descriptionDiv.innerText = description

            // adding answers
            let answersDiv = document.getElementById("answers")
            for(let answer in situations_group.situations[situation]["answers"])
                {
                    let answerDiv = document.createElement("div")
                    answerDiv.innerText = answer
                    answersDiv.appendChild(answerDiv)
                }

        }



    }
