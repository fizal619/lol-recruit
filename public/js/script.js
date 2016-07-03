$(document).ready(function() {
  console.log('ready for action!')

  // POPULATE STATS home/index and user/index

  // grab all the divs that need to be worked on
  let stats = $('.stats')

  //find by id


  //call for the data
  $.ajax({
    url: '/api/allusers',
    method: 'get',
    success: (data) => {
      for (let i = 0; i < stats.length; i++) {
        let normal = $(stats[i]).find('#normal')
        let ranked = $(stats[i]).find('#ranked')
        let assists = $(stats[i]).find('#assists')

        // find the user in the data that was returned, that id is the current div
        let user = data.find((user) => {
          return user.lol_id == $(stats[i]).attr('id')
        })

        //populate the stats; TODO make these bars
        $(normal).text(user.stats[0].wins)
        $(ranked).text(user.stats[1].wins)
        $(assists).text(user.stats[0].aggregatedStats.totalAssists)
      }
    }
  })

  // END POPULATE STATS

  //POPULATE MESSAGES!
  let messageContain = $('.contain')

  //fetch the messages for the user, no need to pass arguments, it only returns messages for the logged in user.
  $.get('/api/message/user', (messages)=>{
    console.log(messages)
    if(messages.length != 0){
      $('#middle').remove()
      let p = ''
      messages.map((message)=>{
        p += '<p class="message">'+ message.content + '<br><span id="sender">from: '+message.from+'</span></p>'
      })
      $(messageContain).html(p)
    }
  })

  //END POPULATE MESSAGES

  // MODALLLLLL!!!!!!!!

  $('#close').click((event)=>{
    $('#modalOuter').fadeOut('fast', ()=> {
      // some code if needed
    });
  })

  $('button.message').click((event)=>{
    // get the ign of the button clicked
    let ign = event.target.dataset.ign
    //function to send a message
    function sendMessage (){
      let data = {
        to: ign,
        from: $('#from').val(),
        content: $('#messageContent').val()
      }
      //removes the click event listener to discourage spamming of the button
      $('#sendMessage').unbind()
      //send a post to the url
      $.post('/api/message/new', data, (data)=> {
        console.log('sent')
        //clean up and fase out
        $('#from').val('')
        $('#messageContent').val('')
        $('#modalOuter').fadeOut('fast')
      })
    }

    //fade in the modal and set the click event on the send button
    $('#modalOuter').fadeIn('fast', (event)=>{
      $('#to').text(ign)
      $('#sendMessage').click(sendMessage)
    })
  })

  // END MODALLLLLLLL!!!!!!

});
