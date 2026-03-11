"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LeadForm({ propertyId }: { propertyId: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    investment_budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const { error } = await supabase.from("leads").insert({
        property_id: propertyId,
        ...form,
      });

      if (error) throw error;
      setStatus("success");
      setForm({ name: "", email: "", phone: "", investment_budget: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-accent-50 border border-accent-500/20 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">Your request has been submitted. Our investment team will contact you shortly.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-1">Request Investment Details</h3>
      <p className="text-sm text-gray-500 mb-6">Fill out the form and our team will get back to you within 24 hours.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            placeholder="+972..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Investment Budget</label>
          <select
            required
            value={form.investment_budget}
            onChange={(e) => setForm({ ...form, investment_budget: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
          >
            <option value="">Select your budget</option>
            <option value="50000-100000">€50,000 - €100,000</option>
            <option value="100000-250000">€100,000 - €250,000</option>
            <option value="250000-500000">€250,000 - €500,000</option>
            <option value="500000+">€500,000+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
            placeholder="Tell us about your investment goals..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Submitting..." : "Submit Request"}
        </button>

        {status === "error" && (
          <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  );
}
