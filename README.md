# Portfolio Site - Client

Welcome to the Readme for my personal portfolio website. The site itself contains details of existing projects, a personal profile and the opportunity to contact me directly. I'm keen to hear from anyone who wants to pay me money for doing things.

## Inspiration

The concept itself goes back to the days when my Dad purchased a pure word processing machine with very similar navigation (admittedly in black and white!) which led to a pinterest crawl for further inspiration.  The choice to use keyboard navigation was one I didn't realise the full implications of at the time but needless to say a very simple initial visual design choice has since become a lot more complex under the hood.

## Live Demo
You can view the live version of my portfolio [here](https://rowlandnet.online).

## Features
- Engaging retro design on both desktop on mobile.
- Pure keyboard navigation on desktop and pure button navigation on mobile.
- Javacript pagination which works on desktop and mobile.
- Users can search for and view projects.
- Profile and about sections with tech detail.
- Mobile first responsive behaviour on mobile, and desktop first on desktop.
- Excellent screen-reader support to aid users with non-standard navigation.

## Technologies Used
- HTML5
- CSS3 (Flexbox)
- JavaScript (ES6+)
- Typescript
- React.js (Vite, Zustand, Tanstack Router, Tanstack Query)
- Currently hosted on shared hosting by NameCheap

## Local Installation Instructions

Keep in mind this project was build with Vite so setting up is extremely straightforward with a few key pointers to bear in mind.

1) Clone this repository
2) I have used VS code on Linux Mint in dev, and simply saved the repository to my local machine using:
    - `crtl/shift/p`
    - `git:Clone` (please note you will need to connect VS Code to Github first)
    - select your cloned repository and where you want to save it locally.
3) I've been using node version manager to keep the version updated and also avoid clutter, so once you have the repo open, in the terminal:
    - `nvm install node`
    - `npm install`
    - `npm run dev`
4) Of course, you will also need to set up the node.js server to run this site, as well as a local PostgreSQL database. See [here](https://github.com/rowlandcoping/portfolio-server) for the server repo.
5) There are two settings from the server you need to add to your .env file.
    - `VITE_SERVER_URL`: This is the address of the server.  In dev it's your localhost and the port number of the server (normally 3500). Before building for production this will need to be set to to the production server.
    - `VITE_USER_UUID`: This is a unique ID generated for every user on the server.  Currently it is only accessible directly from the database (use Postman or a PSQL query) but in production where multiple users are active on the server a user will be able to access their ID directly from their account.

If you are interested in using the node server as a back-end for your own portfolio please [contact me](https://rowlandnet.online/profile/contact), I'm always happy to help.