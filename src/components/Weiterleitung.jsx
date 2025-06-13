import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Weiterleitung = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const start = async () => {
      if (!sessionId) {
        navigate("/fehler");
        return;
      }

      try {
        const response = await fetch("https://hook.eu2.make.com/92eswapug444a34ntqalvu3h2q4kw7uf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }), // Optional: für Prüfung in Make
        });

        const data = await response.json();

        if (data.companyId && data.secret) {
          const tallyUrl = `https://tally.so/r/wAao5z?secret=${data.secret}`;
          window.location.href = tallyUrl;
        } else {
          navigate("/fehler");
        }
      } catch (error) {
        navigate("/fehler");
      }
    };

    start();
  }, [sessionId]);

  return <p className="text-center p-8">Einen Moment, du wirst weitergeleitet…</p>;
};

export default Weiterleitung;
