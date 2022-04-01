export default function Intro(props){
    return(
        <div className="intro">
            <h1>Quizzical</h1>
            <h3>Some description if needed</h3>
            <button onClick={props.setIntro}>Start Quiz</button>
        </div>
    )
}