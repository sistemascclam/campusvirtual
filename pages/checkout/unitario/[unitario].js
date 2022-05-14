import React from 'react'
import { useRouter } from 'next/router'

export default function CheckoutUnitario() {
    const router = useRouter()
    const { unitario } = router.query
  return (
    <div>{unitario}</div>
  )
}
