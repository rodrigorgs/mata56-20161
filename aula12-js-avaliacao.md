---
layout: lisp
title:  "JavaScript: Introdução e funções de alta ordem"
date:   2016-09-21 16:40:00 -0300
categories: aula
---

# JavaScript: funções de alta ordem e escopo

JavaScript (JS) é uma linguagem de programação dinâmica, de tipificação fraca e interpretada. Ela foi criada em 1995 pela Netscape Communications, empresa que desenvolveu um dos primeiros navegadores web. Mais tarde, a linguagem foi formalizada na especificação ECMAScript (ES), que vem evoluindo desde então. No momento em que este texto foi escrito, a versão mais recente da especificação é a ECMAScript 2016 (anteriormente conhecida como ECMAScript 7), mas mesmo o ECMAScript 2015, ou [ECMAScript 6](http://es6-features.org/) não é suportado completamente por todos os navegadores. Projetos como o [Babel](http://babeljs.io/) permitem transformar código de uma versão mais recente para uma versão mais antiga da especificação.

## Estruturas básicas

### Strings

Strings podem ser escritas com `"`, `'` ou `` ` ``. Em qualquer caso, você pode usar a barra invertida (`\`) para "escapar" um caractere que do contrário teria um significado especial. Exemplo:

<div class="lesson">
<textarea class="code">
// A função console.log escreve algo no console do navegador.
console.log("Use \\ para \"escapar\" caracteres especiais.");
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Apenas as strings com acento grave (`` ` ``) permitem interpolação de strings:

<div class="lesson">
<textarea class="code">
let nome = 'Fulano';
let idade = 18;

console.log(`O aluno ${nome} tem ${idade} anos.`);
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

### Objetos

Objetos em JavaScript são estruturas chave-valor, similar a estruturas que em outras linguagens são chamadas de hash, mapa ou dicionário. As chaves são chamadas propriedades do objeto. Exemplo:

<div class="lesson">
<textarea class="code">
// Objeto pessoa com duas propriedades: nome e idade.
let pessoa = {
    nome: 'Fulano',
    idade: 18
};

// Acessando propriedades (duas formas equivalentes)
console.log(pessoa.nome);
console.log(pessoa['nome']);

// Alterando propriedades
pessoa.nome = 'Sicrano';
console.log(pessoa.nome);
console.log(pessoa['nome']);
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Para saber mais: [Working with objects (Mozilla Developer Network)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects).

### Arrays

Um array em Javascript (ex.: `[1, 2, 3]`) é um objeto **mutável**, isto é, ele pode ser modificado. As funções que modificam o array são chamadas de funções **destrutivas**. As funções não-destrutivas são aquelas que não modificam o array; em vez disso, elas retornam um novo array que é construído a partir de um array pré-existente.

Do ponto de vista das linguagens funcionais, uma função deve apenas receber valores como parâmetro e retornar um valor. Se a função modifica algum parâmetro, altera variáveis globais, ou acessa entrada/saída (ex.: modifica um arquivo), esses comportamentos são considerados **efeitos colaterais** de se chamar a função, e a função é dita **não-pura**. 

Uma função pura, sem efeitos colaterais, vai sempre retornar o mesmo resultado para uma determinada entrada, não importa quantas vezes a função seja chamada.

A seguir, algumas operações sobre arrays. Nos exemplos, considere que `a` é um array.


|         Operação        |  destrutiva |    não-destrutiva    |
|-------------------------|-------------|----------------------|
| Obter primeiro elemento | ...         | `x = a[0]`           |
| Obter restante da lista | `a.shift()` | `l = a.slice(0, -1)` |
| Adicionar x ao final    | `a.push(x)` | `l = a.concat([x])`  |


### Funções como cidadãos de primeira classe

Como já vimos, JavaScript é uma linguagem na qual funções são cidadãos de primeira classe, isto é, elas podem ser atribuídas a variáveis, passadas como parâmetro e retornadas de outras funções.

Exemplo:

<button id="botao1">botao1</button>

```javascript
function cumprimenta() {
    alert('Oi, tudo bom?');
}

let botao = document.getElementById('botao1');
botao.addEventListener('click', cumprimenta);
```

<script type="text/javascript">
function cumprimenta() {
    alert('Oi, tudo bom?');
}

let botao = document.getElementById('botao1');
botao.addEventListener('click', cumprimenta);
</script>

Nesse exemplo, a função `cumprimenta` foi passada como parâmetro para a função `addEventListener` (tecnicamente, `addEventListener` é um método -- já que JavaScript é orientada a objetos -- mas na prática é muito semelhante a uma função).

## Funções de alta ordem

Exemplo de função que recebe função como parâmetro, executando a função 3 vezes, cada vez passando um número:

<div class="lesson">
<textarea class="code">
function executaDe1a3(funcao) {
  funcao(1);
  funcao(2);
  funcao(3);
}

executaDe1a3(function (x) { console.log('Dou-lhe ' + x); });
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Note que, desta vez, definimos uma função anônima, `function (x) { console.log('Dou-lhe ' + x); }`.

JavaScript já define algumas funções de alta ordem importantes, como a função `map`:

