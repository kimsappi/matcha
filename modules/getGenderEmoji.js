const getGenderEmoji = gender => {
	switch(gender) {
		// Bisexual / unknown gender
		case 6:
			return '&#x26A5';
		// Male
		case 3:
			return '&#x2642;'
		// Female
		case 2:
			return '&#x2640;'
	}
	return '';
}

module.exports = getGenderEmoji;
