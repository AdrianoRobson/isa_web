var timer;
var timer2;
var conta_muda_index = 0;

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

var str_falar_artigo = ''


function analiza_fala(str){

    str = str.toLowerCase().replace("artigo", "").replace("numero","").replace("consultar","");

     for(var key in dictOrdinais) {
      var value = dictOrdinais[key];

      console.log('_______________value: ', value);

       if(str.includes(value)){
           str = str.replace(value, key);
            break;
        }

      }

    var num = str.replace(/\D/g,'');
    str = str.replace(num,'');
    str = str.trim();
    num = num.trim();

    console.log('******** str: '+str);
    console.log('******** num: '+num);

    for(var key in dictCodigo) {

      var value = dictCodigo[key];

      if(value.includes(str)){

            console.log('******** ______________value: '+[num, key]);

            return [num, key];
        }
    }

   return[];
}

var theElement = document.getElementById("theElement");
var synth = window.speechSynthesis;
var utterance;
test = document.getElementById('test');
test2 = document.getElementById('test2');
var art = document.getElementById('art');
var auxIndex = 0
var table = document.getElementById("table");
var falando = document.getElementById("speaking");


// ***************
// ***************

//analiza_fala('toma no c**** ');

function esconde_falando(){
    falando.style.display = "none";
}



function esconde_tabela(){

    if(vet.length == 0)
        return;

    table.style.display = "none";
    art.style.display = 'none';
    mostra_falando();
}

function mostra_falando(){
    falando.style.display = "block";

    cancelaTimer(2);
}

function mostra_tabela(){

    table.style.display = "block";
    art.style.display = 'block';
    //esconde_falando();
}

theElement.addEventListener("mouseup", tapOrClick, false);
theElement.addEventListener("touchend", tapOrClick, false);


theElement.addEventListener("touchstart", touchStartHandler, false);
theElement.addEventListener("touchend", touchEndHandler, false);

var touchesInAction = {};

var index = -1;
var vet = [];
var vet2 = [];
var count = 0;
var control = 0



function controla_pause_resume(){

    control++;

    if (control > 1){
        control = 0;
    }

    return control;
}


function executaLinhaTexto(){

    index++;

    conta_muda_index = 0;

    if(index > (vet.length -1)){
        console.log(vet[index-1].setAttribute("bgcolor","white"))
        index = 0
    }

    if(index < 0 || index > vet.length - 1){
        return ;
    }

    vet[index].setAttribute("bgcolor","#ffffb3");
    //scroll_down_up(index);

    control = 0;

    speech(vet2[index]);


    if (index > 0){
        vet[index-1].setAttribute("bgcolor","white")
    }

    console.log('linhas do artigo: ',vet.length)
    console.log('index: ',index)

    test.innerText ='speech0'

}


function executaLinhaTextoBack(){

    index--;

    conta_muda_index = 0;

    if(index < 0){
        console.log(vet[0].setAttribute("bgcolor","white"))
        index = vet.length-1
    }

     if(index < 0 || index > vet.length - 1){
        return ;
     }

    vet[index].setAttribute("bgcolor","#ffffb3");
    //scroll_down_up(index);

    control = 0;

    speech(vet2[index]);


    if (index < (vet.length-1)){
        vet[index+1].setAttribute("bgcolor","white")
    }

    console.log('linhas do artigo: ',vet.length)
    console.log('index: ',index)

    test.innerText ='speech0'


}


function limpa_cor_amarela(){

 for(var i = 0; i < vet.length; i++){
     console.log(vet[i].setAttribute("bgcolor","white"))
 }

}


function scroll_down_up(id){
    //var elm = document.getElementById(index);
    //elm.scrollIntoView(true);
    const yOffset = -200;
    const element = document.getElementById(index);;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
}







window.addEventListener("keypress", checkKeyPressed, false);

function checkKeyPressed(e) {
	if (e.charCode === 97) {
		console.log("The 'a' key is pressed.");

        console.log('utterance: '+utterance);
		executaLinhaTextoBack()
	}
	else if (e.charCode===13){

		executaLinhaTexto()
	}
}






function touchStartHandler(event) {
    var touches = event.changedTouches;

    for(var j = 0; j < touches.length; j++) {

         /* store touch info on touchstart */
         touchesInAction[ "$" + touches[j].identifier ] = {

            identifier : touches[j].identifier,
            pageX : touches[j].pageX,
            pageY : touches[j].pageY

         };


          if (touches[j].identifier == 0){

               iniciaTimer(1);

               console.log(synth.speaking)

               if(index==-1){

                    console.log('clicou na buceta')

               }
               else if (vet.length > 0) {

                   ctl = controla_pause_resume();

                    if(ctl == 1){
                        console.log(1)

                        if(synth.speaking){

                            synth.cancel()

                            test.innerText = 'speechCanceled';

                           cancelaTimer(2);
                        }
                    }
                    else{
                        console.log(0)

                        if(synth.speaking == false){

                            speech();

                            test.innerText = 'speechAgain';

                            iniciaTimer(2);

                        }
                    }

               }




          }



    }


}


