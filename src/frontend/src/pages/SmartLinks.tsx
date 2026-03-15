import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Loader2,
  Mail,
  MessageCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useActor } from "../hooks/useActor";

const VCARD = `BEGIN:VCARD
VERSION:3.0
FN:Suban Shabeen
ORG:SBZ Enterprises
TITLE:Global Agro EXIM Facilitations
TEL;TYPE=CELL:+919188520881
EMAIL:sbzintl@gmail.com
URL:https://web.sbze.in
ADR;TYPE=WORK:;;Kerala;India
END:VCARD`;

const EMOJI_RULES: [RegExp, string][] = [
  [/rice|basmati|grain/i, "🌾"],
  [/cashew|kaju|nut/i, "🥜"],
  [/sunflower|sunvia|edible oil|palm oil/i, "🌻"],
  [/africa|ivory|coast|\bivc\b/i, "🌍"],
  [/website|corporate|hub|\bmain\b/i, "🌐"],
  [/wheat|flour/i, "🌾"],
  [/spice|pepper/i, "🌶️"],
  [/sugar|sweet/i, "🍬"],
  [/cotton|textile/i, "🧵"],
  [/palm|coconut/i, "🌴"],
  [/tea|coffee/i, "☕"],
  [/fish|seafood|aqua/i, "🐟"],
  [/fruit|mango|banana/i, "🍋"],
  [/vegetable|tomato|onion/i, "🥦"],
  [/trade|export|import|exim/i, "📦"],
  [/finance|bank|payment/i, "💳"],
  [/news|blog|media/i, "📰"],
  [/contact|phone|call/i, "📞"],
  [/social|instagram|facebook|linkedin|twitter/i, "📱"],
  [/youtube|video/i, "🎬"],
  [/map|location|address/i, "📍"],
  [/shop|store|market/i, "🛒"],
  [/logistics|\bship/i, "🚢"],
  [/\boil\b/i, "🫙"],
  [/\bweb\b/i, "🌐"],
];

function getEmojiFromText(name: string, desc: string): string {
  const combined = `${name} ${desc}`;
  for (const [regex, emoji] of EMOJI_RULES) {
    if (regex.test(combined)) return emoji;
  }
  return "🔗";
}

