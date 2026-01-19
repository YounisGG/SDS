function toggleMenu(){
 document.getElementById("side").classList.toggle("active");
}

let cards=document.getElementById("cards");
if(cards){
 for(let i=1;i<=6;i++){
  cards.innerHTML+=`
   <div class="card">
    <h3>حساب لعبة #${i}</h3>
    <p>وصف مختصر للحساب</p>
    <button onclick="location.href='payment.html'">شراء</button>
   </div>`;
 }
}