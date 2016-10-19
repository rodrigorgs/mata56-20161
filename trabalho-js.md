---
layout: lisp
title:  "Trabalho de JavaScript: meuhorarioJS"
date:   2016-10-29 16:40:00 -0300
categories: aula
---

<style type="text/css">
table, th, tr, td {
  border: 1px solid black;
}
</style>

# Trabalho: meuhorarioJS

## Prazo e forma de entrega

O trabalho deve ser enviado para o e-mail <rodrigo@dcc.ufba.br> até a meia-noite do dia 29/10 (sábado), horário local de Salvador, sob a forma de um anexo contendo as respostas no formato que é obtido ao seguir o procedimento descrito a seguir. Quem fizer a questão bônus deve anexar um arquivo adicional, o arquivo HTML solicitado na questão bônus.

## Salvando e carregando os dados

Para **salvar** suas respostas, abra o console e execute a instrução

```javascript
prompt('', obtemRespostasJson())
```

Ou clique no botão: <button onclick="prompt('', obtemRespostasJson())">salvar respostas</button>

O navegador vai abrir um janela com um campo de texto selecionado. Copie o texto (Ctrl+C) e cole (Ctrl+V) em algum editor de texto. Esse texto representa suas **respostas**.

Para **carregar** suas respostas, copie (Ctrl+C) o texto que você colou anteriormente, então execute a seguinte instrução no console JavaScript

```javascript
carregaRespostasJson(prompt(''))
```

Ou clique no botão: <button onclick="carregaRespostasJson(prompt(''))">carregar respostas</button>

O navegador vai abrir uma janela com um campo de texto. Cole as suas respostas, e clique em OK.

## Código de conduta

Nós,

<div class="lesson">
<textarea class="code">
// Nome completo 1
// Nome completo 2
// Nome completo 3
// Nome completo 4</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) {  }</pre>
<button class="go" style="display: none;">Rodar</button>
</div>

declaramos que 

- todas as respostas são fruto de nosso próprio trabalho, 
- não copiamos respostas de colegas externos à equipe,
- não disponibilizamos nossas respostas para colegas externos à equipe e
- não realizamos quaisquer outras atividades desonestas para nos beneficiar ou prejudicar outros.

## Introdução: meuhorarioJS

