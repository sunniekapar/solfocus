import Navbar from './components/layouts/Navbar';
import Tasks from './components/layouts/Tasks';
import Timer from './components/layouts/Timer';
import { ThemeProvider } from './components/theme-provider';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-11/12 py-4 mx-auto md:w-7/12">
        <Navbar />
        <div className='mx-auto 2xl:w-1/2'>
          <Timer />
          <Tasks />
        </div>
      </div>
    </ThemeProvider>
  );
}
