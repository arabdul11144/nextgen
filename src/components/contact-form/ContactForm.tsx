"use client";

import { useState } from "react";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import styles from "./ContactForm.module.css";

const requiredText = "This field is required.";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    industry: "",
    quantity: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    const next: Record<string, boolean> = {};
    if (!values.name.trim()) next.name = true;
    if (!values.email.trim()) next.email = true;
    if (!values.service) next.service = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className={styles.success}>
        <span className={styles.successMark} aria-hidden="true">
          ✓
        </span>
        <h3 className={styles.successTitle}>Thank you — request received.</h3>
        <p className={styles.successText}>
          Our team has received your enquiry for a quote. We&apos;ll be in
          touch shortly to discuss your requirements and next steps.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Name <span className={styles.req}>*</span>
          </label>
          <input
            id="name"
            name="name"
            className={styles.input}
            value={values.name}
            onChange={handleChange}
            aria-invalid={errors.name || undefined}
            placeholder="Your name"
          />
          {errors.name && <span className={styles.error}>{requiredText}</span>}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="company">
            Company / Organisation
          </label>
          <input
            id="company"
            name="company"
            className={styles.input}
            value={values.company}
            onChange={handleChange}
            placeholder="Company name"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email <span className={styles.req}>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.input}
            value={values.email}
            onChange={handleChange}
            aria-invalid={errors.email || undefined}
            placeholder="erick_omar@gmail.com"
          />
          {errors.email && <span className={styles.error}>{requiredText}</span>}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            className={styles.input}
            value={values.phone}
            onChange={handleChange}
            placeholder="Phone number"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="service">
            Service of interest <span className={styles.req}>*</span>
          </label>
          <select
            id="service"
            name="service"
            className={styles.input}
            value={values.service}
            onChange={handleChange}
            aria-invalid={errors.service || undefined}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
            <option value="multiple">Multiple / Not sure yet</option>
          </select>
          {errors.service && (
            <span className={styles.error}>{requiredText}</span>
          )}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="industry">
            Industry
          </label>
          <select
            id="industry"
            name="industry"
            className={styles.input}
            value={values.industry}
            onChange={handleChange}
          >
            <option value="">Select an industry</option>
            {industries.map((industry) => (
              <option key={industry.slug} value={industry.slug}>
                {industry.name}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="quantity">
          Approximate quantity
        </label>
        <input
          id="quantity"
          name="quantity"
          className={styles.input}
          value={values.quantity}
          onChange={handleChange}
          placeholder="e.g. 50 shirts"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">
          Tell us about your requirements
        </label>
        <textarea
          id="message"
          name="message"
          className={`${styles.input} ${styles.textarea}`}
          value={values.message}
          onChange={handleChange}
          rows={4}
          placeholder="Colours, branding, sizing, timelines or anything else we should know"
        />
      </div>

      <button type="submit" className={styles.submit}>
        Request a Quote
        <span className={styles.submitArrow} aria-hidden="true">
          →
        </span>
      </button>
    </form>
  );
}
