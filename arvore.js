const VERMELHO = 'red';
const PRETO = 'black';

/**
 * Definição da estrutura de uma Árvore Rubro-negra
 */
function arvoreRB() {
	this.nil = { p: null, cor: PRETO }
	this.raiz = this.nil
}