<div class="lesson">
<textarea class="code">
let numeros = [1, 2, 3, 5, 8, 13];
let dobro = numeros.map(function (x) { return x * 2; });
console.log(dobro);
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Funções de alta ordem em JavaScript para arrays: `forEach`, `filter`, `map`, `reduce`, `some`, `every`, `find`, `findIndex`, 

## Funções anônimas (sintaxe nova)

Há uma notação compacta para definir funções anônimas: `x => x * 2` (função que recebe um argumento, `x` e retorna o seu dobro). Outros exemplos:

- `(x, y) => x + y`: função soma (para funções com dois ou mais argumentos, eles precisam ser envoltos em parênteses)
- `() => 42`: função que não recebe argumentos e sempre retorna 42.
- `x => { console.log(x); x + 1 }`: função sucessor com impressão no console (para rodar duas ou mais instruções, envolva-as com chaves; o resultado da última instrução é retornado)
- `(n, a) => ({nome: n, altura: a})`: função que retorna um objeto construído a partir de dois parâmetros (para retornar um objeto/hash, envolva as chaves em parênteses)

(Experimente [converter essa notação](http://babeljs.io/repl/) para JavaScript antigo)

Exemplo:

<div class="lesson">
<textarea class="code">
let numeros = [1, 2, 3, 5, 8, 13];
let dobro = numeros.map(x => x * 2);
console.log(dobro);

let criaPessoa = (nome, idade) => ({"nome": nome, "idade": idade});
let pessoa = criaPessoa("Fulano", 18);
console.log(pessoa);
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Exercícios

### map

Implemente a função `map` em JavaScript:

(Duas implementações possíveis: criando um array e modificando-o com operações destrutivas, ou usando apenas operações não-destrutivas)

<div class="lesson">
<textarea class="code">
function map(funcao, lista) {
  // TODO: implementar
  return [];
}

teste([2, 4, 6], map(x => x * 2, [1, 2, 3]));
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Filmes

Nos exemplos a seguir, considere os seguintes dados (execute o código para carregar a variável `filmes` na memória):

<div class="lesson">
<textarea class="code">
filmes = [
{
    "id": 70111470,
    "title": "Die Hard",
    "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
    "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
    "rating": 4.0,
    "bookmark": []
},
{
    "id": 654356453,
    "title": "Bad Boys",
    "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
    "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
    "rating": 5.0,
    "bookmark": [{ id:432534, time:65876586 }]
},
{
    "id": 65432445,
    "title": "The Chamber",
    "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
    "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
    "rating": 4.0,
    "bookmark": []
},
{
    "id": 675465,
    "title": "Fracture",
    "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
    "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
    "rating": 4.5,
    "bookmark": [{ id:432534, time:65876586 }]
}
];

console.log(`Variável filmes carregada, com ${filmes.length} elementos.`);
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

### map

Use a função `map` para mapear o array em um novo array contendo somente os títulos dos filmes

<div class="lesson">
<textarea class="code">
let x = filmes.map(/* complete o código */);
teste(["Die Hard", "Bad Boys", "The Chamber", "Fracture"], x);
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

### filter

Use a função `filter` para selecionar apenas os filmes com notas superior a 4.

<div class="lesson">
<textarea class="code">
let x = filmes.filter(/* complete o código */);

let respostaCorreta = [
{
    "id": 654356453,
    "title": "Bad Boys",
    "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
    "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
    "rating": 5.0,
    "bookmark": [{ id:432534, time:65876586 }]
},
{
    "id": 675465,
    "title": "Fracture",
    "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
    "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
    "rating": 4.5,
    "bookmark": [{ id:432534, time:65876586 }]
}
];
teste(respostaCorreta, x);
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

### map e filter

Agora combine map e filter para retornar apenas os títulos dos filmes com nota superior a 4.

<div class="lesson">
<textarea class="code">
let x = 0; /* altere esta linha */

teste(["Bad Boys", "Fracture"], x);
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

### reduce

A função `reduce` aplica uma função dada a um acumulador e cada elemento do array para reduzir o array a um único valor. A sintaxe é:

`arr.reduce(f, valorInicial)`, onde

- `valorInicial` é o valor inicial do acumulador
- `f` é uma função que recebe dois parâmetros:
    - `acum`: o valor atual do acumulador
    - `x`: o elemento sendo processado atualmente no array
    - (na verdade a função `f` recebe 4 argumentos, mas vamos ignorar os outros dois)
- o retorno da função `f` é atribuído ao acumulador para ser usado na próxima invocação de `f`
- `reduce` retorna o valor final do acumulador

Exemplo (função soma):

<div class="lesson">
<textarea class="code">
let somaNotas = filmes.map(x => x.rating).reduce((acum, x) => x + acum, 0);

teste(18.5, somaNotas);
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

### reduce (máximo)

Agora use reduce para retornar a maior nota do conjunto.

<div class="lesson">
<textarea class="code">
let maiorNota = filmes.map(x => x.rating).reduce(/* complete o código */);

teste(18.5, somaNotas);
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

(Você também pode tentar calcular a maior nota sem usar funções de alta ordem. O código será muito mais longo.)
