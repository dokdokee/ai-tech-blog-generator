"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Editor from "./components/Editor"


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u: any) => u.username === username && u.password === password
    );

    if (!user) {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
      return;
    }

    localStorage.setItem("currentUser", username);
    alert("로그인 성공!");
    router.push("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded-xl w-80 space-y-4">
        <h1 className="text-xl font-bold text-center">로그인</h1>

        <input
          className="w-full p-2 bg-gray-800 rounded"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 bg-gray-800 rounded"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 py-2 rounded"
        >
          로그인
        </button>
      </div>
    </main>
  );
}



