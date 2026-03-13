import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { useNavigate } from "react-router-dom";

const divisions = [
  {
    id: 1,
    name: "Rice Division",
    url: "https://rice.sbze.in",
    display: "rice.sbze.in",
    desc: "Premium Basmati, Raw Rice & Specialty Rice Exports to global markets",
    emoji: "🌾",
    tag: "Grains & Cereals",
    highlights: [
      "Basmati Long Grain",
      "Raw & Parboiled",
      "Global Export Ready",
    ],
  },
  {
    id: 2,
    name: "Cashew Division",
    url: "https://kaju.sbze.in",
    display: "kaju.sbze.in",
    desc: "W180, W210, W240 Grade Premium Cashew Nuts — Export Quality",
    emoji: "🥜",
    tag: "Nuts & Dry Fruits",
    highlights: ["W180 / W210 / W240", "Export Grade", "Certified Quality"],
  },
  {
    id: 3,
    name: "Sunflower Oil Division",
    url: "https://sunvia.sbze.in",
    display: "sunvia.sbze.in",
    desc: "Refined & Crude Sunflower Oil — Bulk Commodity Exports",
    emoji: "🌻",
    tag: "Edible Oils",
    highlights: ["Refined Sunflower", "Crude SFO", "Bulk Shipments"],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Portfolio() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen navy-texture flex flex-col items-center py-10 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg"
      >
        {/* Back */}
        <motion.button
          variants={itemVariants}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm transition-all"
          style={{
            color: "oklch(0.73 0.12 82)",
            border: "1px solid oklch(0.73 0.12 82 / 0.3)",
            background: "oklch(0.73 0.12 82 / 0.08)",
          }}
          data-ocid="nav.back.button"
        >
          <ArrowLeft size={14} />
          Back to Card
        </motion.button>

        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <img
            src="/assets/generated/sbz-shield-logo-transparent.dim_300x300.png"
            alt="SBZ Enterprises"
            className="w-20 h-20 mx-auto mb-4 object-contain"
            style={{
              filter: "drop-shadow(0 0 16px oklch(0.73 0.12 82 / 0.4))",
            }}
          />
          <h1 className="font-cinzel-deco font-bold text-2xl mb-1 gold-text">
            SBZ Trade Portfolio
          </h1>
          <p
            className="font-crimson italic text-sm"
            style={{ color: "oklch(0.65 0.06 82)" }}
          >
            Global Agro Commodity Exports
          </p>
          <div className="gold-divider mt-5" />
        </motion.div>

        {/* Division Cards */}
        <motion.div
          variants={containerVariants}
          className="flex flex-col gap-5 mb-10"
        >
          {divisions.map((div) => (
            <motion.div
              key={div.id}
              variants={itemVariants}
              className="rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(145deg, oklch(0.18 0.05 258), oklch(0.14 0.04 252))",
                border: "1px solid oklch(0.73 0.12 82 / 0.4)",
                boxShadow:
                  "0 12px 40px oklch(0.08 0.03 255 / 0.7), inset 0 1px 0 oklch(0.87 0.09 85 / 0.1)",
              }}
              data-ocid={`portfolio.division.card.${div.id}`}
            >
              <div
                className="h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.73 0.12 82 / 0.6), transparent)",
                }}
              />
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                    style={{
                      background: "oklch(0.73 0.12 82 / 0.1)",
                      border: "1px solid oklch(0.73 0.12 82 / 0.25)",
                    }}
                  >
                    {div.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className="font-cinzel font-semibold text-base"
                        style={{ color: "oklch(0.87 0.09 85)" }}
                      >
                        {div.name}
                      </h3>
                      <span
                        className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-cinzel"
                        style={{
                          background: "oklch(0.73 0.12 82 / 0.12)",
                          border: "1px solid oklch(0.73 0.12 82 / 0.3)",
                          color: "oklch(0.73 0.12 82)",
                        }}
                      >
                        {div.tag}
                      </span>
                    </div>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "oklch(0.65 0.05 85)" }}
                    >
                      {div.desc}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {div.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs px-2.5 py-1 rounded-lg"
                      style={{
                        background: "oklch(0.22 0.05 258)",
                        color: "oklch(0.70 0.06 85)",
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <a
                  href={div.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.73 0.12 82), oklch(0.68 0.14 78))",
                    color: "oklch(0.14 0.044 255)",
                    boxShadow: "0 4px 16px oklch(0.73 0.12 82 / 0.25)",
                  }}
                  data-ocid={`portfolio.division.button.${div.id}`}
                >
                  Visit Website
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Ivory Coast panel */}
        <motion.div
          variants={itemVariants}
          className="mb-8 p-4 rounded-2xl"
          style={{
            background: "oklch(0.73 0.12 82 / 0.06)",
            border: "1px solid oklch(0.73 0.12 82 / 0.2)",
          }}
          data-ocid="portfolio.ivc.panel"
        >
          <p
            className="font-cinzel text-xs tracking-widest uppercase mb-1"
            style={{ color: "oklch(0.73 0.12 82)" }}
          >
            🌍 Ivory Coast Commodities
          </p>
          <p className="text-sm" style={{ color: "oklch(0.65 0.05 85)" }}>
            West Africa trade operations covering cocoa, commodities and
            regional procurement.
          </p>
          <a
            href="https://ivc.sbze.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold"
            style={{ color: "oklch(0.73 0.12 82)" }}
            data-ocid="portfolio.ivc.link"
          >
            ivc.sbze.in <ArrowUpRight size={12} />
          </a>
        </motion.div>

        {/* Footer */}
        <motion.footer variants={itemVariants} className="text-center pb-4">
          <p
            className="font-cinzel text-xs tracking-widest"
            style={{ color: "oklch(0.40 0.05 82)" }}
          >
            SBZ Enterprises © {new Date().getFullYear()} | Kerala, India
          </p>
          <p className="text-xs mt-2" style={{ color: "oklch(0.35 0.04 255)" }}>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "oklch(0.50 0.06 82)" }}
              data-ocid="footer.caffeine.link"
            >
              caffeine.ai
            </a>
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
