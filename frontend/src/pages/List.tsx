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
  // console.log(test);

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
    <div
      className="min-h-screen flex flex-col justify-start items-center bg-gradient-to-b from-[#FFF8E1] to-[#FFE0B2]"
    >
      <Header />
      {/* 従来コード */}
      {/* <div>
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
                      <ol> */}
                        {/* ナンバリング */}
                        {/* {Object.entries(recipe.procedure).map(
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
      </div> */}
      
      {/**gpt */}
      {/*gpt */}
      <h1 className="text-2xl font-bold text-[#6D4C41] m-4">
        おすすめのレシピ
      </h1>

      <ul className="space-y-4">
        {data.map((recipe) => (
          <li key={recipe.id}>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full py-3 bg-[#FFCC80] hover:bg-[#FFA726] text-[#D84315] font-bold rounded-md shadow-md transition duration-200">
                  {recipe.name}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#FFF3E0]">
                <DialogHeader>
                  <DialogTitle>{recipe.name}</DialogTitle>
                  <DialogDescription>
                    <h2 className="text-base font-bold">材料</h2>
                    <ul className="list-disc pl-5">
                      {recipe.ingredient.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                    <h2 className="text-base font-bold pt-3">手順</h2>
                    <ol className="list-decimal pl-5">
                      {Object.entries(recipe.procedure).map(
                        ([step, description]) => (
                          <li key={step}>
                            <strong>{step}:</strong> {description}
                          </li>
                        )
                      )}
                    </ol>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    className="bg-[#A5D6A7] hover:bg-[#66BB6A] text-[#2E7D32] rounded-md px-4 py-2"
                    asChild
                  >
                    <Link to="/info">値段を調べる</Link>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </li>
        ))}
      </ul>

      <Button
        className="mt-6 bg-[#FF7043] hover:bg-[#E64A19] text-white font-bold px-6 py-3 rounded-md shadow-lg transition duration-200"
        onClick={() => (window.location.href = "/")}
      >
        ホームに戻る
      </Button>
      
    </div>
  );
};

export default ListPage;
