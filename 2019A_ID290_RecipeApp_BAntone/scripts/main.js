$('#getBtn').click(function() {
    var url = 'https://api.edamam.com/search?app_id=8da5e920&app_key=e45a5542600578a84e2bd260efaebca5&diet&q=' + $('#recipeInput').val();
    var term = "";
    var params = "";
    $('#searchBtn').click(function(){
        $('#resultContent').html('');
        params = "";
        term = $('#searchTerm').val();
        params = "&from=" + $('#form').val();
        params = "&to" + $('#to').val();
        if ($('#healthOptions').val() == "soy-free") {
            params += "&health=soy-free";
        } else if ($('#healthOptions').val() == "dairy-free") {
            params += "&health=dairy-free";
        } else if ($('#healthOptions').val() == "kosher") {
            params += "&health=kosher";
        } else if ($('#healthOptions').val() == "low-sugar") {
            params += "&health=low-sugar"
        }
        /*$(label).click(function(){
            if($('checkbox').val() == "balanced"){
                params += "&diet=balanced";
            }
            else if($('checkbox').val() == "high-protein"){
                params += "&diet=high-protein";
            }
            else if($('checkbox').val() == "high-fiber"){
                params += "&diet=high-fiber";
            }
            else if($('checkbox').val() == "low-fat"){
                params += "&diet=low-fat"
            }
            else if($('checkbox').val() == "low-carb"){
                params += "&diet=low-carb"
            }
            else if($('checkbox').val() == "low-sodium"){
                params += "&diet=low-sodium"
            }

        });*/
        $.getJSON(url + term + params, function(data) {
            data.hits.forEach(function(r, i) {
                var recipeItems = "";
                data.hits[i].recipe.ingredients.forEach(function(recipeItem) {
                    recipeItems += '<li>' + recipeItem.text + '</li>';
                    $(".recipeItem").click(function() {
                        $(this).css("height", "auto");
                        if ($(this).css('height') == "375px") {
                            $(this).css("height", "auto");
                        } else {
                            $(this).css("height", "375px");
                        }
                    });
                });
                console.log(recipeItems);
                $('#recipeContent').append('<div class="recipeTitle">' + r.recipe.label + '</div><img src=" ' + r.recipe.image + ' " alt="" class="recipeImage"><div class="yeild"></div> Serves ' + r.recipe.yield + ' people <ul>' + recipeItems + '</ul></div>');
            });
        });
    });
});