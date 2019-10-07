
let min = document.getElementById('min'),
    max = document.getElementById('max'),
    numOfGuess = document.getElementById('numOfGuess'),
    guessPara = document.getElementById('guessPara'),
    guessNumber = document.getElementById('guessNumber'),
    sumbitBtnBtn = document.querySelector('.sumbitBtnBtn'),
    random;

guessNumber.disabled = true;

let innerMsg = (idd, msgg, colorr)=>{
  let doc = document.querySelector(idd);
  doc.textContent = msgg;
  doc.style.color = colorr;
}

let msg = function(id, msg, color, msg2, color2){
  innerMsg(id, msg, color);
  setTimeout(function(){
    innerMsg(id, msg2, color2);
  }, 2000);
}

let changeBorder = function(args, color){
  args.forEach(arg=>{
    arg.style.borderColor = color;
  })
}

let changeButton= function(){
  guessNumber.disabled = true;
  sumbitBtnBtn.innerHTML = 'Play Again!'
  sumbitBtnBtn.id = 'playAgain'
}


document.getElementById('rangeForm').addEventListener('submit', getRange);
document.getElementById('sumbitBtn').addEventListener('click', getGuess);




function getRange(){
  // let update = setInterval(function(){
  //   numOfGuess.value
  // },1000)

//console.log(update())
  if(!min.value || !max.value || !numOfGuess.value){
    msg('#rangePara', 'Input a valid number!', 'red', 'Input your minimum and maximum numbers!', 'black');
    changeBorder([min,max,numOfGuess],'red');
  }else if(parseInt(min.value) > parseInt(max.value) || parseInt(min.value) == parseInt(max.value) || parseInt(numOfGuess.value) == 0){
    msg('#rangePara', 'Check your numbers!', 'red', 'Input your minimum and maximum numbers!', 'black')
  }else{
    innerMsg('#guessPara',`Guess a number between ${min.value} and ${max.value}. Your guess limit is ${numOfGuess.value}!`,'black');
    changeBorder([min,max,numOfGuess],'green')
    min.disabled = true; max.disabled = true; numOfGuess.disabled = true;
    guessNumber.disabled = false;

  }
  random = Math.floor(Math.random() * (parseInt(max.value)-parseInt(min.value) + 1)) + parseInt(min.value);
}


function getGuess(){
  let guessed = parseInt(guessNumber.value)
  if(guessNumber.value == '' || guessed < parseInt(min.value) || guessed > parseInt(max.value)){
    msg('#guessPara', 'Your number is out of range/Input a valid number!', 'red', `Guess a number between ${min.value} and ${max.value}. Your guess limit is ${numOfGuess.value}!`, 'black');
    guessNumber.value = ''
  }else if(guessed == random){
    innerMsg('#resultPara',`You won! You guessed the right number!`,'green')
    changeBorder([guessNumber], 'green')
    changeButton()
  }else{
    numOfGuess.value-=1
    if(numOfGuess.value == 0){
      innerMsg('#resultPara',`You lost! The correct guess was ${random}!`,'red');
      changeButton()
    }else if(numOfGuess.value > 0){
      innerMsg('#resultPara',`Your guess is incorrect! You have ${numOfGuess.value} left!`,'red')
      guessNumber.value = ''
    }
    changeBorder([guessNumber], 'red')
  }
  document.getElementById('playAgain').addEventListener('mousedown', function getplayAgain(){
    location.reload()
  });
}
