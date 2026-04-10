"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { useCreateQueryMutation } from "@/api/queriesApi"; // ✅ Changed to useCreateQueryMutation

export default function ContactFormSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // ✅ Using createQuery from queriesApi (which supports branch)
  const [createQuery, { isLoading }] = useCreateQueryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = `${form.firstName} ${form.lastName}`.trim();

    if (!fullName || !form.email || !form.message) {
      alert("Please fill in all required fields: Name, Email, and Message");
      return;
    }

    try {
      await createQuery({
        branch: "chhabra_marble", // ✅ Required for this branch
        name: fullName,
        email: form.email,
        subject: "General Inquiry from Contact Form", // Default subject
        message: form.message,
        // phone is optional - you can add it to the message if needed
      }).unwrap();

      setSubmitted(true);

      // Reset form
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      console.error("Contact form submission failed:", err);
      const errorMsg =
        err?.data?.message || "Failed to send message. Please try again.";
      alert(errorMsg);
    }
  };

  return (
    <section data-testid="contact-section" className="py-24 md:py-32">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-[15px] font-normal tracking-[0.2em] uppercase text-brand-red mb-4">
              Get In Touch
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollReveal>
            {submitted ? (
              <div
                data-testid="contact-success"
                className="flex items-center justify-center h-full"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-normal text-brand-charcoal mb-2">
                    Thank You
                  </h3>
                  <p className="text-brand-body font-light">
                    We'll get back to you shortly.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                data-testid="contact-form"
                className="space-y-6"
              >
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-brand-border text-brand-charcoal placeholder:text-brand-muted font-light focus:outline-none focus:border-brand-red transition-colors"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-brand-border text-brand-charcoal placeholder:text-brand-muted font-light focus:outline-none focus:border-brand-red transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-brand-border text-brand-charcoal placeholder:text-brand-muted font-light focus:outline-none focus:border-brand-red transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-brand-border text-brand-charcoal placeholder:text-brand-muted font-light focus:outline-none focus:border-brand-red transition-colors"
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-brand-border text-brand-charcoal placeholder:text-brand-muted font-light focus:outline-none focus:border-brand-red transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  data-testid="contact-submit-btn"
                  className="bg-brand-red text-white px-10 py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors duration-300 disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="h-full min-h-[400px]">
              <iframe
                title="Chhabra Marble Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.535531737785!2d77.0910565!3d28.673622800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0472b3b66a0d%3A0x67e896cfd98c1c43!2sChhabra%20Marble!5e0!3m2!1sen!2sin!4v1775120929919!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen=""
                loading="lazy"
                data-testid="contact-map"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
