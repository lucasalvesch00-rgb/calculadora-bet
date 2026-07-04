// ======================================================
// AVIATOR TOOLS
// Versão 1.0
// ======================================================

// ---------- CALCULADORA DE HORÁRIOS ----------
const btnHorario = document.getElementById("btnHorario");

if (btnHorario) {
    btnHorario.addEventListener("click", calcularHorarios);
}

function calcularHorarios() {
    const campoHorario = document.getElementById("horario");
    const resultado = document.getElementById("resultadoHorario");

    if (!campoHorario.value) {
        resultado.innerHTML = `<p style="color:#d32f2f;">Informe um horário válido.</p>`;
        return;
    }

    const partes = campoHorario.value.split(":");
    let horas = parseInt(partes[0]);
    let minutos = parseInt(partes[1]);

    function adicionarMinutos(h, m, adicionar) {
        let total = h * 60 + m + adicionar;
        total = total % (24 * 60);
        let novaHora = Math.floor(total / 60);
        let novoMinuto = total % 60;
        return String(novaHora).padStart(2, "0") + ":" + String(novoMinuto).padStart(2, "0");
    }

    const horario5 = adicionarMinutos(horas, minutos, 5);
    const horario7 = adicionarMinutos(horas, minutos, 7);
    const horario9 = adicionarMinutos(horas, minutos, 9);

    const frase = "Pegue 3x na proteção e 5x pra garantir o lucro.";

    resultado.innerHTML = `
        <h3>Possíveis horários</h3>
        
        <div class="resultado-item" style="margin: 12px 0; font-size: 1.08rem;">
            ${horario5} 🌹🚀 <span style="color:#f5d97d; font-weight:500;"> → ${frase}</span>
        </div>
        <div class="resultado-item" style="margin: 12px 0; font-size: 1.08rem;">
            ${horario7} 🌹🚀 <span style="color:#f5d97d; font-weight:500;"> → ${frase}</span>
        </div>
        <div class="resultado-item" style="margin: 12px 0; font-size: 1.08rem;">
            ${horario9} 🌹🚀 <span style="color:#f5d97d; font-weight:500;"> → ${frase}</span>
        </div>

        <div style="margin-top: 25px; padding: 15px; background:#1a1a1f; border-radius:12px;">
            <h4 style="margin-bottom:12px;">Qual horário deu certo hoje?</h4>
            <div id="enqueteHorarios" style="display:flex; flex-direction:column; gap:10px;">
                <!-- Votos serão inseridos via JS -->
            </div>
        </div>

        <br>
        <button id="copiarHorarios">Copiar Horários</button>
    `;

    // Carrega e cria enquete
    criarEnquete([horario5, horario7, horario9]);
}

// Função da Enquete
function criarEnquete(horarios) {
    const container = document.getElementById("enqueteHorarios");
    if (!container) return;

    let html = '';

    horarios.forEach(horario => {
        const votos = getVotos(horario);
        html += `
            <div style="display:flex; align-items:center; justify-content:space-between; background:#25252b; padding:10px 14px; border-radius:10px;">
                <span><strong>${horario}</strong></span>
                <button onclick="votar('${horario}')" style="background:#10b981; color:white; border:none; padding:6px 14px; border-radius:8px; cursor:pointer;">
                    👍 ${votos}
                </button>
            </div>
        `;
    });

    container.innerHTML = html;
}

function getVotos(horario) {
    return parseInt(localStorage.getItem('voto_' + horario)) || 0;
}

function votar(horario) {
    let votos = getVotos(horario);
    votos++;
    localStorage.setItem('voto_' + horario, votos);
    
    // Atualiza a enquete
    criarEnquete([
        document.querySelectorAll('.resultado-item')[0].textContent.trim().split(' ')[0],
        document.querySelectorAll('.resultado-item')[1].textContent.trim().split(' ')[0],
        document.querySelectorAll('.resultado-item')[2].textContent.trim().split(' ')[0]
    ]);
}

// ---------- RESTO DO CÓDIGO (Gestão, PIX, etc) ----------
const btnBanca = document.getElementById("btnBanca");
if (btnBanca) btnBanca.addEventListener("click", calcularBanca);

function calcularBanca() { /* ... seu código atual ... */ }

const btnPix = document.getElementById("copiarPix");
if (btnPix) { /* ... seu código do PIX com confetes ... */ }

// Scroll suave e ano automático permanecem iguais
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const destino = document.querySelector(this.getAttribute("href"));
        if (destino) destino.scrollIntoView({ behavior: "smooth" });
    });
});

const ano = new Date().getFullYear();
const footer = document.querySelector("footer p:last-child");
if (footer) footer.innerHTML = `© ${ano} Todos os direitos reservados.`;

console.log("Aviator Tools carregado com sucesso.");
