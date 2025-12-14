# Health Tracker

A single-page React application for tracking medications and vital signs with user-specific data persistence.

## 🚀 Features

### Medication Management

- ✅ Add medications with name, dosage, and frequency
- ✅ View all medications in a clean, organized list
- ✅ Remove medications with confirmation
- ✅ Persistent storage per user

### Vital Signs Logging

- ✅ Log blood pressure (systolic/diastolic), heart rate, and weight
- ✅ Automatic timestamp for each entry
- ✅ View history in reverse chronological order (newest first)
- ✅ Input validation with helpful error messages
- ✅ Persistent storage per user

### User Authentication

- ✅ Simple username-based login (no password required per spec)
- ✅ User-specific data isolation
- ✅ Auto-logout after 5 minutes of inactivity
- ✅ Manual logout option

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** React Hooks (useState, useEffect, custom hooks)
- **Data Persistence:** localStorage (user-scoped)
- **Session Management:** sessionStorage
- **Date Formatting:** date-fns
- **Icons:** lucide-react

## 📁 Project Structure

```
health-tracker/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx       # Username login
│   │   │   └── Header.tsx          # App header with logout
│   │   ├── medications/
│   │   │   ├── MedicationForm.tsx  # Add medication form
│   │   │   ├── MedicationList.tsx  # Medications container
│   │   │   └── MedicationCard.tsx  # Individual medication
│   │   ├── vitals/
│   │   │   ├── VitalsForm.tsx      # Log vitals form
│   │   │   ├── VitalsLog.tsx       # Vitals history container
│   │   │   └── VitalEntry.tsx      # Individual vital entry
│   │   ├── ui/                     # shadcn/ui components
│   │   └── layout/
│   │       └── AppLayout.tsx       # Main layout wrapper
│   ├── hooks/
│   │   ├── useLocalStorage.ts      # Generic localStorage hook
│   │   ├── useAuth.ts              # Authentication logic
│   │   ├── useMedications.ts       # Medication CRUD
│   │   ├── useVitals.ts            # Vitals logging
│   │   └── useInactivityTimer.ts   # Auto-logout timer
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── lib/
│   │   └── utils.ts                # Utility functions
│   ├── App.tsx                     # Main app component
│   └── main.tsx                    # Entry point
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js 24 and npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd health-tracker-assessment
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

## 🧪 Testing the Application

### Test Credentials

- **Any username works** - just enter a username to login (e.g., "john", "jane", "test-user")
- Data is automatically scoped to each username
- No password required per specification

### Test Scenarios

1. **Medication Management**

   - Login as "user1"
   - Add medications: "Lisinopril, 20mg, Once daily in the morning"
   - Add another: "Metformin, 500mg, Twice daily with meals"
   - Remove a medication (note the confirmation prompt)
   - Refresh the page - medications should persist

2. **Vitals Logging**

   - Log vitals: Systolic 120, Diastolic 80, Heart Rate 65, Weight 150
   - Try invalid values (e.g., Systolic 300) - should show validation errors
   - Log multiple entries - newest should appear first
   - Refresh the page - vitals should persist

3. **User Isolation**

   - Login as "user1" and add some data
   - Logout
   - Login as "user2" - should see no data (fresh start)
   - Logout and login back as "user1" - original data should be there

4. **Auto-Logout**

   - Login and wait 5 minutes without interaction
   - Should automatically logout and return to login screen

5. **Responsive Design**
   - Resize browser window or use mobile device
   - Layout should adapt (single column on mobile, two columns on desktop)

## 🏗️ Architecture Decisions

### Why TypeScript?

- Type safety prevents runtime errors
- Better IDE support and autocomplete
- Self-documenting code through interfaces
- Easier refactoring and maintenance

### Why Custom Hooks?

- Separation of concerns (logic vs. presentation)
- Reusability across components
- Easier testing and maintenance
- Follows React best practices

### Why localStorage?

- Required by specification
- No backend needed for demo
- Persistent across page refreshes
- Simple key-value API

### Why sessionStorage for Auth?

- Clears on tab close (better security)
- Separate from data persistence
- Prevents accidental data mixing

### Component Composition

- Small, focused components
- Single Responsibility Principle
- Easy to test and maintain
- Clear data flow (props down, events up)

### Storage Key Namespacing

```typescript
// Pattern: {dataType}-{username}
medications - john; // John's medications
vitals - john; // John's vitals
medications - jane; // Jane's medications (isolated)
```

## 🎨 Design Choices

### UI/UX

- **shadcn/ui**: High-quality, accessible components
- **Tailwind CSS**: Utility-first, consistent styling
- **lucide-react**: Clean, professional icons
- **Empty states**: Friendly messages when no data exists
- **Confirmation prompts**: Prevent accidental deletions
- **Validation feedback**: Inline error messages for forms

### Accessibility

- Proper semantic HTML
- ARIA labels for icon buttons
- Form labels associated with inputs
- Keyboard navigation support
- Focus management

## 📊 Validation Rules

### Vital Signs

- **Systolic BP**: 70-250 mmHg
- **Diastolic BP**: 40-150 mmHg
- **Heart Rate**: 30-220 BPM
- **Weight**: 1-1000 lbs

## 🤝 Development Notes

### Code Quality

- Consistent TypeScript usage
- Functional components with hooks
- Proper error handling
- Clear naming conventions
- Component reusability

### Performance

- Minimal re-renders (proper hook usage)
- Efficient localStorage operations
- Lazy loading ready (if needed)

## 📝 License

This project is for assessment purposes.

## 👤 Author

Jackson Collins-Ikpe

---

**Note:** This application uses localStorage for data persistence. Data is stored locally in your browser and not sent to any server.
