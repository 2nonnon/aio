import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { getDictionary } from '@/dictionaries'
import { i18n } from '@/i18n-config'
import '@/styles/index.css'
import type { IParams } from '@/types/global'
import Header from '@/components/layout/Header'
import Main from '@/components/layout/Main'

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: IParams
}) {
  const dictionary = await getDictionary(params.lang)
  return (
    <html lang={params.lang}>
      <body className={`min-h-screen text-[var(--text2)] -z-20 flex flex-col ${inter.variable} font-sans`}>
        <ThemeProvider>
          <Header dictionary={dictionary} locale={params.lang}></Header>
          <Main>
            {children}
          </Main>
        </ThemeProvider>
      </body>
    </html>
  )
}
