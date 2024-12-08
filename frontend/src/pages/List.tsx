import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocation } from "react-router";

interface State {
  test: string;
}

const ListPage = () => {
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
    }
  };

  const setVariable = (id: number) => {
    const recipe = receivedData.find((recipe) => recipe.id === id);
  };

  // 初回レンダリング時に送信する
  useEffect(() => {
    sendIngredients();
  }, []);

  useEffect(() => {
    console.log("Updated receivedData:", receivedData);
  }, [receivedData]);

  const homeButton = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <Button onClick={homeButton}>Home</Button>
      <ul className="space-y-2">
        {isLoading ? ( // ローディング中かどうかを判定
          <p>データを取得中...</p>
        ) : receivedData.recipes && receivedData.recipes.length > 0 ? ( // recipesを明示的に参照
          receivedData.recipes.map((recipe, index) => (
            <li key={recipe.id}>
              <Dialog>
                <DialogTrigger>
                  <div>{recipe.name}</div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{recipe.name}</DialogTitle>
                  </DialogHeader>
                  <div>
                    <h2 className="text-base font-bold">材料</h2>
                    <ul>
                      {recipe.ingredient.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>
                    <h2 className="text-base font-bold pt-1">手順</h2>
                    <ol>
                      {Object.entries(recipe.procedure).map(([step, desc]) => (
                        <li key={step}>
                          <strong>{step}</strong>: {desc}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <DialogFooter>
                    <Button
                      variant={"outline"}
                      onClick={() => setVariable(Number(recipe.id))} // idを数値に変換
                      asChild
                    ></Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </li>
          ))
        ) : (
          <p>レシピが見つかりませんでした。</p>
        )}
      </ul>
    </div>
  );
};

export default ListPage;
