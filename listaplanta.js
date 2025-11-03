
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

// Atualizar estatísticas dinamicamente
function atualizarEstatisticas() {
  const totalPlantas = document.querySelectorAll('.plant-card').length;
  document.getElementById('total-plantas').textContent = totalPlantas;
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
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
