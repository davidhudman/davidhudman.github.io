# David Hudman - Full Stack Developer

[davidhudman.com](https://davidhudman.com)

- [Resume PDF](https://drive.google.com/file/d/1EUCtMWTBrS1XcNVteu6IcWiR9XNa1U1s/view?usp=sharing)
- [LinkedIn](https://www.linkedin.com/in/david-hudman-b9a8b9a4/)
- [Github](https://www.github.com/davidhudman)
- [View Site Code](https://www.github.com/davidhudman/davidhudman.github.io)

## Projects

- [Flylert](https://www.flylert.com) - cheap flight emails
- [Light Speed Pacing](https://www.lightspeedpacing.com) - track pacing lights for runners

## Site Features

- Link to LinkedIn, Github, projects, Venmo, CashApp, etc
- Generate unique addresses for crypto payments

## Todos

Phase 2:

issues:

- still getting 502 errors but merchant is successfully submitted
- still need to check if merchant exists before taking user to next page
- if merchant exists, give them a similar ID or ask them to create a new one

Completed Tasks:

Phase 1:

- (DONE) fix submit merchant form to save the data
- (DONE) fix submit screen to redirect to submit success screen that flips between different options:
  - printable QR code and instructions
  - merchant page
- (DONE) submit success screen should show message that it will be processed in 48 hours
- (DONE) for additional privacy (and speedier signup), merchants can simply create a prompt cash account and provide their own public token

Phase 2:

- (DONE) create api call that checks if merchant exists already before taking user to next page
  - (DONE) on merchant form submit (return that merchant already exists - but maybe allow them to create it anyway with a unique ID that I generate automatically)
  - (DONE) on merchant page if merchant exists, return the prompt cash public token
  - (DONE) fix issues with link routing when user navigates to a specific page

## Getting Started

Download the repo

`git clone https://github.com/davidhudman/davidhudman.github.io.git davidhudman-site`

Change to that directory

`cd davidhudman-site`

Install the packages with yarn

`yarn install`

Start the project with yarn to run on http://localhost:3000

`yarn start`

Deploy changes to AWS

`yarn run deploy:prod`
