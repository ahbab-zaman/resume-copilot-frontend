"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // handle submission
  }

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      <main
        id="contact"
        className="border-b border-border"
        style={{ background: "var(--color-background)" }}
      >
        <div className="mx-auto max-w-350 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-start gap-16 md:grid-cols-2 md:gap-24">
            {/* Left */}
            <div className="flex flex-col justify-start">
              <h1
                className="font-bold leading-[1.1] tracking-tight text-text-primary"
                style={{ fontSize: "clamp(36px, 6vw, 58px)" }}
              >
                Get in — <br />
                touch with us
              </h1>

              <p
                className="mt-6 text-[16px] leading-7"
                style={{ color: "var(--color-text-secondary)" }}
              >
                We&apos;re here to help! Whether you have a question about our
                services, need assistance with your account, or want to provide
                feedback, our team is ready to assist you.
              </p>

              {/* Email */}
              <div className="mt-10">
                <p
                  className="text-[14px]"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Email:
                </p>
                <a
                  href="mailto:hello@resumeapp.com"
                  className="mt-1 block text-[22px] font-bold text-text-primary hover:underline"
                >
                  hello@resumeapp.com
                </a>
              </div>

              {/* Phone */}
              <div className="mt-6">
                <p
                  className="text-[14px]"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Phone:
                </p>
                <a
                  href="tel:+12345678"
                  className="mt-1 block text-[22px] font-bold text-text-primary hover:underline"
                >
                  +1 234 567 78
                </a>
                <p
                  className="mt-1 text-[13px]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Available Monday to Friday, 9 AM – 6 PM GMT
                </p>
              </div>

              {/* Live chat CTA */}
              <div className="mt-10">
                <button
                  type="button"
                  className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-[15px] font-semibold text-white transition hover:opacity-90"
                  style={{ background: "var(--color-accent)" }}
                >
                  Live Chat
                  <span
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: "28px",
                      height: "28px",
                      background: "rgba(255,255,255,0.15)",
                    }}
                  >
                    <svg
                      style={{ width: "14px", height: "14px" }}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Right — form */}
            <div
              className="rounded-2xl p-8"
              style={{ background: "var(--color-surface)" }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* First + Last name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="firstName"
                      className="text-[13px] font-medium text-text-primary"
                    >
                      Firs Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name..."
                      value={form.firstName}
                      onChange={handleChange}
                      className="rounded-lg border border-border px-3 py-2.5 text-[14px] text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent"
                      style={{ background: "var(--color-background)" }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="lastName"
                      className="text-[13px] font-medium text-text-primary"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name..."
                      value={form.lastName}
                      onChange={handleChange}
                      className="rounded-lg border border-border px-3 py-2.5 text-[14px] text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent"
                      style={{ background: "var(--color-background)" }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-[13px] font-medium text-text-primary"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address..."
                    value={form.email}
                    onChange={handleChange}
                    className="rounded-lg border border-border px-3 py-2.5 text-[14px] text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent"
                    style={{ background: "var(--color-background)" }}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-[13px] font-medium text-text-primary"
                  >
                    How can we help you?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Enter your message..."
                    value={form.message}
                    onChange={handleChange}
                    className="resize-none rounded-lg border border-border px-3 py-2.5 text-[14px] text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent"
                    style={{ background: "var(--color-background)" }}
                  />
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-[15px] font-semibold text-white transition hover:opacity-90"
                    style={{ background: "var(--color-accent)" }}
                  >
                    Send Message
                    <span
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: "28px",
                        height: "28px",
                        background: "rgba(255,255,255,0.15)",
                      }}
                    >
                      <svg
                        style={{ width: "14px", height: "14px" }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
