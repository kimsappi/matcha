const likeButton = document.getElementById('likeButton');

if (likeButton)
	likeButton.addEventListener('click', () => {
		fetch(window.location.href,
			{
				method: 'post',
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({'action': likeButton.innerHTML})	
			}
		)
			.then(window.location.reload());
	});
