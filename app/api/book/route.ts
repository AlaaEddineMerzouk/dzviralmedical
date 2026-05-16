import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()
  const { firstName, lastName, email, phone, specialty, city, challenge } = body

  // 1. Save to Supabase
  const { error } = await supabase.from('bookings').insert([
    { first_name: firstName, last_name: lastName, email, phone, specialty, city, challenge }
  ])

  if (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }

  // 2. Send notification email to you
  await resend.emails.send({
    from: 'Bookings <onboarding@resend.dev>',
    to: process.env.NOTIFY_EMAIL!,
    subject: `New Strategy Call — ${firstName} ${lastName}`,
    html: `
      <h2>New Booking</h2>
      <p><b>Name:</b> ${firstName} ${lastName}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Specialty:</b> ${specialty}</p>
      <p><b>City:</b> ${city}</p>
      <p><b>Challenge:</b> ${challenge || 'N/A'}</p>
    `
  })

  return Response.json({ success: true })
}