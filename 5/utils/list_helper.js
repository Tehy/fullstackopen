const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  var totalLikes = 0;
  for (var blog of blogs) {
    totalLikes += blog.likes;
  }
  return totalLikes;
};
function arrayMax(arr) {
  return arr.reduce(function (p, v) {
    return p > v ? p : v;
  });
}
const favoriteBlog = (blogs) => {
  let maxLikesIndex = 0;
  let maxLikes = 0;
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > maxLikes) {
      maxLikes = blogs[i].likes;
      maxLikesIndex = i;
    }
  }
  return blogs[maxLikesIndex];
};
const mostBlogs = (blogs) => {
  let authors = [];
  let authorsBlogs = {};

  for (let i = 0; i < blogs.length; i++) {
    let author = blogs[i].author;
    if (!authors.includes(author)) {
      authors.push(author);

      authorsBlogs[author] = 1;
    } else {
      authorsBlogs[author] += 1;
    }
  }
  const maxBlogsAuthor = Object.keys(authorsBlogs).reduce((a, b) =>
    authorsBlogs[a] > authorsBlogs[b] ? a : b
  );
  //console.log({ author: maxBlogsAuthor, blogs: authorsBlogs[maxBlogsAuthor] });
  return { author: maxBlogsAuthor, blogs: authorsBlogs[maxBlogsAuthor] };
};
const authorMostLikes = (blogs) => {
  let authors = [];
  let authorsLikes = {};

  for (let i = 0; i < blogs.length; i++) {
    let author = blogs[i].author;
    if (!authors.includes(author)) {
      authors.push(author);

      authorsLikes[author] = blogs[i].likes;
    } else {
      authorsLikes[author] += blogs[i].likes;
    }
  }
  const maxLikesAuthor = Object.keys(authorsLikes).reduce((a, b) =>
    authorsLikes[a] > authorsLikes[b] ? a : b
  );
  //console.log({ author: maxBlogsAuthor, blogs: authorsBlogs[maxBlogsAuthor] });
  return { author: maxLikesAuthor, likes: authorsLikes[maxLikesAuthor] };
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  authorMostLikes,
};
