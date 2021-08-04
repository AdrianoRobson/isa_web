var timer;
var timer2;
var conta_muda_index = 0;
var str_falar_artigo = '';
var theElement = document.getElementById("theElement");
var synth = window.speechSynthesis;
var utterance;
var art = document.getElementById('art');
var auxIndex = 0
var table = document.getElementById("table");
var falando = document.getElementById("speaking");
var touchesInAction = {};
var index = -1;
var vet = [];
var vet2 = [];
var count = 0;
var control = 0;
var action = document.getElementById("action");
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition;

var dictOrdinais = {
    1: 'primeiro',
    2: 'segundo',
    3: 'terceiro',
    4: 'quarto',
    5: 'quinto',
    6: 'sexto',
    7: 'sétimo',
    8: 'oitavo',
    9: 'nono'
}

var dictCodigo = {
    3: 'constituição federal',
    4: 'código penal',
    5: 'código civil',
    6: 'consolidação das leis do trabalho',
    7: 'código penal militar',
    8: 'código de processo penal',
    9: 'código de processo penal militar',
    10: 'código de defesa do consumidor',
    12: 'estatuto da pessoa com deficência',
    13: 'estatuto da criança e do adolescente',
    14: 'estatuto do idoso',
    15: 'código de processo civil'
};

function analiza_fala(str) {

    str = str.toLowerCase().replace("artigo", "").replace("numero", "").replace("consultar", "");

    for (var key in dictOrdinais) {
        var value = dictOrdinais[key];

        if (str.includes(value)) {
            str = str.replace(value, key);
            break;
        }

    }

    var num = str.replace(/\D/g, '');
    str = str.replace(num, '');
    str = str.trim();
    num = num.trim();

    for (var key in dictCodigo) {

        var value = dictCodigo[key];

        if (value.includes(str)) {
            return [num, key];
        }
    }

    return [];
}

function esconde_falando() {
    falando.style.display = "none";
}

function esconde_tabela() {

    if (vet.length == 0)
        return;

    table.style.display = "none";
    art.style.display = 'none';
    mostra_falando();
}

function mostra_falando() {
    falando.style.display = "block";

    cancelaTimer(2);
}

function mostra_tabela() {

    table.style.display = "block";
    art.style.display = 'block';
}

theElement.addEventListener("mouseup", tapOrClick, false);
theElement.addEventListener("touchend", tapOrClick, false);

theElement.addEventListener("touchstart", touchStartHandler, false);
theElement.addEventListener("touchend", touchEndHandler, false);


function controla_pause_resume() {

    control++;

    if (control > 1) {
        control = 0;
    }

    return control;
}


function executaLinhaTexto() {

    index++;

    conta_muda_index = 0;

    if (index > (vet.length - 1)) {
        vet[index - 1].setAttribute("bgcolor", "white");
        index = 0
    }

    if (index < 0 || index > vet.length - 1) {
        return;
    }

    vet[index].setAttribute("bgcolor", "#ffffb3");
    scroll_down_up(index);

    control = 0;

    speech(vet2[index]);


    if (index > 0) {
        vet[index - 1].setAttribute("bgcolor", "white")
    }

}


function executaLinhaTextoBack() {

    index--;

    conta_muda_index = 0;

    if (index < 0) {
        vet[0].setAttribute("bgcolor", "white");
        index = vet.length - 1
    }

    if (index < 0 || index > vet.length - 1) {
        return;
    }

    vet[index].setAttribute("bgcolor", "#ffffb3");
    scroll_down_up(index);

    control = 0;

    speech(vet2[index]);


    if (index < (vet.length - 1)) {
        vet[index + 1].setAttribute("bgcolor", "white")
    }

}


function limpa_cor_amarela() {

    for (var i = 0; i < vet.length; i++) {
        vet[i].setAttribute("bgcolor", "white");
    }

}


function scroll_down_up(id) {
    const yOffset = -200;
    const element = document.getElementById(index);;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({
        top: y,
        behavior: 'smooth'
    });
}




window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
    case "Down": // IE/Edge specific value
    case "ArrowDown":
    executaLinhaTexto()
      // Do something for "down arrow" key press.
      break;
    case "Up": // IE/Edge specific value
    case "ArrowUp":
     executaLinhaTextoBack()
      // Do something for "up arrow" key press.
      break;
    case "Left": // IE/Edge specific value
    case "ArrowLeft":
      // Do something for "left arrow" key press.
      break;
    case "Right": // IE/Edge specific value
    case "ArrowRight":
      // Do something for "right arrow" key press.
      break;
    case "Enter":
        if (index == -1) {


            } else if (vet.length > 0) {

                pausa();

            }
      // Do something for "enter" or "return" key press.
      break;
    case "Esc": // IE/Edge specific value
    case "Escape":
      // Do something for "esc" key press.
      break;
    case "Backspace":
    alert("back");
    break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);




