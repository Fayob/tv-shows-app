import closeIcon from '../assets/close.png';
import addComment from './addComment.js';
import countComment from './comment_count.js';
import showComments from './fetchComment.js';

const popUpPage = document.querySelector('.popup');

const popUpHandler = (shows) => {
  const commentButton = document.querySelectorAll('.comment_button');
  commentButton.forEach(async (button) => {
    button.addEventListener('click', async () => {
      const actualButton = shows.find((show) => show.id === +button.dataset.id);
      popUpPage.classList.add('visible');
      const comments = await showComments(button.dataset.id);
      popUpPage.innerHTML = `
        <div class='popup_container'>
          <img class='popup_img' src='${actualButton.image.medium}' alt='${actualButton.name}'>
          <img class='close_icon' src='${closeIcon}'>
          <h2>${actualButton.name}</h2>
          <h4>Genres: ${actualButton.genres}</h4>
          <h3>Comments (${comments.error ? 0 : comments.length})<h3/>
          <div class='comment_section'>
          ${comments.error ? '<p class="no_comment"> No comment for this movie</p>' : ` 
            ${comments.map((comment, idx) => `
              <p class='comment_paragraph' key=${idx}>${comment.creation_date} ${comment.username}: "${comment.comment}"</p>
            `).join('')}
          </div>`
}  
          <form class="form">
            <h2 class="form_heading">Add Comment<h2/>
            <input type="text" class="username" placeholder="Your Name...">
            <textarea name="comment" class="comment" cols="30" rows="10" placeholder="Your Insight..."></textarea>
            <button type='button' class='submit_button'>Add Comment</button>
          </form>
        </div>
        `;

      document.querySelector('.close_icon').addEventListener('click', () => {
        popUpPage.classList.remove('visible');
      });

      addComment(button.dataset.id);
      countComment();
    });
  });
};

export default popUpHandler;
