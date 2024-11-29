import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import useStore from "@/zustand/Store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router";
import { useLocation } from "react-router";
import Header from "@/components/ui/Header";

interface State {
  test: string;
}

const ListPage = () => {
  const { ingredients, setIngredients } = useStore(); // ingredientsはバックエンドに送るデータ
  const [receivedData, setReceivedData] = useState<any[]>([]); // 受け取ったデータを格納するための状態

  const location = useLocation();
  const { test } = location.state as State;

  const [isLoading, setIsLoading] = useState(true);

  // 非同期処理を行う関数
  const sendIngredients = async () => {
    setIsLoading(true); // ローディングを開始
    try {
      const response = await fetch("http://localhost:5000/chatgpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(test),
      });

      if (response.ok) {
        const data = await response.json();
        setReceivedData(data);
      } else {
        console.error("Error sending ingredients");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // 非同期処理が終わったらローディングを終了
      console.log("Received data:", receivedData);
    }
  };

  const setVariable = (id: number) => {
    const recipe = receivedData.find((recipe) => recipe.id === id);
    if (!recipe) return;
    setIngredients(recipe.ingredient);
  };

  // 初回レンダリング時に送信する
  useEffect(() => {
    sendIngredients();
  }, []);

  // useEffect(() => {
  //   console.log("Updated receivedData:", receivedData);
  // }, [receivedData]);
  // }, [ingredients]); // ingredientsが変更されたらリクエストを送信

  const homeButton = () => {
    window.location.href = "/";
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-start items-center bg-gradient-to-b from-[#FFF8E1] to-[#FFE0B2]"
    >
      <Header />
      <h1 className="text-2xl font-bold text-[#6D4C41] m-4">おすすめのレシピ</h1>
      <ul className="space-y-2">
        {isLoading ? ( // ローディング中かどうかを判定
          <p>データを取得中...</p>
        ) : receivedData.length > 0 ? (
          receivedData.map((recipe, index) => (
            <li key={index}>
              <Dialog>
                <DialogTrigger>
                  {/* カレーのボタン */}
                  <div 
                  // variant={"outline"} 
                  className="border-2 border-[#FFA726] text-[#D84315] hover:bg-[#FFA726] hover:text-white">
                    {recipe.name}
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-[#FFF3E0]">
                  <DialogHeader>
                    <DialogTitle>{recipe.name}</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <div>
                    <h2 className="text-base font-bold">材料</h2>
                    <ul className="list-disc pl-5">
                      {recipe.ingredient.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>
                    <h2 className="text-base font-bold pt-3">手順</h2>
                    <ol className="list-decimal pl-5">
                      {Object.entries(recipe.procedure).map(([step, desc]) => (
                        <li key={step}>
                          <strong>{step}</strong>: {desc}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <DialogFooter>
                    <Button
                      className="bg-[#A5D6A7] hover:bg-[#66BB6A] text-[#2E7D32] rounded-md px-4 py-2"
                      variant={"outline"}
                      onClick={() => setVariable(recipe.id)}
                      asChild
                    >
                      <Link to={"/info"}>値段を調べる</Link>
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </li>
          ))
        ) : (
          <p>レシピが見つかりませんでした。</p>
        )}
      </ul>

      <Button
        className="mt-6 bg-[#FF7043] hover:bg-[#E64A19] text-white font-bold px-6 py-3 rounded-md shadow-lg transition duration-200"
        onClick={() => (window.location.href = "/")}
      >
        ホームに戻る
      </Button>
    </div>
  );

  // return (
  //   <div>
  //     <Button onClick={homeButton}>Home</Button>

  //     <h1 className=" text-lg">おすすめのレシピ</h1>
  //     <ul className="space-y-2">
  //       <p>{receivedData.length}</p>
  //       {receivedData.length > 0 ? (
  //         <>
  //           <p>{receivedData}</p>
  //           <p>{typeof receivedData}</p>
  //           {/* <p>{receivedData[]}</p> */}
  //         </>
  //       ) : (
  // receivedData.map((recipe, index) => (
  //   <li key={index}>
  //     <Dialog>
  //       <DialogTrigger>
  //         <Button variant={"outline"}>{recipe.name}</Button>
  //       </DialogTrigger>
  //       <DialogContent>
  //         <DialogHeader>
  //           <DialogTitle>{recipe.name}</DialogTitle>
  //           <DialogDescription>
  //             <h2 className="text-base font-bold">材料</h2>
  //             <ul>
  //               {/* recipe.ingredient? */}
  //               {recipe.ingredient.map((ingredient, index) => (
  //                 <li key={index}>{ingredient}</li>
  //               ))}
  //             </ul>
  //             <h2 className="text-base font-bold pt-1">手順</h2>
  //             <ol>
  //               {/* ナンバリング */}
  //               {Object.entries(recipe.procedure).map(
  //                 ([step, description]) => (
  //                   <li key={step}>
  //                     <strong>{step}</strong>: {description}
  //                   </li>
  //                 )
  //               )}
  //             </ol>
  //           </DialogDescription>
  //         </DialogHeader>
  //         <DialogFooter>
  //           <Button
  //             variant={"outline"}
  //             onClick={() => setVariable(recipe.id)}
  //             asChild
  //           >
  //             <Link to={"/info"}>値段を調べる</Link>
  //           </Button>
  //         </DialogFooter>
  //       </DialogContent>
  //     </Dialog>
  //   </li>
  // ))
  // <p>データを取得中...</p>;
  //         )}
  //       </ul>
  //     </div>
  //   );
};

export default ListPage;
