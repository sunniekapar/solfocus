import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdOutlineCircle, MdMoreVert } from 'react-icons/md';
import { motion } from 'framer-motion';
interface TaskProps  {
  title: string;
  id: number;
  completed: boolean;
  onToggle: () => void;
  description?: string;
}

export default function Task({
  title,
  completed,
  onToggle,
  description,
}: TaskProps) {
  const completedStyles = completed ? 'line-through opacity-50' : '';
  return (
    <motion.div layout>
      <Card className="px-6 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              size="icon"
              variant="ghost"
              className="mt-[2px]"
              onClick={onToggle} // Use the passed-in handler
            >
              {completed ? (
                <BsCheckCircleFill className="text-xl" />
              ) : (
                <MdOutlineCircle className="text-xl" />
              )}
            </Button>

            <CardHeader>
              <h2 className={`text-xl font-semibold ${completedStyles}`}>
                {title}
              </h2>
            </CardHeader>
          </div>
          <Button size="icon" variant="ghost">
            <MdMoreVert className="text-xl" />
          </Button>
        </div>
        {description && (
          <CardContent className={`pl-16 -mt-4 text-sm ${completedStyles}`}>
            {description}
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}
