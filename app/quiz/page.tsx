import type { Metadata } from "next";
import Quiz from "@/components/Quiz";

export const metadata: Metadata = {
  title: "Color Analysis Quiz",
  description:
    "A free 3-minute color analysis quiz with an optional private selfie check. Get your season, undertone, palette with HEX codes and style tips.",
};

export default function QuizPage() {
  return (
    <section className="min-h-[80vh] px-4 py-8 sm:py-12" style={{ background: "var(--grad-hero)" }}>
      <Quiz />
    </section>
  );
}
