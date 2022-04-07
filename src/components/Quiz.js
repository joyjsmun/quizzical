import { useEffect, useState } from "react"
import shuffle from "./Shuffle";

export default function Quiz() {
    const [formData,setFormData] = useState({
        loading:false,
        data:[],
        answers:[],
        score:""
    })

    const [errorMsg,setErrorMsg] = useState(false)

    const [checked,setChecked] = useState(false)

// fiqure out how to save the clicked answers and tally the score

    let checkedAnswerArray = []
    let correctAnswersArray = []
    let correctArray =[]
    let score = ""

    const compareAnswer = () =>{
        for(let i = 0; i < checkedAnswerArray.length; i++){
            for(let j =0; j<correctAnswersArray.length; j++){
                if(checkedAnswerArray[i] === correctAnswersArray[j]){
                    score++
                    console.log("yes match",score, checkedAnswerArray[i],correctAnswersArray[j]);
                    continue;
                }
                // console.log("no match",checkedAnswerArray[i], correctAnswersArray[j])
            }
        }
    } 


    const combineCorrectAnswers = () => {
        for(let i=0; i<5; i++){
            correctAnswersArray.push(formData.data[i].correct_answer)
            
        }
        return correctAnswersArray
    }


    
    const marking = (answer) => {
        correctArray.push(answer)
      
    }

    const clicked = (event) => {
        event.preventDefault()
        event.target.classList.toggle('clicked') 
      
    }

  
    const submitHandler = (event) => {
        event.preventDefault();
        const answers = document.getElementsByClassName("clicked")
        const ansLength = answers.length
      
        function combineAnswer(){
       for(let i=0; i< ansLength; i++){
           checkedAnswerArray.push(answers[i].outerText)
       }
    }
      
       setErrorMsg(() => {
           if(ansLength < 5){
               return true
           }else{
            combineAnswer()
            combineCorrectAnswers() 
            compareAnswer()
            console.log(checkedAnswerArray)
            console.log(correctAnswersArray)
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
            score:"",
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
                    {marking(item.correct_answer)}
                    
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
            {score ? <p id="score">{score}</p> : null}
            {errorMsg && <p>Please answer all questions!</p>}
            {!formData.loading && <button onClick={submitHandler} className="submit__button">Check Answers</button>}
            </div>
        </div>
    )
}

{/* <p>☰</p> */}