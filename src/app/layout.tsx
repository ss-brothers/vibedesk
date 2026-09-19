import type { Metadata } from 'next'
import { Space_Mono, Orbitron, Caveat, Creepster, Cinzel, Press_Start_2P, Chakra_Petch, Amatic_SC, Lora, Quicksand, Rubik_Glitch, Nosifer, Eater, Rye, Kalam, Yatra_One, Shrikhand, Bangers, Silkscreen, Uncial_Antiqua } from 'next/font/google'
import './globals.css'

const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-space' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' })
const creepster = Creepster({ weight: '400', subsets: ['latin'], variable: '--font-creepster' })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' })
const pressStart = Press_Start_2P({ weight: '400', subsets: ['latin'], variable: '--font-press-start' })
const chakraPetch = Chakra_Petch({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-chakra' })
const amatic = Amatic_SC({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-amatic' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })
const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-quicksand' })
const rubikGlitch = Rubik_Glitch({ weight: '400', subsets: ['latin'], variable: '--font-rubik-glitch' })

// New fonts for diverse variations
const nosifer = Nosifer({ weight: '400', subsets: ['latin'], variable: '--font-nosifer' })
const eater = Eater({ weight: '400', subsets: ['latin'], variable: '--font-eater' })
const rye = Rye({ weight: '400', subsets: ['latin'], variable: '--font-rye' })
const kalam = Kalam({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-kalam' })
const yatraOne = Yatra_One({ weight: '400', subsets: ['latin'], variable: '--font-yatra' })
const shrikhand = Shrikhand({ weight: '400', subsets: ['latin'], variable: '--font-shrikhand' })
const bangers = Bangers({ weight: '400', subsets: ['latin'], variable: '--font-bangers' })
const silkscreen = Silkscreen({ weight: '400', subsets: ['latin'], variable: '--font-silkscreen' })
const uncial = Uncial_Antiqua({ weight: '400', subsets: ['latin'], variable: '--font-uncial' })

export const metadata: Metadata = {
  title: 'VibeDesk',
  description: 'Aesthetic Productivity / Lofi Workspace',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} ${orbitron.variable} ${caveat.variable} ${creepster.variable} ${cinzel.variable} ${pressStart.variable} ${chakraPetch.variable} ${amatic.variable} ${lora.variable} ${quicksand.variable} ${rubikGlitch.variable} ${nosifer.variable} ${eater.variable} ${rye.variable} ${kalam.variable} ${yatraOne.variable} ${shrikhand.variable} ${bangers.variable} ${silkscreen.variable} ${uncial.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}

