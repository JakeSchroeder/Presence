# Presence
https://xgis-presence.herokuapp.com/

---
An alternate reality game world based on Twitter for project XGIS by the Divergent Design Lab. 
www.divergentdesignlab.org

## Project Background
Create a web application that enables social media strategists to simulate and test the influence of social engineering tactics. Based on Twitter, the application enables participants and administrators to work within a familiar social media environment. 

## Development Approach
To ensure full, autonomous control, use and manipulation of the simulated social media environment, the project required development of an end-to-end clone of Twitter's core functionality. **The application was independently developed, separate from Twitter including no use of their API's or other functionality.** The application is a standalone full-stack social media platform build on the MERN (MongoDB, Express, React, Node) stack.

## Technical Highlights

1. **Infinite Posts** - Utilizing MongoDB's materialized paths to create a linked list style database structure allowing for maximized scalability and query efficiency.
2. **Advanced Data Fetching** - Using React's experimental Suspense mode, posts can be loaded into the UI using a Render-as-You-Fetch approach allowing for fine-tuned loading states and support for slow 3G connections.
3. **JWT-Based Authentication** - Managing user accounts via Passport.js and Bcrypt for flexible integration with custom login forms and secure encryption/decryption of password data.
4. **Simple Client Side Caching** - Keeping server state up to date with client-side local stores by implementing React-Query a framework providing hooks for fetching, caching and updating asynchronous data.  
5. **Streamlined Global State Mangagment** - Maintaining global state with React's Context API allows for less boilerplate and a more flexible approach.
6. **Adaptive Layout** - Using CSS media queries and flexbox, UI components are self-contained and respond according to the device widths. Supports desktops, tablets and mobile phones.

---

# Installation

To setup on your local machine, run the install command and then edit the .env__example file to include your mongodb api key.

`npm run full-install`

and then to start the project in development mode

`npm run dev`

# Contributors ✨

Jake Schroeder : [Github](https://github.com/JakeSchroeder) : [Email](mailto:jake.schroeder@isophex.com) : [Website](https://jakeschroeder.me)


