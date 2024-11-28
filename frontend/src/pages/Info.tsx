// import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import useStore from '@/zustand/Store';

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

  return (
    <div>
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
    </div>
  );
}
export default InfoPage;
