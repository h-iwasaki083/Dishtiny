import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useStore from "@/zustand/Store";

const InfoPage = () => {
  const { ingredients } = useStore(); // ingredientsはバックエンドに送るデータ
  const [receivedData, setReceivedData] = useState<any[]>([]); // 受け取ったデータを格納するための状態
  console.log(ingredients);

  // 非同期処理を行う関数
  const sendIngredients = async () => {
    // ingredientsに格納されているデータをバックエンドに送信
    const response = await fetch("http://localhost:5000/info", {
      method: "POST", // HTTPメソッドをPOSTに指定
      headers: {
        "Content-Type": "application/json", // JSON形式で送信
      },
      body: JSON.stringify({ ingredients }), // ingredientsをJSONとして送信
    });

    if (response.ok) {
      const data = await response.json(); // レスポンスデータをJSON形式で処理
      setReceivedData(data); // レスポンスデータでreceivedDataを更新
    } else {
      console.error("Error sending ingredients");
    }
  };

  // 初回レンダリング時に送信する
  useEffect(() => {
    sendIngredients();
  }, [ingredients]); // ingredientsが変更されたらリクエストを送信

  const homeButton = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <Button onClick={homeButton}>Home</Button>
      <h1>Example Page</h1>

      {/* 受け取ったデータを表示 */}
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>食材</th>
            <th>料金</th>
          </tr>
        </thead>
        <tbody>
          {receivedData.length > 0 ? (
            receivedData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>データがありません</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InfoPage;
