console.log('client.js sourced');

$( onReady );

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click',storeJoke)
    getResults();
}

//send the data inputted on the DOM to the server
function storeJoke(event) {
    event.preventDefault();

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
        console.log("Error", error);
        alert('error');
    })
}

function getResults() { //ajax get call
    $.ajax( {
        method: 'GET',
        url: '/jokeHistory'
    }).then(function(response) {
        console.log(response);
        renderToDOM(response);
    }
    ).catch(function(error) {
        alert('A')
        console.log('fail: ',error)
        }
    )
}

function renderToDOM(jokes) {
    //empty the history
    $('#outputDiv').empty();
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
    $('input').val("");
}