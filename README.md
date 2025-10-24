Project name: LeaseLink
Vercel link:
Repo link: https://github.com/daannncb/lease_link

Team members: Maha Naqvi, Callum Everitt, Aren Singh, Daniel Brownsey

Project description:
A site which both allows you to create a virtual pantry of all the food items in your house and see which recipes you might want to cook using those ingredients.

Problem domain:
People can't always remember what food items they have in their houses, and coming up with recipe ideas isn't always easy.

User stories:
As a user, I want to see a list of the items I have in my pantry.

Wireframe:

A list of any libraries, frameworks, or packages that your application requires in order to properly function:
Express.js, pg, cors...

Instructions on how to run your app:

Lighthouse report:

Reflections:

Please mention the requirements you met and which goals you achieved for this assignment.

🎯 Were there any requirements or goals that you were not quite able to achieve?

🎯 If so, could you please tell us what was it that you found difficult about these tasks?

What went really well and what could have gone better?
Detailing useful external sources that helped you complete the assignment (e.g Youtube tutorials).
Describing errors or bugs you encountered while completing your assignment.

References:
Third-party APIs, CSS resets, icons, images...

---

Brainstorming
Define core features: profiles, listings, repair tracking, reviews, messaging.

Step 1: Draw Wireframe
Tools Figma ✅, Trello ✅
Step 2: Set up database tables using schema
Tools: drawsql ✅
Tools: SQL editor on Supabase. Purpose: to create our tables and seed dummy data.
Step 3: Set up Project & GitHub
Npx create-next-app@latest
Project-name
Typescript : No
ESlint
Tailwind CSS: YES
src/directory: YES
APP Router: YES
Turbopack: YES
Import Alias: No
Remember: Don’t do git init in here
Cd project name
New Repository (no readme)
Copy paste git remote add origin…..
Git add .
Git commit -m “chore: add project template”
Git push
Git push -u origin main
Git ruleset for branching
Git checkout -b folderName (after writing the codes, git add ., git commit -m “”, git push, git push - u origin folderName )
Git checkout main
Merge, review
Git pull
Again Git checkout -b folderName …..
Review, merge
Code .
Step 4: Setup Environment Variables
.env (.gitignore)
Step 5: Deployment
Deploy on Vercel — set env variables on Vercel dashboard
Step 6: Plan Folder Structure ✅
📂src
1: 📂 App
📂 property 📂 [propertyId] - page.js 📂 repairs -page.js
^ property -> propertyId -> page has list of repairs, click repair -> [repairId] -> page lists a repair with its comments
📂 Landlord 📂[landlordId] - page.js //”my-profile -> redir${clerk_id}
📂 Tenants 📂[tenantId] - page.js //”my-profile -> redir${clerk_id}
📂 comments - 📂 [commentId] - page.js 📂delete - page.js
📂login 📂 […login] - page.js
📂logout 📂 […logout] - page.js
Errors.js
notFound.js
Loading.js2:

📂 Components
Header.jsx —- navigation links (import links from next/links)
Footer.jsx
CommentList.jsx
DeleteButton.jsx
Form.jsx
PropertyCard.jsx
RepairLog.jsx
ReviewList.jsx
3: 📂 lib - queries.sql
4: 📂 utils
\*dbConnection.js set up our database pool using the pg package (install it, please)
5: 📂 Middleware - middleware.js
5: 📂 Images
Step 7: Setup Backend
Auth
Storage bucket
Supabase
Step 8: Build Components
Header & Footer — site navigation and footer
CommentList — fetch and show comments for communication
Form — form for name + comment text input or whatever we decide
Implement delete button on comments
MassageList - between tenants and landlord
PropertyCard - display property images, address, repair status
Step 9: Fetch
Fetch all the data
Delete comments by comment id
(Stretch) Confirm deletion before removing

Step 10: Styling
Use Tailwind, google fonts
Simple cards, forms, buttons, spacing

Step 11: Testing
Test adding comments on individual property
Test deleting comment
Confirm navigation works smoothly
Test Reviews
Step 12: Reflection
Step 13: Lighthouse

Step 14: Presentation

MORE FOLDERS AND FILES
We can add more files
