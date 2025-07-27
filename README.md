# Maya-Matrix-Hospital 
Home task for internship in Mayamatrix Technologies.

-----------------------------------------------------------------------------------------------------------------------------
## Tech Used 
### Frontend 
- React.js(Next.js)
- TailwindCSS
- Motion for animation 
- shadcn/ui component library
- Sonner for toasts
- React Query
- React Hook Form

### Backend 
- Next.js Server Actions
- Prisma ORM
- Mongo DB
- Appwrite for Auth

### Other Tools & Techs 
- Zod for validation
- Form Spree for contact form
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Approach 

### UI 
- Used React Client Components for page structure
- Used TailwindCSS to style components 
- Used shadcn green theme for calm and smooth green color.
- Used Motion to animate landing page
- Used shadcn components like Button, Select, Input, Datatable etc. for modern and clean ui
  
### Form Handling
- Used React Hook Form paired with zod for seamless form validation, error handling and submission state tracking
  
### Database Query and mutation
- Used React Query for data fetching from database and data mutation with build in caching , error handling, loading state traking,
- Use `QueryClient` for form invalidation

### Backend
- Used MongoDB atlas for database 
- Used Next.js server actions paired with React Query in the frontend for data fetching and mutation
- Used prisma ORM for easy database mapping 

--------------------------------------------------------------------------------------------------------------------------------------------------------
## Modules/Features
### Responsive Landing page
- Animated and clean  hero section 
- Scroll animated services , about and contact section
- Functional Contact form with FormSpree

### Role Based Access Control
- RBAC for protected pages
- Authentication and authorization with appwrite client api
- Role based post login redirection

### Admin Dashboard
- Modern Admin dashboard with CRUD opeerations for Appointments
- Pop up modals for fast and modern feel
- Instant UI feedback for loading, error and sucessful actions

### Others
- Responsive navbar 
- Dedicated pages for user and doctors ( Static dummy Data for now)
