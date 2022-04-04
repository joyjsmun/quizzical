import { useEffect, useState } from "react"
import shuffle from "./Shuffle";

export default function Quiz() {
    const [formData,setFormData] = useState({
        loading:false,
        data:[],
        answers:[]
    })

    useEffect(()=>{
        setFormData({loading:true, data:[],answers:[]})
        fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then(data => setFormData(
            {
            loading:false,
            data:data.results,
            answers:data.results.map(t => {
                let newArray = []
                newArray = t.incorrect_answers.map(an => an)
                newArray.push(t.correct_answer)
               return (
                    shuffle(newArray)
               )
            })
        })) 
    },[])


    console.log(formData.answers)

   
    return(
        <div className="quizMain">
          {formData.loading ? "...loading" : formData.data.map((q) => (
           <div className="question__section">
                <div className="question__menu">
                <h3 className="question">{q.question}</h3>
                {/* <p>☰</p> */}
            </div>
                <div className="answer__box">
                    {/* {!q.incorrect_answers ? null 
                    : 
                    q.incorrect_answers.map(an => <div className="answer">{an}</div>)} */}
                    {/* <div className="answer">1</div>
                    <div className="answer">2</div>
                    <div className="answer">3</div>
                    <div className="answer">4</div> */}
                </div>
            <hr/>
            </div>
            
            ))}
        </div>
    )
}