/*
window.addEventListener("keypress", checkKeyPressed, false);

function checkKeyPressed(e) {

    e.preventDefault();

    if (e.charCode === 38) {
        executaLinhaTextoBack()
    } else if (e.charCode === 40) {
        executaLinhaTexto()
    }
}*/


function touchStartHandler(event) {
    var touches = event.changedTouches;

    for (var j = 0; j < touches.length; j++) {

        /* store touch info on touchstart */
        touchesInAction["$" + touches[j].identifier] = {

            identifier: touches[j].identifier,
            pageX: touches[j].pageX,
            pageY: touches[j].pageY

        };

        if (touches[j].identifier == 0) {

            iniciaTimer(1);

            if (index == -1) {


            } else if (vet.length > 0) {

                pausa();

            }


        }


    }


}


function pausa(){
    ctl = controla_pause_resume();

                if (ctl == 1) {

                    if (synth.speaking) {

                        synth.cancel()

                        cancelaTimer(2);
                    }
                } else {

                    if (synth.speaking == false) {

                        speech();

                        iniciaTimer(2);

                    }
                }
}


function distancia_x_y(x, y) {

    return Math.abs(x - y)

}


function touchEndHandler(event) {

    var touches = event.changedTouches;

    for (var j = 0; j < touches.length; j++) {

        /* access stored touch info on touchend */
        var theTouchInfo = touchesInAction["$" + touches[j].identifier];

        theTouchInfo.dx = touches[j].pageX - theTouchInfo.pageX; /* x-distance moved since touchstart */
        theTouchInfo.dy = touches[j].pageY - theTouchInfo.pageY; /* y-distance moved since touchstart */

        cancelaTimer(1);


        if (touches[j].identifier > 0 && vet.length > 0) {

            iniciaTimer(2);

            if (distancia_x_y(theTouchInfo.dx, theTouchInfo.dy) > 3) {

                executaLinhaTextoBack();
            } else {

                executaLinhaTexto();
            }

        }


    }

    /* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */

}


function speech() {


    synth.cancel();

    if (typeof vet[index].innerText !== 'undefined') {

        utterance = new SpeechSynthesisUtterance(vet2[index]);
        utterance.lang = 'pt-BR'
        utterance.volume = 1;
        utterance.rate = 1;
        utterance.pitch = 1;
        synth.speak(utterance);

    } else {
        //alert('cuxxxxx')
    }


}


// ********************* SPEECH RECOGNATION START ****************************


/* JS comes here */
function runSpeechRecognition() {

    if (typeof recognition !== 'undefined') {
        recognition.abort();
        recognition = null;
    }

    recognition = new SpeechRecognition();

    recognition.lang = 'pt-BR';

    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        action.innerText = "Ouvindo... \n" +
            "* Diga o numero do artigo seguido do código *\n\n" +
            "Ex: \n" +
            "121 penal\n" +
            "1025 civil\n" +
            "125 consolidação\n" +
            "18 processo penal\n" +
            "quinto constituição";
    };

    recognition.onspeechend = function() {

        recognition.stop();
    }

    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        //action.innerText = "Text: " + transcript + "\nConfidence: " + confidence*100+"%";


        var vetArtCod = analiza_fala(transcript);

        if (vetArtCod.length > 0) {

            chamadaAjax(vetArtCod[0], vetArtCod[1])

        } else {

            mostra_inicio("Eu entendi: * " + transcript + " *\nNão foi possível encontrar!\n")

            speech2(transcript + ', não foi possível encontrar!');

        }

    };

    // start recognition
    recognition.start();
}

// ********************* SPEECH RECOGNATION END ****************************


function longPress() {

    esconde_tabela();
    cancelaTimer(2);

    runSpeechRecognition();

    synth.cancel();
    control = 0;
}

function cancelaTimer(t) {
    if (t == 1) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        //mostra_tabela();
    } else if (t == 2) {
        if (timer2) {
            clearTimeout(timer2);
            timer2 = null;
        }
    }
    /*else if (t == 3){
         if (timer3) {
            clearTimeout(timer3);
            timer3 = null;
        }
    }*/

}

function iniciaTimer(t) {

    if (t == 1) {
        if (!timer) {
            timer = setTimeout(longPress, 1000)
        }
    } else if (t == 2) {
        if (!timer2) {
            timer2 = setInterval(function() {
                autoExecutaLinha()
            }, 0);
        }
    }
    /*else if (t == 3){
       if (!timer3) {
           timer3 = setInterval(function(){tempo_muda_index()},0);
       }
    }*/
}


function tapOrClick(event) {
    //handle tap or click.
    if (event.cancelable) {
        event.preventDefault();
    }

    return false;
}

