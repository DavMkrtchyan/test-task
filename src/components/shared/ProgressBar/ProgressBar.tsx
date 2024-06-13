import { useEffect, useState } from "react";
import "./ProgressBar.scss";

interface IProgressBar {
  onFinish: () => void;
}

const ProgressBar = ({ onFinish }: IProgressBar) => {
  const duration = 10;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = 100; // interval in ms to update progress
    const increment = 100 / ((duration * 1000) / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          clearInterval(timer);
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration]);

  const fillerStyle = {
    width: `${progress}%`,
  };

  useEffect(() => {
    if (progress >= 100) {
      onFinish();
    }
  }, [progress]);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-filler" style={fillerStyle}>
        <div className="progress-bar-text">progress: {progress}%</div>
      </div>
    </div>
  );
};

export default ProgressBar;
