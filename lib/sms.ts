// NetGSM SMS Integration — Placeholder
// Uncomment and add credentials to .env to enable
// NETGSM_USER=your_username
// NETGSM_PASS=your_password
// NETGSM_MSGHEADER=YourBrandName

export async function sendSMS(phone: string, message: string) {
    console.log(`[NETGSM MOCK] Sending SMS to ${phone}: ${message}`)

    /*
    const user = process.env.NETGSM_USER
    const pass = process.env.NETGSM_PASS
    const header = process.env.NETGSM_MSGHEADER
  
    if (!user || !pass || !header) return
  
    try {
      // Example fetch to NetGSM endpoint
      // const res = await fetch(`https://api.netgsm.com.tr/sms/send/get/?usercode=${user}&password=${pass}&msgheader=${header}&mobilenumber=${phone}&message=${encodeURIComponent(message)}`)
      // const data = await res.text()
      // return data
    } catch (error) {
      console.error("SMS Error:", error)
    }
    */
}
