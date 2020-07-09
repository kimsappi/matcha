# About
Hive webdev project: dating site

# Features/requirements
## Tech
- [x] Any language
- [x] 'Micro-frameworks' (no built-in ORM or account manager) allowed (Express)

## Visuals/layout
- [ ] Decent layout
- [ ] Header, main section, footer
- [ ] Mobile-friendly

## Security
- [ ] User input must be validated
- [ ] Site must be secure
- [x] No plaintext password storage
- [ ] No JS injection
- [ ] No uploading unwanted content
- [ ] No SQL injection

## User account features
- [x] Registration must ask for email, username, last name, first name, password (complex)
- [x] Registration must be confirmed via an emailed unique link
- [x] Login with **username** and password
- [x] 'Forgot password'
- [x] Ability to log out with 1 click from any page

## Profile features
- [ ] After logging in, user can provide:
* - [x] Gender
* - [x] Sexual preferences (if none provided: bisexual)
* - [x] Biography
* - [x] Interests with hashtags ('\#cycling')
* - [x] Max 5 pictures
- [ ] All information above must be modifiable (as well as first and last name and email)
- [ ] User must be able to see who has checked their profile and who 'liked' them
- [ ] Users must have a public 'fame rating'
- [ ] User's location must be established either through GPS/similar or IP
- [ ] Location must be modifiable
- [ ] History of visited profiles

## Suggesting matches
- [ ] User must be suggested other relevant profiles
- [ ] Only show profiles the user is interested in (sexual preference)
- [ ] Clever matching (location, tags, fame rating)
- [ ] People must be prioritised based on location
- [ ] List must be sortable by age, location, fame rating, common tags
- [ ] List must be filterable by age, location, fame rating, common tags

## Searching for matches
- [ ] Other profiles must be searchable by features like age gap, fame rating gap, location, tags
- [ ] List must be sortable and filterable as above

## Profiles of other users
- [ ] Must contain all information except for email and password
- [ ] If you have at least 1 photo, you must be able to like another profile
- [ ] Able to unlike or 'disconnect'
- [ ] See if user is currently online (if offline, date and time of last connection)
- [ ] Ability to report fake account
- [ ] Block user (won't show up in search results, won't generate notifications)
- [ ] See if profile is connected or has liked your profile

## Chat and notifications
- [ ] 10 second delay is accepted for all of the following
- [ ] If both users like each other, the users are able to chat to each other
- [ ] Notification reasons:
* - [ ] Someone liked your profile
* - [ ] Visit to your profile
* - [ ] New chat message
* - [ ] New 'connection'
* - [ ] 'Disconnection'
- [ ] Notifications must be viewable from any page
