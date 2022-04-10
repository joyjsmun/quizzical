import { useEffect, useState } from "react"
import shuffle from "./Shuffle";

export default function Quiz() {
    const [formData,setFormData] = useState({
        loading:false,
        data:[],
        answers:[],
      
    })

    const [errorMsg,setErrorMsg] = useState(false)
    const [totalScore,setTotalScore] = useState(0)
    const [submited,setSubmit] = useState(false)


    let checkedAnswerArray = []
    let correctAnswersArray = []
    let correctArray =[]
    let score = 0

  


    const compareAnswer = () =>{
        for(let i = 0; i < checkedAnswerArray.length; i++){
            for(let j =0; j<correctAnswersArray.length; j++){
                if(checkedAnswerArray[i] === correctAnswersArray[j]){
                    score++
                    console.log("yes match",score, checkedAnswerArray[i],correctAnswersArray[j]);
                    continue;
                }

            }
        }
     setTotalScore(score)
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

    const replayHandler = (event) => {
        setSubmit(prev => !prev)

        document.location.reload(true)
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
            setSubmit(prev => !prev)
            combineAnswer()
            combineCorrectAnswers() 
            compareAnswer()
           }
       })
    }


 
    useEffect(()=>{
        setFormData({loading:true, data:[],answers:[]})
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy")
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
                    {marking(item.correct_answer)}
                </div>
                
        {!submited ? <div className="answer__box"  >
                <p>{console.log(item.correct_answer)}</p>
                {formData.answers 
                && formData.answers[index].map((a,i) => (
                <div className="answer" onClick={clicked} >{a}</div>
                ))}
            </div> :
                <div className="answer__box"  >
                <p>{console.log(item.correct_answer)}</p>
                {formData.answers 
                && formData.answers[index].map((a,i) => (
                <div className="answer" onClick={clicked} >{item.correct_answer === a ? <p className="correctAnswer">{a}</p> : a}</div>
                ))}
            </div>
            }
            <hr/>
          </div>
          
            ))}
            {!submited ? <div className="bottom">
            {errorMsg && <p>Please answer all questions!</p>}
            {!formData.loading && <button onClick={submitHandler} className="submit__button">Check Answer</button>}
            </div>
            : 
            <div className="bottom">
            {totalScore > 0 && <p id="score">Total Scores: {totalScore} /5</p>}
            <button onClick={replayHandler} className="submit__button">Play Again</button>
            </div>
        }
        </div>
    )
}

