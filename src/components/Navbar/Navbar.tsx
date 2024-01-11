import {
  MdOutlineEqualizer,
  MdPerson,
  MdSettings,
  MdLogout,
} from 'react-icons/md';
import { Separator } from '../ui/separator';
import Settings from './components/Settings';
import Brand from './components/Brand';
import NavButton from './components/NavButton';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import Authentication from '../Authentication/Authentication';

export default function Navbar() {
  const [isAuthenticationOpen, setIsAuthenticationOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { user, SignOut } = useAuth();
  return (
    <>
      <nav className="flex justify-between py-4">
        <Brand />
        <div className="flex gap-2 space-between">
          <NavButton
            label="Statistics"
            icon={<MdOutlineEqualizer className="text-lg" />}
            disabled
          />
          <NavButton
            label="Settings"
            icon={<MdSettings className="text-lg" />}
            onClick={() => setIsSettingsOpen(true)}
          />

          <NavButton
            onClick={() => {
              if (user) {
                SignOut();
              } else {
                setIsAuthenticationOpen(true);
              }
            }}
            label={user ? 'Sign out' : 'Log in'}
            icon={
              user ? (
                <MdLogout className="text-lg" />
              ) : (
                <MdPerson className="text-lg" />
              )
            }
          />

          <Settings
            dialogOpen={isSettingsOpen}
            dialogClose={() => setIsSettingsOpen(false)}
          />
          <Authentication
            dialogOpen={isAuthenticationOpen} // && !user so that the user cannot open the log in page after signing in, instead it should open a dropdown to signout
            dialogClose={() => setIsAuthenticationOpen(false)}
          />
        </div>
      </nav>
      <Separator className="my-4" />
    </>
  );
}
