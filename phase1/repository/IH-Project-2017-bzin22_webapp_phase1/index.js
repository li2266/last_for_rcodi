function check()
{
   var question1 = document.userInput.input1.value;
   var correct = 0;
   
   if (question1 == "Hello!")
   {
       correct++;
       alert("Hello");
   }
   else
   {
       correct = 0;
   }
   
   var marker = 0;
   var reply = ["That's a good question!","Sorry, wrong question!"];
   
   if (correct == 1)
   {
       marker = 0;
   }
   else 
   {
       marker = 1;
   }
   document.getElementById("after_submit").style.visibility = "visible";
   
   document.getElementById("replies").innerHTML = reply[score];
}