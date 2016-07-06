---
layout: lisp
title:  "Lisp"
date:   2016-04-05 15:50:37 -0300
categories: aula
---

# Programação funcional: Lisp (1958)

Programação simbólica, programação funcional.

Diversas implementações e dialetos: Common Lisp, Scheme, Racket, Clojure.

Usado como linguagem de script no AutoCAD, no Audacity (editor de áudio), no GIMP (editor de imagens) e no Emacs (editor de texto).

## Observações

Clique em qualquer expressão de código para avaliar com o interpretador Lisp e ver o resultado no console do navegador.

Referências:

- http://www.scribd.com/doc/54050141/Micro-Manual-LISP (1978)
- http://kybernetikos.github.io/Javathcript/
- http://www.jtra.cz/stuff/lisp/sclr/index.html

## Lisp: teoria


Dados em Lisp são expressões simbólicas (chamadas de *s-expressions*, ou *sexps*, do inglês *symbolic expressions*) que podem ser **átomos** ou **listas**.

Átomo: sequência de letras e dígitos e outros caractees que não são usados em Lisp. Ex.: `1`, `altura`, `print`, `+`.

Lista: `(` seguido de zero ou mais átomos separados por espaços, seguido de `)`. Exemplo: `(a)`, `(+ 2 3)`, `(print 5)`.

Expressões podem ser avaliadas para um valor. Em particular, alguns átomos possuem valor. Exemplos: `1` (número um), `-3.14` (número 3,14 negativo). Outros átomos, como `abc`, não possuem valor, a princípio.

Listas também podem ser avaliadas para valores. Em particular, um núcleo básico de Lisp pode ser definido a partir de regras de reescrita de listas que começam com os seguintes símbolos: `quote` `car` `cdr` `cons` `equal` `atom` `cond` `lambda` `label`:

