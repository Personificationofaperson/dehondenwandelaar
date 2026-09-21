// Verstuurt een aanvraag uit de calculator naar Kimberly.
//
// Waarom dit een server-route is en geen mailto-link: bij mailto staat het
// ontvangstadres in de broncode van de pagina, en dat wil Kimberly niet. Hier
// staat het in een omgevingsvariabele en komt het nooit in de browser terecht.
// Bijkomend voordeel: dit werkt ook bij iemand die geen mailprogramma heeft
// ingesteld, wat op een laptop met webmail vaak het geval is.

const RESEND_URL = "https://api.resend.com/emails"

// Zonder geverifieerd domein staat Resend alleen dit afzenderadres toe, en
// mag je enkel naar je eigen accountadres sturen. Dat volstaat hier, want de
// enige ontvanger is Kimberly zelf. Wil je later vanaf
// hallo@dehondenwandelaar.be versturen, verifieer dan het domein bij Resend
// en zet RESEND_FROM in Vercel.
const STANDAARD_AFZENDER = "De Hondenwandelaar <onboarding@resend.dev>"

function schoon(waarde, max) {
  return String(waarde ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, max)
}

function geldigEmail(waarde) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(waarde)
}

function escape(tekst) {
  return tekst
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY
  const ontvanger = process.env.CONTACT_EMAIL

  if (!apiKey || !ontvanger) {
    console.error("RESEND_API_KEY of CONTACT_EMAIL ontbreekt in de omgevingsvariabelen.")
    return Response.json({ error: "Versturen tijdelijk niet mogelijk" }, { status: 500 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Ongeldige aanvraag" }, { status: 400 })
  }

  // Honeypot: een veld dat onzichtbaar is voor mensen. Is het ingevuld, dan
  // was het een bot. We doen alsof het gelukt is, zodat die niets leert.
  if (schoon(body.website, 100) !== "") {
    return Response.json({ ok: true })
  }

  const email = schoon(body.email, 160)
  const naam = schoon(body.naam, 80)
  const bericht = schoon(body.bericht, 4000)

  if (!geldigEmail(email)) {
    return Response.json({ error: "Dat e-mailadres klopt niet" }, { status: 400 })
  }
  if (bericht.length < 20) {
    return Response.json({ error: "Er is geen bericht om te versturen" }, { status: 400 })
  }

  const afzenderNaam = naam || "een bezoeker"

  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || STANDAARD_AFZENDER,
        to: [ontvanger],
        // Antwoorden gaat rechtstreeks naar de bezoeker, dus je kan gewoon
        // op Beantwoorden drukken.
        reply_to: email,
        subject: `Aanvraag via de prijscalculator, van ${afzenderNaam}`,
        text: `${bericht}\n\n---\nAntwoorden kan naar ${email}`,
        html: `<pre style="font:15px/1.6 -apple-system,Segoe UI,sans-serif;white-space:pre-wrap">${escape(
          bericht,
        )}</pre><hr><p style="font:13px sans-serif;color:#666">Antwoorden kan naar <a href="mailto:${escape(
          email,
        )}">${escape(email)}</a></p>`,
      }),
    })

    if (!response.ok) {
      const detail = await response.text()
      console.error("Resend gaf status", response.status, detail)
      return Response.json({ error: "Versturen mislukt" }, { status: 502 })
    }

    return Response.json({ ok: true })
  } catch (error) {
    console.error("Versturen mislukt:", error)
    return Response.json({ error: "Er is iets misgegaan bij het versturen" }, { status: 500 })
  }
}
