import { useRouter } from 'next/router'
import React from 'react'

/*
http://localhost:3000/verificarpago/feedback?collection_id=1307752960&collection_status=approved&payment_id=1307752960&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=5652124306&preference_id=1183021344-6f09490d-b671-4515-be98-ceb3b82f11dc&site_id=MPE&processing_mode=aggregator&merchant_account_id=null
http://localhost:3000/verificarpago/feedback?collection_id=1307923343&collection_status=approved&payment_id=1307923343&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=5621872424&preference_id=1183021344-ee991a55-9fc5-44a2-b6ba-8526cd370112&site_id=MPE&processing_mode=aggregator&merchant_account_id=null
*/

export default function Feedback() {
    const {query,isReady} = useRouter()
    if(isReady){
      console.log(query);
    }
  return (
    <div>feedback</div>
  )
}
