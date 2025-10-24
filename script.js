function redirecionar() {
  window.location.href = "listaplanta.html";
}

function validaLogin () {
  var emailCadastrado = "admin@admin.com";
  var senhaCadastrada = "admin"
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;

  if (email == emailCadastrado && senha == senhaCadastrada){
        alert("Usuário logado com sucesso!");  
        redirecionar();
  }
  else {
    alert("Usuário ou senha inválidos");
  }




}