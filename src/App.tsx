import Navbar from './components/Navbar/Navbar';
import TaskList from './components/Tasks/TaskList';
import Timer from './components/Timer/Timer';
import { ThemeProvider } from './components/theme-provider';
import AuthProvider from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="w-11/12 py-4 mx-auto md:w-7/12">
          <Navbar />
          <div className="mx-auto 2xl:w-1/2">
            <Timer />
            <TaskList />
          </div>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}
