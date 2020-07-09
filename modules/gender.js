// const genderConstants = {
// 	'male': 3,
// 	'female': 2,
// 	'both': 6,
// 	'null': 0	
// };

const getGenderEmoji = gender => {
	if (gender.length === 2)
		return '&#x26A5';
	else if (gender === 'm')
		return '&#x2642;'
	else if (gender === 'f')
		return '&#x2640;'
	return '';
}

module.exports = {
	getGenderEmoji
	// genderConstants
};
