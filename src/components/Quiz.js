import DataFetcher from "./DataFetcher";

export default function Quiz() {
    return(
        <div className="quizMain">
            
            <div className="question__section">
                <div className="question__menu">
                <h3 className="question">In what year was the game "Fallout" released?</h3>
                <p>☰</p>
            </div>
                <div className="answer__box">
                    <div className="answer">1</div>
                    <div className="answer">2</div>
                    <div className="answer">3</div>
                    <div className="answer">4</div>
                </div>
            <hr/>
            </div>
<DataFetcher />

        </div>
    )
}