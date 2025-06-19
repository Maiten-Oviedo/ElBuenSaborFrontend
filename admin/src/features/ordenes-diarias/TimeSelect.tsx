import { useState } from 'react';
import { FaRegClock } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';

type Props = {
  setTiempo: (minutos: string) => void;
};

const TimeCycleButton = ({ setTiempo }: Props) => {
  const options = ['+', '+5', '+10', '+15', '+20', '+25', '+30'];
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(options[0]);

  const cycleOption = () => {
    const nextIndex = (index + 1) % options.length;
    setIndex(nextIndex);
    setSelected(options[nextIndex]);
  };

  const handleConfirm = () => {
    if (selected !== '+') {
      setTiempo(selected); // <- ✅ pasa el tiempo elegido al padre
      // Reiniciar estado
      setIndex(0);
      setSelected(options[0]);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={cycleOption}
        className="flex items-center gap-2 px-4 py-2 bg-orange-700 text-white rounded-lg"
      >
        <FaRegClock />
        <span>{selected}</span>
      </button>
      <button
        onClick={handleConfirm}
        disabled={selected === '+'}
        className={`flex items-center justify-center px-3 py-2 rounded-lg transition-colors duration-200 ${
          selected === '+'
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-green-600 text-white hover:bg-green-700'
        }`}
      >
        <FaCheck />
      </button>
    </div>
  );
};

export default TimeCycleButton;
