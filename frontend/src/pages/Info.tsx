import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import useStore from '@/zustand/Store';
// import { useNavigate } from 'react-router-dom'; 

const InfoPage = () => {
  // const [data, setData] = useState([]);
  const { ingredients, setIngredients } = useStore();  // ZustandのストアからnumberとsetNumberを取得

  useEffect(() => {
    fetch('http://localhost:5000/info')
      .then((res) => res.json())
      .then((data) => {
        setIngredients(data);  // バックエンドから受け取ったデータでingredientsを更新
      });
  }, [setIngredients]);
  
  const homeButton = () => {
    window.location.href = '/';
  };

  // const navigate = useNavigate();

  // const backButton = () => {
  //   navigate('/example');
  // };


  return (
    <div>
      <Button onClick={homeButton}>Home</Button>
      <h1>Example Page</h1>
        <p>{ingredients[1]?.name}</p>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>食材</th>
            <th>料金</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    {/* <Button onClick={backButton}>レシピに戻る</Button> */}
    {/* 上手く行かないので後回しにします…。 */}
    </div>
  );
}
export default InfoPage;
