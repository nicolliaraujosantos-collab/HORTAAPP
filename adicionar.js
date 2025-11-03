
// Preview da imagem selecionada
function previewImagem(event) {
  const file = event.target.files[0];
  const previewContainer = document.getElementById('preview-container');
  const previewImagem = document.getElementById('preview-imagem');
  const fileName = document.getElementById('file-name');

  if (file) {
    // Validar tamanho do arquivo (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('⚠️ A imagem é muito grande! Por favor, escolha uma imagem menor que 5MB.');
      event.target.value = '';
      return;
    }

    // Validar tipo do arquivo
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('⚠️ Formato inválido! Use JPG, PNG ou WEBP.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
      previewImagem.src = e.target.result;
      previewContainer.style.display = 'block';
      fileName.textContent = file.name;
    }

    reader.readAsDataURL(file);
  } else {
    previewContainer.style.display = 'none';
    fileName.textContent = 'Escolher arquivo';
  }
}

// Remover imagem
function removerImagem() {
  const fotoInput = document.getElementById('fotoPlanta');
  const previewContainer = document.getElementById('preview-container');
  const fileName = document.getElementById('file-name');
  
  fotoInput.value = '';
  previewContainer.style.display = 'none';
  fileName.textContent = 'Escolher arquivo';
}

// Validar formulário
function validarFormulario() {
  let isValid = true;
  
  // Validar nome da planta
  const nomePlanta = document.getElementById('nomePlanta');
  const nomeError = document.getElementById('nomePlanta-error');
  
  if (nomePlanta.value.trim().length < 2) {
    nomeError.textContent = 'O nome deve ter pelo menos 2 caracteres';
    nomePlanta.classList.add('error');
    nomePlanta.classList.remove('success');
    isValid = false;
  } else {
    nomeError.textContent = '';
    nomePlanta.classList.remove('error');
    nomePlanta.classList.add('success');
  }
  
  // Validar data do plantio
  const dataPlantio = document.getElementById('dataPlantio');
  const dataError = document.getElementById('dataPlantio-error');
  const hoje = new Date();
  const dataSelecionada = new Date(dataPlantio.value);
  
  if (!dataPlantio.value) {
    dataError.textContent = 'Selecione a data do plantio';
    dataPlantio.classList.add('error');
    dataPlantio.classList.remove('success');
    isValid = false;
  } else if (dataSelecionada > hoje) {
    dataError.textContent = 'A data não pode ser futura';
    dataPlantio.classList.add('error');
    dataPlantio.classList.remove('success');
    isValid = false;
  } else {
    dataError.textContent = '';
    dataPlantio.classList.remove('error');
    dataPlantio.classList.add('success');
  }
  
  return isValid;
}

// Salvar planta
function salvarPlanta(event) {
  event.preventDefault();

  // Validar formulário
  if (!validarFormulario()) {
    return;
  }

  const nomePlanta = document.getElementById('nomePlanta').value;
  const dataPlantio = document.getElementById('dataPlantio').value;
  const categoria = document.getElementById('categoria').value;
  const observacoes = document.getElementById('observacoes').value;
  const fotoInput = document.getElementById('fotoPlanta');

  // Obter foto em base64
  if (fotoInput.files && fotoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const fotoBase64 = e.target.result;

      // Criar objeto da planta
      const novaPlanta = {
        id: Date.now(),
        nome: nomePlanta,
        dataPlantio: dataPlantio,
        categoria: categoria || 'Outras',
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
      id: Date.now(),
      nome: nomePlanta,
      dataPlantio: dataPlantio,
      categoria: categoria || 'Outras',
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
  document.getElementById('file-name').textContent = 'Escolher arquivo';
  
  // Remover classes de validação
  document.querySelectorAll('.error, .success').forEach(el => {
    el.classList.remove('error', 'success');
  });

  // Redirecionar após 2 segundos
  setTimeout(() => {
    window.location.href = 'listaplanta.html';
  }, 2000);
}

// Voltar para página anterior
function voltarPagina() {
  if (confirm('Deseja realmente sair? As alterações não salvas serão perdidas.')) {
    window.location.href = 'listaplanta.html';
  }
}

// Contador de caracteres
function atualizarContador() {
  const observacoes = document.getElementById('observacoes');
  const contador = document.getElementById('char-counter');
  
  observacoes.addEventListener('input', function() {
    contador.textContent = this.value.length;
  });
}

// Definir data máxima como hoje
function configurarDataMaxima() {
  const hoje = new Date().toISOString().split('T')[0];
  document.getElementById('dataPlantio').setAttribute('max', hoje);
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
  const hoje = new Date().toISOString().split('T')[0];
  document.getElementById('dataPlantio').value = hoje;
  configurarDataMaxima();
  atualizarContador();
  console.log('🌱 Formulário de adicionar planta carregado!');
});
