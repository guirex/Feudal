const menuItems = document.querySelectorAll('.menu a[href^="#"]');
 
menuItems.forEach(item => {
  item.addEventListener('click', scrollToIdOnClick);
})
 
function getScrollTopByHref(element) {
  const id = element.getAttribute('href');
  return document.querySelector(id).offsetTop;
}
 
function scrollToIdOnClick(event) {
  event.preventDefault();
  const to = getScrollTopByHref(event.target) - 80;
  scrollToPosition(to);
}
 
function scrollToPosition(to) {
  // window.scroll({
  //   top: to,
  //   behavior: "smooth",
  // });
  smoothScrollTo(0, to);
}
 
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */

function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();
 
  duration = typeof duration !== 'undefined' ? duration : 400;
 
  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };
 
  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};

/* function User(_nome, _sobrenome, _email,_senha){
  this.Nome = _nome;
  this.Sobrenome = _sobrenome;
  this.Email = _email;
  this.Senha = _senha;
}

function pegavlr(){
  var nome = document.getElementById("inome").value;
  var email = document.getElementById("iemail").value;
  var senha = document.getElementById("isenha").value;

}
*/
function getRadioValor(cat){
  var rads = document.getElementsByName("cat");
   
  for(var i = 0; i < rads.length; i++){
   if(rads[i].checked){
    return rads[i].value;
   }
  }
}

function signin(){
  var nome = document.getElementById("inome").value;
  var email = document.getElementById("iemail").value;
  var senha = document.getElementById("isenha").value;
  var categoria = getRadioValor('cat');
  
  console.log(nome)
  console.log(email)
  console.log(senha)
  console.log(categoria)

  var ref = firebase.database().ref("Users/"); 

  if(firebase.auth().createUserWithEmailAndPassword(email, senha) && ref.push({
    Nome: nome,
    Email: email,
    Senha: senha,
    Categoria: categoria
  })){
    //Informa ao usuário
    window.alert("Usuário Cadastrado!");
    document.getElementById("cadastrar").style.display = "none";
    if(firebase.auth().signInWithEmailAndPassword(email, senha)){
    window.alert("Usuário Logado");
    document.getElementById("opc").style.display="none";
    document.getElementById("game").style.display="block";   
    }
  }

}

function Logar(){
  var email = document.getElementById("iemail").value;
  var senha = document.getElementById("isenha").value;

  if(firebase.auth().signInWithEmailAndPassword(email, senha)){
    document.getElementById("opc").style.display = "none";
    document.getElementById("game").style.display = "block";   
    }
}

function Sair(){
  if(firebase.auth().signOut()){
    document.getElementById("opc").style.display = "block";
    document.getElementById("game").style.display = "none";
    document.getElementById("lemail").value = "";
    document.getElementById("lsenha").value = "";   
  }
}

function chamaModalCad(){
  document.getElementById("cadastrar").style.display="block";
}