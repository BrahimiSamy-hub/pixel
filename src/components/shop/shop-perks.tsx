import { Banknote, MessageCircle, Truck } from 'lucide-react'
import { useTranslations } from 'next-intl'

const perks = [
  { key: 'delivery', Icon: Truck },
  { key: 'cod', Icon: Banknote },
  { key: 'support', Icon: MessageCircle },
] as const

export function ShopPerks() {
  const t = useTranslations('Shop.perks')
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(15rem,100%),1fr))] gap-px overflow-hidden rounded-tile border border-line bg-line">
      {perks.map(({ key, Icon }) => (
        <li key={key} className="flex items-center gap-4 bg-ink px-6 py-5.5">
          <Icon size={26} strokeWidth={1.8} className="shrink-0 text-orange" aria-hidden />
          <span>
            <strong className="block font-semibold">{t(`${key}.title`)}</strong>
            <span className="text-sm text-mist">{t(`${key}.text`)}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
