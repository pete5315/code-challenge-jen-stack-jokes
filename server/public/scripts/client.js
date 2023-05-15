console.log('client.js sourced');

$( onReady );

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click',storeJoke)


    getResults();
}


function getResults() { //ajax get call
    $.ajax( {
        method: 'GET',
        url: '/jokeHistory'
    }).then(function(response) {
        if(response===[]){
            console.log('undefined result');
            return;
        }
        console.log(response);
        renderToDOM(response);
    }
    ).catch(function(error) {
        //errors were not functional during testing 
        //alert('A')
        //console.log('fail: ',error)
        }
    )
}

//send the data inputted on the DOM to the server
function storeJoke(event) {
    // //check if any inputs are blank
    // if($('#input1').val()===""||$('#input2').val()===""||globalOperator==="") {
    //     alert('Input field blank, please retry');
    //     return;
    // }
    // //split the string into two input objects and an operator
    // let isolatedParts = isolateParts($('#input1').val());
    // for (let x in isolatedParts) {
    //     //check if any of the parts are missing
    //     if(isolatedParts[x]===""||isolatedParts[x]===undefined){
    //         return;
    //     }
    //     //check if operator was entered too many times
    //     if((isolatedParts[x].length>1)&&(isolatedParts[x]*1!=isolatedParts[x])) {
    //         return;
    //     }
    //     //check if an input has multiple decimal points
    //     let j=0;
    //     if (isolatedParts[x]===".") {
    //         if(j===1) {
    //             return;
    //         }
    //         j++;

    //     }
    // }

    $.ajax( {
        method: 'POST',
        url: '/jokeHistory',
        data: {
            whoseJoke: $('#whoseJokeIn').val(),
            jokeQuestion: $('#questionIn').val(),
            punchLine: $('#punchlineIn').val(),
        }
    }).then(function(req,res) {
        getResults();
    }).catch(function(error) {
        // console.log("Error", error);
        // alert('error');
    })
}

function renderToDOM(jokes) {
    //empty the history
    $('#outputDiv').empty();
    //empty array would error, so end early if so
    if(jokes===undefined) {
        return;
    }
    //display the updated history
    for (let i=0; i<jokes.length; i++) {
        $('#outputDiv').append(`
        <li class="history">${jokes[i].jokeQuestion} ${jokes[i].punchLine} (by ${jokes[i].whoseJoke})</li>
        `);
    }
    clearFields();
}

function clearFields() {
    //clear all the input fields
    $('#input1').val("");
    globalOperator="";
//    $('#input2').val("");
    $(".operator").css("background-color", "white");
}