function distancia_x_y(x, y){

    return Math.abs(x - y)

}


function touchEndHandler(event) {

    var touches = event.changedTouches;

    for(var j = 0; j < touches.length; j++) {

        /* access stored touch info on touchend */
        var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ];

        theTouchInfo.dx = touches[j].pageX - theTouchInfo.pageX;  /* x-distance moved since touchstart */
        theTouchInfo.dy = touches[j].pageY - theTouchInfo.pageY;  /* y-distance moved since touchstart */

        cancelaTimer(1);


         if (touches[j].identifier > 0 && vet.length > 0){

              iniciaTimer(2);

              if(distancia_x_y(theTouchInfo.dx, theTouchInfo.dy) > 3){

                    executaLinhaTextoBack();
              }
              else{

                    executaLinhaTexto();
              }

         }



    }

    /* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */

}




function speech(){


    synth.cancel();

    if (typeof vet[index].innerText !== 'undefined'){

        utterance = new SpeechSynthesisUtterance(vet2[index]);
        utterance.lang = 'pt-BR'
        utterance.volume = 1;
        utterance.rate = 1;
        utterance.pitch = 1;
        synth.speak(utterance);

    }
    else{
        //alert('cuxxxxx')
    }



   /* utterance.onerror = function(event) {
        console.log('An error has occurred with the speech synthesis: ' + event.error);
        alert('An error has occurred with the speech synthesis: ' + event.error)
    }*/


}


// ********************* SPEECH RECOGNATION START ****************************

     // get output div reference
	 //var output = document.getElementById("output");
	 // get action element reference
	 var action = document.getElementById("action");
     // new speech recognition object
     var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
     var recognition;


/* JS comes here */
		    function runSpeechRecognition() {

                console.log('testando ouvindo....');
                console.log('recognition: ',recognition);

                if (typeof recognition !== 'undefined'){
                    recognition.abort();
                    recognition = null;
                }

                console.log('recognition2: ',recognition);

		        recognition = new SpeechRecognition();

		        recognition.lang = 'pt-BR';

                // This runs when the speech recognition service starts
                recognition.onstart = function() {
                    action.innerText = "Ouvindo... \n"+
                    "* Diga o numero do artigo seguido do código *\n\n"+
                    "Ex: \n"+
                    "121 penal\n"+
                    "1025 civil\n"+
                    "125 consolidação\n"+
                    "18 processo penal\n"+
                    "quinto constituição";
                };

               recognition.onspeechend = function() {


                    //mostra_inicio('Parei de ouvir\n')

                    console.log('parei de ouvir ________ ');

                    recognition.stop();
                }

                // This runs when the speech recognition service returns result
                recognition.onresult = function(event) {
                    var transcript = event.results[0][0].transcript;
                    var confidence = event.results[0][0].confidence;
                    //action.innerText = "Text: " + transcript + "\nConfidence: " + confidence*100+"%";


                    console.log('*********** trascript: '+transcript) ;

                    var vetArtCod = analiza_fala(transcript);

                    if(vetArtCod.length > 0){

                        chamadaAjax(vetArtCod[0], vetArtCod[1])

                    }
                    else{

                        //action.innerText ="Eu entendi: * "+transcript+" *\nNão foi possível encontrar!" + "\n* Mantenha um dedo na tela *";

                        mostra_inicio("Eu entendi: * "+transcript+" *\nNão foi possível encontrar!\n")

                        speech2(transcript +', não foi possível encontrar!');

                    }

                };

                 // start recognition
                 recognition.start();
	        }

// ********************* SPEECH RECOGNATION END ****************************




function longPress(){

    esconde_tabela();
    cancelaTimer(2);

    runSpeechRecognition();

    synth.cancel();
    control = 0;
}

