const VERMELHO = 'red';
const PRETO = 'black';

/**
 * Definição da estrutura de uma Árvore Rubro-negra
 */
function arvoreRB() {
	this.nil = { p: null, cor: PRETO }
	this.raiz = this.nil
}


/**
 * Rotação para a esquerda
 * @param {*} no Nó
 */
arvoreRB.prototype.rotacaoEsquerda = function (no) {
	let filhoDireito = no.direito
	no.direito = filhoDireito.esquerdo
	if (filhoDireito.esquerdo != this.nil) filhoDireito.esquerdo.p = no
	filhoDireito.p = no.p
	if (no.p == this.nil) this.raiz = filhoDireito
	else if (no == no.p.esquerdo) no.p.esquerdo = filhoDireito
	else no.p.direito = filhoDireito
	filhoDireito.esquerdo = no
	no.p = filhoDireito
}

/**
 * Rotação para a esquerda
 * @param {*} no Nó
 */
arvoreRB.prototype.rotacaoDireita = function (no) {
	console.log('rightRotate:' + no.key)
	let filhoEsquerdo = no.esquerdo
	no.esquerdo = filhoEsquerdo.direito
	if (filhoEsquerdo.direito != this.nil) filhoEsquerdo.direito.p = no
	filhoEsquerdo.p = no.p
	if (no.p == this.nil) this.raiz = filhoEsquerdo
	else if (no == no.p.direito) no.p.direito = filhoEsquerdo
	else no.p.esquerdo = filhoEsquerdo
	filhoEsquerdo.direito = no
	no.p = filhoEsquerdo
}