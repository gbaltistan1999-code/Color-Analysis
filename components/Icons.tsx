import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock,
  Contrast,
  Copy,
  Droplet,
  Gift,
  Heart,
  Lock,
  Menu,
  MessageCircle,
  Moon,
  Palette,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  UserX,
  WandSparkles,
  X,
  Zap,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

/** Lucide icons under the project's existing names. Decorative by default (aria-hidden). */
function icon(Icon: LucideIcon, name: string) {
  const Wrapped = (props: LucideProps) => <Icon aria-hidden="true" focusable="false" {...props} />;
  Wrapped.displayName = name;
  return Wrapped;
}

export const IconArrow = icon(ArrowRight, "IconArrow");
export const IconBolt = icon(Zap, "IconBolt");
export const IconBook = icon(BookOpen, "IconBook");
export const IconChat = icon(MessageCircle, "IconChat");
export const IconCheck = icon(Check, "IconCheck");
export const IconChevron = icon(ChevronDown, "IconChevron");
export const IconClock = icon(Clock, "IconClock");
export const IconClose = icon(X, "IconClose");
export const IconContrast = icon(Contrast, "IconContrast");
export const IconCopy = icon(Copy, "IconCopy");
export const IconDrop = icon(Droplet, "IconDrop");
export const IconGift = icon(Gift, "IconGift");
export const IconHeart = icon(Heart, "IconHeart");
export const IconLock = icon(Lock, "IconLock");
export const IconMenu = icon(Menu, "IconMenu");
export const IconMoon = icon(Moon, "IconMoon");
export const IconPalette = icon(Palette, "IconPalette");
export const IconPhone = icon(Smartphone, "IconPhone");
export const IconShield = icon(ShieldCheck, "IconShield");
export const IconSparkle = icon(Sparkles, "IconSparkle");
export const IconSun = icon(Sun, "IconSun");
export const IconUserOff = icon(UserX, "IconUserOff");
export const IconWand = icon(WandSparkles, "IconWand");
