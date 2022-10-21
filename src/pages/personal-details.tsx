import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'components/button'
import { Heading, Paragraph } from 'components/typography'
import Fullscreen from 'layouts/fullscreen'
import { BrandLogo } from 'components/icons'
import { useProfile } from 'hooks/use-profile'
import { PersonalDetailsForm } from 'components/personal-details-form'

export default function PersonalDetails() {
  const router = useRouter()

  const { data: profile, isError: isProfileError } = useProfile()

  if (isProfileError) {
    router.push('/')
  }

  useEffect(() => {
    router.prefetch('/thank-you')
  })

  const userDetails = profile
    ? {
        fullName: profile.full_name,
        email: profile.email,
        phoneNumber: profile.phone_number,
        addressLine1: profile.address.line1,
        addressLine2: profile.address.line2,
        city: profile.address.city,
        state: profile.address.state,
        zipCode: profile.address.postal_code,
      }
    : {}

  return (
    <div className="flex h-full flex-col ">
      <div className="mx-auto pt-32">
        <BrandLogo />
      </div>
      <div className="px-20 pt-32">
        <Heading className="mb-8">Tell us about yourself</Heading>
        <Paragraph className="mb-16 text-gray-T50">
          Share your information so GoodLoans can evaluate your request.
        </Paragraph>
      </div>
      <div className="mx-20 mt-auto pb-20">
        <PersonalDetailsForm
          userDetails={userDetails}
          submitButton="Next"
          handleSubmit={(e) => {
            e.preventDefault()
            router.push('/thank-you')
          }}
        />
      </div>
    </div>
  )
}

PersonalDetails.getLayout = function getLayout(page: ReactElement) {
  return <Fullscreen>{page}</Fullscreen>
}
