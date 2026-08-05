import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Download, MessageCircle } from "lucide-react";
import contactData from "./data/Contact.json";
import socialsData from "./data/Social.json";

const iconMap = {
  Mail,
  Phone,
  MapPin
};

export default function Contact() {
  const { header, contactInfo, cta } = contactData;

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[var(--bg-secondary)] px-6 py-28 text-[var(--text-primary)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,color-mix(in_srgb,var(--accent-secondary)_12%,transparent),transparent_35%)]" />
      
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] p-10 text-center shadow-[0_10px_40px_-10px_color-mix(in_srgb,var(--accent-glow)_10%,transparent)] backdrop-blur-md"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-[var(--accent-primary)]">
            {header.subtitle}
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            {header.title}
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
            {header.description}
          </p>

          {/* Contact Cards */}
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {contactInfo.map((item, index) => {
              const Icon = iconMap[item.icon] || Mail;
              return (
                <motion.a
                  key={index}
                  href={item.link}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group rounded-2xl border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--bg-primary)_20%,transparent)] p-6 transition hover:border-[color-mix(in_srgb,var(--accent-secondary)_50%,transparent)] hover:bg-[color-mix(in_srgb,var(--text-primary)_10%,transparent)]"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--accent-secondary)_30%,transparent)] bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)] text-[var(--accent-primary)] transition group-hover:bg-[color-mix(in_srgb,var(--accent-secondary)_20%,transparent)]">
                    <Icon size={22} />
                  </div>
                  <h4 className="text-lg font-semibold text-[var(--accent-primary)]">
                    {item.title}
                  </h4>
                  <p className="mt-2 break-all text-[var(--text-secondary)]">
                    {item.value}
                  </p>
                </motion.a>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="mx-auto mt-10 w-fit rounded-2xl border border-[color-mix(in_srgb,var(--text-primary)_40%,transparent)] bg-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] p-6 backdrop-blur-md">
            <div className="flex flex-wrap justify-center gap-6">
              {socialsData.socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="transition"
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="h-8 w-8"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold">
              {cta.title}
            </h3>
            <p className="mt-3 mx-auto max-w-2xl text-[var(--text-muted)] leading-7">
              {cta.description}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.a
                href={cta.button.link}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-secondary)] px-8 py-3 font-semibold text-[var(--bg-primary)] transition hover:bg-[var(--accent-primary)]"
              >
                <MessageCircle size={18} />
                {cta.button.text}
              </motion.a>

              {cta.resume && (
                <motion.a
                  href={cta.resume.link}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--accent-secondary)_60%,transparent)] bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] px-8 py-3 font-semibold text-[var(--accent-primary)] backdrop-blur-md transition hover:bg-[var(--accent-secondary)] hover:text-[var(--bg-primary)]"
                >
                  <Download size={18} />
                  {cta.resume.text}
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}