## Project name: LeaseLink

- 🌐 Vercel link:
- Repo link: https://github.com/daannncb/lease_link

---

## 👬👫Collaborators: 

- Mah Para Naqvi 🌟
-  Callum Everitt 🌟
- Aren Singh 🌟
- Daniel Brownsey 🌟

---

## Project Description:

This project is about a platform where landlord and tenants communicate efficiently about property repairs and feedback for credibility.


#### Problem domain:


#### User Stories:

- 🎯Log-in & Sign-Up (Both) -   As a tenant/landlord, I want to be able to sign up/log in with my email address/social

- 🎯Navigation (Both) - As a tenant, I want a clear navigation menu that shows all available features, so that I can easily find what I need without getting lost.

- As a landlord, I want a navigation menu organised by my main tasks, so that I can quickly access properties, tickets, and tenant information.

- 🎯Direct Communication (Both) -   As a tenant or landlord, I want to comment directly on specific tickets, so that all communication about an issue stays organized in one thread rather than scattered across texts, emails, and calls.

- 🎯 Ticket Submission - Tenant -  As a tenant, I want to create and submit maintenance tickets with photos and descriptions, so that my landlord can understand the issue clearly without back-and-forth messages.

- 🎯Photo Upload (Tenant) -  As a tenant, I want to be able to upload an image when submitting a ticket so the Landlord can see the exact problem without the need to visit

- 🎯  Ticket Management & Response (Landlord) - As a landlord, I want to view all open tickets from my tenants in one dashboard and provide estimated resolution timelines, so that I can manage expectations and prioritize repairs efficiently.

- 🎯Property Portfolio Dashboard (Landlord) - As a landlord with multiple properties, I want to view all my units, tickets, and tenant information in one dashboard, so that I can efficiently manage my entire portfolio without switching between properties.

- 🎯 Transparency & Tracking (Tenant) - As a tenant, I want to see the current status and timeline for my maintenance requests, so that I know when to expect resolution and don't feel ignored or forgotten.

- 🎯 Responsiveness (both) - As a user of the app, I want to be able to navigate effortlessly and the app to automatically adjust to my screen-size

---

## 🚀 Overview

This project is a full-stack web application built with Next.js (React framework), using JavaScript, Clerk for authentication, and a variety of other modern web technologies. The application is styled using Tailwind CSS.

---

## Technical Requirements

- The application must include multiple pages and dynamic routes.
- Use Express.js to set up the server and define API endpoints for a React application, or use Next.js for server-side rendering and database integration.
- Set up a database connection using Supabase with the PG library.
- Implement database operations to save and fetch dynamically generated content (e.g., items, posts, comments, scores) associated with users.
- Demonstrate understanding of database design, including schema planning, and relationships. Provide evidence of database interaction in the form of a seed.js file or a screenshot of your database schema.
- Design a user-friendly, mobile-responsive interface.
- Implement user authentication and authorization for managing access (e.g., admin areas, user-specific content).

---

## 🛠️🗂️ Intial Planning

#### 🧠 Brainstorming ✅

- Define core features: profiles, listings, repair tracking, reviews, messaging.

#### Step 1: Draw Wireframe

Tools Figma ✅, Trello ✅

#### Step 2: Set up database tables using schema

- Tools: drawsql ✅
- Tools: SQL editor on Supabase. Purpose: to create our tables and seed dummy data.

#### Step 3: Set up Project & GitHub ✅

- Npx create-next-app@latest
- Project-name
- Typescript : No
- ESlint
- Tailwind CSS: YES
- src/directory: YES
- APP Router: YES
- Turbopack: YES
- Import Alias: No
- Remember: Don’t do git init in here
- Cd project name
- npm i
- npm pg
- New Repository (no readme)
- Copy paste git remote add origin…..
- Git add .
- Git commit -m “chore: add project template”
- Git push
- Git push -u origin main
- Set up Git collaborators and ruleset for branching
- >>Github- setting- send request for collaboration
- >>github- setting - Ruleset - new branch ruleset - name ruleset - target branch - default - in Branch Rules: ✅ restrict deletion ✅ require a pull request before merging ✅ block force pushes - save changes
- Git checkout -b folderName (after writing the codes, git add ., git commit -m “”, git push, git push - u origin folderName )
- Git checkout main
- Merge, review
- Git pull
- Again Git checkout -b folderName …..
- Review, merge
- Code .


#### Step 4: Setup Environment Variables

- .env (.gitignore)

#### Step 5: Deployment

- Deploy on Vercel — set env variables on Vercel dashboard

#### Step 6: Plan Folder Structure ✅


- **📂src**
- *1: 📂 App*

- 📂 property 📂 [propertyId] - page.js 📂 repairs -page.js 📂[repairId] -page.js
- 📂 Landlord 📂[landlordId] - page.js
- 📂 Tenants 📂[tenantId] - page.js 
- 📂 comments - 📂 [commentId] - page.js 📂delete - page.js
- 📂login 📂 […login]  - page.js
- 📂logout 📂 […logout]  - page.js
- 📂api - 📂uploads
- Errors.js
- notFound.js
- Loading.js 

- **📂 Components**

- Header.jsx —- navigation links (import links from next/links)
- Footer.jsx
- CommentList.jsx
- DeleteButton.jsx
- Form.jsx
- PropertyCard.jsx
- RepairLog.jsx
- ReviewList.jsx

- **3: 📂 lib** - queries.sql

- **4: 📂 utils**

- *dbConnection.js set up our database pool using the pg package (install it, please)

**5: 📂 Middleware** - middleware.js

**6: 📂 Images**


#### Step 7: Setup Backend

- Clerk Auth
- Storage bucket
- Supabase

#### Step 8: Build Components

- Header & Footer — site navigation and footer
- CommentList — fetch and show comments for communication
- Form — form for name + comment text input or whatever we decide
- Implement delete button on comments
- MassageList - between tenants and landlord
- PropertyCard - display property images, address, repair status

#### Step 9: Fetch

- Fetch all the data
- Delete comments by comment id
- Confirm deletion before removing

#### Step 10: Styling

- Use Tailwind, google fonts
- Simple cards, forms, buttons, spacing

#### Step 11: Testing

- Test adding comments on individual property
- Test deleting comment
- Confirm navigation works smoothly
- Test Reviews

---

#### Step 12: Reflection ✅

---

#### Step 13: Lighthouse

---

#### Step 14: Presentation

- MORE FOLDERS AND FILES
We can add more files

---

## 🧪 Challenges and Fixes

---

## 🌟 Lessons Learned

---

## 🙏 Credits

---

## 🙌 Final Thoughts

---

## 📘 Resources
- [PostgreSQL](https://neon.com/postgresql/postgresql-tutorial/postgresql-boolean)
- [PostgreSQL](https://leapcell.medium.com/14-rules-for-designing-mysql-tables-de03565305a2)
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()