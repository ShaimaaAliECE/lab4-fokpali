const express = require('express');
let questionsList = require('./questions.json');

const app = express();

// serve static contents
app.use(express.static('static'));

// dynamic handling

app.get('/questionsInJson', (req,res) => {
    res.json(questionsList);
})

app.get('/answers/:ans/question/:que', (req,res) => {
    let answer=req.params.ans;
    let question=req.params.que;
    let array='';
    for(a of questionsList)
    {
         array+=a.answerIndex;
    }
    if(answer==array[question])
    { 
        res.send("Correct!");
    }
    else  res.send("Incorrect!");
})
app.get('/score/:leng/selections/:anschose', (req,res) => {
    let length=req.params.leng;
    let answerChosen=req.params.anschose;
    let score=0;
    let x=0;
    for(a of questionsList)
    {
       if (answerChosen[x]==a.answerIndex)
       {score++;}
       x++;
    }
    res.send('<h>Your score is: <h>'+score +"/"+length+"<br><p><i>Please refresh to start again</i></p>");
})

app.listen(80);