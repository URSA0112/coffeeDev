
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Энэ функц className-ийг хялбар болгодог
// - `clsx` → нөхцөлтэйгөөр class нэмэхэд тусална (жишээ нь: isDark && "bg-black")
// - `twMerge` → зөрчилдөж байгаа tailwind class-уудыг цэвэрлэнэ (жишээ нь: "px-4 px-2" бол зөвхөн нэгийг үлдээнэ)
// Tailwind CSS ашиглахад кодыг илүү цэвэрхэн, аюулгүй болгодог
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

