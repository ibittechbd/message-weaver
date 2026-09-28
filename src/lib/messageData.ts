export interface MakerUser {
  id: string;
  name: string;
  shop: string;
}

export interface Industry {
  id: string;
  label: string;
}

export const USERS: MakerUser[] = [
  { id: "u1", name: "রাহাত হোসেন", shop: "রাহাত ফ্যাশন হাউস" },
  { id: "u2", name: "সাদিয়া আফরিন", shop: "সাদিয়া'স বুটিক" },
  { id: "u3", name: "তানভীর আহমেদ", shop: "গ্যাজেট জোন বিডি" },
  { id: "u4", name: "নুসরাত জাহান", shop: "নুসরাত বিউটি কর্নার" },
  { id: "u5", name: "মেহেদী হাসান", shop: "মেহেদী হোম ডেকোর" },
  { id: "u6", name: "ফারহানা ইসলাম", shop: "ফারহানা ফুড কোর্ট" },
  { id: "u7", name: "আরিফুল ইসলাম", shop: "আরিফ ট্রেডার্স" },
  { id: "u8", name: "শারমিন আক্তার", shop: "শারমিন কিডস ওয়ার্ল্ড" },
];

export const INDUSTRIES: Industry[] = [
  { id: "fashion", label: "ফ্যাশন ও পোশাক" },
  { id: "electronics", label: "ইলেকট্রনিক্স ও গ্যাজেট" },
  { id: "beauty", label: "সৌন্দর্য ও পরিচর্যা" },
  { id: "food", label: "খাবার ও রেস্টুরেন্ট" },
  { id: "home", label: "গৃহসজ্জা ও ফার্নিচার" },
  { id: "kids", label: "কিডস ও খেলনা" },
  { id: "grocery", label: "মুদি দোকান ও গ্রোসারি" },
];

/**
 * Message templates. {user}, {shop} and {industry} are replaced in real time
 * from the selected user/industry; the Generate button cycles the variation.
 */
export const TEMPLATES: string[] = [
  `প্রিয় {user},
আপনার {shop}-এর জন্য {industry} ক্যাটাগরির অনলাইন দোকান এখন SailPilot-এ মাত্র এক মিনিটেই তৈরি — কোনো কোডিং ছাড়াই। আজই শুরু করুন!
thesailpilot.com`,
  `আসসালামু আলাইকুম {user}! 👋
{industry} ব্যবসাকে অনলাইনে নিয়ে আসার সময় এখন। SailPilot দিয়ে {shop}-এর নিজস্ব ওয়েবসাইট খুলুন মাত্র ৬০ সেকেন্ডে।
বিস্তারিত: thesailpilot.com`,
  `{user}, শুনেছি {shop} বেশ জমছে! 🚀
{industry} পণ্য অনলাইনে বিক্রি করতে SailPilot-এর চেয়ে সহজ কিছু নেই — সাইট তৈরি, পেমেন্ট আর ডেলিভারি সব এক জায়গায়।
শুরু করুন: thesailpilot.com`,
  `মাত্র এক মিনিটেই ইকমার্স! ⛵
{user}, আপনার {shop}-এর {industry} পণ্যগুলো এখন সারা বাংলাদেশে পৌঁছে দিন SailPilot-এর রেডিমেড অনলাইন দোকান দিয়ে।
thesailpilot.com`,
];
