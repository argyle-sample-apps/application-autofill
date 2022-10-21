import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'components/button'
import { Title, Subheading } from 'components/typography'
import Fullscreen from 'layouts/fullscreen'
import { BrandLogo, Refresh } from 'components/icons'

export default function Restart() {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/')
  })

  return (
    <div className="flex h-full flex-col pb-20">
      <div className="absolute top-32 left-0 right-0 mx-auto w-[150px] content-center">
        <BrandLogo />
      </div>
      <div className="mt-auto px-20 pt-24">
        <Refresh />
        <Title className="mb-16 mt-20">Start over</Title>
        <Subheading className="mb-60 text-gray-T50">
          Click to restart the application flow.
        </Subheading>

        <Button
          green
          onClick={() => {
            router.push('/')
          }}
        >
          Restart
        </Button>
      </div>
    </div>
  )
}

Restart.getLayout = function getLayout(page: ReactElement) {
  return <Fullscreen>{page}</Fullscreen>
}
