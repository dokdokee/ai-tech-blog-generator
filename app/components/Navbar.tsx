"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    location.reload();
  };

  return (
    <div className="w-full bg-gray-800 p-4 flex justify-between">
      <Link href="/" className="text-green-400 font-bold">
        AI 블로그
      </Link>

      <div className="space-x-4">
        {user ? (
          <>
            <span>{user}님</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link href="/login">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
}
