import PhoneInput from 'react-phone-number-input'
import { useState, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

export const PersonalDetailsForm = ({
  userDetails,
  handleSubmit,
  submitButton = 'Submit',
}) => {
  const [phoneNumber, setPhoneNumber] = useState(undefined)

  const { register, reset } = useForm({
    defaultValues: useMemo(() => {
      return userDetails
    }, [userDetails]),
  })

  useEffect(() => {
    reset(userDetails)
    setPhoneNumber(userDetails.phoneNumber)
  }, [reset, userDetails])

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-input"
        placeholder="Full name"
        aria-label="Full name"
        {...register('fullName')}
      />
      <input
        className="form-input"
        placeholder="Email"
        aria-label="Email"
        {...register('email')}
      />
      <div className="mb-20 h-[56px] bg-gray-T04">
        <div className="ml-12 pt-5 text-label text-gray-T40">Phone number</div>
        <PhoneInput
          international
          defaultCountry="US"
          withCountryCallingCode
          countryCallingCodeEditable={false}
          value={phoneNumber}
          onChange={setPhoneNumber}
          aria-label="Phone number"
        />
      </div>
      <input
        className="form-input"
        placeholder="Address line 1"
        aria-label="Address line 1"
        {...register('addressLine1')}
      />
      <input
        className="form-input"
        placeholder="Address line 2"
        aria-label="Address line 2"
        {...register('addressLine2')}
      />
      <input
        className="form-input"
        placeholder="City"
        aria-label="City"
        {...register('city')}
      />
      <div className="flex gap-[20px]">
        <input
          className="form-input"
          placeholder="State"
          aria-label="State"
          {...register('state')}
        />
        <input
          className="form-input"
          placeholder="Zip code"
          aria-label="Zip code"
          {...register('zipCode')}
        />
      </div>
      <input
        className={
          'mt-20 block w-full cursor-pointer bg-green py-3 px-6 text-xl text-white'
        }
        type="submit"
        value={submitButton}
      />
    </form>
  )
}
