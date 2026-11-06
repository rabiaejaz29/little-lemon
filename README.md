# Little Lemon - Table Booking App

A React web app for the Little Lemon restaurant. Visitors can look at the home
page and book a table through a validated, accessible booking form.

## Features
- Home page and booking page with React Router
- Booking form: date, time, number of guests, occasion
- Available times change when the date changes (`useReducer`)
- Validation with clear error messages (past date, missing time, guests not 1-10)
- Accessible: labels, `aria-*` attributes, error alerts, skip link, visible focus
- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`)
- Responsive layout for phone and desktop
- Unit tests with Vitest and React Testing Library

## Tech
React, Vite, React Router, Vitest, React Testing Library, plain CSS

## Setup
Requires [Node.js](https://nodejs.org) 16 or newer.

```bash
git clone https://github.com/<your-username>/little-lemon.git
cd little-lemon
npm install
npm run dev    # opens http://localhost:5173
```

## Run the tests
```bash
npm test
```

## Project structure
```
src/
  api.js                 mock API: fetchAPI (times) and submitAPI (save)
  App.js                 routes
  components/
    BookingPage.js       state + reducer for available times
    BookingForm.js       the form and its validation
    ConfirmedBooking.js  confirmation page
    Header, Nav, Footer, Home
  BookingForm.test.js    unit tests
```

## Design
Colours: green `#495E57`, yellow `#F4CE14`, orange `#EE9972`.
Fonts: Markazi Text (headings) and Karla (body).
