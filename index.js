function Question(qText,options,ans){
    this.qText=qText;
    this.options=options;
    this.ans=ans;
}
function Quiz(questions){
    this.questions=questions;
    this.score=0;
    this.qIndex=0;
}

let questionsList=[
    new Question("Javascript supports",
    ["Functions","XHTML","CSS","HTML"],
    "Functions"),
    new Question("Which language is used for styling web pages",
    ["HTML","JQuery","CSS","XML"],
    "CSS"),
    new Question("Which is not a JS Framework",
    ["Python script","JQuery","Django","Node.js"],
    "Django"),
    new Question("Which is getting used to connect DB",
    ["PHP","HTML","JS","All"],
    "PHP"),
    new Question("Javascript is a ",
    ["Language","Programming Language","Development","ALL"],
    "Programming Language"),
]

let quiz = new Quiz(questionsList)

Quiz.prototype.getQuestionByIndex = function(){
    return this.questions[this.qIndex]
}

Quiz.prototype.isQuizEnded = function(){
    return this.qIndex===this.questions.length;

}

Quiz.prototype.checkOptionWithAnswer=function(option){
    if(this.getQuestionByIndex().ans===option){
        this.score++
    }
    this.qIndex++;
}

function handleChoiceButton(btnId,option){
    let btn=document.getElementById(btnId)
    btn.onclick=function() {
        //Check Answer
        quiz.checkOptionWithAnswer(option)
        loadQuestion()
    }
    
}

function showScores(){
    let result = "<h1>Result<h1>"
    result+="<h2 id='score'> Your score is "+quiz.score+", percentage is "+(quiz.score/quiz.questions.length*100) +"%<h2>"
    let quizEle = document.getElementById("quiz")
    quizEle.innerHTML=result
}

function loadQuestion(){
    //check whether quiz ended or not
    //if yes then show score
    //else show another question

    if(quiz.isQuizEnded()){
        //show score
        showScores();
    }
    else{
        let question = document.getElementById("question")
        question.innerHTML = quiz.getQuestionByIndex().qText;
        let options = quiz.getQuestionByIndex().options;
        for(let i=0;i<options.length;i++){
            let eachOption = document.getElementById("choice"+i);
            eachOption.innerHTML=options[i];
            handleChoiceButton("btn"+i,options[i])

        }
        showProgress();
    }
}

loadQuestion()

function showProgress(){
    let progressEle=document.getElementById("progress")
    progressEle.innerHTML="Question "+(quiz.qIndex+1)+" of "+quiz.questions.length
}