export default function ResultBox({ result }: { result: string }) {
    if (!result) return null;
  
    return (
      <div className="mt-6 whitespace-pre-line">
        {result}
      </div>
    );
  }

  