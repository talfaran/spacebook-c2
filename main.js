var idCount = 0
var posts = [];
var addPost = function () {
    var post = {
        text: $('#post-name').val(),
        id: idCount,
        commants: []
    }
    posts.push(post)
    renderPost()
    idCount++;
}

var addCommants = function () {
    var commant = {
        CommentText: $(this).siblings('.commant-input').val(),
        userName: $(this).siblings('.commant-username').val()
    }

        id = $(this).closest('li').data().id;
    for (var i = 0; i < posts.length; i++) {
        if (id === posts[i].id) {
            posts[i].commants.push(commant)
       
        }
    }
}

$('.add-post').click(addPost)
$('ul').on('click', '.remove', function () {
    id = $(this).closest('li').data().id;
    for (var i = 0; i < posts.length; i++)
        if (id === posts[i].id) {
            posts.splice(i, 1);
        }
    renderPost()
});

$('ul').on('click', '.commant', addCommants)





// var renderCommants = function () {
//   userInputId = $(this).closest('input').data().commant;
// for (let i = 0; i < commants.length; i++) {
//     if (userInputId === posts[i].id)
//         var userInput = $('#user-commant').val();
//     $('li').append('<p>' + "user commant" + userInput + '</p>')

// }
//}



      //add the render comments in the render post


    //   for (let j = 0; j < posts[i].commants.length; j++) {
    //     alert(posts[i].commants[j]);
    // }