function cancelaTimer(t){
    if(t == 1){
         if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        //mostra_tabela();
    }
    else if (t == 2){
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

function iniciaTimer(t){

    if (t == 1){
        if (!timer) {
            timer = setTimeout(longPress, 1000)
        }
     }
    else if (t == 2){
        if (!timer2) {
            timer2 = setInterval(function(){autoExecutaLinha()},0);
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
   if(event.cancelable){
        event.preventDefault();
   }

    return false;
}

function touchHandler(event) {

    var touches = event.changedTouches;

    for(var i=0; i < event.changedTouches.length; i++) {

        var touchId = event.changedTouches[i].identifier;
        var x       = event.changedTouches[i].pageX;
        var y       = event.changedTouches[i].pageY;

        console.log('x: ',x)
        console.log('y: ',y)
    }

}



function speech2(msg){

    utterance = new SpeechSynthesisUtterance(msg);
    utterance.lang = 'pt-BR'
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    synth.speak(utterance);

}



function autoExecutaLinha() {

     if(vet.length == 0)
        return;

     conta_muda_index++;

     test2.innerText = 'buceta count: '+count +'\nindex0: '+index +'\nauxIndex: '+auxIndex+'\ntimer2: '+timer2+'\nconta_muda_index: '+conta_muda_index +'\ntimer: '+timer;

     if(index >= 0 && index <= vet.length-1){

        if(synth.speaking == false){

            if (conta_muda_index < 2){

                //cancelaTimer(2);
                index=-1;
                limpa_cor_amarela();
                test2.innerText = 'buceta2 count: '+count +'\nindex0: '+index +'\nauxIndex: '+auxIndex+'\ntimer2: '+timer2+'\nconta_muda_index: '+conta_muda_index + '\n fudeu!!!!!!';

            }
            else{
                executaLinhaTexto();
            }
        }
     }

      console.log('index: ', index);
      //test2.innerText = 'count1: '+count +'\nindex0: '+index +'\nauxIndex: '+auxIndex+'\ntimer2: '+timer2;
      if (index < -1){
        index = -1
      }

      if (count > 100){
           count = 0;
      }

      if (conta_muda_index > 100000){
            conta_muda_index = 0;
      }

     count++;



    // console.log('  ########################### conta_muda_index: '+conta_muda_index)

}



document.addEventListener('visibilitychange', function() {
	if(document.hidden){
	    //speech2('Página não está visível');
	    synth.cancel();
	    cancelaTimer(2)
	    auxIndex = index;
		console.log('auxInde: ', auxIndex)
	}

	else{
	    //speech2('Página está visível');

	    iniciaTimer(2);

	     console.log('auxIndex-1: ', auxIndex-1)

        if((auxIndex-1) < 0){
            auxIndex=-1
            console.log('Menor que menos 1 no auxIndex: ', (auxIndex-1))
         }

	    index = auxIndex-1;
	}

});



function retorna_codigos(){

    var codigos = '';

    for(var key in dictCodigo) {
        var cod = dictCodigo[key];
        codigos +=' - '+cod +'\n'
    }

    return codigos;

}


// call function with parameter
window.onload = function () {

synth.cancel();
cancelaTimer(2);

index = -1;
vet = [];
count = 0;
control = 0;
auxIndex = 0 ;
iniciaTimer(3);

mostra_falando();

//action.innerText = retorna_codigos();
mostra_inicio();
};


function mostra_inicio(msg_user=''){

    action.innerText = msg_user +'\n* Mantenha um dedo na tela *\n\n'+'Códigos disponíveis: \n'+retorna_codigos();

}



function chamadaAjax(artigo, codigo){
$.ajax({
      url: 'https://isa-adr.herokuapp.com/'+artigo+'/'+codigo,
      data: {
         format: 'json'
      },
      error: function(jqxhr, settings, thrownError) {
          console.log('Houve um erro! '+thrownError);
      },
      dataType: 'json',
      success: function(data) {


           /*json = JSON.stringify(data);
         console.log(data[0].fields);
          console.log('');
          console.log(data[0].fields['artigoNumero']);
          console.log(data[0].fields.artigoInalterado);
          console.log(data[0].fields.artigoTexto);*/

          console.log(data.length);


          if(data.length > 0){

              vet_artInaterado = data[0].fields.artigoInalterado.split(/\n/);
              vet_artigoTexto = data[0].fields.artigoTexto.split(/\n/);

              table = document.getElementsByTagName("table")[0];

              // console.log('vet_artInaterado.length: '+vet_artInaterado.length)
              //console.log('vet_artigoTexto.length: '+vet_artigoTexto.length)

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

              for(var i = 0; i < vet_artInaterado.length-1; i++){

                    var linha = "<tr>><td>"+vet_artInaterado[i]+"</td></tr>";

                    $("#table tbody").append(linha);

                    vet2.push(vet_artigoTexto[i])
                }


                 for (var i = 0, row; row = table.rows[i]; i++) {

                    row.cells[0].setAttribute('id', i);

                    vet.push(row.cells[0])
                }

                iniciaTimer(2);


                  str_falar_artigo = ''
                 for(var key in dictOrdinais) {

                      var value = dictOrdinais[key];

                      console.log('_______________value: ', value);

                       if(key == parseInt(artigo)){

                           str_falar_artigo = 'artigo '+ value;

                           break;
                        }
                  }

                  if (str_falar_artigo === ''){
                        str_falar_artigo = 'artigo '+ artigo +' '+dictCodigo[codigo];
                  }
                  else{
                        str_falar_artigo += ' '+dictCodigo[codigo];
                  }


                art.innerText = str_falar_artigo;

                speech2(str_falar_artigo);

          }
          else{

                //action.innerText ="Não existe o artigo "+artigo+ ' em '+dictCodigo[codigo] + "\n* Mantenha um dedo na tela *";

                mostra_inicio("Não existe o artigo "+artigo+ ' em '+dictCodigo[codigo]+'\n')

                speech2('Não existe o artigo '+artigo+' em '+  dictCodigo[codigo])
          }



      },
      type: 'GET'
   });
}
