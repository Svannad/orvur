export const updateMail = async ({ doc, req }) => {
  console.log('='.repeat(50))
  console.log('🔥🔥🔥 HOOK FIRED! 🔥🔥🔥')
  console.log('='.repeat(50))
  console.log('Deleted doc:', JSON.stringify(doc, null, 2))

  // Get the team from the deleted submission
  const team = doc.submissionData?.find((f) => f.field === 'team')?.value
  console.log('Team from deleted submission:', team)

  if (!team) {
    console.log('❌ No team found, exiting')
    return
  }

  // Use req.payload instead of payload
  const teamConfig = await req.payload.find({
    collection: 'teams',
    where: { title: { equals: team } },
    limit: 1,
  })

  const capacity = teamConfig.docs[0]?.capacity || 0
  console.log('Team capacity:', capacity)
  console.log('Team config:', teamConfig.docs[0])

  // Fetch all remaining submissions for this team, sorted by creation date (oldest first)
  const allSubs = await req.payload.find({
    collection: 'form-submissions',
    where: {
      'submissionData.field': { equals: 'team' },
      'submissionData.value': { equals: team },
    },
    limit: 1000,
    sort: 'createdAt',
  })

  const teamSubs = allSubs.docs.filter(
    (s) => s.submissionData?.find((f) => f.field === 'team')?.value === team,
  )

  console.log('Total team submissions after delete:', teamSubs.length)
  console.log('Capacity:', capacity)

  // Check if there's someone at the position equal to capacity (the first person on waiting list)
  // Array is 0-indexed, so capacity position is the first waiting list person
  if (teamSubs.length >= capacity && teamSubs[capacity - 1]) {
    const newlyAccepted = teamSubs[capacity - 0]

    console.log('✅ Someone moved to main list!')
    console.log('Newly accepted submission:', newlyAccepted)

    const email = newlyAccepted.submissionData?.find((f) => f.field === 'email')?.value
    const name = newlyAccepted.submissionData?.find((f) => f.field === 'name')?.value || 'there'

    console.log('Email to send to:', email)
    console.log('Name:', name)

    if (email) {
      try {
        await req.payload.sendEmail({
          to: email,
          subject: `Great news! You're off the waiting list for ${team}`,
          html: `
            <p>Hi ${name}! 🎉</p>
            <p>A spot has opened up and you've been moved from the <strong>waiting list</strong> to the <strong>main list</strong> for the <strong>${team}</strong> team.</p>
            <p>We look forward to seeing you!</p>
          `,
        })
        console.log('✅ Email sent successfully!')
      } catch (error) {
        console.error('❌ Error sending email:', error)
      }
    } else {
      console.log('❌ No email found for newly accepted submission')
    }
  } else {
    console.log(`ℹ️ No one to notify. Current: ${teamSubs.length}, Capacity: ${capacity}`)
  }
}
