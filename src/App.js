import { useState } from "react";
import Header from "./components/Header";
import Intro from "./components/Intro";
import Quiz from "./components/Quiz";

function App() {
  const [intro,setIntro] = useState(false)

  function introPage(){
    setIntro(prev => !prev)
  }


  return (
      <main>
        <Header />
        {intro && <Intro setIntro={introPage} />}
        {!intro && <Quiz />}
      </main>
  );
}

export default App;
