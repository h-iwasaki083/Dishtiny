import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const InfoPage = () => {
    const [message, setMessage] = useState('');
    useEffect(() => {
      fetch('http://localhost:5000/')
        .then((res) => res.text())
        .then((data) => setMessage(data));
    }, []);

  return (
    <div>
      <h1>Example Page</h1>
        <p>{message}</p>
      <Button>ボタン</Button>
    </div>
  );
}
export default InfoPage;
