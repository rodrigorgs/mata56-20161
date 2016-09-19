---
layout: lisp
title:  "Lisp (funções de alta ordem)"
date:   2016-09-16 16:40:00 -0300
categories: aula
---

<script type="text/javascript">
    window.apostila = "lisp";
    simplesEval = simplesEvalLisp;
    multiEval = multiEvalLisp;
    window.codeMirrorLanguage = "commonlisp";
</script>

# Funções de alta ordem

## Função `map`

<div class="lesson">
<textarea class="code">
(defun map (f l)
    (cond
        ((equal l Nil) Nil)
        (t (cons (f (car l)) (map f (cdr l))))))
(defun dobro (n) (* n 2))
(print (map dobro (list 1 2 3 4 5)))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Função `filter`

Função `(filter f l)` (retorna uma cópia da lista `l` contendo apenas os elementos para os quais a função `f` retorna true):

<!-- 
(defun filter (f l)
    (cond
        ((null l) l)
        ((f (car l)) (cons (car l) (filter f (cdr l))))
        (t (filter f (cdr l)))))

 
; em Scheme:
(define (filter f l)
    (cond
        ((null? l) l)
        ((f (car l)) (cons (car l) (filter f (cdr l)) ) )
        (#t (filter f (cdr l)))
    ))
 -->

<div class="lesson">
<textarea class="code">
(defun ...)
; testes
(print
   (filter
      (lambda (x) (< x 10))
      '(3 12 6 15 9)))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Função `(all f l)` (indica se a função `f` retorna verdadeiro para todos os elementos de l):

<!-- 
(defun all (f l)
  (cond
    ((null l) t)
    (t (and (f (car l)) (all f (cdr l))))))
 -->

<div class="lesson">
<textarea class="code">
(defun ...)
; testes
(defun par (x) (= (% x 2) 0))
(print (all par '()))
(print (all par '(2 4 6)))
(print (all par '(1 2 4 6)))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Função `(atom-list l)` (indica se todos os elementos de l são átomos):

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

Função `(reduce f l i)` (aplica a função `f` sobre um acumulador para cada valor da lista `l`, da esquerda pra direita, para reduzi-la a um único valor; o valor inicial do acumulador é `i`):

<!-- 
(defun reduce (f l i)
  (cond
    ((null l) i)
    (t (reduce f (cdr l) (f i (car l))))))
 -->

<div class="lesson">
<textarea class="code">
(defun ...)
; testes
(print (reduce + '(1 2 3) 0))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Reescreva a função `(all f l)` usando `reduce`:

<div class="lesson">
<textarea class="code">
codigo
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

<!-- https://www.quora.com/What-is-tail-recursion-Why-is-it-so-bad -->

<!-- <div class="lesson">
<textarea class="code">
(+ 2 3)</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

<div class="lesson">
<textarea class="code">
(print "Alô, Mundo!")
(print "Tchau, Mundo!")
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div> -->
