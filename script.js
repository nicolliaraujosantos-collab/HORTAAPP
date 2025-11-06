
function redirecionar() {
  window.location.href = "listaplanta.html";
}

function validaLogin() {
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  
  // Validação básica
  if (!email || !senha) {
    alert("Por favor, preencha todos os campos!");
    return false;
  }
  
  // Verificar usuário admin padrão
  if (email === "admin@admin.com" && senha === "admin") {
    realizarLogin();
    return true;
  }
  
  // Verificar usuários cadastrados no localStorage
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);
  
  if (usuarioEncontrado) {
    // Salvar usuário logado
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
    realizarLogin();
    return true;
  } else {
    alert("Email ou senha inválidos. Tente novamente.");
    // Limpa o campo de senha
    document.getElementById("senha").value = "";
    document.getElementById("senha").focus();
    return false;
  }
}

function realizarLogin() {
  // Adiciona feedback visual
  const btnLogin = document.querySelector('.btn-login');
  btnLogin.innerHTML = '<span class="material-icons">check_circle</span> Entrando...';
  btnLogin.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
  
  setTimeout(() => {
    alert("Login realizado com sucesso!");
    redirecionar();
  }, 500);
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
  
  console.log('🔐 Página de login carregada!');
});
