import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MdSkipNext } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { pomodoroTimes } from '@/data';

export default function Timer() {
  const [pomodoroType, setPomodoroType] = useState(pomodoroTimes[0].name);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds

  useEffect(() => {
    const selectedTime = pomodoroTimes.find(
      (item) => item.name === pomodoroType
    );
    if (selectedTime) {
      setTimeLeft(selectedTime.time);
      setIsTimerOn(false);
    }
  }, [pomodoroType]);

  const nextPomodoro = () => {
    const selectedTime = pomodoroTimes.findIndex(
      (item) => item.name === pomodoroType
    );
    setPomodoroType(pomodoroTimes[(selectedTime + 1) % 3].name);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerOn) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) return prevTime - 1;
          clearInterval(interval);
          return 0;
        });
      }, 1000);
    } else if (!isTimerOn && timeLeft !== 0) {
      clearInterval(interval!);
    }

    return () => clearInterval(interval);
  }, [isTimerOn, timeLeft]);

  const formatTime = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return `${hours ? `${hours}:` : ''}${
      minutes < 10 && hours ? '0' : ''
    }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Card className="flex flex-col items-center justify-center w-full p-4 mx-auto mt-6">
      <CardHeader className="flex flex-row gap-1 space-y-0 md:gap-2">
        <Button
          id="pomodoro"
          variant={pomodoroType === 'Pomodoro' ? 'secondary' : 'ghost'}
          onClick={() => setPomodoroType('Pomodoro')}
        >
          Pomodoro
        </Button>
        <Button
          id="short-break"
          variant={pomodoroType === 'Short Break' ? 'secondary' : 'ghost'}
          onClick={() => setPomodoroType('Short Break')}
        >
          Short Break
        </Button>
        <Button
          id="long-break"
          variant={pomodoroType === 'Long Break' ? 'secondary' : 'ghost'}
          onClick={() => setPomodoroType('Long Break')}
        >
          Long Break
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <p className="mb-5 text-6xl font-semibold">{formatTime()}</p>
      </CardContent>
      <CardFooter className="relative items-center justify-center w-full">
        <Button
          variant={isTimerOn ? 'outline' : 'default'}
          size="lg"
          onClick={() => setIsTimerOn((prev) => !prev)}
        >
          {isTimerOn ? 'Pause' : 'Start'}
        </Button>
        <Button size="icon" variant="ghost" className="absolute right-10">
          <MdSkipNext className="text-3xl" onClick={nextPomodoro} />
        </Button>
      </CardFooter>
    </Card>
  );
}
