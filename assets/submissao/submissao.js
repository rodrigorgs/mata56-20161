// URL_PREFIX = '/mata56/2016/04/12/';
URL_PREFIX = '/mata56/';

function processaRetorno(json, silent) {
    var data = JSON.parse(json);
    if (data.msg && data.msg.length > 0 && !silent) {
        alert(data.msg);
    }
}

function processaLogin(json, silent) {
    var data = JSON.parse(json),
        nome = '',
        matricula = '';

    if (data && data.userinfo && data.userinfo.nome) {
        nome = data.userinfo.nome;
    }
    if (data && data.userinfo && data.userinfo.matricula) {
        matricula = data.userinfo.matricula;
    }
    $("#loginbar-nome").text(nome);
    $("#loginbar-matricula").text(matricula);
    processaRetorno(json, silent);
}

/////////////////
// Respostas
/////////////////

function obtemRespostasJson() {
    var answers = codeMirrorEditors.map(ed => ed.getValue());
    json = JSON.stringify({answers : answers});
    return json;
}

function carregaRespostasJson(json) {
    var obj = JSON.parse(json),
        answers = obj.answers;

    codeMirrorEditors.forEach(function (ed, idx) {
        ed.setValue(answers[idx]);
    });
}

function carregaRespostasId(id) {
    recebeRespostas(id, function (data) {
        carregaRespostasJson(data);
        $('#resposta-id').text(id);
    });
}

/////////////////
// Correção
/////////////////

// TODO: load from somewhere
officialTests = [
``,
`
var metade = descontoPercentual(50);
var dezPerc = descontoPercentual(10);
var cemPerc = descontoPercentual(100);
var zeroPerc = descontoPercentual(0);
try {teste(21, metade(42));} catch (e) {console.log(e);}
try {teste(27, dezPerc(30));} catch (e) {console.log(e);}
try {teste(6.5, metade(13));} catch (e) {console.log(e);}
try {teste(30, zeroPerc(30) );} catch (e) {console.log(e);}
try {teste(0, cemPerc(45));} catch (e) {console.log(e);}
try {teste(29.7, dezPerc(33));} catch (e) {console.log(e);}
try {teste(0, cemPerc(42.5));} catch (e) {console.log(e);}
try {teste(112.1, zeroPerc(112.1));} catch (e) {console.log(e);}
try {teste(10, descontoPercentual(50)(20));} catch (e) {console.log(e);}
try {teste(true, typeof descontoPercentual(10) === 'function');} catch (e) {console.log(e);}
`,
`
try {teste(1, fatorial(0));} catch (e) {console.log(e);}
try {teste(2, fatorial(2));} catch (e) {console.log(e);}
try {teste(6, fatorial(3));} catch (e) {console.log(e);}
try {teste(24, fatorial(4));} catch (e) {console.log(e);}
try {teste(120, fatorial(5));} catch (e) {console.log(e);}
try {teste(720, fatorial(6));} catch (e) {console.log(e);}
try {teste(2432902008176640000, fatorial(20));} catch (e) {console.log(e);}
try {teste(51090942171709440000, fatorial(21));} catch (e) {console.log(e);}
try {teste(1.1240007277776077e+21, fatorial(22));} catch (e) {console.log(e);}
var fat170 = fatorial(170);
try {teste(true, fat170 > 7.257415615307994e+305 && fat170 < 7.257415615307994e+307);} catch (e) {console.log(e);}
`,
`
try {teste(1, erroAbsolutoMedio([1, 3], 2));} catch (e) {console.log(e);}
try {teste(2, erroAbsolutoMedio([1, 3, 4, 6], 2));} catch (e) {console.log(e);}
try {teste(2.8, erroAbsolutoMedio([1, 3, 4, 6, 8], 2));} catch (e) {console.log(e);}
try {teste(3, erroAbsolutoMedio([5], 2));} catch (e) {console.log(e);}
try {teste(5, erroAbsolutoMedio([5, 10, 15, 20, 10, 5, 5], 5));} catch (e) {console.log(e);}
try {teste(1, erroAbsolutoMedio([4, 2], 2));} catch (e) {console.log(e);}
try {teste(2, erroAbsolutoMedio([4, 2, 6], 2));} catch (e) {console.log(e);}
try {teste(2.5, erroAbsolutoMedio([5, -4, 0, -1], -1));} catch (e) {console.log(e);}
try {teste(11, erroAbsolutoMedio([11], 0));} catch (e) {console.log(e);}
try {teste(0, erroAbsolutoMedio([], 2));} catch (e) {console.log(e);}
`,
`
(teste t (lista-par '(m a t a 5 6)))
(teste t (lista-par '()))
(teste Nil (lista-par '(a)))
(teste t (lista-par '(a b)))
(teste Nil (lista-par '(4 5 16)))
(teste Nil (lista-par '(42 l i s p)))
(teste t (lista-par '(1 ())))
(teste Nil (lista-par '(())))
(teste Nil (lista-par '((1 2))))
(teste t (lista-par '((1 2 3) (1 2 3))))
`,
`
(teste t (tem-impar '(2 (3) 4)))
(teste Nil (tem-impar '(2 (4) 4)))
(teste t (tem-impar '(7 (0) 9)))
(teste Nil (tem-impar '(0 (0) 0)))
(teste t (tem-impar '(0 (3) 0)))
(teste Nil (tem-impar '()))
(teste t (tem-impar '(((17)))))
(teste Nil (tem-impar '((()))))
(teste t (tem-impar '(2 (6 3) 4)))
(teste t (tem-impar '((((2) 17)))))
`
];

