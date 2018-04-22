var idCount = 0
var id;
userInputId = '';
var posts = [];
// var commants = [];
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
    var commant = $(this).siblings('.commant-input').val(),
        id = $(this).closest('li').data().id;
    for (var i = 0; i < posts.length; i++) {
        if (id === posts[i].id) {
            posts[i].commants.push(commant)
            for (let j = 0; j < posts[i].commants.length; j++) {
                alert(posts[i].commants[j]);
            }
        }
    }

}

var renderPost = function () {
    $('ul').find('li').remove();
    for (let i = 0; i < posts.length; i++) {
        $('ul').append('<li>' + posts[i].text + " " + '<button type="button" class="remove">' + 'REMOVE' + '</button>' + '<button type="button" class="commant">' + 'COMMANT' + '</button>' + '<input = text class = commant-input>' + '</li>');
        $('li').attr('data-id', posts[i].id);
        $('li').attr('id', posts[i].id)
        $('li').find('input').attr('data-commant', posts[i].id);
        $('li').find('.remove').attr('id', posts[i].id)
    }
}
// var renderCommants = function () {
//   userInputId = $(this).closest('input').data().commant;
// for (let i = 0; i < commants.length; i++) {
//     if (userInputId === posts[i].id)
//         var userInput = $('#user-commant').val();
//     $('li').append('<p>' + "user commant" + userInput + '</p>')

// }
//}

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


      //add the render comments in the render post


