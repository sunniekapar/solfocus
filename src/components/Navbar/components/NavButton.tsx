import { Button, ButtonProps } from '@/components/ui/button';
import { ReactNode, forwardRef } from 'react';

interface NavButtonProps extends ButtonProps {
  icon: ReactNode;
  label: string;
}

function NavButtonComponent({ icon, label, ...props }: NavButtonProps, ref: React.Ref<HTMLButtonElement>) {
  return (
    <Button {...props} ref={ref} size="sm">
      {icon}
      <p className="hidden ml-0 text-xs md:ml-2 md:block">{label}</p>
    </Button>
  );
}

const NavButton = forwardRef<HTMLButtonElement, NavButtonProps>(NavButtonComponent);

export default NavButton;