respostaIds = [3993, 4200, 4189, 2443, 4094, 1348, 2514, 4198, 1299, 3325, 3902, 4027, 3247, 4168, 1929, 3856, 4187, 1440, 4087, 4195, 3881, 4184, 3697, 1560, 2849, 4154, 3799, 2302, 3894, 4211, 4067, 4172, 4060, 3702, 3813, 4202, 4063, 4135, 3908];
respostaIdx = undefined;

function carregaRespostaStep(step) {
    if (respostaIdx === undefined) {
        if (step == 0) {
            respostaIdx = 0;
        } else if (step > 0) {
            respostaIdx = step - 1;
        } else {
            respostaIdx = respostaIds.length - step;
        }
    } else {
        console.log(respostaIdx, step);
        respostaIdx = (respostaIdx + step + respostaIds.length) % respostaIds.length;
    }
    carregaRespostasId(respostaIds[respostaIdx]);
}

function carregaRespostaSeguinte() {
    carregaRespostaStep(1);
}
function carregaRespostaAnterior() {
    carregaRespostaStep(-1);
}


function trocaEvals() {
    if (!window.oldSimplesEval) {
        oldSimplesEval = simplesEval;
        oldMultiEvalLisp = multiEvalLisp;
    }

    // var officialTests = prompt("Test code, questions separated by ---");
    // officialTests = officialTests.split("---");

    simplesEval = function (str, info) {
        str = `
oldTeste = teste;
teste = function () { };
`
+ str +
`
teste = oldTeste;
` +
(officialTests[info.index] || '')
;
        try {
            oldSimplesEval(str, info);
        } catch (e) {
            console.log('Exception: ', e);
        }
        teste = oldTeste;
    };
    multiEvalLisp = function (str, info) {
        str = `
(def oldTeste teste)
(defun teste (x y) Nil)
`
+ str +
`
(def teste (method window "teste"))
` +
(officialTests[info.index] || '')
;
        try {
            oldMultiEvalLisp(str, info);
        } catch (e) {
            console.log('Exception: ', e);
        }
        Javathcript.evalMulti('(def teste oldTeste)');
    };
}

function destrocaEvals() {
    simplesEval = oldSimplesEval;
    multiEvalLisp = oldMultiEvalLisp;
    oldSimplesEval = null;
    oldMultiEvalLisp = null;
}

// function simplesEval(str, info) {
//     zeraTestes();
//     var cmd = "(function(){" + str + "})();";
//     eval(cmd);
//     imprimeResultadoTestes();
//     return "Success!";
// }
// function multiEvalLisp(str, info) {
//     zeraTestes();
//     Javathcript.evalMulti(str);
//     imprimeResultadoTestes();
//     return "Success!";
// }

/////////////////
// Requests
/////////////////

function checaUsuario() {
    $.post(URL_PREFIX + "checkuser.php",
        {},
        processaLogin);
}

function enviaRespostas(opcoes, silent) {
    var data = {
            answers: obtemRespostasJson(),
            apostila: window.apostila
        };
    if (opcoes !== undefined) {
        data = $.extend(data, opcoes);
    }
    $.post(URL_PREFIX + "save.php",
        data,
        function (json) { processaLogin(json, silent); });
}

function recebeRespostas(id, callback) {
    $.post(URL_PREFIX + "load.php", {id: id}, callback);
}

function listRespostasApostila(apostila) {
    if (!apostila) {
        apostila = window.apostila;
    }
    $.post(URL_PREFIX + "list.php", {apostila: apostila},
        function (data) {
            console.log(JSON.parse(data));
        });
}

function login(data) {
    $.post(URL_PREFIX + "login.php",
        data,
        processaLogin);
}

function logout() {
    $.post(URL_PREFIX + "logout.php",
        {},
        processaLogin);
}

/////////////////
// Diálogo de login
/////////////////

function submitLoginDialog() {
    var valid = false,
        data = {};

    data.nome = $("#nome").val();
    data.matricula = $("#matricula").val();
    data.senha = $("#senha").val();

    login(data);

    $("#nome").val('');
    $("#matricula").val('');
    $("#senha").val('');

    loginDialog.dialog("close");
    
    return valid;
}

function showLogin() {
    loginDialog.dialog('open')
}

loginDialog = $("#dialog").dialog({
    autoOpen: false,
    modal: true,
    buttons: {
        "Enviar": submitLoginDialog,
        "Cancelar": function () { loginDialog.dialog("close"); }
    }
});
loginDialog.find("form").on("submit", function (evt) {
    evt.preventDefault();
    submitLoginDialog();
});

/////////////////

function rodaTudo() {
    $('.go').each(function (idx, btn) {
        console.log("\n===== Questão " + idx);
        $(btn).click();
    })
}

/////////////////
// Previne expiração da sessão

$(document).ready(function() {
    // faz uma requisição a cada 10 minutos
    setInterval(checaUsuario, 10 * 60 * 1000);

    // Submete formulario ao clicar em Rodar
    $('.go').each(function (idx, btn) {
        $(btn).on('click', function (buttonIndex) {
                return function () {
                    enviaRespostas({buttonIndex: buttonIndex}, true);
                }
            }(idx)) ;
    });
});