import type { Config } from 'tailwindcss'

import { fontFamily } from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

const shades = [
  50,
  ...Array.from({ length: 9 }).map((_, i) => (i + 1) * 100),
  950,
]

const lightness = [
  0.978, 0.936, 0.851, 0.767, 0.682, 0.598, 0.513, 0.429, 0.344, 0.260, 0.218,
]

const chroma = [
  0.011, 0.033, 0.077, 0.128, 0.155, 0.136, 0.116, 0.097, 0.078, 0.059, 0.049,
]

function generateOKLCH(name: string, hue: number) {
  const res = {}

  for (let i = 0; i < 11; i++) {
    const shade = shades[i]
    const l = lightness[i]
    const c = chroma[i]

    res[shade] = `oklch(var(--${name}-${shade}, ${l} ${c} ${hue}) / <alpha-value>)`
  }

  return res
}

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: ['grid-cols-[repeat(9,1fr)]', 'grid-cols-[repeat(16,1fr)]', 'grid-cols-[repeat(32,1fr)]', 'text-[hsl(40,50%,50%)]', 'text-[hsl(80,50%,50%)]', 'text-[hsl(120,50%,50%)]', 'text-[hsl(160,50%,50%)]', 'text-[hsl(200,50%,50%)]', 'text-[hsl(240,50%,50%)]', 'text-[hsl(280,50%,50%)]', 'text-[hsl(320,50%,50%)]'],
  darkMode: ['class', '[theme="dark"]'],
  theme: {
    screens: {
      xs: '375px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        accent: generateOKLCH('accent', 200),
        danger: colors.red,
        success: colors.green,
      },
      animation: {
        bounce: 'bounce 1s var(--i) infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-20%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}

export default config
