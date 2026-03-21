 const cards = document.querySelectorAll('.foto-card');
    const campoBusca = document.getElementById('campoBusca');
    const btnReset = document.getElementById('btnReset');
    const semResultados = document.getElementById('semResultados');

    cards.forEach((card) => {
      const img = card.querySelector('img');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const moveX = (x - centerX) / 18;
        const moveY = (y - centerY) / 18;

        img.style.transform = `scale(1.14) translate(${moveX}px, ${moveY}px)`;
      });

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.04)';
        img.style.transform = 'scale(1.08)';
      });
       card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        img.style.transform = 'scale(1) translate(0, 0)';
      });
    });

    function filtrarFotos() {
      const termo = campoBusca.value.toLowerCase().trim();
      let visiveis = 0;

      cards.forEach((card) => {
        const legenda = card.dataset.legenda.toLowerCase();
        const titulo = card.querySelector('h3').textContent.toLowerCase();
        const mostrar = legenda.includes(termo) || titulo.includes(termo);

        card.style.display = mostrar ? 'block' : 'none';
        if (mostrar) visiveis++;
      });

      semResultados.style.display = visiveis === 0 ? 'block' : 'none';
    }

    campoBusca.addEventListener('input', filtrarFotos);
    btnReset.addEventListener('click', () => {
      campoBusca.value = '';
      filtrarFotos();
      campoBusca.focus();
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visivel');
        }
      });
    }, { threshold: 0.15 });

    cards.forEach((card) => observer.observe(card));