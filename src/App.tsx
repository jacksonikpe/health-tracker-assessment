import { StorageKeys } from "./lib/utils";

const App = () => {
  // Temporary test
  const username = "jackson";

  // Set values
  localStorage.setItem(StorageKeys.currentUser, username);

  localStorage.setItem(
    StorageKeys.getMedicationsKey(username),
    JSON.stringify(["Paracetamol"])
  );

  localStorage.setItem(
    StorageKeys.getVitalsKey(username),
    JSON.stringify({ heartRate: 72 })
  );

  console.log("Current user:", localStorage.getItem(StorageKeys.currentUser));
  console.log(
    "Medications:",
    localStorage.getItem(StorageKeys.getMedicationsKey(username))
  );
  console.log(
    "Vitals:",
    localStorage.getItem(StorageKeys.getVitalsKey(username))
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">Health Tracker</h1>
    </div>
  );
};

export default App;
