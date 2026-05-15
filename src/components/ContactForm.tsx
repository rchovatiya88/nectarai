import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Loader2,
} from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    problem: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.problem.trim()) newErrors.problem = "Tell us a bit about your needs";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    try {
      // Simulate API call - in production this hits your backend
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", email: "", company: "", problem: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-green-500/30 bg-green-500/[0.06] p-8 text-center"
      >
        <CheckCircle size={48} className="mx-auto mb-4 text-green-400" />
        <h3 className="mb-2 text-xl font-display font-medium text-white">
          Message received!
        </h3>
        <p className="text-gray-400">
          One of our humans will review your request and get back within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-nectar-honey hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/[0.06] p-3 text-sm text-red-300">
          <AlertCircle size={16} />
          Something went wrong. Please try again.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm text-gray-400">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={`w-full rounded-xl border bg-white/5 px-4 py-3.5 text-white placeholder-gray-600 outline-none transition-colors focus:border-nectar-honey ${
              errors.name ? "border-red-500/50" : "border-white/10"
            }`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-gray-400">Work Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className={`w-full rounded-xl border bg-white/5 px-4 py-3.5 text-white placeholder-gray-600 outline-none transition-colors focus:border-nectar-honey ${
              errors.email ? "border-red-500/50" : "border-white/10"
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-gray-400">Company (optional)</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Acme Inc."
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-600 outline-none transition-colors focus:border-nectar-honey"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-gray-400">
          What do you need help with?
        </label>
        <textarea
          name="problem"
          value={formData.problem}
          onChange={handleChange}
          placeholder="e.g., I spend 10 hours a week on customer support emails..."
          rows={4}
          className={`w-full resize-none rounded-xl border bg-white/5 px-4 py-3.5 text-white placeholder-gray-600 outline-none transition-colors focus:border-nectar-honey ${
            errors.problem ? "border-red-500/50" : "border-white/10"
          }`}
        />
        {errors.problem && <p className="mt-1 text-xs text-red-400">{errors.problem}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-nectar-honey px-8 py-4 font-medium text-nectar-black transition-all hover:bg-nectar-glow disabled:opacity-50"
        style={{ boxShadow: "0 0 24px rgba(245,183,0,0.25)" }}
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <MessageSquare size={18} />
            Book Free AI Consultation
          </>
        )}
      </button>
      <p className="text-center text-xs text-gray-500">No spam. Unsubscribe anytime.</p>
    </form>
  );
}
