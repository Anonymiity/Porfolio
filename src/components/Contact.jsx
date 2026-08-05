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
      className="relative overflow-hidden bg-[#070d1a] px-6 py-28 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_35%)]" />
      
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center shadow-2xl shadow-cyan-500/10 backdrop-blur-md"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">
            {header.subtitle}
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            {header.title}
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg leading-8 text-gray-400">
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
                  className="group rounded-2xl border border-white/10 bg-black/20 p-6 transition hover:border-cyan-400/50 hover:bg-white/10"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 transition group-hover:bg-cyan-400/20">
                    <Icon size={22} />
                  </div>
                  <h4 className="text-lg font-semibold text-cyan-300">
                    {item.title}
                  </h4>
                  <p className="mt-2 break-all text-gray-300">
                    {item.value}
                  </p>
                </motion.a>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="mx-auto mt-10 w-fit rounded-2xl border border-white/40 bg-white/10 p-6 backdrop-blur-md">
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
            <p className="mt-3 mx-auto max-w-2xl text-gray-400 leading-7">
              {cta.description}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.a
                href={cta.button.link}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-8 py-3 font-semibold text-black transition hover:bg-cyan-300"
              >
                <MessageCircle size={18} />
                {cta.button.text}
              </motion.a>

              {cta.resume && (
                <motion.a
                  href={cta.resume.link}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-400/60 bg-white/5 px-8 py-3 font-semibold text-cyan-300 backdrop-blur-md transition hover:bg-cyan-400 hover:text-black"
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