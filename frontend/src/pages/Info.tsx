import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useStore from "@/zustand/Store";
import Header from "@/components/ui/Header";

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
    <div 
      className="min-h-screen flex flex-col justify-start items-center bg-gradient-to-b from-[#FFF8E1] to-[#FFE0B2]"
    >
      <Header />

      {/* <div>
        <Button onClick={homeButton}>Home</Button>
        <h1>Example Page</h1> */}

        {/* 受け取ったデータを表示 */}
        {/* <table style={{ borderCollapse: "collapse", width: "100%" }}>
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
      </div> */}

      {/* gpt */}
      {/* <Button
        onClick={homeButton}
        className="mb-6 bg-[#A5D6A7] hover:bg-[#66BB6A] text-[#2E7D32] font-bold rounded-md px-6 py-3 transition duration-200"
      >
        Home
      </Button> */}
      
      <h1 className="text-2xl font-bold text-[#2E7D32] m-6">食材とその値段</h1>
      
      {/* 受け取ったデータを表示 */}
      <div className="w-full max-w-3xl bg-[#F1F8E9] p-6 rounded-md shadow-md">
        {receivedData.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-[#66BB6A] text-white">
              <tr>
                <th className="py-3 px-4">食材</th>
                <th className="py-3 px-4">料金</th>
              </tr>
            </thead>
            <tbody>
              {receivedData.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-6 text-gray-500">データがありません</div>
        )}
      </div>
    </div>
  );
};

export default InfoPage;
