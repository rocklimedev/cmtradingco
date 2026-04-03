"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import {
  PHONE_NUMBER,
  PHONE_RAW,
  EMAIL,
  ADDRESS,
  BUSINESS_HOURS,
  heroImages,
} from "@/lib";
import { useCreateQueryMutation } from "@/api/queriesApi";   // ✅ Using queriesApi

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [createQuery, { isLoading }] = useCreateQueryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = `${form.firstName} ${form.lastName}`.trim();

    if (!fullName || !form.email || !form.message) {
      alert("Please fill in all required fields (Name, Email, and Message)");
      return;
    }

    try {
      await createQuery({
        branch: "chhabra_marble",           // ✅ Required for Chhabra Marble
        name: fullName,
        email: form.email,
        subject: "General Inquiry from Contact Form",   // Default subject
        message: form.message,
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
      console.error("Contact form error:", err);
      const errorMsg = err?.data?.message || "Failed to send your message. Please try again.";
      alert(errorMsg);
    }
  };

  return (
    <div data-testid="contact-page">
      {/* Hero Banner */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImages.contact}
            alt="Contact Chhabra Marble"
            className="w-full h-full object-cover"
            fill
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 flex items-end h-full max-w-[1300px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <div>
            <p className="text-xs font-normal tracking-[0.2em] uppercase text-white/70 mb-4">
              Reach Out
            </p>
            <h1
              className="text-4xl sm:text-5xl font-light text-white"
              data-testid="contact-page-title"
            >
              Contact Us
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Details + Form */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <ScrollReveal>
              <div>
                <p className="text-xs font-normal tracking-[0.2em] uppercase text-brand-red mb-8">
                  Showroom Details
                </p>
                <div className="space-y-8">
                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 border border-brand-border flex items-center justify-center flex-shrink-0">
                      <MapPin
                        size={20}
                        strokeWidth={1.5}
                        className="text-brand-red"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-normal text-brand-charcoal mb-1">
                        Address
                      </h4>
                      <p className="text-sm text-brand-body font-light">
                        {ADDRESS}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 border border-brand-border flex items-center justify-center flex-shrink-0">
                      <Phone
                        size={20}
                        strokeWidth={1.5}
                        className="text-brand-red"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-normal text-brand-charcoal mb-1">
                        Phone
                      </h4>
                      <a
                        href={`tel:+${PHONE_RAW}`}
                        className="text-sm text-brand-body font-light hover:text-brand-red transition-colors"
                        data-testid="contact-phone-link"
                      >
                        {PHONE_NUMBER}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 border border-brand-border flex items-center justify-center flex-shrink-0">
                      <Mail
                        size={20}
                        strokeWidth={1.5}
                        className="text-brand-red"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-normal text-brand-charcoal mb-1">
                        Email
                      </h4>
                      <a
                        href={`mailto:${EMAIL}`}
                        className="text-sm text-brand-body font-light hover:text-brand-red transition-colors"
                        data-testid="contact-email-link"
                      >
                        {EMAIL}
                      </a>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 border border-brand-border flex items-center justify-center flex-shrink-0">
                      <Clock
                        size={20}
                        strokeWidth={1.5}
                        className="text-brand-red"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-normal text-brand-charcoal mb-1">
                        Business Hours
                      </h4>
                      <p className="text-sm text-brand-body font-light">
                        {BUSINESS_HOURS}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <a
                    href={`https://wa.me/${PHONE_RAW}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="contact-whatsapp-btn"
                    className="inline-flex items-center gap-3 bg-brand-red text-white px-8 py-3.5 text-sm font-semibold tracking-wide hover:bg-red-700 transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={2}>
              {submitted ? (
                <div
                  data-testid="contact-page-success"
                  className="flex items-center justify-center h-full border border-brand-border p-12"
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-normal text-brand-charcoal mb-3">
                      Thank You
                    </h3>
                    <p className="text-brand-body font-light mb-6">
                      Your message has been sent. We'll get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      data-testid="send-another-btn"
                      className="text-sm text-brand-red tracking-widest uppercase hover:text-red-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  data-testid="contact-page-form"
                  className="space-y-6"
                >
                  <p className="text-xs font-normal tracking-[0.2em] uppercase text-brand-red mb-4">
                    Send A Message
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  </div>

                  <input
                    type="tel"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-brand-border text-brand-charcoal placeholder:text-brand-muted font-light focus:outline-none focus:border-brand-red transition-colors"
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-brand-border text-brand-charcoal placeholder:text-brand-muted font-light focus:outline-none focus:border-brand-red transition-colors"
                  />

                  <textarea
                    placeholder="Message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-brand-border text-brand-charcoal placeholder:text-brand-muted font-light focus:outline-none focus:border-brand-red transition-colors resize-none"
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-brand-red text-white px-10 py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors duration-300 disabled:opacity-50"
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section>
        <ScrollReveal>
          <div
            data-testid="contact-page-map"
            className="w-full h-[400px] md:h-[500px]"
          >
            <iframe
              title="Chhabra Marble Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.535531737785!2d77.0910565!3d28.673622800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0472b3b66a0d%3A0x67e896cfd98c1c43!2sChhabra%20Marble!5e0!3m2!1sen!2sin!4v1775120929919!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}