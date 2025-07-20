import express from "express"
import cors from "cors"
import { spawn } from "child_process"
const app = express()
app.use(express.json())

app.use(cors({
    origin:'http://localhost:3000',
    method:['GET','POST'],
    credentials:true
}))

app.post('/api/spam-detection',(req,res)=>{
    const data = req.body
    console.log(data['message'])
    const py = spawn('python',['Heart.py',data['message']])

    let ans = ""
    py.stdout.on("data",(data)=>{
        ans += data.toString()
    })

    py.stderr.on("data",(data)=>{
       console.log(`Error is :- ${data}`)
    })  

    py.on("close",(code)=>{
        try {
            const result = JSON.parse(ans)
            console.log(result)
            res.status(200).json({
                isSpam : result.label.toLowerCase() === 'spam',
                confidence : result.confidence/100
            })
        } catch (error) {
            console.error("Error parsing Python output:", error);
            res.status(500).json({ error: "Spam detection failed" });
        }
    })
})

app.listen(5000,()=> {
   console.log("Hi from backend!!!")
})