- `(quote x)` ==> `x`, isto é, o valor da lista `(quote x)` é `x`, onde `x` é uma s-expressão qualquer. Exemplo: `(quote abc)` ==> `abc`; `(quote (a b c))` ==> `(a b c)`
- `(car x)` ==> primeiro elemento da lista `x`. Exemplo: `(car (quote a b c))` ==> `a`
- `(cdr x)` ==> lista restante após remover primeiro elemento da lista `x`. Exemplo: `(cdr (quote (a b c)))` ==> `(b c)`
- `(cons x y)` ==> lista resultante de se adicionar o valor de `x` à lista `y`. Exemplo: `(cons (quote a) (quote (b c)))` ==> `(a b c)`
- `(equal x y)` ==> `t` se `x` e `y` têm o mesmo valor; `Nil` caso contrário. No que `Nil` é equivalente à lista vazia, `()`.
- `(atom x)` ==> `t` se `x` é um átomo; `Nil' caso contrário
- `(cond (p1 e1) (p2 e2) ...)` => valor de ei, onde pi é o primeiro dos ps cujo valor não é Nil.
- `((lambda (v1 ... vn) e) e1 ... en)` ==> valor de e em um ambiente no qual as variáveis v1 ... vn assumem os valores das expressões e1 ... en. Exemplo: `((lambda (x y) (cons (car x) y)) (quote (a b)) (quote (c d)))`
- `((label f (lambda ...) e1 .. en)` é o mesmo que lambda..., com a regra adicional que, sempre que a expressão `(f a1 ... an)` for avaliada, f é substituído por `(label f lambda...)`. Isso permite definir funções recursivas. Exemplo: `((label f (lambda (x) (cond ((atom x) x) ((quote t) (ff (car x)))))) (quote ((a b) c)))`

Note, a princípio, uma lista não tem valor definido, a não ser se enquadre em um dos casos listados acima.

Exemplos e contra-exemplos:

- `abc` ==> valor indefinido. 
- `(quote abc)` ==> o valor é o símbolo abc
- `(teste 1 2 3)` ==> valor indefinido
- `(1 2 3)` => valor indefinido
- `(quote (1 2 3))` ==> o valor é a lista 1, 2, 3

Para evitar definir uma função toda vez que ela é usada, podemos defini-la usando `(defun f (v1 ... vn) e)`. Depois disso, `(f x1 ... xn)` é avaliado através da avaliação de `e` com as variáveis v1 ... vn assumindo os valores x1 ... xn. Exemplo:

<div class="lesson">
<textarea class="code">
; retorna o segundo elemento de uma lista
(defun segundo (lista)
    (car (cdr lista)))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

<div class="lesson">
<textarea class="code">
(segundo
    (quote (a b c)))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Esse conjunto de regras define o núcleo da linguagem Lisp. Outras construções da linguagem podem ser definidas com base nessas regras.

## Abreviações comuns

- `'e` é equivalente a `(quote e)`. Exemplos: `'abc`, `'(1 2 3)`.
- `(list e1 ... en)` é equivalente a `(cons e1 (cons ... (cons en Nil)))`. Exemplo: `(list 1 2 3)` é equivalente a `(cons 1 (cons 2 (cons 3 Nil)))`, que é equivalente a `(quote (1 2 3))`, que é equivalente a `'(1 2 3)`.
- `(defun null (x) (equal x Nil))`
- `(defun and (p q) (cond p q) (t Nil))`
    - também há definições para `not` e `or`
- `(defun cadr (x) (car (cdr x)))
    - `(defun caar (x) (car (car x)))`
    - `(defun cadr (x) (car (cdr x)))`
    - `(defun cdar (x) (cdr (car x)))`
    - `(defun cddr (x) (cdr (cdr x)))`
    - `(defun caaar (x) (car (car (car x))))`
    - `(defun caadr (x) (car (car (cdr x))))`
    - ...
- `(if cond expr1 expr2)` retorna expr1 se a condição é verdadeira, e expr2 caso contrário

## Manipulação de strings

- (length s): comprimento da string s. 
    - Ex.: `(length "Fulano")`
- (concat s1 ... sn): concatena as strings s1 ... sn.
    - Ex.: `(concat  "Alo"   ", "   "Mundo")
- `(substring s inicio fim)`: retorna uma substring de s
    - Ex.: `(substring ">>Alo, Mundo" 2 5)`

Usamos aspas para representar strings. Exemplo: `"alo mundo"`.

## Números e matemática

- Operadores aritméticos: +, -, /, *, % (resto da divisão)
    - Ex.: `(+ 2 3)`, `(+ 2 (- 4 1))`, `(* 1 (+ 2 (/ 6 2)))`
    - Ex.: `(* 1 2 3 4)` (+ e * permitem mais de dois argumentos)
- Comparadores: <, >, <=, >=, =, /= (diferente)
    - Ex.: `(< 2 3)`, `(/= 5 (+ 2 3))`
- Funcões matemáticas: sin cos tan asin acos atan floor max min log abs ceil pow exp atan2 random sqrt round
    - Ex.: `(sin (/ (* 2 3.141592) 8))`, `(max 3 5)`


## Escopo

def defun let let*

- `defun` define funções no escopo global, atribuindo-lhes um nome

```
(defun alo-mundo () (print "Alo, mundo!"))
```
```
(defun alo (nome pontuacao)
    (print (concat "Alo, " nome pontuacao)))
```
```
(alo-mundo)
```
```
(alo "Brasil" "!!!")
```

- `def` define nomes para outros tipos de valores no escopo global

```
(def pi 3.14159265359)
```
```
(print (cos (* 2 pi)))
```

- `let` e `let*` especificam escopos temporários

Uso: `(let ((v1 e1) ... (vn en)) corpo)` -- avalia a expressão "corpo" usando as constantes v1 ... vn (com valores e1 ... en) definidas localmente.

```
(let
    ((pi 3.14159265359)
    (raio 30))
    (print (* pi raio raio)))
```

Se existir dependência entre as definições de constantes (isto é, pelo menos uma das constantes é definida com base em uma constante definida anteriormente), é necessário usar let*. Exemplo:

<div class="lesson">
<textarea class="code">
; tente substituir let* por let pra ver se funciona
(let*
    ((pi 3.14159265359)
    (raio 30)
    (area (* pi raio raio)))
    (print area))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>


## Prática

Definimos a função `print` para imprimir no console do navegador.

<div class="lesson">
<textarea class="code">
; definição da função
(defun hello-world () (print "Alo mundo"))
; chamada da função
(hello-world)</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

<div class="lesson">
<textarea class="code">
(defun hello (nome pontuacao)
    (print (concat "Alo, " nome pontuacao)))
(hello "Mundo" "!")</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>


------

Função `map`

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

------

Agora é com você. Defina as seguintes funções:

Função `(length l)` (retorna o comprimento da lista l, isto é, seu número de elementos):

<!-- 
(defun length (l)
  (cond
    ((null l) 0)
    (t (+ 1 (length (cdr l))))))
 -->

<div class="lesson">
<textarea class="code">
(defun ...)
; testes
(print (length '()))
(print (length '(1)))
(print (length '(1 2 3)))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

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
(print (is-set '())) ; t
(print (is-set '(1))) ; t
(print (is-set '(1 2 3))) ; t
(print (is-set '(1 1 2))) ; Nil
(print (is-set '(1 2 1))) ; Nil
(print (is-set '(1 2 3 2 5))) ; Nil
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