type LinkItem = {
  id: bigint;
  name: string;
  url: string;
  desc: string;
  emoji: string;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function SmartLinks() {
  const navigate = useNavigate();
  const { actor, isFetching } = useActor();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newEmoji, setNewEmoji] = useState("");
  const [adminPin, setAdminPin] = useState("");
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const previewEmoji = getEmojiFromText(newName, newDesc);
  const displayEmoji = newEmoji.trim() || previewEmoji;

  const loadLinks = useCallback(async () => {
    if (!actor) return;
    try {
      const result = await actor.getAllLinks();
      setLinks(result);
    } catch (_e) {
      console.error("Failed to load links", _e);
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    if (!isFetching && actor) {
      loadLinks();
    }
  }, [actor, isFetching, loadLinks]);

  const addLink = async () => {
    if (!newName.trim() || !newUrl.trim() || !actor) return;
    const url = newUrl.startsWith("http") ? newUrl : `https://${newUrl}`;
    const emoji =
      newEmoji.trim() || getEmojiFromText(newName.trim(), newDesc.trim());
    setActionLoading(true);
    setActionError("");
    try {
      const ok = await actor.addLinkWithPin(
        newName.trim(),
        url,
        newDesc.trim() || "Visit link",
        emoji,
        adminPin,
      );
      if (ok) {
        await loadLinks();
        setNewName("");
        setNewUrl("");
        setNewDesc("");
        setNewEmoji("");
      } else {
        setActionError("Failed to add link. Check PIN.");
      }
    } catch (_e) {
      setActionError("Error adding link. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const removeLink = async (id: bigint) => {
    if (!actor) return;
    setActionLoading(true);
    setActionError("");
    try {
      const ok = await actor.removeLinkWithPin(id, adminPin);
      if (ok) {
        await loadLinks();
      } else {
        setActionError("Failed to remove link. Check PIN.");
      }
    } catch (_e) {
      setActionError("Error removing link. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const downloadVCard = () => {
    const blob = new Blob([VCARD], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SubanShabeen_SBZ.vcf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const unlockAdmin = () => {
    if (adminPin === "sbz2024") {
      setPinUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

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
        className="w-full max-w-md"
      >
        {/* Back button */}
        <motion.button
          variants={itemVariants}
          onClick={() => navigate({ to: "/" })}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm"
          style={{
            color: "oklch(0.87 0.09 85)",
            border: "1px solid oklch(0.73 0.12 82 / 0.4)",
            background: "oklch(0.73 0.12 82 / 0.10)",
          }}
          data-ocid="nav.back.button"
        >
          <ArrowLeft size={14} /> Back to Card
        </motion.button>

        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div
            className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4"
            style={{
              border: "2px solid oklch(0.73 0.12 82 / 0.6)",
              boxShadow: "0 0 24px oklch(0.73 0.12 82 / 0.3)",
            }}
          >
            <img
              src="/assets/uploads/IMG-20260226-WA0022-2--2.jpg"
              alt="SBZ Enterprises"
              className="w-full h-full object-cover"
            />
          </div>
          <h1
            className="font-bold text-2xl mb-1"
            style={{
              color: "oklch(0.87 0.10 85)",
              fontFamily: "'Cinzel Decorative', serif",
            }}
          >
            SBZ Enterprises
          </h1>
          <p
            className="text-sm font-semibold mb-1"
            style={{ color: "oklch(0.95 0.01 90)" }}
          >
            Suban Shabeen
          </p>
          <p className="text-xs" style={{ color: "oklch(0.78 0.09 83)" }}>
            Global Agro EXIM Facilitations · Kerala, India
          </p>
        </motion.div>

        {/* Save Contact Button */}
        <motion.div variants={itemVariants} className="mb-6">
          <button
            type="button"
            onClick={downloadVCard}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl font-bold text-sm transition-all"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.60 0.14 78), oklch(0.80 0.12 83))",
              color: "oklch(0.10 0.04 255)",
              boxShadow: "0 4px 20px oklch(0.60 0.14 78 / 0.4)",
              fontSize: "0.95rem",
            }}
            data-ocid="contact.save.button"
          >
            <Download size={16} />
            Save Contact to Phone
          </button>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="mb-5 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.73 0.12 82 / 0.5), transparent)",
          }}
        />

        {/* Division Links */}
        <motion.div variants={itemVariants}>
          <p
            className="text-xs tracking-widest uppercase font-semibold mb-3 text-center"
            style={{
              color: "oklch(0.78 0.10 83)",
              fontFamily: "'Cinzel', serif",
            }}
          >
            Our Divisions
          </p>
        </motion.div>

        {loading || isFetching ? (
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 py-10"
            style={{ color: "oklch(0.73 0.12 82 / 0.7)" }}
            data-ocid="links.loading_state"
          >
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">Loading links...</span>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            className="flex flex-col gap-2.5 mb-6"
          >
            {links.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-8"
                style={{ color: "oklch(0.55 0.07 82)" }}
                data-ocid="links.empty_state"
              >
                <p className="text-sm">No links yet.</p>
              </motion.div>
            ) : (
              links.map((div, i) => (
                <motion.a
                  key={String(div.id)}
                  variants={itemVariants}
                  href={div.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl group"
                  style={{
                    background: "oklch(0.17 0.05 260)",
                    border: "1px solid oklch(0.73 0.12 82 / 0.25)",
                    textDecoration: "none",
                  }}
                  data-ocid={`links.division.item.${i + 1}`}
                >
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                    style={{
                      background: "oklch(0.73 0.12 82 / 0.12)",
                      border: "1px solid oklch(0.73 0.12 82 / 0.25)",
                    }}
                  >
                    {div.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-bold"
                      style={{ color: "oklch(0.92 0.05 88)" }}
                    >
                      {div.name}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "oklch(0.68 0.07 82)" }}
                    >
                      {div.desc}
                    </p>
                    <p
                      className="text-xs mt-0.5 font-mono"
                      style={{ color: "oklch(0.58 0.09 82)" }}
                    >
                      {div.url.replace("https://", "")}
                    </p>
                  </div>
                  <ExternalLink
                    size={14}
                    className="flex-shrink-0"
                    style={{ color: "oklch(0.73 0.12 82 / 0.6)" }}
                  />
                </motion.a>
              ))
            )}
          </motion.div>
        )}

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="mb-5 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.73 0.12 82 / 0.5), transparent)",
          }}
        />

        {/* Contact Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 mb-8"
        >
          <p
            className="text-xs tracking-widest uppercase font-semibold text-center mb-1"
            style={{
              color: "oklch(0.78 0.10 83)",
              fontFamily: "'Cinzel', serif",
            }}
          >
            Get in Touch
          </p>
          <a
            href="https://wa.me/919188520881"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 py-3.5 rounded-2xl font-bold text-sm"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.42 0.18 145), oklch(0.35 0.16 142))",
              color: "white",
              boxShadow: "0 4px 20px oklch(0.38 0.16 142 / 0.35)",
              textDecoration: "none",
            }}
            data-ocid="links.whatsapp.button"
          >
            <MessageCircle size={16} /> WhatsApp: +91 9188520881
          </a>
          <a
            href="mailto:sbzintl@gmail.com"
            className="flex items-center justify-center gap-3 py-3.5 rounded-2xl font-bold text-sm"
            style={{
              background: "oklch(0.73 0.12 82 / 0.12)",
              border: "1.5px solid oklch(0.73 0.12 82 / 0.55)",
              color: "oklch(0.90 0.07 86)",
              textDecoration: "none",
            }}
            data-ocid="links.email.button"
          >
            <Mail size={16} style={{ color: "oklch(0.80 0.12 82)" }} />{" "}
            sbzintl@gmail.com
          </a>
        </motion.div>

        {/* Manage Links Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <button
            type="button"
            onClick={() => setShowAdmin(!showAdmin)}
            className="w-full py-2.5 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all"
            style={{
              color: "oklch(0.55 0.07 82)",
              border: "1px solid oklch(0.55 0.07 82 / 0.25)",
              background: "oklch(0.55 0.07 82 / 0.05)",
            }}
            data-ocid="admin.toggle.button"
          >
            {showAdmin ? "Hide" : "Manage Links"}
          </button>

          {showAdmin && (
            <div
              className="mt-4 p-5 rounded-2xl"
              style={{
                background: "oklch(0.17 0.05 260)",
                border: "1px solid oklch(0.73 0.12 82 / 0.2)",
              }}
            >
              {!pinUnlocked ? (
                <div className="flex flex-col gap-3">
                  <p
                    className="text-xs text-center font-semibold"
                    style={{ color: "oklch(0.78 0.10 83)" }}
                  >
                    Enter admin PIN to manage links
                  </p>
                  <input
                    type="password"
                    placeholder="Admin PIN"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && unlockAdmin()}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{
                      background: "oklch(0.12 0.04 260)",
                      border: `1px solid ${
                        pinError
                          ? "oklch(0.55 0.18 25)"
                          : "oklch(0.73 0.12 82 / 0.3)"
                      }`,
                      color: "oklch(0.93 0.03 88)",
                    }}
                    data-ocid="admin.pin.input"
                  />
                  {pinError && (
                    <p
                      className="text-xs text-center"
                      style={{ color: "oklch(0.65 0.18 25)" }}
                    >
                      Incorrect PIN
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={unlockAdmin}
                    className="py-2.5 rounded-xl text-sm font-bold"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.60 0.14 78), oklch(0.80 0.12 83))",
                      color: "oklch(0.10 0.04 255)",
                    }}
                    data-ocid="admin.unlock.button"
                  >
                    Unlock
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <p
                    className="text-xs font-bold uppercase tracking-widest text-center"
                    style={{ color: "oklch(0.80 0.12 82)" }}
                  >
                    Add New Link
                  </p>
                  <input
                    type="text"
                    placeholder="Link name (e.g. New Division)"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{
                      background: "oklch(0.12 0.04 260)",
                      border: "1px solid oklch(0.73 0.12 82 / 0.3)",
                      color: "oklch(0.93 0.03 88)",
                    }}
                    data-ocid="admin.name.input"
                  />
                  <input
                    type="text"
                    placeholder="URL (e.g. https://example.com)"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{
                      background: "oklch(0.12 0.04 260)",
                      border: "1px solid oklch(0.73 0.12 82 / 0.3)",
                      color: "oklch(0.93 0.03 88)",
                    }}
                    data-ocid="admin.url.input"
                  />
                  {/* Description + live emoji preview */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Description (optional)"
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="w-full px-4 py-2.5 pr-14 rounded-xl text-sm outline-none"
                      style={{
                        background: "oklch(0.12 0.04 260)",
                        border: "1px solid oklch(0.73 0.12 82 / 0.3)",
                        color: "oklch(0.93 0.03 88)",
                      }}
                      data-ocid="admin.desc.input"
                    />
                    <div
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-lg select-none"
                      style={{
                        background: "oklch(0.73 0.12 82 / 0.15)",
                        border: "1px solid oklch(0.73 0.12 82 / 0.3)",
                        transition: "all 0.2s",
                      }}
                      title="Icon that will be used for this link"
                    >
                      {displayEmoji}
                    </div>
                  </div>
                  {/* Emoji override */}
                  <input
                    type="text"
                    placeholder="Emoji override (optional, e.g. 🌿)"
                    value={newEmoji}
                    onChange={(e) => setNewEmoji(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{
                      background: "oklch(0.12 0.04 260)",
                      border: "1px solid oklch(0.73 0.12 82 / 0.3)",
                      color: "oklch(0.93 0.03 88)",
                    }}
                    data-ocid="admin.emoji.input"
                  />
                  <p
                    className="text-xs -mt-2 px-1"
                    style={{ color: "oklch(0.60 0.07 82)" }}
                  >
                    Icon auto-detected · type an emoji above to override
                  </p>

                  {actionError && (
                    <p
                      className="text-xs text-center"
                      style={{ color: "oklch(0.65 0.18 25)" }}
                      data-ocid="admin.error_state"
                    >
                      {actionError}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={addLink}
                    disabled={actionLoading}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold disabled:opacity-60"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.60 0.14 78), oklch(0.80 0.12 83))",
                      color: "oklch(0.10 0.04 255)",
                    }}
                    data-ocid="admin.add.button"
                  >
                    {actionLoading ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Plus size={14} />
                    )}
                    Add Link
                  </button>

                  <div
                    className="h-px mt-1"
                    style={{ background: "oklch(0.73 0.12 82 / 0.2)" }}
                  />

                  <p
                    className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: "oklch(0.60 0.07 82)" }}
                  >
                    Manage Existing
                  </p>
                  {links.map((l, i) => (
                    <div
                      key={String(l.id)}
                      className="flex items-center gap-3 py-2 border-b"
                      style={{ borderColor: "oklch(0.73 0.12 82 / 0.1)" }}
                    >
                      <span className="text-base flex-shrink-0" title={l.emoji}>
                        {l.emoji}
                      </span>
                      <span
                        className="text-sm flex-1 truncate"
                        style={{ color: "oklch(0.85 0.05 88)" }}
                      >
                        {l.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeLink(l.id)}
                        disabled={actionLoading}
                        className="p-1.5 rounded-lg disabled:opacity-60"
                        style={{
                          color: "oklch(0.60 0.18 25)",
                          background: "oklch(0.55 0.18 25 / 0.10)",
                        }}
                        data-ocid={`admin.delete.button.${i + 1}`}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.footer variants={itemVariants} className="text-center pb-4">
          <p
            className="text-xs tracking-widest"
            style={{
              color: "oklch(0.42 0.05 82)",
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
