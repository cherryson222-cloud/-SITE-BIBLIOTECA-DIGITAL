const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const items = document.querySelectorAll(".item");
const dots = document.querySelectorAll(".dot");

let active = 0;
const totalItems = items.length;
let autoPlay;

function showItem(direction) {
    // Remove a classe 'active' do item e do indicador atuais
    document.querySelector(".item.active").classList.remove("active");
    document.querySelector(".dot.active").classList.remove("active");

    // Calcula o próximo índice
    if (direction > 0) {
        active = (active + 1) % totalItems;
    } else {
        active = (active - 1 + totalItems) % totalItems;
    }

    // Adiciona a classe 'active' ao novo item e indicador
    items[active].classList.add("active");
    dots[active].classList.add("active");
}

prevButton.addEventListener("click", () => showItem(-1));
nextButton.addEventListener("click", () => showItem(1));

/* --- Funcionalidade de Busca e Sidebar --- */
document.addEventListener('DOMContentLoaded', function() {
    const buscaInput = document.getElementById('busca-livro');
    const btnBuscar = document.getElementById('btn-buscar');
    const buscaContainer = document.querySelector('.busca-container');
    const sugestoesContainer = document.getElementById('sugestoes-livros');
    
    // Lista de livros baseada nos IDs e Títulos do HTML
    const livros = [
      { id: 'mal-estar', titulo: 'O Mal Estar na Civilização', autor: 'Freud' },
      { id: 'psicologia-massas', titulo: 'Psicologia das Massas', autor: 'Freud' },
      { id: 'homem-simbolos', titulo: 'O Homem e Seus Símbolos', autor: 'Jung' },
      { id: 'interpretacao-sonhos', titulo: 'A Interpretação dos Sonhos', autor: 'Freud' },
      { id: 'narcisismo', titulo: 'Introdução ao Narcisismo', autor: 'Freud' },
      { id: 'natureza-psique', titulo: 'A Natureza da Psique', autor: 'Jung' },
      { id: 'inibicao', titulo: 'Inibição, sintoma e angústia', autor: 'Freud' }
    ];
  
    // Função para filtrar e navegar
    function buscarLivro() {
      const termo = buscaInput.value.toLowerCase().trim();
      if (!termo) return;
  
      const livroEncontrado = livros.find(livro =>
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autor.toLowerCase().includes(termo)
      );
  
      if (livroEncontrado) {
        // Role até o livro no conteúdo principal
        const elementoLivro = document.getElementById(livroEncontrado.id);
        if (elementoLivro) {
          elementoLivro.scrollIntoView({ behavior: 'smooth', block: 'center' });
          elementoLivro.classList.add('destaque-busca');
          setTimeout(() => elementoLivro.classList.remove('destaque-busca'), 2000);
        }
      } else {
        alert('Livro não encontrado. Tente outro termo.');
      }
    }
  
    // Eventos
    // Mostra sugestões apenas ao digitar
    buscaInput.addEventListener('input', function() {
        const termo = this.value.toLowerCase().trim();
        sugestoesContainer.innerHTML = ''; // Limpa sugestões anteriores

        if (termo.length === 0) {
            sugestoesContainer.classList.remove('ativo');
            return;
        }

        const livrosFiltrados = livros.filter(livro => 
            livro.titulo.toLowerCase().includes(termo) || 
            livro.autor.toLowerCase().includes(termo)
        );

        if (livrosFiltrados.length > 0) {
            livrosFiltrados.forEach(livro => {
                const div = document.createElement('div');
                div.classList.add('sugestao-item');
                div.textContent = livro.titulo;
                div.addEventListener('click', () => {
                    buscaInput.value = livro.titulo;
                    sugestoesContainer.classList.remove('ativo');
                    buscarLivro();
                });
                sugestoesContainer.appendChild(div);
            });
            sugestoesContainer.classList.add('ativo');
        } else {
            sugestoesContainer.classList.remove('ativo');
        }
    });

    btnBuscar.addEventListener('click', (e) => {
        // Se a barra não estiver expandida, expande e foca
        if (!buscaContainer.classList.contains('ativo')) {
            e.preventDefault();
            buscaContainer.classList.add('ativo');
            buscaInput.focus();
        } else {
            // Se já estiver expandida, realiza a busca
            buscarLivro();
        }
    });

    buscaInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') buscarLivro();
    });

    // Fecha a barra de busca se clicar fora e estiver vazia
    document.addEventListener('click', (e) => {
        if (!buscaContainer.contains(e.target)) {
            if (buscaInput.value.trim() === '') {
                buscaContainer.classList.remove('ativo');
            }
            sugestoesContainer.classList.remove('ativo'); // Garante que as sugestões sumam
        }
    });
});