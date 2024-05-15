const selectBox=document.querySelector(".select-box"),
selectXBtn=selectBox.querySelector(".playerX"),
selectOBtn=selectBox.querySelector(".playerO"),
playerBoard=document.querySelector(".play-board");
allBox=document.querySelectorAll("section span");
players=document.querySelector(".players"),
resultBox=document.querySelector(".result-box"),
wonText=resultBox.querySelector(".won-text"),
replayBtn=resultBox.querySelector("button")
;

window.onload=()=>{  //once window loaded
    for (let i = 0;i < allBox.length; i++) {// add onclick attribute in all available section's span
        allBox[i].setAttribute("onclick","clickedBox(this)");
     }
    selectXBtn.onclick=()=>{
        selectBox.classList.add("hide");// hide the select box on playerX button clicked 
        playerBoard.classList.add("show") // show the player board section on playerX button when clicked
          
    }
    selectOBtn.onclick=()=>{
        selectBox.classList.add("hide");// hide the select box on playerO button clicked 
        playerBoard.classList.add("show") // show the player board section on playerO button when clicked
        players.setAttribute("class","players active player"); // adding three class name in player element  
    }
}
let playerXIcon="fas fa-times"; //class name of fontawesome cross icon
let playerOIcon="far fa-circle";// class name of fontawesome circle icon
let playerSign="X";//suppose player wiil be x
let runBot=true;
//user click function
function clickedBox(element){
   // console.log(element);
     if(players.classList.contains("player")){//if players element has contains .player
        playerSign="O";  //if player will be O then we'll change the sign
        element.innerHTML=`<i class="${playerOIcon}"></i>`;// adding circle icon tag inside user clicked element
        players.classList.add("active");
        // if player select O then we'll change the playerSign value to O
        playerSign="O";
        element.setAttribute("id",playerSign);
     }
     else{
        element.innerHTML=`<i class="${playerXIcon}"></i>`;// adding cross icon tag inside user clicked element
        players.classList.add("active"); 
        element.setAttribute("id",playerSign);
    }
    selectWinner();//calling the winner  function
    playerBoard.style.pointerEvents="none";// once user select then user cant select any other box util box select
     element.style.pointerEvents="none";// once user select any box then that box can't be selected
    let randomDelayTime=((Math.random()*1000)+200).toFixed();//generating random time delay so bot will delay randomly to select box
   // console.log(randomDelayTime);
    setTimeout(()=>{
        bot(runBot); // calling bot function
    },randomDelayTime);//  passing random delay time 
    
}

//bot click function
function bot(runBot){
    if(runBot){ // if runBot is true then run the following code
    // first change the playerSign... so if user has X value in id then bot will have O 
    playerSign="O";
    let array=[];// creating empty array...we'll store unselected box index in this array
    for (let i = 0; i < allBox.length; i++) {
        if(allBox[i].childElementCount==0){//if span hs no any child element
            array.push(i);// inserting unclicked or unselected boxes inside arry means that span has no children
          //  console.log(i + " " + "has no children");
       }
    }
    let randomBox=array[Math.floor(Math.random()*array.length)]//getting random index from array so bot will select random unselected box
  
    if(array.length>0){
        if(players.classList.contains("player")){//if players element has contains .player
            allBox[randomBox].innerHTML=`<i class="${playerXIcon}"></i>`;// adding cross icon tag inside user clicked element
            players.classList.remove("active");
           // if user is O then the box id value will be x
           playerSign="X";
           allBox[randomBox].setAttribute("id",playerSign);

         }
         else{
            allBox[randomBox].innerHTML=`<i class="${playerOIcon}"></i>`;// adding circle icon tag inside user clicked element
            players.classList.remove("active");   
            allBox[randomBox].setAttribute("id",playerSign);
        }
        selectWinner();//calling the winner  function
    }
    allBox[randomBox].style.pointerEvents="none";// once bot select any box then user can't select or click on that box
    playerBoard.style.pointerEvents="auto";   
    playerSign="X"; // passing the x value
    // console.log(array);
}
}
// let work on select the winner
function getClass(idname){   
      return document.querySelector(".box"+ idname).id;  // returning id name
}
function checkThreeClass(val1,val2,val3,sign){
       if(getClass(val1)==sign && getClass(val2)==sign && getClass(val3)==sign)
       return true;
}
function selectWinner(){
    if(checkThreeClass(1,2,3,playerSign) ||  checkThreeClass(4,5,6,playerSign) || checkThreeClass(7,8,9,playerSign) || 
    checkThreeClass(1,4,7,playerSign) ||  checkThreeClass(2,5,8,playerSign) || checkThreeClass(3,6,9,playerSign) ||
    checkThreeClass(1,5,9,playerSign) || checkThreeClass(3,5,7,playerSign) ){
        //console.log(playerSign +" " +"is the winner ");
        // once match won by someone the stop the bot
        runBot=false;
        bot(runBot);
        setTimeout(()=>{  //we'll delay to show result box
          playerBoard.classList.remove("show");
          resultBox.classList.add("show");
        },700);   //700 ms delay
        wonText.innerHTML=`Player <p>${playerSign}</p> won the game!`;
    }
    else{
        // if match has draw
        // first we'll check all id... if all span has id and no one won the game then we'll draw the game
        if(getClass(1)!="" && getClass(2)!="" && getClass(3)!="" &&
        getClass(4)!="" && getClass(5)!="" && getClass(6)!="" && 
        getClass(7)!="" && getClass(8)!="" && getClass(9)!="")   {
            runBot=false;
            bot(runBot);
            setTimeout(()=>{  //we'll delay to show result box
              playerBoard.classList.remove("show");
              resultBox.classList.add("show");
            },700);   //700 ms delay
            wonText.textContent=`Match has been draw!`;
        }
    }
}
replayBtn.onclick=()=>{
   window.location.reload();  // reload the current page
}