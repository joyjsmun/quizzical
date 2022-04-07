import { useEffect, useState } from "react"
import shuffle from "./Shuffle";

export default function Quiz() {
    const [formData,setFormData] = useState({
        loading:false,
        data:[],
        answers:[]
    })

    const [errorMsg,setErrorMsg] = useState(false)

    const [checked,setChecked] = useState(false)

// fiqure out how to save the clicked answers and tally the score
  
    let correctArray =[]
    const checkedAnswer = (answer) => {
        correctArray.push(answer)
        // console.log(correctArray)
    }

    const clicked = (event) => {
        event.preventDefault()
        event.target.classList.toggle('clicked') 
      
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log("working")
        const ansLength = document.getElementsByClassName("clicked").length
       setErrorMsg(() => {
           if(ansLength < 5){
               console.log(ansLength)
               return true
           }else{
            console.log(ansLength)
               return false
           }
       })
    }

 

    useEffect(()=>{
        setFormData({loading:true, data:[],answers:[]})
        fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then(data => setFormData(
            {
            loading:false,
            data:data.results,
            answers:data.results.map(t => {
                let newAnswersArray = []
                newAnswersArray = t.incorrect_answers.map(an => an)
                newAnswersArray.push(t.correct_answer)
               return (
                    shuffle(newAnswersArray)
               )
            })
        })) 
    },[])

    
   
    return(
        <div className="quizMain">
          {formData.loading ? "...loading" : formData.data.map((item, index) => (
            <div className="question__section">
                <div className="qustion__menu">
                    <div className="question">{item.question}</div>
                    {checkedAnswer(item.correct_answer)}
                    
                </div>
            <div className="answer__box"  >
                {formData.answers 
                && formData.answers[index].map((a,i) => (
                <div className="answer" onClick={clicked} >{(a).toString()}
               
                </div>
                
                ))}
                
            </div>
            <hr/>
          </div>
          
            ))}
            <div className="bottom">
            {errorMsg && <p>Please answer all questions!</p>}
            {!formData.loading && <button onClick={submitHandler} className="submit__button">Check Answers</button>}
            </div>
        </div>
    )
}

{/* <p>☰</p> */}