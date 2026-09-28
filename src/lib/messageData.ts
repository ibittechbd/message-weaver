export type Lang = "bn" | "en";

export interface MakerUser {
  id: string;
  name: { bn: string; en: string };
  shop: { bn: string; en: string };
  phone: string;
  email: string;
}

export interface Industry {
  id: string;
  label: { bn: string; en: string };
}

export interface Package {
  id: string;
  name: { bn: string; en: string };
  price: { bn: string; en: string };
}

export const USERS: MakerUser[] = [
  { id: "u1", name: { bn: "রাহাত হোসেন", en: "Rahat Hossain" }, shop: { bn: "রাহাত ফ্যাশন হাউস", en: "Rahat Fashion House" }, phone: "01711-234567", email: "rahat@example.com" },
  { id: "u2", name: { bn: "সাদিয়া আফরিন", en: "Sadia Afrin" }, shop: { bn: "সাদিয়া'স বুটিক", en: "Sadia's Boutique" }, phone: "01812-345678", email: "sadia@example.com" },
  { id: "u3", name: { bn: "তানভীর আহমেদ", en: "Tanvir Ahmed" }, shop: { bn: "গ্যাজেট জোন বিডি", en: "Gadget Zone BD" }, phone: "01913-456789", email: "tanvir@example.com" },
  { id: "u4", name: { bn: "নুসরাত জাহান", en: "Nusrat Jahan" }, shop: { bn: "নুসরাত বিউটি কর্নার", en: "Nusrat Beauty Corner" }, phone: "01614-567890", email: "nusrat@example.com" },
  { id: "u5", name: { bn: "মেহেদী হাসান", en: "Mehedi Hasan" }, shop: { bn: "মেহেদী হোম ডেকোর", en: "Mehedi Home Decor" }, phone: "01515-678901", email: "mehedi@example.com" },
  { id: "u6", name: { bn: "ফারহানা ইসলাম", en: "Farhana Islam" }, shop: { bn: "ফারহানা ফুড কোর্ট", en: "Farhana Food Court" }, phone: "01716-789012", email: "farhana@example.com" },
];

export const INDUSTRIES: Industry[] = [
  { id: "fashion", label: { bn: "ফ্যাশন ও পোশাক", en: "Fashion & Clothing" } },
  { id: "electronics", label: { bn: "ইলেকট্রনিক্স ও গ্যাজেট", en: "Electronics & Gadgets" } },
  { id: "beauty", label: { bn: "সৌন্দর্য ও পরিচর্যা", en: "Beauty & Care" } },
  { id: "food", label: { bn: "খাবার ও রেস্টুরেন্ট", en: "Food & Restaurant" } },
  { id: "home", label: { bn: "গৃহসজ্জা ও ফার্নিচার", en: "Home Decor & Furniture" } },
  { id: "grocery", label: { bn: "মুদি দোকান ও গ্রোসারি", en: "Grocery" } },
];

export const PACKAGES: Package[] = [
  { id: "starter", name: { bn: "স্টার্টার", en: "Starter" }, price: { bn: "৳৯৯৯/মাস", en: "BDT 999/month" } },
  { id: "business", name: { bn: "বিজনেস", en: "Business" }, price: { bn: "৳২,৪৯৯/মাস", en: "BDT 2,499/month" } },
  { id: "pro", name: { bn: "প্রো", en: "Pro" }, price: { bn: "৳৪,৯৯৯/মাস", en: "BDT 4,999/month" } },
  { id: "enterprise", name: { bn: "এন্টারপ্রাইজ", en: "Enterprise" }, price: { bn: "৳৯,৯৯৯/মাস", en: "BDT 9,999/month" } },
];

export const KEYWORDS = ["user", "shop", "industry", "package", "price", "phone", "email"];

export const TEMPLATES: { bn: string; en: string }[] = [
  {
    bn: `প্রিয় {user},
আপনার {shop}-এর জন্য {industry} ক্যাটাগরির অনলাইন দোকান এখন SailPilot-এ মাত্র এক মিনিটেই তৈরি। {package} প্যাকেজ মাত্র {price}।
আমরা যোগাযোগ করব: {phone} / {email}
thesailpilot.com`,
    en: `Dear {user},
Your {industry} online store for {shop} can be live on SailPilot in just one minute. The {package} plan is only {price}.
We'll reach you at {phone} / {email}
thesailpilot.com`,
  },
  {
    bn: `আসসালামু আলাইকুম {user}! 👋
{industry} ব্যবসাকে অনলাইনে আনুন। {shop}-এর জন্য {package} প্ল্যান — {price}।
ফোন: {phone} | ইমেইল: {email}
thesailpilot.com`,
    en: `Hello {user}! 👋
Bring your {industry} business online. The {package} plan for {shop} — {price}.
Phone: {phone} | Email: {email}
thesailpilot.com`,
  },
  {
    bn: `{user}, {shop} বেশ জমছে! 🚀
{industry} পণ্য অনলাইনে বিক্রি করুন SailPilot {package} দিয়ে, মাত্র {price}।
কনফার্মেশন পাঠানো হবে {email}-এ।
thesailpilot.com`,
    en: `{user}, {shop} is growing fast! 🚀
Sell {industry} products online with SailPilot {package}, just {price}.
Confirmation will be sent to {email}.
thesailpilot.com`,
  },
];
