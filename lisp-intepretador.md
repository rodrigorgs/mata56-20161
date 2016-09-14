---
layout: lisp
title:  "Lisp (interpretador)"
date:   2016-09-09 16:40:00 -0300
categories: aula
---

<script type="text/javascript">
    window.apostila = "lisp";
    simplesEval = simplesEvalLisp;
    multiEval = multiEvalLisp;
    window.codeMirrorLanguage = "commonlisp";
</script>

## Interpretador de expressões

Escreva uma expressão e clique em `Avaliar` para exibir o resultado da expressão no console.

<div class="lesson">
<textarea class="code">
(cdr '(1 2 3))</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Avaliar</button>
</div>

## Interpretador de programas

Escreva um programa, possivelmente composto de várias expressões e clique em `Rodar`. Apenas será exibido no console o que for impresso com a função `print`.

<div class="lesson">
<textarea class="code">
(print (car '(1 2 3)))
(print (cdr '(1 2 3)))




</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

