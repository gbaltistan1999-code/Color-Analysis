import type { Metadata } from "next";
import Quiz from "@/components/Quiz";

export const metadata: Metadata = {
  title: "Color Analysis Quiz: What Season Am I? (Free, No Signup)",
  description:
    "Free color analysis quiz and color season test. Answer 16 quick questions (plus an optional private selfie check) to find your season, undertone and color palette with HEX codes.",
  alternates: { canonical: "/quiz" },
};

export default function QuizPage() {
  return (
    <section className="min-h-[80vh] px-4 py-8 sm:py-12" style={{ background: "var(--grad-hero)" }}>
      <Quiz />
    </section>
  );
}
