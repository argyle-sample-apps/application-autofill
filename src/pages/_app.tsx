import { ReactElement, ReactNode, useState } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion'
import { animation } from 'utils/animation'
import { ThemeProvider } from '@material-tailwind/react'
import { BASE_PATH } from 'consts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ErrorBoundary } from 'react-error-boundary'
import { deleteCookie } from 'cookies-next'
import { Button } from 'components/button'
import { Subheading } from 'components/typography'
import { useSetAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import { sampleData } from 'stores/global'
import axios from 'axios'

axios.defaults.baseURL = BASE_PATH

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


function ErrorFallback({ resetErrorBoundary }: any) {
  return (
    <div role="alert" className="p-4">
      <Subheading>Something went wrong</Subheading>
      <div className="mt-8">
        <Button onClick={resetErrorBoundary}>Try again</Button>
      </div>
    </div>
  )
}

const customTheme = {
  tooltip: {
    styles: {
      base: {
        bg: 'bg-white',
        color: 'text-black',
      },
    },
  },
}

const queryClient = new QueryClient()

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)
  const setSampleData = useSetAtom(sampleData)

  return getLayout(
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=yes"
        />
        <meta property="title" content="Application Autofill" />
        <meta
          name="description"
          content="Use Argyle to autofill applications that require profile, income, employment, or deposit information from your users."
        />
        <title>Application Autofill</title>

        <meta property="og:type" content="website" />
        <meta
          name="keywords"
          content={
            'Workforce, Data, Infrastructure, API, Workforce data for gig platforms, Workforce data for shift platforms, Workforce data through an API, An API for work history, An API for gig platforms, An API for shift work, Access Uber account work history through an API, Employment verification for gig workers, Employment verification for shift workers, Income verification for gig workers, Income verification for shift workers, argyle workforce data'
          }
        />
        <meta
          property="og:url"
          content="https://sampleapps.argyle.com/application-autofill"
        />
        <meta property="og:title" content="Application Autofill" />
        <meta
          property="og:description"
          content="Use Argyle to autofill applications that require profile, income, employment, or deposit information from your users."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/argyle-media/image/upload/v1666348705/argyle-x/meta/autofill-app-meta.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://sampleapps.argyle.com/application-autofill"
        />
        <meta property="twitter:title" content="Application Autofill" />
        <meta
          property="twitter:description"
          content="Use Argyle to autofill applications that require profile, income, employment, or deposit information from your users."
        />
        <meta
          property="twitter:image"
          content="https://res.cloudinary.com/argyle-media/image/upload/v1666348705/argyle-x/meta/autofill-app-meta.png"
        />

        <link rel="manifest" href={BASE_PATH + '/manifest.json'} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={BASE_PATH + '/apple-touch-icon.png'}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={BASE_PATH + '/favicon-32x32.png'}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={BASE_PATH + '/favicon-16x16.png'}
        />

        <link
          rel="preload"
          href={BASE_PATH + '/fonts/CircularXXWebLight.woff2'}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={BASE_PATH + '/fonts/CircularXXWebMedium.woff2'}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={BASE_PATH + '/fonts/CircularXXWebRegular.woff2'}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <LazyMotion features={domAnimation}>
          <AnimatePresence exitBeforeEnter={false}>
            <m.div
              key={router.route.concat(animation.name)}
              style={{
                height: '100%',
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={animation.variants}
              transition={animation.transition}
            >
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={async () => {
                  deleteCookie('argyle-x-user-id')
                  deleteCookie('argyle-x-user-token')
                  deleteCookie('argyle-x-link-item')

                  setSampleData(RESET)
                }}
              >
                <ThemeProvider value={customTheme}>
                  <Component {...pageProps} />
                </ThemeProvider>
              </ErrorBoundary>
            </m.div>
          </AnimatePresence>
        </LazyMotion>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
