import { useEffect, useState } from "react"

// don't use this time... 

export default function DataFetcher(props){
    const [formData,setFormData] = useState({
        loading:false,
        data:null
    })

    useEffect(() => {
        setFormData({loading:true})
        fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then(data => setFormData({data:data,loading:false}))
    },[])

    const {loading,data} = formData

    return(
            props.children(loading,data)
    )
}