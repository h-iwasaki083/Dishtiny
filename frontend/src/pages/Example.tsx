import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import useStore from '@/zustand/Store';


const ExamplePage = () => {
  const { number, setNumber } = useStore();  // ZustandのストアからnumberとsetNumberを取得
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);  // バックエンドから受け取ったデータでmessageを更新
        // const fetchedNumber = parseInt(data, 10);  // 受け取ったデータを整数に変換（必要に応じて）
        setNumber(data.number);  // バックエンドから受け取ったデータでnumberを更新
      });
  }, [setNumber]);

return (
  <div>
    <h1>Example Page</h1>
    <p>バックエンドからのデータ: {message}</p> {/* ここでバックエンドのメッセージを表示 */}
    <p>Zustandで管理されているnumber: {number}</p> {/* Zustandから取得したnumberを表示 */}
    <Button>ボタン</Button>
  </div>
);
};

export default ExamplePage;

// const ExamplePage = () => {
//     // const [message, setMessage] = useState('');
//     const { number, setNumber } = useStore();  // Zustandストアからstateと関数を取得

//     useEffect(() => {
//       fetch('http://localhost:5000/')
//         .then((res) => res.text())
//         .then((data) => setNumber(data));
//         // .then((data) => setMessage(data));
//     }, []);

//   return (
//     <div>
//       <h1>Example Page</h1>
//         <p>{number}</p>
//       <Button>ボタン</Button>
//     </div>
//   );
// }
// export default ExamplePage;
