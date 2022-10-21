import { ReactElement, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Fullscreen from 'layouts/fullscreen'
import { getCookie } from 'cookies-next'
import { Button } from 'components/button'
import { Heading, Paragraph } from 'components/typography'
import { ArgyleLink } from 'components/argyle-link'
import { useEphemeralStore } from 'stores/ephemeral'
import { BrandLogo } from 'components/icons'
import { PersonalDetailsForm } from 'components/personal-details-form'

export default function Home() {
  const router = useRouter()
  const [linkLoading, setLinkLoading] = useState(false)
  const [linkInstance, setLinkInstance] = useState<any>()

  const selectedLinkItem = getCookie('link-item')?.toString() || null

  const [linkItem, setLinkItem] = useState<any>(selectedLinkItem)

  const handleLinkOpen = () => {
    if (!linkInstance) {
      return setLinkLoading(true)
    }

    linkInstance.open()
  }

  const setLinkScriptVisible = useEphemeralStore(
    (state) => state.setLinkScriptVisible
  )

  useEffect(() => {
    setLinkScriptVisible(true)
  }, [setLinkScriptVisible])

  useEffect(() => {
    if (linkInstance && linkLoading === true) {
      setLinkLoading(false)
      linkInstance.open()
    }
  }, [linkLoading, linkInstance])

  const handleLinkClose = () => {
    const userId = getCookie('argyle-x-user-id')
    if (userId) {
      router.push('/personal-details')
    }
  }

  return (
    <div className="flex h-full flex-col pb-20">
      <ArgyleLink
        onClose={() => handleLinkClose()}
        onLinkInit={(link) => {
          setLinkInstance(link)
        }}
        linkItemId={linkItem}
        setLinkItem={setLinkItem}
      />
      <div className="mx-auto pt-32">
        <BrandLogo />
      </div>
      <div className="px-20 pt-40">
        <Heading className="mb-8 mr-20">Personal details</Heading>
        <Paragraph className="mb-24 text-gray-T50">
          Connect your employer account to auto-fill your application (this will
          save time in later steps as well).
        </Paragraph>
        <Button green onClick={handleLinkOpen}>
          Connect employer
        </Button>
      </div>

      <div className="px-20 pb-20">
        <Paragraph className="mb-24 mt-40 text-gray-T50">
          Or fill out manually:
        </Paragraph>
        <PersonalDetailsForm
          userDetails={{}}
          handleSubmit={(e) => {
            e.preventDefault()
            router.push('/thank-you')
          }}
        />
      </div>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Fullscreen>{page}</Fullscreen>
}
