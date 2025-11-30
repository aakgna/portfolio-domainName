# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js 14, Firebase, and Tailwind CSS. Features a public portfolio page and an admin dashboard for content management.

## Features

- **Public Portfolio**: Clean, professional portfolio with sections for objective, education, experience, projects, publications, and skills
- **Admin Dashboard**: Protected admin interface for managing portfolio content
- **Firebase Phone Authentication**: Secure login with phone number verification and whitelist validation
- **Real-time Data**: Content updates sync instantly with Firestore
- **Responsive Design**: Mobile-first design that works on all devices
- **SEO Optimized**: Server-side rendering for better search engine visibility

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Firestore + Authentication)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Public portfolio page
│   ├── layout.tsx                  # Root layout
│   └── admin/
│       ├── login/
│       │   └── page.tsx           # Admin login page
│       └── dashboard/
│           └── page.tsx           # Admin dashboard
├── components/
│   ├── Navigation.tsx              # Main navigation
│   └── portfolio/                  # Portfolio section components
│       ├── ObjectiveSection.tsx
│       ├── EducationSection.tsx
│       ├── ExperiencesSection.tsx
│       ├── ProjectsSection.tsx
│       ├── PublicationsSection.tsx
│       └── SkillsSection.tsx
├── lib/
│   ├── firebase.ts                 # Firebase configuration
│   ├── firestore.ts               # Firestore helper functions
│   ├── auth.ts                    # Authentication utilities
│   └── seed.ts                    # Database seeding script
├── scripts/
│   └── seed.ts                    # Seed runner script
└── middleware.ts                  # Route protection
```

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd portfolio
npm install
```

### 2. Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)

2. Enable Firestore Database:

   - Go to Firestore Database in the Firebase console
   - Click "Create database"
   - Choose "Start in test mode" for development

3. Enable Phone Authentication:

   - Go to Authentication → Sign-in method
   - Enable "Phone" sign-in provider

4. Get your Firebase configuration:
   - Go to Project settings → General
   - Scroll down to "Your apps" section
   - Click "Add app" → Web app
   - Copy the config object

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Allowed Phone Number (for authentication whitelist)
ALLOWED_PHONE_NUMBER=+15107893382
```

**Important**: Replace the values with your actual Firebase configuration and set your authorized phone number.

### 4. Seed the Database

Populate Firestore with initial data:

```bash
npm run seed
```

This will create sample data for all portfolio sections.

### 5. Configure Phone Number Whitelist

Update the allowed phone number in Firestore:

1. Go to Firestore Database in Firebase console
2. Navigate to `config/auth` document
3. Update the `allowedPhoneNumber` field with your phone number (include country code)

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Firebase Security Rules

Add these security rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for portfolio data
    match /objective/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /education/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /experiences/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /projects/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /publications/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /skills/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Config data - read access for phone number validation
    match /config/{document} {
      allow read: if true;
      allow write: if false; // Only writable through Firebase console
    }
  }
}
```

## Usage

### Public Portfolio

- Visit the homepage to view the portfolio
- Use the navigation to scroll to different sections
- Click the subtle "Admin" link to access the login page

### Admin Dashboard

1. Go to `/admin/login`
2. Enter your authorized phone number
3. Complete phone verification with the OTP sent to your phone
4. Access the dashboard to:
   - Edit portfolio sections
   - Add new items (education, experience, projects, etc.)
   - Toggle visibility of items
   - Delete items
   - Update skills and objective

## Customization

### Updating Personal Information

1. Edit the hero section in `src/app/page.tsx`
2. Update the seed data in `src/lib/seed.ts` for initial content
3. Modify the portfolio components for custom styling

### Adding New Sections

1. Create a new component in `src/components/portfolio/`
2. Add the section to the main portfolio page
3. Update the navigation and admin dashboard
4. Add corresponding Firestore operations

### Styling

The project uses Tailwind CSS. Customize the design by:

- Modifying component classes
- Updating the global styles in `src/app/globals.css`
- Adjusting the color scheme and spacing

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform

Make sure to configure environment variables on your deployment platform.

## Troubleshooting

### Authentication Issues

- Verify Firebase configuration is correct
- Check that Phone Authentication is enabled in Firebase console
- Ensure the phone number is in the whitelist
- Test reCAPTCHA is working (may need to configure domains in Firebase)

### Data Not Loading

- Check Firestore security rules
- Verify Firebase configuration
- Run the seed script to populate initial data
- Check browser console for errors

### Build Issues

- Ensure all environment variables are set
- Check TypeScript errors: `npm run lint`
- Verify all dependencies are installed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
