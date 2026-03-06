import {useState,useRef,useEffect} from "react"
import "./App.css"

function App(){

const [message,setMessage] = useState("")
const [chat,setChat] = useState([])
const [typing,setTyping] = useState(false)

const chatEndRef = useRef(null)

useEffect(()=>{
  chatEndRef.current?.scrollIntoView({behavior:"smooth"})
},[chat,typing])

const typeWriter = (text,index=0,current="")=>{
  
  if(index < text.length){
    
    setChat(prev=>{
      const updated=[...prev]
      updated[updated.length-1].bot=current + text[index]
      return updated
    })

    setTimeout(()=>{
      typeWriter(text,index+1,current + text[index])
    },20)
  }
}

const sendMessage = async ()=>{

if(!message.trim()) return

const newChat=[...chat,{user:message}]
setChat(newChat)
setMessage("")
setTyping(true)

const response = await fetch("http://localhost:5000/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({message})
})

const data = await response.json()

setTyping(false)

setChat(prev=>[...prev,{bot:""}])

typeWriter(data.reply)

}

return(

<div className="app">

<div className="chat-container">

<div className="chat-header">
🥗 AI Diet Recommendation Bot
</div>

<div className="chat-box">

{chat.map((c,i)=>(
<div key={i}>

{c.user && (
<div className="message user">
<div className="bubble">{c.user}</div>
</div>
)}

{c.bot !== undefined && (
<div className="message bot">
<div className="bubble">{c.bot}</div>
</div>
)}

</div>
))}

{typing && (
<div className="message bot typing">
Bot is typing...
</div>
)}

<div ref={chatEndRef}/>

</div>

<div className="input-area">

<input
value={message}
onChange={(e)=>setMessage(e.target.value)}
placeholder="Ask about diet, calories, weight loss..."
onKeyDown={(e)=>e.key==="Enter" && sendMessage()}
/>

<button onClick={sendMessage}>
Send
</button>

</div>

</div>

</div>

)

}

export default App