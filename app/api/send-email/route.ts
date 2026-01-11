import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// This would be configured with real email credentials in production
const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, data } = body

    let subject = ""
    let text = ""

    // Configure email based on notification type
    switch (type) {
      case "aid_request":
        subject = "Permintaan Bantuan Baru"
        text = `
          Permintaan bantuan baru telah diterima:
          
          Nama: ${data.name}
          Kontak: ${data.contact}
          Alamat: ${data.address}
          Deskripsi Kebutuhan: ${data.description}
        `
        break
      case "donation":
        subject = "Konfirmasi Donasi Baru"
        text = `
          Konfirmasi donasi baru telah diterima:
          
          Nama: ${data.name}
          Kontak: ${data.contact}
          Jumlah: ${data.amount}
          Tanggal Transfer: ${data.transferDate}
          Pesan: ${data.message || "-"}
        `
        break
      case "volunteer":
        subject = "Pendaftaran Relawan Baru"
        text = `
          Pendaftaran relawan baru telah diterima:
          
          Nama: ${data.name}
          Kontak: ${data.contact}
          Email: ${data.email}
          Keahlian: ${data.skills}
          Motivasi: ${data.motivation}
        `
        break
      default:
        return NextResponse.json({ error: "Tipe notifikasi tidak valid" }, { status: 400 })
    }

    // Send email
    await transporter.sendMail({
      from: '"GOCARI Platform" <notifications@gmail.com>',
      to: "hihujeje@gmail.com",
      subject,
      text,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Gagal mengirim email" }, { status: 500 })
  }
}
