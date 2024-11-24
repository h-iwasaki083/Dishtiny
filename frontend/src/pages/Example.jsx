import React from 'react';
import { useState, useEffect } from 'react';

const ExamplePage = () => {
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
    </div>
  );
}
export default ExamplePage;