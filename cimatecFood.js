function calcularDescontoCupom(valorTotal, cupom) {
    if (valorTotal <= 0) {
        return 0;
    }

    if (cupom === "CIMATEC10") {
        return valorTotal * 0.90;
    }

    if (cupom === "ALUNO15") {
        return Math.max(0, valorTotal - 15);
    }

    return valorTotal;
}

function verificarEstoque(qtdDesejada, qtdEstoque) {
    if (qtdDesejada <= 0) {
        return "QUANTIDADE_INVALIDA";
    }

    if (qtdEstoque >= qtdDesejada) {
        return "DISPONIVEL";
    }

    return "INDISPONIVEL";
}

function calcularTempoEntrega(distanciaKm, ehExpress) {
    if (distanciaKm <= 0) {
        return -1;
    }

    let tempo = 15 + (5 * distanciaKm);

    if (ehExpress === true) {
        tempo = tempo / 2;
    }

    return tempo;
}

function validarTransicaoStatus(statusAtual, novoStatus) {
    const transicoes = {
        PENDENTE: ["PAGO", "CANCELADO"],
        PAGO: ["ENVIADO", "CANCELADO"],
        ENVIADO: ["ENTREGUE"],
        ENTREGUE: [],
        CANCELADO: []
    };

    return transicoes[statusAtual]?.includes(novoStatus) ?? false;
}

function calcularTotalPedido(itens, taxaEntrega) {
    if (!itens || itens.length === 0) {
        return 0;
    }

    const subtotal = itens.reduce((total, item) => {
        return total + (item.preco * item.quantidade);
    }, 0);

    return subtotal + taxaEntrega;
}

module.exports = {
    calcularDescontoCupom,
    verificarEstoque,
    calcularTempoEntrega,
    validarTransicaoStatus,
    calcularTotalPedido
};
