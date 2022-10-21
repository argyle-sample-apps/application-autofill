export type Address = {
  city: string
  line1: string
  line2?: string
  state: string
  country: string
  postal_code: string
}

export type Profile = {
  id: string
  full_name: string
  account: string
  address: Address
  phone_number: string
  email: string
}
