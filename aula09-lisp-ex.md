---
layout: lisp
title:  "Lisp (prática)"
date:   2016-09-14 16:40:00 -0300
categories: aula
---

<script type="text/javascript">
    window.apostila = "lisp";
    simplesEval = simplesEvalLisp;
    multiEval = multiEvalLisp;
    window.codeMirrorLanguage = "commonlisp";
</script>

# Exercícios

Agora é com você. Defina as seguintes funções:

## Função IMC

Função `(imc peso altura)`, que calcula o IMC de uma pessoa, igual ao seu peso dividido pelo quadrado de sua altura.

<!-- 
(defun imc (peso altura) (/ peso (* altura altura)))
 -->

<div class="lesson">
<textarea class="code">
(defun ...)
; testes
(print (imc 75 1.80))
(print (imc 100 1.80))
(print (imc 75 2.20))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Função obesidade

Função `(obesidade peso altura)`, que retorna `'abaixoDoPeso` se o IMC é menor que 20, `'neutro` se o IMC está entre 20 e 30, e `'obeso` se o IMC é maior que 30.

<!-- 
(defun obesidade (peso altura)
  (let ((indice (imc peso altura)))
       (cond
         ((< indice 20) 'abaixoDoPeso)
         ((<= indice 30) 'neutro)
         (t 'obeso))))
 -->

<div class="lesson">
<textarea class="code">
(defun ...)
; testes
(teste 'abaixoDoPeso (obesidade 40 1.80))
(teste 'neutro (obesidade 75 1.80))
(teste 'obeso (obesidade 100 1.80))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

# Funções recursivas

## Função compr

Função `(compr l)` (retorna o comprimento da lista l, isto é, seu número de elementos). Use recursão.

<!-- 
(defun compr (l)
  (cond
    ((null l) 0)
    (t (+ 1 (compr (cdr l))))))
 -->

<div class="lesson">
<textarea class="code">
(defun ...)
; testes
(teste 0 (compr '()))
(teste 1 (compr '(1)))
(teste 3 (compr '(1 2 3)))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Função member

Função `(member x l)` (indica se o elemento x está presente na lista l):

<!-- 
(defun member (x l)
  (cond
    ((null l) Nil)
    ((= (car l) x) t)
    (t (member x (cdr l)))))
 -->

<div class="lesson">
<textarea class="code">
codigo
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Função is-set

Função `(is-set l)` (indica se l é um conjunto, isto é, uma lista na qual todos os elementos são distintos) -- use a função member:

<!-- 
(defun is-set (l)
  (cond
    ((null l) t)
    (t (and
        (is-set (cdr l))
        (not (member (car l) (cdr l)))))))
 -->

<div class="lesson">
<textarea class="code">
; testes
(teste t (is-set '()))
(teste t (is-set '(1)))
(teste t (is-set '(1 2 3)))
(teste Nil (is-set '(1 1 2)))
(teste Nil (is-set '(1 2 1)))
(teste Nil (is-set '(1 2 3 2 5)))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Função freq

Função `(freq x l)` (indica quantas vezes o elemento x aparece na lista l):

<!-- 
(defun freq (x l)
  (cond
    ((null l) 0)
    ((= (car l) x) (+ 1 (freq x (cdr l))))
    (t (freq x (cdr l)))))
 -->

<div class="lesson">
<textarea class="code">
(defun ...)
; testes
; ...
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

# Mais funções

## Função qtd-pares

A função `(qtd-pares l)` retorna a quantidade de elementos pares na lista `l`.

<div class="lesson">
<textarea class="code">
(defun ...)
; testes
; ...
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Função dobra-tudo

Função `(dobra-tudo l)` retorna uma lista em que cada elemento é o dobro do elemento correspondente da lista `l`:

<div class="lesson">
<textarea class="code">
(defun ...)
; testes
; ...
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Função filtra-pares

A função `(filtra-pares l)` retorna uma lista igual à lista `l` removendo-se os elementos ímpares:

<div class="lesson">
<textarea class="code">
(defun ...)
; testes
; ...
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Função todos-pares

A função `(todos-pares l)` retorna verdadeiro se e somente se todos os elementos da lista `l` são números pares.

<div class="lesson">
<textarea class="code">
(defun ...)
; testes
; ...
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

