var gifArr = [
    "peter",
    "winter is coming",
    "why not",
    "love",
    "worldstar",
    "jazz",
    "air force",
    "kid in candy store",
    "rush hour",
    "trump",
    "obama",
    "the boss",
    "turtleneck and chain",
    "tiger",
    "escape goat",
    "im falling",
    "whatever",
    "run",
    "lannister"
]


function addButtons() {
     
    $("#gifButtons").empty();

    // Creates the buttons
    for (var i = 0; i < gifArr.length; i++) {
        var btns = $("<button>");
        btns.addClass("btns ");
        btns.attr("data-value", gifArr[i]);
        btns.text(gifArr[i]);
        $("#gifButtons").append(btns);
    }
}

addButtons();

$(document.body).on("click", ".btns", function() {
    
    $("#gifResults").empty();

    var apiKey = "83c96803edec4d8ca805dcb6bdb5d6a5";
    var tag = $(this).data("value");
    var limit = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tag + "&api_key=" + apiKey + "&limit=" + limit;

    console.log("QueryURL: " + queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .done(function(response){
      
        var gifArr = response.data;
        
        console.log(response)

        for (var i = 0; i < gifArr.length; i++) {
            var img = $("<img>");
            var gifImgDiv = $("<div>");
            var ratingText = $("<figcaption>");
            var ratingSrc = "Rating: " + gifArr[i].rating;
            var imgSrc = gifArr[i].images.fixed_height.url;

            ratingText.addClass("gifRating text-center");
            ratingText.text(ratingSrc);

            img.addClass("gifImgs");
            img.attr("src", imgSrc);
            img.attr("data-animate", gifArr[i].images.fixed_height.url);
            img.attr("data-still", gifArr[i].images.fixed_height_still.url);
            img.data("state", "animate");   

            gifImgDiv.addClass("imgDiv");
            
            $(gifImgDiv).append(ratingText);
            $(gifImgDiv).append(img);

            $("#gifResults").append(gifImgDiv);
            $(gifImgDiv).css("display", "none");
            $(".imgDiv").css("display", "block");
        $(".imgDiv").css("width", "500px");
        $(".imgDiv").css("padding-left", "15%");
        }
            
        $("#gifResults").css("height", "1500px");
        $("#gifResults").css("background-color", "Black");
       
    })

});

$("#searchGif").on("click", function() {
    event.preventDefault();
    
    var addButton = $("#search-input").val().trim();

    if (addButton === '') {
        return 0;
    } else {
        gifArr.push(addButton);
        addButtons();
    }
})

$(document.body).on("click", ".gifImgs",function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})


