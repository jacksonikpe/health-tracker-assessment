import LoginForm from "./components/auth/LoginForm";
import Header from "./components/auth/Header";
import AppLayout from "./components/layout/AppLayout";
import MedicationForm from "./components/medications/MedicationForm";
import MedicationList from "./components/medications/MedicationList";
import VitalsForm from "./components/vitals/VitalsForm";
import VitalsLog from "./components/vitals/VitalsLog";
import useAuth from "./hooks/useAuth";
import useMedications from "./hooks/useMedications";
import useVitals from "./hooks/useVitals";
import useInactivityTimer from "./hooks/useInactivityTimer";

function App() {
  const { currentUser, login, logout, isAuthenticated } = useAuth();

  // Auto-logout after 5 minutes of inactivity
  useInactivityTimer(logout, isAuthenticated);

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  return <AuthenticatedApp currentUser={currentUser!} logout={logout} />;
}

function AuthenticatedApp({
  currentUser,
  logout,
}: {
  currentUser: string;
  logout: () => void;
}) {
  const { medications, addMedication, removeMedication } =
    useMedications(currentUser);
  const { vitals, addVitalSigns } = useVitals(currentUser);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header username={currentUser} onLogout={logout} />
      <AppLayout>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Medications Section */}
          <div className="space-y-6">
            <MedicationForm onSubmit={addMedication} />
            <MedicationList
              medications={medications}
              onRemove={removeMedication}
            />
          </div>

          {/* Vitals Section */}
          <div className="space-y-6">
            <VitalsForm onSubmit={addVitalSigns} />
            <VitalsLog vitals={vitals} />
          </div>
        </div>
      </AppLayout>
    </div>
  );
}

export default App;
