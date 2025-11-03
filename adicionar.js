
// Preview da imagem selecionada
function previewImagem(event) {
  const file = event.target.files[0];
  const previewContainer = document.getElementById('preview-container');
  const previewImagem = document.getElementById('preview-imagem');

  if (file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      previewImagem.src = e.target.result;
      previewContainer.style.display = 'block';
    }
    
    reader.readAsDataURL(file);
  } else {
    previewContainer.style.display = 'none';
  }
}

// Salvar planta
function salvarPlanta(event) {
  event.preventDefault();

  const nomePlanta = document.getElementById('nomePlanta').value;
  const dataPlantio = document.getElementById('dataPlantio').value;
  const observacoes = document.getElementById('observacoes').value;
  const fotoInput = document.getElementById('fotoPlanta');
  
  // Obter foto em base64
  let fotoBase64 = '';
  if (fotoInput.files && fotoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      fotoBase64 = e.target.result;
      
      // Criar objeto da planta
      const novaPlanta = {
        nome: nomePlanta,
        dataPlantio: dataPlantio,
        foto: fotoBase64,
        observacoes: observacoes,
        dataCadastro: new Date().toISOString()
      };

      // Salvar no localStorage
      salvarNoLocalStorage(novaPlanta);
    };
    reader.readAsDataURL(fotoInput.files[0]);
  } else {
    // Se não houver foto, salvar sem ela
    const novaPlanta = {
      nome: nomePlanta,
      dataPlantio: dataPlantio,
      foto: '',
      observacoes: observacoes,
      dataCadastro: new Date().toISOString()
    };
    
    salvarNoLocalStorage(novaPlanta);
  }
}

// Salvar no localStorage
function salvarNoLocalStorage(planta) {
  // Recuperar plantas existentes
  let plantas = JSON.parse(localStorage.getItem('plantas')) || [];
  
  // Adicionar nova planta
  plantas.push(planta);
  
  // Salvar de volta no localStorage
  localStorage.setItem('plantas', JSON.stringify(plantas));
  
  // Mostrar mensagem de sucesso
  mostrarMensagemSucesso();
}

// Mostrar mensagem de sucesso
function mostrarMensagemSucesso() {
  // Criar elemento de mensagem
  const mensagem = document.createElement('div');
  mensagem.className = 'success-message show';
  mensagem.innerHTML = `
    <span class="material-icons">check_circle</span>
    <span>Planta adicionada com sucesso!</span>
  `;
  
  const formContainer = document.querySelector('.form-container');
  formContainer.insertBefore(mensagem, formContainer.firstChild);
  
  // Limpar formulário
  document.getElementById('formPlanta').reset();
  document.getElementById('preview-container').style.display = 'none';
  
  // Redirecionar após 2 segundos
  setTimeout(() => {
    window.location.href = 'listaplanta.html';
  }, 2000);
}

// Voltar para página anterior
function voltarPagina() {
  window.location.href = 'listaplanta.html';
}

// Definir data atual como padrão
document.addEventListener('DOMContentLoaded', function() {
  const hoje = new Date().toISOString().split('T')[0];
  document.getElementById('dataPlantio').value = hoje;
  console.log('🌱 Formulário de adicionar planta carregado!');
});
