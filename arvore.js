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


arvoreRB.prototype.minimo = function (raiz) {
	console.log("minimum:" + raiz.key)
	while (raiz.esquerdo != this.nil) {
		raiz = raiz.esquerdo
	}
	return raiz
}

/**
 * Troca um nó de lgar com outro
 * @param {*} noA 
 * @param {*} noB 
 */
arvoreRB.prototype.transpor = function (noA, noB) {
	if (noA.p == this.nil) this.raiz = noB
	else if (noA == noA.p.esquerdo) noA.p.esquerdo = noB
	else noA.p.direito = noB
	noB.p = noA.p
}

/**
 * Exclui um nó
 * @param {*} no 
 */
arvoreRB.prototype.excluir = function (no) {
	console.log("delete:" + no.key)
	let temp = no
	let corInicialDoNo = temp.cor
	if (no.esquerdo == this.nil) {
		raiz = no.direito
		this.transpor(no, no.direito)
	}
	else if (no.direito == this.nil) {
		raiz = no.esquerdo
		this.transpor(no, no.esquerdo)
	}
	else {
		temp = this.minimo(no.direito)
		corInicialDoNo = temp.cor
		raiz = temp.direito
		if (temp.p == no) {
			raiz.p = temp
		}
		else {
			this.transpor(temp, temp.direito)
			temp.direito = no.direito
			temp.direito.p = temp
		}
		this.transpor(no, temp)
		temp.esquerdo = no.esquerdo
		temp.esquerdo.p = temp
		temp.cor = no.cor
	}
	if (corInicialDoNo == PRETO)
		this.reparoDeExclusao(raiz)
}

/**
 * Reparo após exclusão
 * @param {*} raiz 
 */
arvoreRB.prototype.reparoDeExclusao = function (raiz) {

	let irmao
	while (raiz != this.raiz && raiz.cor == PRETO) {
		if (raiz == raiz.p.esquerdo) {
			irmao = raiz.p.direito


			if (irmao.cor == VERMELHO) {
				irmao.cor = PRETO
				raiz.p.cor = VERMELHO
				this.rotacaoEsquerda(raiz.p)
				irmao = raiz.p.direito
			}

			if (irmao.esquerdo.cor == PRETO && irmao.direito.cor == PRETO) {
				irmao.cor = VERMELHO
				raiz = raiz.p
			}

			else {
				if (irmao.direito.cor == PRETO) {
					irmao.esquerdo.cor = PRETO
					irmao.cor = VERMELHO
					this.rotacaoDireita(irmao)
					irmao = raiz.p.direito
				}
				irmao.cor = raiz.p.cor
				raiz.p.cor = PRETO
				irmao.direito.cor = PRETO
				this.rotacaoEsquerda(raiz.p)
				raiz = this.raiz
			}
		}
		else {
			irmao = raiz.p.esquerdo
			if (irmao.cor == VERMELHO) {
				irmao.cor = PRETO
				raiz.p.cor = VERMELHO
				this.rotacaoDireita(raiz.p)
				irmao = raiz.p.esquerdo
			}

			if (irmao.direito.cor == PRETO && irmao.esquerdo.cor == PRETO) {
				irmao.cor = VERMELHO
				raiz = raiz.p
			}
			else {
				if (irmao.esquerdo.cor == PRETO) {
					irmao.esquerdo.cor = PRETO
					irmao.cor = VERMELHO
					this.rotacaoEsquerda(irmao)
					irmao = raiz.p.esquerdo
				}
				irmao.cor = raiz.p.cor
				raiz.p.cor = PRETO
				irmao.esquerdo.cor = PRETO
				this.rotacaoDireita(raiz.p)
				raiz = this.raiz
			}
		}
	}
	raiz.cor = PRETO
}
