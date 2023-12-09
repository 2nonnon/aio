import { Inter } from 'next/font/google'

// import { cookies } from 'next/headers'
// import type { ThemeType } from '@/components/providers/ThemeProvider'
import Script from 'next/script'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { getDictionary } from '@/dictionaries'
import { i18n } from '@/i18n-config'
import '@/styles/index.css'
import type { IParams } from '@/types/global'
import Header from '@/components/layout/Header'
import Main from '@/components/layout/Main'
import { I18nProvider } from '@/components/providers/I18nProvider'

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
    <html lang={params.lang} data-theme='light'>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `;(function () { const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; const setting = localStorage.getItem('THEME') || 'auto'; if (setting === 'dark' || (prefersDark && setting !== 'light')) document.documentElement.setAttribute('data-theme', 'dark'); })()`}}></script>
      </head>
      <body className={`min-h-screen text-[var(--text2)] -z-20 flex flex-col ${inter.variable} font-sans`}>
        <ThemeProvider>
          <I18nProvider locale={params.lang} copies={dictionary}>
            <Header dictionary={dictionary} locale={params.lang}></Header>
            <Main>
              {children}
            </Main>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
