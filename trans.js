// $(document).ready(()=> alert($)); jquery weda 😅

//green    Jquery goes here

$(document).ready(() => {

    //show adjustments
    $('.todo').hide();
    $('button.adj').on('click', () => {
        $('.todo').show("slow");
    });

    //hide adjustments
    $('button.adjhideall').on('click', () => {
        $('.todo').hide("slow");
    });


    //when user select a adjustment type :
    $('.adjhide').hide();
    $('select.tbtype').change(function(){
        var selectedAdj = $(this).children("option:selected").val();
        //alert(selectedAdj);
        if(selectedAdj == 'accu'){
            $('.adjhide').hide();
            $('.accu-area').slideDown();
        }
        else if(selectedAdj == 'prepay'){
            $('.adjhide').hide();
            $('.prepay-area').slideDown();
        }
        else if(selectedAdj == 'inrec'){
            $('.adjhide').hide();
            $('.inrec-area').slideDown();
        }
        else if(selectedAdj == 'accu'){
            $('.adjhide').hide();
            $('.accu-area').slideDown();
        }
        else if(selectedAdj == 'inad'){
            $('.adjhide').hide();
            $('.inad-area').slideDown();
        }
        else if(selectedAdj == 'baddebt'){
            $('.adjhide').hide();
            $('.baddebt-area').slideDown();
        }
        else if(selectedAdj == 'prodebt'){
            $('.adjhide').hide();
            $('.prodebt-area').slideDown();
        }
        else if(selectedAdj == 'deprec'){
            $('.adjhide').hide();
            $('.deprec-area').slideDown();
        }
        else{
            $('.adjhide').hide();
        }

    })
})

//green      End jquery

