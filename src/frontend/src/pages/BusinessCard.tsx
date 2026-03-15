import { Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { useEffect, useState } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const contactRowCls = "flex items-center gap-3 px-4 py-2.5 rounded-xl";
const contactRowSty = {
  background: "oklch(0.73 0.12 82 / 0.08)",
  border: "1px solid oklch(0.73 0.12 82 / 0.15)",
};
const iconSty = { color: "oklch(0.80 0.12 82)", flexShrink: 0 as const };
const textSty = { color: "oklch(0.93 0.03 88)" };

export default function BusinessCard() {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const linksUrl = `${window.location.origin}/links`;
    const encoded = encodeURIComponent(linksUrl);
    setQrUrl(
      `https://api.qrserver.com/v1/create-qr-code/?data=${encoded}&size=180x180&bgcolor=FFFFFF&color=0A1628&margin=4`,
    );
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center py-10 px-4"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.13 0.06 265) 0%, oklch(0.10 0.04 255) 50%, oklch(0.08 0.03 250) 100%)",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-sm"
      >
        {/* Main Card */}
        <motion.div
          variants={itemVariants}
          className="rounded-3xl overflow-hidden mb-8"
          style={{
            background:
              "linear-gradient(145deg, oklch(0.17 0.05 260), oklch(0.13 0.04 256))",
            border: "1px solid oklch(0.73 0.12 82 / 0.5)",
            boxShadow:
              "0 20px 60px oklch(0.05 0.03 255 / 0.8), inset 0 1px 0 oklch(0.87 0.09 85 / 0.15)",
          }}
        >
          {/* Top gold bar */}
          <div
            className="h-1 w-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.55 0.14 78), oklch(0.87 0.10 85), oklch(0.73 0.12 82), oklch(0.55 0.14 78))",
            }}
          />

          <div className="px-7 py-8 flex flex-col items-center text-center">
            {/* Logo */}
            <motion.div variants={itemVariants} className="mb-5">
              <div
                className="w-32 h-32 rounded-full overflow-hidden mx-auto"
                style={{
                  border: "2px solid oklch(0.73 0.12 82 / 0.6)",
                  boxShadow: "0 0 30px oklch(0.73 0.12 82 / 0.3)",
                }}
              >
                <img
                  src="/assets/uploads/IMG-20260226-WA0022-2--2.jpg"
                  alt="SBZ Enterprises Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Company Name */}
            <motion.h1
              variants={itemVariants}
              className="font-bold text-2xl mb-1 tracking-wider"
              style={{
                color: "oklch(0.87 0.10 85)",
                fontFamily: "'Cinzel Decorative', serif",
                textShadow: "0 0 20px oklch(0.73 0.12 82 / 0.4)",
              }}
            >
              SBZ Enterprises
            </motion.h1>

            {/* Name */}
            <motion.p
              variants={itemVariants}
              className="text-lg font-semibold tracking-wide mb-1"
              style={{ color: "oklch(0.96 0.01 90)" }}
            >
              Suban Shabeen
            </motion.p>

            {/* Title */}
            <motion.p
              variants={itemVariants}
              className="text-sm mb-5"
              style={{ color: "oklch(0.82 0.09 82)", fontStyle: "italic" }}
            >
              Global Agro EXIM Facilitations
            </motion.p>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="w-full mb-5 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.73 0.12 82 / 0.6), transparent)",
              }}
            />

            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="w-full flex flex-col gap-2 mb-5"
            >
              <div className={contactRowCls} style={contactRowSty}>
                <MapPin size={15} style={iconSty} />
                <span className="text-sm font-medium" style={textSty}>
                  Kerala, India
                </span>
              </div>
              <a
                href="tel:+919188520881"
                className={contactRowCls}
                style={contactRowSty}
                data-ocid="contact.phone.link"
              >
                <Phone size={15} style={iconSty} />
                <span className="text-sm font-medium" style={textSty}>
                  +91 9188520881
                </span>
              </a>
              <a
                href="https://wa.me/919188520881"
                target="_blank"
                rel="noopener noreferrer"
                className={contactRowCls}
                style={contactRowSty}
                data-ocid="contact.whatsapp.link"
              >
                <MessageCircle size={15} style={iconSty} />
                <span className="text-sm font-medium" style={textSty}>
                  WhatsApp: +91 9188520881
                </span>
              </a>
              <a
                href="mailto:sbzintl@gmail.com"
                className={contactRowCls}
                style={contactRowSty}
                data-ocid="contact.email.link"
              >
                <Mail size={15} style={iconSty} />
                <span className="text-sm font-medium" style={textSty}>
                  sbzintl@gmail.com
                </span>
              </a>
              <a
                href="https://web.sbze.in"
                target="_blank"
                rel="noopener noreferrer"
                className={contactRowCls}
                style={contactRowSty}
                data-ocid="contact.website.link"
              >
                <Globe size={15} style={iconSty} />
                <span className="text-sm font-medium" style={textSty}>
                  web.sbze.in
                </span>
              </a>
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="w-full mb-5 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.73 0.12 82 / 0.6), transparent)",
              }}
            />

            {/* Single QR Code */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-3 w-full"
            >
              <p
                className="text-xs tracking-widest uppercase font-semibold"
                style={{
                  color: "oklch(0.80 0.12 82)",
                  fontFamily: "'Cinzel', serif",
                }}
              >
                Scan to Connect
              </p>

              <div
                className="p-3 rounded-2xl"
                style={{
                  background: "white",
                  boxShadow:
                    "0 0 0 3px oklch(0.73 0.12 82 / 0.5), 0 8px 30px oklch(0.05 0.03 255 / 0.6)",
                }}
              >
                {qrUrl ? (
                  <img
                    src={qrUrl}
                    alt="QR Code to SBZ Links"
                    width={180}
                    height={180}
                    style={{ display: "block" }}
                  />
                ) : (
                  <div
                    className="flex items-center justify-center"
                    style={{ width: 180, height: 180 }}
                  >
                    <span style={{ color: "#0A1628", fontSize: 12 }}>
                      Loading QR...
                    </span>
                  </div>
                )}
              </div>

              <p
                className="text-xs text-center font-medium"
                style={{ color: "oklch(0.75 0.09 83)" }}
              >
                All links, contacts &amp; divisions inside
              </p>

              <a
                href="/links"
                className="text-xs px-5 py-2 rounded-full font-semibold tracking-wide"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.60 0.14 78), oklch(0.73 0.12 82))",
                  color: "oklch(0.12 0.04 255)",
                  textDecoration: "none",
                }}
                data-ocid="qr.links.button"
              >
                Open Links Page
              </a>
            </motion.div>
          </div>

          {/* Tagline */}
          <div
            className="px-4 py-3 text-center"
            style={{
              background: "oklch(0.73 0.12 82 / 0.08)",
              borderTop: "1px solid oklch(0.73 0.12 82 / 0.2)",
            }}
          >
            <p
              className="text-xs tracking-widest uppercase"
              style={{
                color: "oklch(0.78 0.10 83)",
                fontFamily: "'Cinzel', serif",
              }}
            >
              Facilitating Global Agro Commodity Trade
            </p>
          </div>

          {/* Bottom gold bar */}
          <div
            className="h-1 w-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.55 0.14 78), oklch(0.87 0.10 85), oklch(0.73 0.12 82), oklch(0.55 0.14 78))",
            }}
          />
        </motion.div>

        {/* Footer */}
        <motion.footer variants={itemVariants} className="text-center pb-4">
          <p
            className="text-xs tracking-widest"
            style={{
              color: "oklch(0.50 0.07 82)",
              fontFamily: "'Cinzel', serif",
            }}
          >
            SBZ Enterprises © {new Date().getFullYear()} | Kerala, India
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
