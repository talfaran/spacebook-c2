var SpacebookApp = function () {
  var posts = []
  var currentId = 0;
  var commentsId = 0;
  var $posts = $('.posts');

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      comments: []
    }
    currentId += 1;
    posts.push(post);
  }

  var renderPosts = function () {
    $posts.empty();
    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];

      var commentsContainer = '<div class="comments-container">' +
        '<input type="text" class="comment-name">' +
        '<button class="btn btn-primary add-comment">Post Comment</button> </div>';

      $posts.append('<div class="post" data-id=' + post.id + '>'
        + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
        commentsContainer + '</div>');
    }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;
    var post = _findPostById(id);
    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  }

  var createComment = function (commentButton) {
    var $clickedPost = $(commentButton).closest('.post');
    var id = $clickedPost.data().id;
    var commentText = $(commentButton).siblings('.comment-name').val();
    var $comment = {
      text: commentText,
      id: commentsId
    }
    commentsId++;
    for (var i = 0; i < posts.length; i += 1) {
      if (id === posts[i].id) {
        posts[i].comments.push($comment)
      }
    }
  }

  var renderComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comment-div').remove();
    var id = $clickedPost.data().id;
    var post = _findPostById(id);

    for (var j = 0; j < post.comments.length; j++) {
      var btnDataId = post.comments[j].id
      var removeBtn = '<button class= "btn btn-danger removeButton" data-id=' + btnDataId + ' type="button">remove comment</button>'
      var comment = post.comments[j].text;
      var currentComment = $clickedPost.find('.comments-container');
      currentComment.append('<div class = "comment-div">' + '<p>' + comment + '</p>' + "   " + removeBtn + '</d>');
    }
  }

  var removeComment = function (currentRmvBtn) {
    var $clickedPost = $(currentRmvBtn).closest('.post');
    var id = $clickedPost.data().id;
    var btnID = $(currentRmvBtn).data().id;
    var post = _findPostById(id);
    for (var i = 0; i < post.comments.length; i++) {
      if (post.comments[i].id === btnID) {
        post.comments.splice(i, 1);
      }
    }
  }

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,
    createComment: createComment,
    renderComments: renderComments,
    removeComment: removeComment,
    toggleComments: toggleComments
  }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();

  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
  app.renderComments(this);
});

$('.posts').on('click', '.add-comment', function () {
  app.createComment(this);
  app.renderComments(this);
});

$('.posts').on('click', '.removeButton', function () {
  app.removeComment(this);
  app.renderComments(this);
});