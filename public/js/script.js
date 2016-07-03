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

        $(normal).text(user.stats[0].wins)
        $(ranked).text(user.stats[1].wins)
        $(assists).text(user.stats[0].aggregatedStats.totalAssists)
      }
    }
  })

  // END POPULATE STATS

  // MODALLLLLL!!!!!!!!

  $('#close').click((event)=>{
    $('#modalOuter').fadeOut('fast', ()=> {
      // some code if needed
    });
  })

  $('button.message').click((event)=>{
    let ign = event.target.dataset.ign

    function sendMessage (){
      let data = {
        to: ign,
        from: $('#from').val(),
        content: $('#messageContent').val()
      }
      $('#sendMessage').unbind()

      $.post('/api/message/new', data, (data)=> {
        console.log('sent')
        $('#from').val('')
        $('#messageContent').val('')
        $('#modalOuter').fadeOut('fast')
      })
    }

    $('#modalOuter').fadeIn('fast', (event)=>{
      $('#to').text(ign)
      $('#sendMessage').click(sendMessage)
    })
  })

  // END MODALLLLLLLL!!!!!!

});
