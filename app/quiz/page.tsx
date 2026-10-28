import type { Metadata } from "next";
import Quiz from "@/components/Quiz";

export const metadata: Metadata = {
  title: "Color Analysis Quiz",
  description: "Nine quick questions to find your color season, undertone and personal palette. Free and private.",
};

export default function QuizPage() {
  return (
    <section className="min-h-[80vh] px-4 py-12 sm:py-16" style={{ background: "var(--grad-hero)" }}>
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Your Color Analysis Quiz 🎨</h1>
        <p className="mt-3 text-muted">Go with your first instinct — you can always go back.</p>
      </div>
      <Quiz />
    </section>
  );
}
