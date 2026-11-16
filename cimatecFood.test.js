
const {
    calcularDescontoCupom,
    verificarEstoque,
    calcularTempoEntrega,
    validarTransicaoStatus,
    calcularTotalPedido
} = require("./cimatecFood");


describe("Modulo de Descontos", () => {

    test("Deve aplicar 10% de desconto", () => {
        expect(calcularDescontoCupom(100, "CIMATEC10")).toBe(90);
    });

    test("Deve descontar R$15,00", () => {
        expect(calcularDescontoCupom(100, "ALUNO15")).toBe(85);
    });

    test("Nao deve permitir valor negativo", () => {
        expect(calcularDescontoCupom(10, "ALUNO15")).toBe(0);
    });

    test("Deve retornar 0 para valor invalido", () => {
        expect(calcularDescontoCupom(0, "CIMATEC10")).toBe(0);
    });

    test("Cupom invalido deve manter o valor original", () => {
        expect(calcularDescontoCupom(100, "INVALIDO")).toBe(100);
    });
});


describe("Modulo de Estoque", () => {

    test("Produto disponivel no estoque", () => {
        expect(verificarEstoque(5, 10)).toBe("DISPONIVEL");
    });

    test("Produto indisponivel no estoque", () => {
        expect(verificarEstoque(10, 5)).toBe("INDISPONIVEL");
    });

    test("Quantidade desejada igual ao estoque", () => {
        expect(verificarEstoque(5, 5)).toBe("DISPONIVEL");
    });

    test("Quantidade invalida", () => {
        expect(verificarEstoque(0, 10)).toBe("QUANTIDADE_INVALIDA");
    });

    test("Quantidade negativa", () => {
        expect(verificarEstoque(-2, 10)).toBe("QUANTIDADE_INVALIDA");
    });
});


describe("Modulo de Logistica", () => {

    test("Calcula tempo normal de entrega", () => {
        expect(calcularTempoEntrega(2, false)).toBe(25);
    });

    test("Calcula tempo de entrega expressa", () => {
        expect(calcularTempoEntrega(2, true)).toBe(12.5);
    });

    test("Distancia invalida", () => {
        expect(calcularTempoEntrega(0, false)).toBe(-1);
    });

    test("Distancia negativa", () => {
        expect(calcularTempoEntrega(-5, false)).toBe(-1);
    });
});


describe("Modulo de Pedidos", () => {

    test("PENDENTE pode mudar para PAGO", () => {
        expect(validarTransicaoStatus("PENDENTE", "PAGO")).toBe(true);
    });

    test("PENDENTE pode mudar para CANCELADO", () => {
        expect(validarTransicaoStatus("PENDENTE", "CANCELADO")).toBe(true);
    });

    test("PAGO pode mudar para ENVIADO", () => {
        expect(validarTransicaoStatus("PAGO", "ENVIADO")).toBe(true);
    });

    test("ENVIADO pode mudar para ENTREGUE", () => {
        expect(validarTransicaoStatus("ENVIADO", "ENTREGUE")).toBe(true);
    });

    test("Nao permite pular etapas", () => {
        expect(validarTransicaoStatus("PENDENTE", "ENTREGUE")).toBe(false);
    });

    test("Nao permite transicao de ENTREGUE para PENDENTE", () => {
        expect(validarTransicaoStatus("ENTREGUE", "PENDENTE")).toBe(false);
    });

    test("Status desconhecido retorna false", () => {
        expect(validarTransicaoStatus("DESCONHECIDO", "PAGO")).toBe(false);
    });
});


describe("Modulo de Fechamento de Carrinho", () => {

    test("Calcula subtotal e adiciona taxa de entrega", () => {
        const itens = [
            { preco: 10, quantidade: 2 },
            { preco: 20, quantidade: 1 }
        ];

        expect(calcularTotalPedido(itens, 5)).toBe(45);
    });

    test("Carrinho vazio retorna zero", () => {
        expect(calcularTotalPedido([], 5)).toBe(0);
    });

    test("Carrinho nulo retorna zero", () => {
        expect(calcularTotalPedido(null, 5)).toBe(0);
    });

    test("Calcula pedido com varios produtos", () => {
        const itens = [
            { preco: 15, quantidade: 2 },
            { preco: 8, quantidade: 3 },
            { preco: 10, quantidade: 1 }
        ];

        expect(calcularTotalPedido(itens, 7)).toBe(71);
    });
});
