import {useState} from "react"
import MessageBubble from "./MessageBubble"
import TypingIndicator from "./TypingIndicator"
import {getAIResponse} from "../services/aiService"

export default function ChatWindow(){

const [messages,setMessages]=useState([])
const [input,setInput]=useState("")
const [typing,setTyping]=useState(false)

async function sendMessage(){

if(!input) return

const userMessage={sender:"user",text:input}

setMessages(prev=>[...prev,userMessage])
setInput("")
setTyping(true)

const aiText=await getAIResponse(input)

setTyping(false)

typeMessage(aiText)

}

function typeMessage(text){

let i=0

const interval=setInterval(()=>{

i++

setMessages(prev=>{

const last=prev[prev.length-1]

if(last?.sender==="bot"){

const updated=[...prev]
updated[updated.length-1].text=text.slice(0,i)
return updated

}

return [...prev,{sender:"bot",text:text.slice(0,i)}]

})

if(i===text.length) clearInterval(interval)

},20)

}

return(

<div className="chat-card">

<div className="chat-header">
🥗 AI Nutrition Coach
</div>

<div className="messages">

{messages.map((msg,index)=>(
<MessageBubble key={index} message={msg}/>
))}

{typing && <TypingIndicator/>}

</div>

<div className="input-area">

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
placeholder="Ask about diet, calories, weight loss..."
/>

<button onClick={sendMessage}>
Send
</button>

</div>

</div>

)

}