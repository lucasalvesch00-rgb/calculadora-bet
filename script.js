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
        
        <div class="resultado-item" style="margin: 12px 0; font-size: 1.1rem;">
            ${horario5} 🌹🚀 <span style="color:#f5d97d; font-weight:500;"> → ${frase}</span>
        </div>
        <div class="resultado-item" style="margin: 12px 0; font-size: 1.1rem;">
            ${horario7} 🌹🚀 <span style="color:#f5d97d; font-weight:500;"> → ${frase}</span>
        </div>
        <div class="resultado-item" style="margin: 12px 0; font-size: 1.1rem;">
            ${horario9} 🌹🚀 <span style="color:#f5d97d; font-weight:500;"> → ${frase}</span>
        </div>

        <!-- Enquete mais próxima e chamativa -->
        <div style="margin-top: 20px; padding: 20px; background:linear-gradient(135deg, #1f2937, #111827); border-radius:16px; border:2px solid #4ade80;">
            <h4 style="margin-bottom:12px; color:#4ade80; text-align:center;">👍 Qual horário deu certo hoje?</h4>
            <div style="font-size:1.15rem; font-weight:700; color:#4ade80; text-align:center; margin-bottom:16px;" id="totalAcertos">
                Total de acertos: 0
            </div>
            <div id="enqueteHorarios" style="display:flex; flex-direction:column; gap:12px;">
                <!-- preenchido pelo JS -->
            </div>
        </div>

        <br>
        <button id="copiarHorarios">Copiar Horários</button>
    `;

    criarEnquete([horario5, horario7, horario9]);
}

// Função da Enquete
function criarEnquete(horarios) {
    const container = document.getElementById("enqueteHorarios");
    const totalEl = document.getElementById("totalAcertos");
    if (!container) return;

    let totalGeral = 0;
    let html = '';

    horarios.forEach(horario => {
        const votos = getVotos(horario);
        totalGeral += votos;

        html += `
            <div style="display:flex; align-items:center; justify-content:space-between; background:#25252b; padding:12px 16px; border-radius:10px;">
                <span><strong>${horario}</strong></span>
                <button onclick="votar('${horario}')" style="background:#10b981; color:white; border:none; padding:8px 18px; border-radius:8px; cursor:pointer; font-weight:600; font-size:1.05rem;">
                    👍 ${votos}
                </button>
            </div>
        `;
    });

    container.innerHTML = html;
    totalEl.textContent = `Total de acertos: ${totalGeral}`;
}

function getVotos(horario) {
    return parseInt(localStorage.getItem('voto_' + horario)) || 0;
}

function votar(horario) {
    let votos = getVotos(horario);
    votos++;
    localStorage.setItem('voto_' + horario, votos);
    
    const horariosAtuais = Array.from(document.querySelectorAll('.resultado-item')).map(el => 
        el.textContent.trim().split(' ')[0]
    );
    
    criarEnquete(horariosAtuais);
}

// ---------- GESTÃO DE BANCA ----------
const btnBanca = document.getElementById("btnBanca");
if (btnBanca) {
    btnBanca.addEventListener("click", calcularBanca);
}

function calcularBanca() {
    const banca = parseFloat(document.getElementById("bancaValor").value);
    const resultado = document.getElementById("resultadoBanca");

    if (isNaN(banca) || banca <= 0) {
        resultado.innerHTML = `<p style="color:red;">Informe um valor válido.</p>`;
        return;
    }

    const metaDiaria = banca * 0.10;
    const stopWin = metaDiaria;
    const stopLoss = metaDiaria;

    resultado.innerHTML = `
        <h3>Resultado</h3>
        <p><strong>Banca:</strong> R$ ${banca.toFixed(2)}</p>
        <p><strong>Meta diária (10%):</strong> R$ ${metaDiaria.toFixed(2)}</p>
        <p><strong>Stop Win:</strong> R$ ${stopWin.toFixed(2)}</p>
        <p><strong>Stop Loss:</strong> R$ ${stopLoss.toFixed(2)}</p>
        <hr>
        <p>Trabalhe apenas com a meta diária. Após atingir o objetivo, encerre suas operações.</p>
    `;
}

// ---------- PIX ----------
const btnPix = document.getElementById("copiarPix");
if (btnPix) {
    btnPix.addEventListener("click", function () {
        const chave = document.getElementById("pixCode").value;
        navigator.clipboard.writeText(chave).then(() => {
            btnPix.innerHTML = "✅ Copiado com Sucesso!";
            btnPix.style.background = "#10b981";

            confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });

            const audio = new Audio("https://www.soundjay.com/buttons/applause-1.mp3");
            audio.volume = 0.4;
            audio.play().catch(() => {});

            setTimeout(() => {
                btnPix.innerHTML = "COPIAR CHAVE PIX";
                btnPix.style.background = "";
            }, 3000);
        });
    });
}

// ---------- SCROLL SUAVE ----------
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const destino = document.querySelector(this.getAttribute("href"));
        if (destino) {
            destino.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// ---------- ANO AUTOMÁTICO ----------
const ano = new Date().getFullYear();
const footer = document.querySelector("footer p:last-child");
if (footer) {
    footer.innerHTML = `© ${ano} Todos os direitos reservados.`;
}

console.log("Aviator Tools carregado com sucesso.");
