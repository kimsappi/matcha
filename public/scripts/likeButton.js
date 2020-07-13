const likeButton = document.getElementById('likeButton');

if (likeButton)
	likeButton.addEventListener('click', () => {
		fetch(window.location.href, {method: 'post'})
			.then(window.location.reload());
	});
