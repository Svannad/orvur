import { CollectionAfterDeleteHook } from "payload"

export const updateMail: CollectionAfterDeleteHook = async ({ doc, req }) => {
  // Get the team from the deleted submission
  const team = doc.submissionData?.find((f: any) => f.field === 'team')?.value
  if (!team) return

  // Get team config
  const teamConfig = await req.payload.find({
    collection: 'teams',
    where: { title: { equals: team } },
    limit: 1,
  })

  const capacity = teamConfig.docs[0]?.capacity || 0
  if (!capacity) return

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

  if (teamSubs.length === capacity) {
    const newlyAccepted = teamSubs[capacity - 1]

    if (!newlyAccepted) return

    const email = newlyAccepted.submissionData?.find((f) => f.field === 'email')?.value
    const name = newlyAccepted.submissionData?.find((f) => f.field === 'name')?.value || 'there'

    if (email) {
      await req.payload.sendEmail({
        to: email,
        subject: `Great news! You're off the waiting list for ${team}`,
        html: `
          <p>Hi ${name}! 🎉</p>
          <p>A spot has opened up and you've been moved from the <strong>waiting list</strong> to the <strong>main list</strong> for the <strong>${team}</strong> team.</p>
          <p>We look forward to seeing you!</p>
        `,
      })
    }
  }
}
