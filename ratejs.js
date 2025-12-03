document.addEventListener("DOMContentLoaded", function () {
     let btn = document.querySelector("button");
     let post = document.querySelector(".post");
     let wrapper = document.querySelector(".wrapper");
     
     btn.addEventListener("click", function (event) {
          event.preventDefault();
          wrapper.style.display = "none";
          post.style.display = "block";
     });
});
