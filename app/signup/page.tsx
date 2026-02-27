"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mbti, setMbti] = useState("INTJ");
  const router = useRouter();

  const handleSignup = () => {
    if (!username || !password) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    let finalUsername = username;
    let count = 2;

    while (users.find((u: any) => u.username === finalUsername)) {
      finalUsername = username + count;
      count++;
    }

    users.push({
      username: finalUsername,
      password,
      mbti,
    });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", finalUsername);

    alert(`회원가입 완료! 아이디: ${finalUsername}`);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white flex items-center justify-center p-6">
  <div className="w-full max-w-2xl bg-black/60 backdrop-blur-xl border border-blue-500/30 p-8 rounded-2xl shadow-[0_0_40px_rgba(0,150,255,0.15)]">

  <h1 className="text-4xl font-light mb-10 text-center tracking-wide">
가입</h1>

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

<div className="mbti-select">
  {/* E / I */}
  <select name="mbti1">
    <option value="E">E</option>
    <option value="I">I</option>
  </select>

  {/* S / N */}
  <select name="mbti2">
    <option value="S">S</option>
    <option value="N">N</option>
  </select>

  {/* T / F */}
  <select name="mbti3">
    <option value="T">T</option>
    <option value="F">F</option>
  </select>

  {/* J / P */}
  <select name="mbti4">
    <option value="J">J</option>
    <option value="P">P</option>
  </select>
</div>


        <button
          onClick={handleSignup}
          className="w-full bg-green-500 py-2 rounded"
        >
          합니다

        </button>
      </div>
    </main>
  );
}
