export default function InputForm() {
    return (
      <form className="space-y-4">
        <input placeholder="주제" />
        <input placeholder="키워드 (쉼표로 구분)" />
        <select>
          <option value="tutorial">튜토리얼</option>
          <option value="til">TIL</option>
          <option value="troubleshooting">트러블슈팅</option>
        </select>
        <button>글 생성</button>
      </form>
    );
  }

  