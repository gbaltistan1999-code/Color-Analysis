"use client";

import { useState } from "react";

// TODO: replace with your real inbox before launch.
export const CONTACT_EMAIL = "hello@example.com";

/** No backend: composes a message in the visitor's own email app. */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("Question");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[${topic}] from ${name || "a visitor"}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const field = "mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink placeholder:text-muted/70 focus:border-primary";

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8">
      <div>
        <label htmlFor="name" className="font-semibold">
          Your name <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} className={field} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="topic" className="font-semibold">
          Topic
        </label>
        <select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} className={field}>
          <option>Question</option>
          <option>Feedback</option>
          <option>Bug report</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="font-semibold">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={field}
        />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Open in my email app
      </button>
      <p className="text-sm text-muted">
        Prefer to write directly? Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-primary underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </form>
  );
}
