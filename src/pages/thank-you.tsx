import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'components/button'
import { Title, Subheading, Strong } from 'components/typography'
import Fullscreen from 'layouts/fullscreen'
import { BrandLogo } from 'components/icons'
import { clearCookies } from 'utils'
import { useGlobalStore } from 'stores/global'
import { useEphemeralStore } from 'stores/ephemeral'

export default function ThankYou() {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/restart')
  })

  const setUser = useGlobalStore((state) => state.setUser)

  const setLinkScriptVisible = useEphemeralStore(
    (state) => state.setLinkScriptVisible
  )

  return (
    <div className="flex h-full flex-col pb-20">
      <div className="absolute top-32 left-0 right-0 mx-auto w-[150px] content-center">
        <BrandLogo />
      </div>
      <div className="mt-auto px-20 pt-24">
        <Title className="mb-16">Thank you!</Title>
        <Subheading className="mb-60 text-gray-T50">
          Your personal details have been submitted. Click{' '}
          <Strong>Continue</Strong> to proceed with your application.
        </Subheading>

        <Button
          onClick={() => {
            router.push('/restart')
            clearCookies()
            setLinkScriptVisible(false)
            setUser('', '')
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

ThankYou.getLayout = function getLayout(page: ReactElement) {
  return <Fullscreen bgColor="bg-green-light">{page}</Fullscreen>
}
