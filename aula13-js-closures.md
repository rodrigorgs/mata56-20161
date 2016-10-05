---
layout: lisp
title:  "JavaScript: Nomes, vinculação, escopo e closures"
date:   2016-09-23 16:40:00 -0300
categories: aula
---

## Nomes, vinculação e escopo

Em programas de computador, **nomes** representam coisas, como valores, comportamentos etc. Os nomes são **vinculados** às coisas que representam em diversos momentos. Por exemplo:

* O nome `if` é vinculado ao comportamento de estrutura de seleção em **tempo de projeto de linguagem**
* Em C, quando você escreve `#define PI 3.14159`, o nome `PI` é vinculado ao valor `3.14159` em **tempo de compilação**
* Em geral, variáveis são vinculadas aos seus valores em **tempo de execução**

Em linguagens de programação, vinculação (ou amarração, ou ligação, ou binding) se refere à vinculação de um nome a um valor ou comportamento.

**Escopo** de uma vinculação é o conjunto de trechos de um programa que consegue usar a vinculação. Exemplo:

```javascript
var glob = 123;     // 1
console.log(glob);  // 2
function teste() {  // 3
    var x = 2;      // 4
    console.log(x); // 5
}                   // 6
glob = 456;         // 7
```

O escopo da variável `glob` corresponde às linhas 2, 4, 5 e 7 do programa. O escopo da variável `x` corresponde à linha 5.

A variável `glob` tem um escopo **global**, pois é acessível em todo o programa (essa é uma definição simplificada). A variável `x` tem um escopo **local**, pois só é acessível dentro da função no qual ela é definida. A variável `teste` também possui escopo global (lembre-se de que em Javascript funções também são valores!).

A maioria das linguagens de programação adota regras de **escopo léxico** (ou estático). Isso significa que é possível determinar o escopo de uma variável somente lendo o código-fonte do programa. Algumas linguagens de programação usam o **escopo dinâmico**; uma situação comum nesse caso é uma função ter acesso a variáveis definidas na função que a chamou. Pode-se argumentar que uma linguagem de programação que adota o escopo dinâmico tende a resultar em programas mais difíceis de entender.

O **contexto** ou **ambiente de referenciamento** de uma região de um programa corresponde ao conjunto de vinculações que pode-se acessar naquela região. Vejamos o exemplo anterior:

```javascript
var glob = 123;     // 1
console.log(glob);  // 2
function teste() {  // 3
    var x = 2;      // 4
    console.log(x); // 5
}                   // 6
glob = 456;         // 7
```

O ambiente de referenciamento da linha 7 corresponde às variáveis `glob` e `teste` (e, naturalmente, outras variáveis definidas globalmente pelo browser, a exemplo de `window` e `console`). O ambiente de referenciamento da linha 5 contém todas essas variáveis e mais a variável `x`.

## Regras de escopo de Javascript

Considere agora o seguinte exemplo:

```javascript
/* 1  */ var glob = 1;
/* 2  */ 
/* 3  */ function externa() {
/* 4  */     var xext = 2;
/* 5  */ 
/* 6  */     function interna() {
/* 7  */         var xint = 3;
/* 8  */         console.log(xext);
/* 9  */     }
/* 10 */     interna();
/* 11 */ }
/* 12 */ externa();
```

O que acontecerá quando a linha 8 for executada? Vai dar erro? Para responder a essa pergunta, devemos descobrir se a variável `xext` faz ou não faz parte do ambiente de referenciamento da linha 8 (e da função `interna`, em geral).

Faça suas apostas e execute o código no console do seu navegador.

Para buscar da variável `xint`, o interpretador Javascript primeiro procura nas variáveis definidas dentro da função `interna`. Não encontrando, ele vai procurar variáveis definidas no contexto da função `externa`. Se ainda não encontrar, procura nas variáveis globais. Ou seja, o ambiente de referenciamento inclui o escopo atual e mais todos os escopos externos.

Então o que vai acontecer no seguinte código?

```javascript
/* 1  */ var x = 1;
/* 2  */ 
/* 3  */ function externa() {
/* 4  */     var x = 2;
/* 5  */ 
/* 6  */     function interna() {
/* 7  */         var x = 3;
/* 8  */         console.log(x);
/* 9  */     }
/* 10 */     interna();
/* 11 */ }
/* 12 */ externa();
```

Existem três vinculações diferentes do nome `x`, com diferentes escopos. Surge a dúvida: se o `x` da linha 1 tem escopo global, isso significa que esse escopo se estende à linha 8?

