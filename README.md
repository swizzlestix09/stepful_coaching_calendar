# Stepful Calendar

### Criteria:
- Your website should satisfy the following user stories:
- Coaches can add slots of availability to their calendars. These slots are always 2 hours long and each slot can be booked by exactly 1 student.
- Coaches can view their own upcoming slots.
- Students can book upcoming, available slots for any coach.
- When a slot is booked, both the student and coach can view each other’s phone-number.
- After they complete a call with a student, coaches will record the student’s satisfaction (an integer 1-5) and write some free-form notes.
- Coaches should be able to review their past scores and notes for all of their calls.

## Architecture
![stepfulMVCdiagram](https://github.com/user-attachments/assets/574692f8-632b-44e6-a8c8-52685bb9c61d)

The architecture for this project is simple.
I am most familiar with postgres and decided this would be the best choice. Some of the reasons I’d say is because it supports relational and non relational querying, and I think with a growing website like Stepful its scalability and performance would be helpful.
I’m using Next.js which has multiple types of querying, enabling the creation of a dynamic website where we can use several methods for querying data (SSG, SSR, etc.)

### Front End
There will be a few components that should be implemented for V1:
Sign in will be quick and without authentication since that was not on the table for V1
 - Day and Time Selector:
   - Coach feature only
 - Calendar
   - Able to select dates, no previous dates only present and future.
   - Time
   - Able to select times, no previous times, and if selected will not store.
 - Appointments:
   - Coaches:
   - Coaches’ upcoming slots
  - Booked slots w/ student telephone
 - Students:
   - All coaches upcoming slots - able to book time
   - Booked slots w/ teacher telephone
 - Notes and Ratings:
   - Coach feature only
   - Coach can write note on past calls with students
   - Coach can store ratings with students
   - Coach Should be able to view all past notes
 - Contexts:
   - User context - since user data is being used in multiple places to fetch data, user data given by the path will be stored in a context
   - Date/Time - date and time is also used in multiple places, so we will store those in a context as well

### Back End
![dbtables](https://github.com/user-attachments/assets/9b22dfde-d9a5-437c-9125-e74cf2243335)

I created a universal users table, because the information being collected at the moment is generally the same. Everyone will be a user, but there are differences between coaches and students, and who knows if we’ll create a different type of user in the future.
Though keeping the information in separate tables can slow down performance, stepful’s growth leads me to believe we might add fields for specific users that can be kept separate, so ultimately it might positively impact performance.
Slots and Bookings are separate tables so that we don’t have to have null fields in slots ( the student_id for slots will always be null once created). Bookings will be created once a student books a slot.
Notes are associated with the coach only at the moment, and I have the rating with the note since they seem to be coupled and only the coach has those capabilities at the moment. Honestly not sure that was the best idea - I can see ratings being used by students eventually so the relationship between notes and ratings may have to change.

## How to run project:

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

These are the log in credentials:

### Students

- Will Willam will.willam@example.com password123
- Simp Simperton simp.simperton@example.com password123

### Teachers

- John Doe john.doe@example.com password123
- Annie Ann annie.ann@example.com password123

  **If for some reason these credentials are not working, localhost:XXXX/seed to populate database**

## Afterthoughts

Now that I have submitted the product, there are a few oversights that I took that I regret and will probably fix before implementing any V2 features such as:

Have a loading state for both bookings and appointments
Have a state for when there are no bookings appointments
Pagination for appointments
Not rely on useTimeouts to update bookings/appointments
Implement Notes/Ratings

I appreciate your time, thank you for your review. :raised_hands:
