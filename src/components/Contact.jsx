import React from "react";
import contactData from "../components/data/contact.json";
import socialsData from "../components/data/Social.json";

export default function Contact() {
  const { header, cta } = contactData;

  return (
    <section
      id="contact"
      className="bg-[#070d1a] px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center">

        {/* Header */}

        <h2 className="text-4xl font-bold">
          {header.subtitle}
        </h2>

        <h3 className="mt-4 text-2xl font-semibold text-cyan-300">
          {header.title}
        </h3>

        <p className="mt-4 max-w-3xl mx-auto text-gray-400">
          {header.description}
        </p>

        {/* Contact Cards */}

        <div className="mt-10 grid gap-5 md:grid-cols-3">

          {contactData.contactInfo.map((item, index) => (

            <a
              key={index}
              href={item.link}
              className="rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-cyan-400/50 hover:bg-white/10"
            >

              <h4 className="text-lg font-semibold text-cyan-300">
                {item.title}
              </h4>

              <p className="mt-2 break-all text-gray-300">
                {item.value}
              </p>

            </a>

          ))}

        </div>

        {/* Social Links */}
        <div className="mx-auto mt-10 w-fit rounded-2xl border border-white/40 bg-white/10 p-6 backdrop-blur-md">
          <div className="flex flex-wrap justify-center gap-6">
            {socialsData.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                className="transition duration-300 hover:scale-110"
              >
                <img
                  src={social.icon}
                  alt={social.name}
                  className="h-8 w-8"
                />
              </a>
            ))}
          </div>
        </div>
        {/* CTA */}

        <div className="mt-12">

          <h3 className="text-2xl font-semibold">
            {cta.title}
          </h3>

          <p className="mt-3 mx-auto max-w-2xl text-gray-400">
            {cta.description}
          </p>

          <a
            href="https://wa.me/919033011285?text=Hello%20Tanush,%20I%20would%20like%20to%20get%20in%20touch%20with%20you."
            className="mt-8 inline-block rounded-full bg-cyan-400 px-8 py-3 font-semibold text-black transition hover:bg-cyan-300"
          >
            {cta.button.text}
          </a>

        </div>

      </div>
    </section>
  );
}