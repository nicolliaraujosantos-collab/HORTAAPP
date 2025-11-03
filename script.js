function redirecionar() {
  window.location.href = "listaplanta.html";
}

function validaLogin() {
  var emailCadastrado = "admin@admin.com";
  var senhaCadastrada = "admin";
  var email = document.getElementById("email").value.trim();
  var senha = document.getElementById("senha").value;
  
  // Validação básica
  if (!email || !senha) {
    alert("Por favor, preencha todos os campos!");
    return false;
  }
  
  if (email === emailCadastrado && senha === senhaCadastrada) {
    // Adiciona feedback visual
    const btnLogin = document.querySelector('.btn-login');
    btnLogin.innerHTML = '<span class="material-icons">check_circle</span> Entrando...';
    btnLogin.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
    
    setTimeout(() => {
      alert("Login realizado com sucesso!");
      redirecionar();
    }, 500);
  } else {
    alert("Email ou senha inválidos. Tente novamente.");
    // Limpa o campo de senha
    document.getElementById("senha").value = "";
    document.getElementById("senha").focus();
  }
}

// Permite login com Enter
document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('#email, #senha');
  inputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        validaLogin();
      }
    });
  });
});