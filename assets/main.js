document.addEventListener("DOMContentLoaded", function () {
    var checkBox = document.getElementById("toggle");
    var sectionTres = document.querySelector("section:nth-of-type(3)");
    var mensalidadeInput = document.getElementById("valor-mensalidade");
    var descontoInput = document.getElementById("desconto-unieuro");
    var descAplicadoSpan = document.getElementById("descAplicado");
    var mensalidadeResult = document.getElementById("mensalidade-result");
    var semestreResult = document.getElementById("semestre-result");
    var mensalidadePro = document.getElementById("mensalidade-prouni");
    var semestrePro = document.getElementById("semestre-prouni");
    var economiaBase = document.getElementById("economia-result");
    var economiaPro = document.getElementById("economia-prouni");

    sectionTres.style.display = "none";

    function formatarBR(valor) {
        return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function calcular() {
        var base = parseFloat(mensalidadeInput.value.replace(",", ".")) || 0;
        var descontoDigitado = parseFloat(descontoInput.value.replace(",", ".")) || 0;
        var desconto;

        if (descontoDigitado === 0) {
            desconto = 0;
        } else if (descontoDigitado < 5) {
            desconto = 5;
        } else if (descontoDigitado > 50) {
            desconto = 50;
        } else {
            desconto = descontoDigitado;
        }

        if (desconto === 0) {
            descAplicadoSpan.textContent = "0%";
        } else {
            descAplicadoSpan.textContent = desconto.toFixed(0) + "%";
        }

        var valorComDesconto = base * (1 - desconto / 100);
        if (valorComDesconto < 0) {
            valorComDesconto = 0;
        }

        mensalidadeResult.textContent = formatarBR(valorComDesconto);
        semestreResult.textContent = formatarBR(valorComDesconto * 6);

        var economiaTotal = (base - valorComDesconto) * 6;
        economiaBase.textContent = formatarBR(economiaTotal);

        if (checkBox.checked) {
            var valorComProUni = valorComDesconto * 0.5;

            mensalidadePro.textContent = formatarBR(valorComProUni);
            semestrePro.textContent = formatarBR(valorComProUni * 6);

            var economiaProUni = (valorComDesconto - valorComProUni) * 6;
            economiaPro.textContent = formatarBR(economiaProUni);

            sectionTres.style.display = "block";
        } else {
            mensalidadePro.textContent = formatarBR(valorComDesconto);
            semestrePro.textContent = formatarBR(valorComDesconto * 6);
            economiaPro.textContent = formatarBR(0);

            sectionTres.style.display = "none";
        }
    }

    mensalidadeInput.addEventListener("input", calcular);
    descontoInput.addEventListener("input", calcular);
    checkBox.addEventListener("change", calcular);

    var btnLimpar = document.querySelector("button[type=reset]");
    if (btnLimpar) {
        btnLimpar.addEventListener("click", function () {
            descAplicadoSpan.textContent = "0%";
            mensalidadeResult.textContent = formatarBR(0);
            semestreResult.textContent = formatarBR(0);
            mensalidadePro.textContent = formatarBR(0);
            semestrePro.textContent = formatarBR(0);
            economiaBase.textContent = formatarBR(0);
            economiaPro.textContent = formatarBR(0);

            mensalidadeInput.value = "";
            descontoInput.value = "";
            checkBox.checked = false;

            sectionTres.style.display = "none";
        });
    }
});