Não. A declaração de `x` na linha 4 **mascara** a variável `x` da linha 1 (esse fenômeno é também conhecido como **sombreamento**. O resultado disso é que, dentro da função `externa`, vale a variável `x` da linha `4`... exceto na linha 8, pois nesse caso a variável que vale é a variável `x` definida na linha 7. 

No final das contas, o escopo de `x` da linha 1 é a linha 12; o escopo de `x` da linha 4 é a linha 10; e o escopo de `x` da linha 7 é a linha 8.


## Closures

(Baseado em <https://developer.mozilla.org/en/docs/Web/JavaScript/Closures>)

Closures (do inglês, fechamento) são funções que referenciam variáveis independentes (livres). Em outras palavras, a função definida na closure lembra-se do ambiente no qual ele foi criado.

Vamos começar com um exemplo simples, sem closure:

```javascript
function alo() {
    var nome = "Turing";

    function mostraNome() {
        alert("Alo, " + nome);
    }
    mostraNome();
}
alo();
```

Agora um exemplo mais complexo, com closure:

```javascript
function criaFuncaoAlo() {
    var nome = "Turing";

    function mostraNome() {
        alert("Alo, " + nome);
    }
    return mostraNome;
}
var alo = criaFuncaoAlo();
alo();
```

O resultado é o mesmo, mas a função `criaFuncaoAlo` desta vez retorna a função interna `mostraNome`, sem executá-la. Em vez disso, a função só executada na última linha de código.

O código não é muito intuitivo. Normalmente, uma variável local definida em uma função só existe enquanto a função é executada; quando a execução termina, a variável deveria ser destruída e deixar de ser acessível. No exemplo, no entanto, a variável `nome` ainda está acessível depois que a função `criaFuncaoAlo` terminou de executar.

A solução desse mistério é que `mostraNome` tornou-se uma closure, que é um objeto especial que combina duas coisas: uma função e o ambiente na qual a função foi criada. O ambiente consiste de todas as variáveis locais disponíveis no momento em que a função foi criada. Dizemos que a função `mostraNome` **captura** a variável nome.

```
closure mostraNome =
  função mostraNome +
  variável nome
```

Mais um exemplo:

```javascript
function criaAlertRandom() {
    var x = Math.random();
    return function() {
        alert("Número sorteado: " + x);
    }
}
var funcAlert1 = criaAlertRandom();
var funcAlert2 = criaAlertRandom();
funcAlert1();
funcAlert2();
funcAlert1();
```

Qual o resultado? Três números iguais? Três números diferentes? O primeiro número será igual ao terceiro? Faça suas apostas, execute e revise seu conhecimento sobre closures.

Agora um exemplo mais útil, mostrando que parâmetros também são capturados por uma closure:

```javascript
function multiplicador(fator1) {
    return function(fator2) {
        return fator1 * fator2;
    }
}
var dobro = multiplicador(2);
var triplo = multiplicador(3);
alert(dobro(4));
alert(triplo(4));
```

A closure também pode alterar as variáveis capturadas:

```javascript
function criaContador() {
    var x = 0;
    return function() {
        x = x + 1;
        console.log(x);
    }
}
var contadorA = criaContador();
var contadorB = criaContador();
contadorA();
contadorA();
contadorA();
contadorB();
contadorB();
```

## Closures e programação orientada a objetos

Uma closure permite associar alguns dados (o ambiente) com a função que opera sobre os dados. Isso soa como programação orientada a objetos, na qual objetos permitem associar alguns dados (as propriedades do objeto) a um ou mais métodos.

Exemplo:

```javascript
function criaObjetoContador(nome) {
    var c = 0;

    function incrementa() {
        c = c + 1;
    }
    function mostra() {
        alert(nome + ": " + c);
    }

    return {"incrementa": incrementa,
        "mostra": mostra};
}
var contadorA = criaObjetoContador("A");
var contadorB = criaObjetoContador("B");
contadorA.incrementa();
contadorB.incrementa();
contadorA.incrementa();
contadorB.incrementa();
contadorA.incrementa();
contadorA.mostra();
contadorB.mostra();
```

Obviamente, esse esquema é limitado, pois não há herança e polimorfismo. Veremos como fazer programação orientada a objetos em Javascript do jeito certo em outro momento.

## Closures na prática

É importante entender closures para programar Javascript para web? **Muito**! Grande parte do código que escrevemos em Javascript para web é baseado em eventos: definimos um comportamento, então anexamos o comportamento a um evento que é disparado pelo usuário (por exemplo, um clique). O código é geralmente escrito em um callback: uma função que é executada em resposta a um evento.

Exemplo:

<div><script async src="//jsfiddle.net/hr17fgj4/embed/"></script>
<p><a href="https://jsfiddle.net/hr17fgj4/">https://jsfiddle.net/hr17fgj4/</a></p>
</div>

Agora vamos para um exemplo mais complexo:

<div><script async src="//jsfiddle.net/sftqbfj7/embed/"></script>
<p><a href="https://jsfiddle.net/sftqbfj7/">https://jsfiddle.net/sftqbfj7/</a></p>
</div>

Não funcionou como você gostaria? Por quê?

Que tal agora?

<div><script async src="//jsfiddle.net/e1srfbbv/embed/"></script>
<p><a href="https://jsfiddle.net/e1srfbbv/">https://jsfiddle.net/e1srfbbv/</a></p>
</div>

Uma versão um pouco mais compacta (e obscura, mas ainda assim muito utilizada):

<div><script async src="//jsfiddle.net/65j26erk/embed/"></script>
<p><a href="https://jsfiddle.net/65j26erk/">https://jsfiddle.net/65j26erk/</a></p>
</div>

A última solução usa uma IIFE (immediately-invoked function expression, ou expressão de função invocada imediatamente).