Oi, tudo bom? Você conhece o [meuhorario](http://meuhorario.dcc.ufba.br/)? Trata-se de um site feito para o aluno da UFBA simular sua matrícula, escolhendo as disciplinas e turmas que deseja cursar no próximo semestre.

Neste trabalho você vai implementar um *fork* do meuhorario chamado meuhorarioJS, ou pelo menos uma parte importante do projeto: a listagem de disciplinas e turmas. Para isso, você precisará trabalhar com closures, currying, aplicação parcial e programação concorrente. Mas não se preocupe! Vou guiar você no passo-a-passo para transformar essa ideia em realidade.

## Disciplinas e turmas

Os dados usados no meuhorarioJS são oriundos de dois *arrays*: `disciplinas` e `turmas`. Para começarmos a programar, vamos considerar dois exemplos desse array, `exDisciplinas` e `exTurmas`.

O *array* disciplinas contém objetos que representam as disciplinas:

<div class="lesson">
<textarea class="code">
exDisciplinas = [
  {
    id: 'mata56',
    nome: 'Paradigmas de Linguagens de Programação',
    semestre: 5
  },
  {
    id: 'mata62',
    nome: 'Engenharia de Software I',
    semestre: 4
  },
];
console.log('Carregou disciplinas');
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Cada disciplina pode ter uma ou mais turmas. As turmas são representadas por um outro array de objetos:

<div class="lesson">
<textarea class="code">
exTurmas = [
  {
    disciplina: 'mata56',
    turma: 't01',
    dias: ['qua', 'sex'],
    horario: '16:40'
  },
  {
    disciplina: 'mata56',
    turma: 't02',
    dias: ['qua', 'sex'],
    horario: '20:20'
  },
  {
    disciplina: 'mata62',
    turma: 't02',
    dias: ['seg', 'qua'],
    horario: '18:30'
  }
];
console.log('Carregou turmas');
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Combinando disciplinas e turmas em um mesmo objeto

A primeira coisa que precisamos fazer é um JOIN de disciplinas e turmas, de forma a obter um array de turmas que possui também dados das disciplinas. Para isso, vamos começar realizando um [produto cartesiano](https://pt.wikipedia.org/wiki/Produto_cartesiano) (CROSS JOIN) dos dois arrays, isto é, vamos criar um objeto para cada combinação possível de turma e disciplina.

Como ainda estamos esquentando os motores, vou fornecer essa função já pronta:

<div class="lesson">
<textarea class="code">
crossJoin = R.pipe(
    (arr1, arr2) => R.map(e1 => R.map(e2 => R.merge(e1,e2), arr2), arr1), R.flatten);
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Se não souber o que cada função faz, consulte a [documentação do Ramda](http://ramdajs.com/docs/).

Vamos ver o resultado do `crossJoin`? Abaixo, usamos `console.table` para exibir a lista de objetos em formato de tabela.

<div class="lesson"><textarea class="code">
console.table(crossJoin(exDisciplinas, exTurmas));
</textarea><div class="output"></div><div class="output"></div><pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button></div>

Legal, né? Só tem um problema, estamos misturando dados de uma disciplina com turmas de outra disciplina (afinal, o produto cartesiano faz combinação de todos os elementos de um array com todos os elementos do outro).

Agora é sua vez. Filtre as linhas do array de forma a restarem apenas as linhas nas quais `id` é igual a `disciplina`. Note que você não pode modificar o código que aparece em cores mais claras.

<div class="lesson"><textarea class="code">
var cj = crossJoin(exDisciplinas, exTurmas);
var filtrado = R.filter(
// --- Complete o código

// ---
);
console.table(filtrado(cj));
</textarea><div class="output"></div><div class="output"></div><pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button></div>

Ótimo! Mais uma coisa: o código da disciplina aparece em duas colunas da tabela. Além disso, queremos que o número do semestre apareça primeiro. Para fazer isso, podemos usar a função `R.pick`, dessa forma:

<div class="lesson"><textarea class="code">
var cj = crossJoin(exDisciplinas, exTurmas);
var antes = cj[0];
console.log('Antes:');
console.table([antes]);

var reordena = linha => R.pick(['semestre', 'id', 'nome', 'turma', 'dias', 'horario'], linha);
var depois = reordena(antes);
console.log('Depois:');
console.table([depois]);
</textarea><div class="output"></div><div class="output"></div><pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button></div>

Vamos juntar tudo? Crie uma função `combinaDados`, que recebe os dois arrays (de disciplinas e de turmas) e retorna um array resultante das operações de `crossJoin`, `R.filter` e `R.pick`. Observe que a função `R.pick` recebe um único objeto como parâmetro, mas você precisará aplicá-la a um array de objetos...

<div class="lesson"><textarea class="code">
combinaDados = R.pipe(
// --- Complete o código
  
// ---
);

teste([{"semestre":5,"id":"mata56","nome":"Paradigmas de Linguagens de Programação","turma":"t01","dias":["qua","sex"],"horario":"16:40"},{"semestre":5,"id":"mata56","nome":"Paradigmas de Linguagens de Programação","turma":"t02","dias":["qua","sex"],"horario":"20:20"},{"semestre":4,"id":"mata62","nome":"Engenharia de Software I","turma":"t02","dias":["seg","qua"],"horario":"18:30"}], combinaDados(exDisciplinas, exTurmas));
</textarea><div class="output"></div><div class="output"></div><pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button></div>

## Exibindo os dados como uma tabela HTML na página

Agora que temos os dados formatados da maneira que precisamos, precisamos exibi-los para o usuário. Para isso, vamos usar uma tabela HTML. Tabelas em HTML são modeladas como uma sequência de linhas, representadas pela tag `<tr>`, em que cada linha possui uma sequência de células (uma para cada coluna da tabela), representadas pela tag `<td>`, e tudo isso envolto na tag `<table>`. Exemplo:

```html
<table>
  <tr>
    <td>mata56</td><td>Paradigmas de Linguagens de Programação</td>
  </tr>
  <tr>
    <td>mata62</td><td>Engenharia de Software I</td>
  </tr>
</table>
```

Resultado:

<table>
  <tr>
    <td>mata56</td><td>Paradigmas de Linguagens de Programação</td>
  </tr>
  <tr>
    <td>mata62</td><td>Engenharia de Software I</td>
  </tr>
</table>

Precisamos realizar uma sequência de operações sobre os nossos dados para transformar os dados originais em uma string que representa uma tabela HTML dos nossos dados:

```javascript
// Dados originais:

[
  {id: 'mata56', nome: 'Paradigmas de Linguagens de Programação'},
  {id: 'mata62', nome: 'Engenharia de Software I'}
]

// Para cada objeto, vamos extrair seus valores:

[
  ['mata56', 'Paradigmas de Linguagens de Programação'],
  ['mata62', 'Engenharia de Software I']
]

// Para cada valor, vamos criar a representação da célula na tabela HTML:

[
  ['<td>mata56</td>', '<td>Paradigmas de Linguagens de Programação</td>'],
  ['<td>mata62</td>', '<td>Engenharia de Software I</td>']
]

// A seguir vamos juntar as células e uma única string:

[
  '<td>mata56</td><td>Paradigmas de Linguagens de Programação</td>',
  '<td>mata62</td><td>Engenharia de Software I</td>'
]

// E então envolver as strings na tag <tr>:

[
  '<tr><td>mata56</td><td>Paradigmas de Linguagens de Programação</td></tr>',
  '<tr><td>mata62</td><td>Engenharia de Software I</td></tr>'
]

// E então juntar tudo isso em uma única string:


'<tr><td>mata56</td><td>Paradigmas de Linguagens de Programação</td></tr>
<tr><td>mata62</td><td>Engenharia de Software I</td></tr>'

// E por fim envolver tudo isso na tag <table>

'<table><tr><td>mata56</td><td>Paradigmas de Linguagens de Programação</td></tr>
<tr><td>mata62</td><td>Engenharia de Software I</td></tr></table>'
```

Podemos construir um pipe para realizar essa sequência de transformações. Para simplificar, vamos dividir o trabalho em duas funções: uma para converter um objeto Javascript (`{}`) em uma string que representa uma linha da tabela HTML, e outra para combinar as linhas.

```javascript
converteObjetoParaLinhaHTML = R.pipe(
  obtemValoresDoObjeto,
  R.map(envolveNaTag('td')),
  combinaStrings,
  envolveNaTag('tr')
);

converteArrayParaTabelaHTML = R.pipe(
  R.map(converteObjetoParaLinhaHTML),
  combinaStrings,
  envolveNaTag('table')
);
```

Seu trabalho é definir as funções `obtemValoresDoObjeto`, `envolveNaTag` e `combinaStrings`. Ou melhor, `obtemValoresDoObjeto` já está pronta:

<div class="lesson"><textarea class="code">
obtemValoresDoObjeto = R.curry(obj => Object.keys(obj).map(key => obj[key]));
</textarea><div class="output"></div><div class="output"></div><pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button></div>

Defina a função `envolveNaTag`, que recebe o nome de uma tag HTML e uma string, e envolve a string na tag. Na dúvida, veja o teste.

<div class="lesson"><textarea class="code">
envolveNaTag = R.curry(
  // --- Complete o código

  // ---
);

teste('<b>Alo mundo!</b>', envolveNaTag('b', 'Alo mundo!'));
teste('<b>Alo mundo!</b>', envolveNaTag('b')('Alo mundo!'));
</textarea><div class="output"></div><div class="output"></div><pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button></div>

Agora defina a função `combinaStrings`, que recebe um array de strings e retorna uma única string que combina todos os elementos do array. Na dúvida, veja o teste.

<div class="lesson"><textarea class="code">
combinaStrings = R.reduce(
  // --- Complete o código

  // ---
);

teste('abc', combinaStrings(['a', 'b', 'c']));
teste('Alo mundo!', combinaStrings(['Alo', ' ', 'mundo', '!']));
</textarea><div class="output"></div><div class="output"></div><pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button></div>

Agora é o teste pra valer! Vamos ver se as funções `converteObjetoParaLinhaHTML` e `converteArrayParaTabelaHTML` vão funcionar com as funções que você acabou de implementar. Vou dar uma chance para você preencher os argumentos de `R.pipe` sem olhar a resposta lá em cima.

<div class="lesson"><textarea class="code">
converteObjetoParaLinhaHTML = R.pipe(
  // --- Complete o código

  // ---
);

teste('<tr><td>mata56</td><td>Paradigmas de Linguagens de Programação</td></tr>', converteObjetoParaLinhaHTML({id: 'mata56', nome: 'Paradigmas de Linguagens de Programação'}));
</textarea><div class="output"></div><div class="output"></div><pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button></div>


Agora vamos ver se `converteArrayParaTabelaHTML` também funciona. Vou dar uma chance para você preencher os argumentos de `R.pipe` sem olhar a resposta lá em cima.

<div class="lesson"><textarea class="code">
converteArrayParaTabelaHTML = R.pipe(
  // --- Complete o código

  // ---
);

teste('<table><tr><td>mata56</td><td>Paradigmas de Linguagens de Programação</td></tr><tr><td>mata62</td><td>Engenharia de Software I</td></tr></table>', converteArrayParaTabelaHTML([{id: 'mata56', nome: 'Paradigmas de Linguagens de Programação'},{id: 'mata62', nome: 'Engenharia de Software I'}]));
</textarea><div class="output"></div><div class="output"></div><pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button></div>

## Mostrando a tabela na página

Vamos exibir a tabela aqui, logo abaixo:

<div style="border: 1px solid gray;">
  <div id="tabela">
    Aqui deve aparecer a tabela de turmas e horários.
  </div>
</div>

Vou construir uma função que atualiza o campo da tabela com a string que for passada como parâmetro. Não se preocupe com a forma como isso é feito; isso é pogramação web, que não é o foco desta disciplina.

<div class="lesson"><textarea class="code">
substituiHTML = (htmlTabela) => {
  var div = document.getElementById('tabela');
  div.innerHTML = htmlTabela;
};
</textarea><div class="output"></div><div class="output"></div><pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button></div>

Veja a função rodando:

<div class="lesson"><textarea class="code">
substituiHTML('<table><tr><td>Alo</td><td>,</td></tr><tr><td>Mundo</td><td>!</td></tr></table>');
</textarea><div class="output"></div><div class="output"></div><pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button></div>

Ótimo! Agora vamos construir a função `atualiza`, que recebe a lista de disciplinas e a lista de turmas, e atualiza a tabela na página. Você vai precisar combinar diversas funções criadas anteriormente.

<div class="lesson"><textarea class="code">
atualiza = R.pipe(
  // --- Complete o código

  // ---
);
</textarea><div class="output"></div><div class="output"></div><pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button></div>

Teste a sua função. Execute o código abaixo e veja se a tabela lá em cima é atualizada.

<div class="lesson"><textarea class="code">
substituiHTML('1, 2, 3, testando');
atualiza(exDisciplinas, exTurmas);
</textarea><div class="output"></div><div class="output"></div><pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button></div>

## Carregando os dados da web

<script type="text/javascript">
MAX_DELAY = 1000;
MIN_DELAY = 300;
function carregaDisciplinas(callback) {
  var x = [
    {
      id: 'mata56',
      nome: 'Paradigmas de Linguagens de Programação',
      semestre: 5
    },
    {
      id: 'mata62',
      nome: 'Engenharia de Software I',
      semestre: 4
    },
  ];

  setTimeout(() => callback(x), Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY);
}

function carregaTurmas(codigoDisciplina, callback) {
  console.log('carregaTurmas', codigoDisciplina);
  var x = [
    {
      disciplina: 'mata56',
      turma: 't01',
      dias: ['qua', 'sex'],
      horario: '16:40'
    },
    {
      disciplina: 'mata56',
      turma: 't02',
      dias: ['qua', 'sex'],
      horario: '20:20'
    },
    {
      disciplina: 'mata62',
      turma: 't02',
      dias: ['seg', 'qua'],
      horario: '18:30'
    }
  ];

  var ret = R.filter(obj => obj.disciplina == codigoDisciplina, x);

  setTimeout(() => callback(ret), Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY);
}
</script>

Até agora fixamos os valores de `exDisciplinas` e `exTurmas` no nosso código-fonte. E se quisermos obter esses dados da Internet? Nesse caso, nosso programa precisará esperar os dados serem carregados antes de exibirmos a tabela.

Criei uma função `carregaDisciplinas`, que recebe uma função callback e chama esse callback com a lista de disciplinas, e uma função `carregaTurmas`, que recebe o código de uma disciplina e um callback, e chama o callback com a lista de turmas daquela disciplina. Vamos vê-las funcionando:

<div class="lesson"><textarea class="code">
carregaDisciplinas((disc) => {
  console.table(disc);
});
</textarea><div class="output"></div><div class="output"></div><pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button></div>


<div class="lesson"><textarea class="code">
carregaTurmas('mata56', (t) => {
  console.table(t);
});
</textarea><div class="output"></div><div class="output"></div><pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button></div>

Agora é com você. Defina a função `recarregaDados`, que obtém os dados de todas as disciplinas e turmas, e exibe a tabela assim que todos os dados estejam carregados. Garanta que a tabela só é exibida uma única vez ao final da carga dos dados.

<div class="lesson"><textarea class="code">
reiniciaAplicacao = () => {
  exDisciplinas = [];
  exTurmas = [];
  substituiHTML('Ola, Mundo!');
};

recarregaDados = () => {
  reiniciaAplicacao();

  // --- Complete o código
  carregaDisciplinas((disc) => {
    exDisciplinas = disc;
    atualiza(exDisciplinas, exTurmas);
  });
  // ---
};
</textarea><div class="output"></div><div class="output"></div><pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button></div>


<div class="lesson"><textarea class="code">
recarregaDados();
</textarea><div class="output"></div><div class="output"></div><pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button></div>


## Bônus (+1 ponto)

Junto tudo isso em uma página HTML, reescrevendo as funções de carga de dados para usar promises.
