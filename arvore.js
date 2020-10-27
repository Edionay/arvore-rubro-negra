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



/**
 * Insere um no na árvore
 * @param {*} no 
 */
arvoreRB.prototype.inserir = function (no) {
	no.p = this.nil
	let temp = this.nil
	raiz = this.raiz
	while (raiz != this.nil) {
		temp = raiz
		if (no.key < raiz.key) raiz = raiz.esquerdo
		else raiz = raiz.direito
	}

	no.p = temp
	if (temp == this.nil) this.raiz = no
	else if (no.key < temp.key) temp.esquerdo = no
	else temp.direito = no

	no.esquerdo = this.nil
	no.direito = this.nil
	no.cor = VERMELHO
	this.reparoDeInsercao(no)
}

/**
 * Reparo após inserção
 * @param {*} no 
 */
arvoreRB.prototype.reparoDeInsercao = function (no) {

	let temp
	while (no.p.cor == VERMELHO) {
		if (no.p == no.p.p.esquerdo) {
			temp = no.p.p.direito
			if (temp.cor == VERMELHO) {
				no.p.cor = PRETO
				temp.cor = PRETO
				no.p.p.cor = VERMELHO
				no = no.p.p
			}
			else {
				if (no == no.p.direito) {
					no = no.p
					this.rotacaoEsquerda(no)
				}
				no.p.cor = PRETO
				no.p.p.cor = VERMELHO
				this.rotacaoDireita(no.p.p)
			}
		}
		else {
			temp = no.p.p.esquerdo
			if (temp.cor == VERMELHO) {
				no.p.cor = PRETO
				temp.cor = PRETO
				no.p.p.cor = VERMELHO
				no = no.p.p
			}
			else {
				if (no == no.p.esquerdo) {
					no = no.p
					this.rotacaoDireita(no)
				}
				no.p.cor = PRETO
				no.p.p.cor = VERMELHO
				this.rotacaoEsquerda(no.p.p)
			}
		}
	}
	this.raiz.cor = PRETO
}


/**
 * Busca por um nó na árvore especificada
 * @param {*} raiz 
 * @param {*} chave 
 */
arvoreRB.prototype.buscar = function (raiz, chave) {
	if (chave == raiz.key)
		return raiz;
	if (chave < raiz.key)
		return this.buscar(raiz.esquerdo, chave)
	else
		return this.buscar(raiz.direito, chave)

}