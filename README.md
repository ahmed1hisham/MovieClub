# MovieClub


This app is a very small project that shows 3 lists of movies and a detail screen for each movie.


### Installation

- Clone this repository.
- Run `npm install` in root folder.
- Run `npx pod-install` in root folder
- For iOS run: `npx react-native run-ios`
- For Android run: `npx react-native run-android`
- Have fun exploring the App!


<br />

⏱ This task was time tracked, and it took a total of 7 hours of work (accumulatively)

### Expected behavior

- Tabs should switch between upcoming, popular, top rated movies.
- Each tab has a list of cards holding the movies’ general info. (Movies are loaded upon launch).
- Scrolling to the end of any of the lists should load more movies of this category … (a loading indicator is shown).
- There is a default poster image in case a movie doesn’t have a poster returned from the endpoints.
- Tapping on any of the movie cards navigates to another screen that has more details about that movie, including the credits.
- Credits have a default image in case the profile image is not available.
- The details page is responsive & scrollable to ensure the dynamic data never overflows the screen.
- List of movies is optimized to not get the app slow when the lists are large.

### Technical details worth mentioning:

- Genres are returned in the form if ids and not names. To avoid retrieving the list of genre names with every app launch, it was added as a list of ids and names handled using a switch block to reduce user wait time. This could’ve been done differently using through retrieving the genres every time then mapping the name of each genre to its id at run time.
- Fetched Image sizes were chosen according to what I see is best for performance & user experience (In terms of loading time).

<br />
<br />

**P.S. This app design was copied from the screenshots attached to the task explanation. I tried to get the best results with just a screenshot, so please excuse the minor differences (eg. Font types, sizes, weights & colors / Shadows).**
