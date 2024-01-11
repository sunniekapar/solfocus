import { ModeToggle } from '@/components/mode-toggle';

export default function Brand() {
  return (
    <header className="flex items-center">
      <ModeToggle />
      <h1 className="hidden text-3xl font-semibold md:ml-2 md:block">
        SolFocus
      </h1>
    </header>
  );
}
