document.addEventListener("DOMContentLoaded", function () {
    var checkBox = document.getElementById("toggle");
    var sectionTres = document.querySelector("section:nth-of-type(4)");
    var mensalidadeInput = document.getElementById("valor-mensalidade");
    var descontoInput = document.getElementById("desconto-unieuro");
    var descAplicadoSpan = document.getElementById("descAplicado");
    var mensalidadeResult = document.getElementById("mensalidade-result");
    var semestreResult = document.getElementById("semestre-result");
    var mensalidadePro = document.getElementById("mensalidade-prouni");
    var semestrePro = document.getElementById("semestre-prouni");
    var economiaBase = document.getElementById("economia-result");
    var economiaPro = document.getElementById("economia-prouni");
    var mensalidadeAntiga = document.getElementById("mensalidade-antiga");
    var semestreAntigo = document.getElementById("semestre-antigo");

    mensalidadeAntiga.textContent = "R$ 0,00";
    semestreAntigo.textContent = "R$ 0,00";
    economiaBase.textContent = "R$ 0,00";
    sectionTres.style.display = "none";

    function formatarBR(valor) {
        var n = Number(valor);
        return "R$ " + n.toFixed(2).replace(".", ",");
    }

    function calcular() {
        var base = parseFloat(mensalidadeInput.value.replace(",", ".")) || 0;
        var descontoDigitado = parseFloat(descontoInput.value.replace(",", ".")) || 0;

        var desconto;
        if (descontoDigitado === 0) desconto = 0;
        else if (descontoDigitado < 5) desconto = 5;
        else if (descontoDigitado > 50) desconto = 50;
        else desconto = descontoDigitado;

        descAplicadoSpan.textContent = desconto + "%";

        if (desconto === 0) {
            mensalidadeAntiga.textContent = "R$ 0,00";
            semestreAntigo.textContent = "R$ 0,00";
            economiaBase.textContent = "R$ 0,00";
        } else {
            mensalidadeAntiga.textContent = formatarBR(base);
            semestreAntigo.textContent = formatarBR(base * 6);

            var valorComDesconto = base * (1 - desconto / 100);
            if (valorComDesconto < 0) valorComDesconto = 0;

            var economiaTotal = (base - valorComDesconto) * 6;
            economiaBase.textContent = formatarBR(economiaTotal);
        }

        var valorComDesconto = base * (1 - desconto / 100);
        if (valorComDesconto < 0) valorComDesconto = 0;

        mensalidadeResult.textContent = formatarBR(valorComDesconto);
        semestreResult.textContent = formatarBR(valorComDesconto * 6);

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
            economiaPro.textContent = "R$ 0,00";

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
            mensalidadeAntiga.textContent = "R$ 0,00";
            semestreAntigo.textContent = "R$ 0,00";
            mensalidadeResult.textContent = "R$ 0,00";
            semestreResult.textContent = "R$ 0,00";
            mensalidadePro.textContent = "R$ 0,00";
            semestrePro.textContent = "R$ 0,00";
            economiaBase.textContent = "R$ 0,00";
            economiaPro.textContent = "R$ 0,00";

            mensalidadeInput.value = "";
            descontoInput.value = "";
            checkBox.checked = false;

            sectionTres.style.display = "none";
        });
    }
});

document.getElementById("download").addEventListener("click", function () {
    window.print();
});
