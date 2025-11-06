
// Função para adicionar nova planta
function adicionarPlanta() {
  window.location.href = 'adicionar.html';
}

// Calcular dias desde o plantio
function calcularDias(dataPlantio) {
  const hoje = new Date();
  const plantio = new Date(dataPlantio);
  const diffTime = Math.abs(hoje - plantio);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Determinar status da planta baseado nos dias
function determinarStatus(dias) {
  if (dias <= 7) {
    return { classe: 'status-new', texto: 'Recente' };
  } else if (dias <= 30) {
    return { classe: 'status-growing', texto: 'Em crescimento' };
  } else {
    return { classe: 'status-ready', texto: 'Madura' };
  }
}

// Formatar data para exibição
function formatarData(dataString) {
  const data = new Date(dataString);
  const dia = String(data.getDate() + 1).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

// Carregar plantas do localStorage
function carregarPlantas() {
  const plantas = JSON.parse(localStorage.getItem('plantas')) || [];
  const gridContainer = document.getElementById('grid-plantas');
  
  // Limpar container (mantém apenas os cards estáticos se houver)
  gridContainer.innerHTML = '';
  
  if (plantas.length === 0) {
    gridContainer.innerHTML = `
      <div class="no-plants-message">
        <span class="material-icons" style="font-size: 64px; color: #ccc;">eco</span>
        <p>Nenhuma planta cadastrada ainda.</p>
        <p>Clique no botão "Adicionar Planta" para começar!</p>
      </div>
    `;
    return;
  }
  
  // Criar cards para cada planta
  plantas.forEach(planta => {
    const dias = calcularDias(planta.dataPlantio);
    const status = determinarStatus(dias);
    const dataFormatada = formatarData(planta.dataPlantio);
    
    // Usar foto da planta ou uma imagem padrão
    const fotoUrl = planta.foto || './img/images (4).jfif';
    
    const card = document.createElement('div');
    card.className = 'mdc-card plant-card';
    card.innerHTML = `
      <div class="plant-image-container">
        <img class="plant-image" src="${fotoUrl}" alt="${planta.nome}">
      </div>
      <div class="plant-info">
        <h3 class="plant-name">${planta.nome.toUpperCase()}</h3>
        <p class="plant-date">📅 Plantio: ${dataFormatada}</p>
        <p class="plant-days">⏱️ ${dias} dias de cultivo</p>
        ${planta.categoria ? `<p class="plant-category">🏷️ ${planta.categoria}</p>` : ''}
        <p class="plant-status ${status.classe}">${status.texto}</p>
        ${planta.observacoes ? `<p class="plant-obs">📝 ${planta.observacoes}</p>` : ''}
      </div>
    `;
    
    gridContainer.appendChild(card);
  });
}

// Atualizar estatísticas dinamicamente
function atualizarEstatisticas() {
  const plantas = JSON.parse(localStorage.getItem('plantas')) || [];
  const totalPlantas = plantas.length;
  
  // Total de plantas
  document.getElementById('total-plantas').textContent = totalPlantas;
  
  // Plantas plantadas este mês
  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();
  
  const plantasMes = plantas.filter(planta => {
    const dataPlantio = new Date(planta.dataPlantio);
    return dataPlantio.getMonth() === mesAtual && dataPlantio.getFullYear() === anoAtual;
  }).length;
  
  document.getElementById('plantas-mes').textContent = plantasMes;
  
  // Média de dias de cultivo
  if (totalPlantas > 0) {
    const somaDias = plantas.reduce((acc, planta) => {
      return acc + calcularDias(planta.dataPlantio);
    }, 0);
    const mediaDias = Math.round(somaDias / totalPlantas);
    document.getElementById('dias-media').textContent = mediaDias;
  } else {
    document.getElementById('dias-media').textContent = 0;
  }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
  carregarPlantas();
  atualizarEstatisticas();
  console.log('🌱 Horta Digital carregada com sucesso!');
});

// Animação ao rolar a página
window.addEventListener('scroll', function() {
  const cards = document.querySelectorAll('.plant-card');
  cards.forEach(card => {
    const cardPosition = card.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (cardPosition < screenPosition) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
});
