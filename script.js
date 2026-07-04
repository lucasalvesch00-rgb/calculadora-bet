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
        resultado.innerHTML = `
            <p style="color:#d32f2f;">
                Informe um horário válido.
            </p>
        `;
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
        return (
            String(novaHora).padStart(2, "0") +
            ":" +
            String(novoMinuto).padStart(2, "0")
        );
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

        <br>
        <button id="copiarHorarios">
            Copiar Horários
        </button>
    `;

    const botaoCopiar = document.getElementById("copiarHorarios");

    botaoCopiar.addEventListener("click", function () {
        const texto =
`Possíveis horários:

${horario5} 🌹🚀 → ${frase}
${horario7} 🌹🚀 → ${frase}
${horario9} 🌹🚀 → ${frase}`;

        navigator.clipboard.writeText(texto);

        botaoCopiar.innerHTML = "✅ Copiado!";
        setTimeout(() => {
            botaoCopiar.innerHTML = "Copiar Horários";
        }, 2000);
    });
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
        resultado.innerHTML = `
            <p style="color:red;">
                Informe um valor válido.
            </p>
        `;
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
        <p>
        Trabalhe apenas com a meta diária.
        Após atingir o objetivo, encerre suas operações.
        </p>
    `;
}

// ---------- PIX ----------
const btnPix = document.getElementById("copiarPix");
if (btnPix) {
    btnPix.addEventListener("click", function () {
        const chave = document.getElementById("pixCode").value;
        navigator.clipboard.writeText(chave);
        btnPix.innerHTML = "✅ Pix Copiado";
        setTimeout(function () {
            btnPix.innerHTML = "COPIAR CHAVE PIX";
        }, 2000);
    });
}

// ---------- SCROLL SUAVE ----------
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const destino = document.querySelector(this.getAttribute("href"));
        if (destino) {
            destino.scrollIntoView({
                behavior: "smooth"
            });
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