function touchHandler(event) {

    var touches = event.changedTouches;

    for (var i = 0; i < event.changedTouches.length; i++) {

        var touchId = event.changedTouches[i].identifier;
        var x = event.changedTouches[i].pageX;
        var y = event.changedTouches[i].pageY;

    }

}


function speech2(msg) {

    utterance = new SpeechSynthesisUtterance(msg);
    utterance.lang = 'pt-BR'
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    synth.speak(utterance);

}


function autoExecutaLinha() {

    if (vet.length == 0)
        return;

    conta_muda_index++;

    if (index >= 0 && index <= vet.length - 1) {

        if (synth.speaking == false) {

            if (conta_muda_index < 2) {

                //cancelaTimer(2);
                index = -1;
                limpa_cor_amarela();

            } else {
                executaLinhaTexto();
            }
        }
    }

    if (index < -1) {
        index = -1
    }

    if (count > 100) {
        count = 0;
    }

    if (conta_muda_index > 100000) {
        conta_muda_index = 0;
    }

    count++;
}


document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        //speech2('Página não está visível');
        synth.cancel();
        cancelaTimer(2)
        auxIndex = index;
    } else {
        //speech2('Página está visível');

        iniciaTimer(2);

        if ((auxIndex - 1) < 0) {
            auxIndex = -1
        }

        index = auxIndex - 1;
    }

});


function retorna_codigos() {

    var codigos = '';

    for (var key in dictCodigo) {
        var cod = dictCodigo[key];
        codigos += ' - ' + cod + '\n'
    }

    return codigos;

}


// call function with parameter
window.onload = function() {

    synth.cancel();
    cancelaTimer(2);

    index = -1;
    vet = [];
    count = 0;
    control = 0;
    auxIndex = 0;
    iniciaTimer(3);

    mostra_falando();

    mostra_inicio();

};


function mostra_inicio(msg_user = '') {

    action.innerText = msg_user + '\n* Mantenha um dedo na tela *\n\n' + 'Códigos disponíveis: \n' + retorna_codigos() +
    "\nConsultar artigo - Mantenha o dedo na tela durante 1 segundo\n"+
    "Reproduzir artigo - 2 dedos simultâneos na tela \n"+
    "Pausar reprodução - 1 toque simples na tela\n"+
    "Continuar reprodução - 1 toque simples na tela\n"+
    "Avançar artigo - 2 dedos simultâneos na tela\n"+
    "Retroceder artigo - arrastar 2 dedos simultâneos no centro da tela\n";

}


 function isMobile(){
      if(navigator.userAgent.indexOf("Mobile") > 0){
        return true;
      }else{
        return false;
      }
   }

function chamadaAjax(artigo, codigo) {

    $.ajax({
        //url: 'https://isa-adr.herokuapp.com/isa/'+artigo+'/'+codigo,
        url: 'http://127.0.0.1:8000/isa/' + artigo + '/' + codigo,
        data: {
            format: 'json'
        },
        error: function(jqxhr, settings, thrownError) {
            console.log('Houve um erro! ' + thrownError);
        },
        dataType: 'json',
        success: function(data) {

            if (data.length > 0) {

                vet_artInaterado = data[0].fields.artigoInalterado.split(/\n/);
                vet_artigoTexto = data[0].fields.artigoTexto.split(/\n/);

                table = document.getElementsByTagName("table")[0];

                str_falar_artigo = ''
                for (var key in dictOrdinais) {

                    var value = dictOrdinais[key];

                    if (key == parseInt(artigo)) {

                        str_falar_artigo = 'artigo ' + value;

                        break;
                    }
                }

                if (str_falar_artigo === '') {
                    str_falar_artigo = 'artigo ' + artigo + ' ' + dictCodigo[codigo];
                } else {
                    str_falar_artigo += ' ' + dictCodigo[codigo];
                }


                mostra_tabela();
                esconde_falando();

                $("#table tr").remove();

                synth.cancel();
                cancelaTimer(2);
                index = -1;
                vet = [];
                vet2 = [];
                count = 0;
                control = 0;
                conta_muda_index = 0;
                auxIndex = 0;

                for (var i = 0; i < vet_artInaterado.length - 1; i++) {

                    var linha = "<tr>><td>" + vet_artInaterado[i] + "</td></tr>";

                    $("#table tbody").append(linha);

                    vet2.push(vet_artigoTexto[i])
                }


                for (var i = 0, row; row = table.rows[i]; i++) {

                    row.cells[0].setAttribute('id', i);

                    vet.push(row.cells[0])
                }

                iniciaTimer(2);


                art.innerText = str_falar_artigo;

                speech2(str_falar_artigo);

            } else {

                mostra_inicio("Não existe o artigo " + artigo + ' em ' + dictCodigo[codigo] + '\n')
                speech2('Não existe o artigo ' + artigo + ' em ' + dictCodigo[codigo])
            }


        },
        type: 'GET'
    });
}