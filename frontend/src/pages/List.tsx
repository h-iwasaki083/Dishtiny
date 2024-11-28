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

const ListPage = () => {
  const { ingredients, setIngredients } = useStore(); // ingredientsはバックエンドに送るデータ
  const [receivedData, setReceivedData] = useState<any[]>([]); // 受け取ったデータを格納するための状態

  // 非同期処理を行う関数
  const sendIngredients = async () => {
    // ingredientsに格納されているデータをバックエンドに送信
    const response = await fetch("http://localhost:5000/list", {
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

  const data = [
    {
      id: 1,
      name: "カレーライス",
      ingredient: ["にんじん", "たまねぎ"],
      procedure: {
        "1": "切る",
        "2": "混ぜる",
        "3": "煮る",
      },
    },
    {
      id: 2,
      name: "オムライス",
      ingredient: ["たまご", "ごはん"],
      procedure: {
        "1": "炒める",
        "2": "包む",
      },
    },
  ];

  const setVariable = (id: number) => {
    const a = data.find((recipe) => recipe.id === id);
    if (!a) return;
    setIngredients(a.ingredient);
  };

  // 初回レンダリング時に送信する
  // useEffect(() => {
  //   sendIngredients();
  // }, [ingredients]);  // ingredientsが変更されたらリクエストを送信

  const homeButton = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <Button onClick={homeButton}>Home</Button>

      <h1 className=" text-lg">おすすめのレシピ</h1>
      <ul className="space-y-2">
        {data.map((recipe, index) => (
          <li key={index}>
            <Dialog>
              <DialogTrigger>
                <Button variant={"outline"}>{recipe.name}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{recipe.name}</DialogTitle>
                  <DialogDescription>
                    <h2 className="text-base font-bold">材料</h2>
                    <ul>
                      {recipe.ingredient.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                    <h2 className="text-base font-bold pt-1">手順</h2>
                    <ol>
                      {/* ナンバリング */}
                      {Object.entries(recipe.procedure).map(
                        ([step, description]) => (
                          <li key={step}>
                            <strong>{step}</strong>: {description}
                          </li>
                        )
                      )}
                    </ol>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
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
        ))}
      </ul>
    </div>
  );
};

export default ListPage;
