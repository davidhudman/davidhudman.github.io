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

Phase 4:

- Big Feature: Auth, user payment pages (BCH, Cashapp), user events, event payments (5Ks too)
- frontend should process any order that returns the receipt so that it can be printed out and shown to the user (will need backend support)
- frontend should receive any 200 with body { message: "order not found" } and display that message to the user unless the orderNumber starts with 9999
- use Joi objects to validate POST requests to condense happy path code
- refactor into classes per merchant
- fix re-rendering of page
- for valid order numbers, open the lambda browser before the user pays and get ready to fill out the payment info as soon as the user pays
  - only remain open for 2 minutes
- Scan QR code
- ensure backend runs locally

Phase 3 (Agent):

- count of recent paid transx (last 24 hours, last 7 days, last 30 days)
- it should really hide iFrame when it detects that cryptoPaymentReceived is PAID
- when timeout finishes searching for credit card / crypto payment status, show a button telling the user that we couldn't find it and ask user if they want us to continue searching
- figure out if we still want to useParams to get id because that is breaking for the user when the order already exists after the first step
- test progress bar to see if we broke it when the user is waiting for credit card payment to clear

- better sanitization of inputs (order numbers, bitcoin addresses, emails)
- integrate changes for callback from prompt.cash and test at CB
  - everything will be on agent page
- add a select dropdown with "CB" selected by default
- new flow
  - start with selecting merchant and entering order number
  - at this point, either allow the user to choose between paying and checking order status or just run the GET orderNumber and make decision based on that
    - check order status (just show it)
    - payment
      - fill out payment form in addition to orderNumber and merchant already filled out, add:
        - refund address, email, tip, password
- refactor backend code to reduce copied code
- add periodic health tests
  - CB API, our API, prompt.cash API
- slack alerts
- setup monitoring?
  - uptime robot
  - new relic
  - sentry

Phase 2:

issues:

- still getting 502 errors but merchant is successfully submitted
- still need to check if merchant exists before taking user to next page
- if merchant exists, give them a similar ID or ask them to create a new one
- Agent Purchase page: maybe change callback later to something that can process it
- Order Received Screen: still needs confirmation of final credit card payment (should look the same-ish)

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
