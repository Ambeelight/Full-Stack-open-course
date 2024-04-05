import { useEffect, useState } from 'react';

const Notification = ({ message }: { message: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  if (!message) return null;

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 5000);
    }
  }, [message]);

  return <div style={{ color: 'red' }}>Error: {isVisible && message}</div>;
};

export default Notification;
