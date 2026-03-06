import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function MessageBubble({ message }) {

return(

<motion.div
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
transition={{duration:0.3}}

style={{
padding:"14px",
marginBottom:"14px",
borderRadius:"10px",
maxWidth:"75%",
lineHeight:"1.6"
}}

className={message.sender==="user" ? "user":"bot"}
>

<ReactMarkdown>
{message.text}
</ReactMarkdown>

</motion.div>

)

}