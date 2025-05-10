import React from "react";
import { useParams } from "react-router-dom";
import FeedbackWidget from "../components/FeedbackWidget";

export default function FeedbackPage() {
  const { firmaId } = useParams();

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      {firmaId ? (
        <FeedbackWidget firmaId={firmaId} />
      ) : (
        <p className="text-red-500 text-sm">Fehler: Keine firmaId übergeben.</p>
      )}
    </main>
  );
}
