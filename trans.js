// $(document).ready(()=> alert($)); jquery weda 😅

//green    Jquery goes here

$(document).ready(() => {

    //show adjustments
    $('.todo').hide();
    $('button.adj').on('click', () => {
        $('.todo').show("slow");
    });
    $('button.adjhide').on('click', () => {
        $('.todo').hide("slow");
    });

    })


