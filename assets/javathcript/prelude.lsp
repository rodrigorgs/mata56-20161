; This file contains aliases and common definitions.
; It also imports the javascript Math functions.

(def + plus)
(def define def)
(def #t 't)
(def #f Nil)
(def nil Nil)
(def - minus)
(def / divide)
(def % rem)
(def * times)
(def = equal)
(def eq? equal)
(def head car)
(def first car)
(def tail cdr)
(def rest cdr)
(def eq equal)
(defun null (x) (equal x Nil))
(defun zerop (x) (equal x 0))
(defun plusp (x) (> x 0))
(defun minusp (x) (< x 0))
(defun evenp (x) (equal (rem x 2) 0))
(defun oddp (x) (/= (rem x 2) 1))
(defun list-member (E L) (cond ((null L) Nil) ((equal E (first L))  't) ('t (list-member E (rest L)))))
(defun map (F L) (if (null L) Nil (cons (F (head L)) (map F (tail L)))))
(defun listp (x) (or (null x) (consp x)))

; CADDRs

(defun caar (x) (car (car x)))                    
(defun cadr (x) (car (cdr x)))                    
(defun cdar (x) (cdr (car x)))                   
(defun cddr (x) (cdr (cdr x)))                    
(defun caaar (x) (car (car (car x))))              
(defun caadr (x) (car (car (cdr x))))             
(defun cadar (x) (car (cdr (car x))))              
(defun caddr (x) (car (cdr (cdr x))))              
(defun cdaar (x) (cdr (car (car x))))              
(defun cdadr (x) (cdr (car (cdr x))))              
(defun cddar (x) (cdr (cdr (car x))))              
(defun cdddr (x) (cdr (cdr (cdr x))))              
(defun caaaar (x) (car (car (car (car x)))))        
(defun caaadr (x) (car (car (car (cdr x)))))        
(defun caadar (x) (car (car (cdr (car x)))))        
(defun caaddr (x) (car (car (cdr (cdr x)))))        
(defun cadaar (x) (car (cdr (car (car x)))))        
(defun cadadr (x) (car (cdr (car (cdr x)))))        
(defun caddar (x) (car (cdr (cdr (car x)))))        
(defun cadddr (x) (car (cdr (cdr (cdr x)))))        
(defun cdaaar (x) (cdr (car (car (car x)))))        
(defun cdaadr (x) (cdr (car (car (cdr x)))))        
(defun cdadar (x) (cdr (car (cdr (car x)))))        
(defun cdaddr (x) (cdr (car (cdr (cdr x)))))        
(defun cddaar (x) (cdr (cdr (car (car x)))))        
(defun cddadr (x) (cdr (cdr (car (cdr x)))))        
(defun cdddar (x) (cdr (cdr (cdr (car x)))))        
(defun cddddr (x) (cdr (cdr (cdr (cdr x)))))        

; Some stuff specific to being run in a browser.

(def document (js "document"))
(def body (js "document.body"))
(def window (js "window"))
(def getElement (method document "getElementById"))
(def alert (method window "alert"))
(def message alert)
(def confirm (method window "confirm"))
(def print (method (js "window.console") "log"))

; To be more like emacs, you might want to uncomment these two lines
; (def setp set)
; (def set def)

; Import PI and the javascript math functions.

(def PI (get (js "Math") "PI"))
(let*
	(	(math (js "Math"))
		(import-math (lambda (funcname) 
							 (def-dyn funcname (method math funcname)))) )
	(map import-math '(sin cos tan asin acos atan floor max min log abs ceil pow exp atan2 random sqrt round))	)

; testes

(def teste (method window "teste"))