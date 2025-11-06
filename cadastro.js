
function validaCadastro() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const termos = document.getElementById("termos").checked;

  // Validação de campos vazios
  if (!nome || !email || !senha || !confirmarSenha) {
    alert("Por favor, preencha todos os campos!");
    return false;
  }

  // Validação do nome
  if (nome.length < 3) {
    alert("O nome deve ter pelo menos 3 caracteres!");
    document.getElementById("nome").focus();
    return false;
  }

  // Validação do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, insira um email válido!");
    document.getElementById("email").focus();
    return false;
  }

  // Validação da senha
  if (senha.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres!");
    document.getElementById("senha").focus();
    return false;
  }

  // Validação de confirmação de senha
  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem!");
    document.getElementById("confirmarSenha").value = "";
    document.getElementById("confirmarSenha").focus();
    return false;
  }

  // Validação dos termos
  if (!termos) {
    alert("Você precisa aceitar os termos e condições!");
    return false;
  }

  // Criar objeto do usuário
  const novoUsuario = {
    id: Date.now(),
    nome: nome,
    email: email,
    senha: senha,
    dataCadastro: new Date().toISOString()
  };

  // Salvar no localStorage
  salvarUsuario(novoUsuario);
}

function salvarUsuario(usuario) {
  // Recuperar usuários existentes
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Verificar se o email já existe
  const emailExiste = usuarios.some(u => u.email === usuario.email);
  if (emailExiste) {
    alert("Este email já está cadastrado! Por favor, use outro email.");
    return false;
  }

  // Adicionar novo usuário
  usuarios.push(usuario);

  // Salvar no localStorage
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  // Feedback visual
  const btnCadastro = document.querySelector('.btn-login');
  btnCadastro.innerHTML = '<span class="material-icons">check_circle</span> Cadastrando...';
  btnCadastro.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';

  // Mostrar mensagem de sucesso e redirecionar
  setTimeout(() => {
    alert("Cadastro realizado com sucesso! Faça login para continuar.");
    window.location.href = 'index.html';
  }, 1000);
}

// Permite cadastro com Enter
document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        validaCadastro();
      }
    });
  });

  console.log('📝 Página de cadastro carregada!');
});
