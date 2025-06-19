import { Montserrat, Oi } from 'next/font/google'

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const oi = Oi({ subsets: ['latin'], weight: '400' })
