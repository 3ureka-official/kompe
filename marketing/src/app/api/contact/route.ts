import { Resend } from "resend";
import { NextResponse } from "next/server";
import { contactSchema } from "@/schema/contactSchema";

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = process.env.CONTACT_EMAIL;
const FROM_EMAIL = process.env.FROM_EMAIL;

if (!CONTACT_EMAIL || !FROM_EMAIL) {
  throw new Error("環境変数が設定されていません");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // バリデーション
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "バリデーションエラー", details: result.error.issues },
        { status: 400 },
      );
    }

    const { name, email, subject, message } = result.data;

    // お問い合わせ受信メール（管理者宛）
    const contactEmailText = `お問い合わせが届きました

お名前: ${name}
メールアドレス: ${email}
件名: ${subject}

メッセージ:
${message}
`;

    // 自動返信メール（送信者宛）
    const autoReplyText = `${name} 様

この度は、Kompeにお問い合わせいただき、誠にありがとうございます。

以下の内容でお問い合わせを受け付けました。

件名: ${subject}

メッセージ:
${message}

内容を確認次第、ご連絡いたします。
引き続き、Kompeをよろしくお願いいたします。

Kompe運営チーム
`;

    // お問い合わせ受信メールを送信
    await resend.emails.send({
      from: `Kompe <${FROM_EMAIL}>`,
      to: [CONTACT_EMAIL!],
      replyTo: email,
      subject: `お問い合わせ: ${subject}`,
      text: contactEmailText,
    });

    // 自動返信メールを送信
    await resend.emails.send({
      from: `Kompe <${FROM_EMAIL}>`,
      to: [email],
      subject: "お問い合わせありがとうございます",
      text: autoReplyText,
    });

    return NextResponse.json(
      { message: "お問い合わせを送信しました" },
      { status: 200 },
    );
  } catch (error) {
    console.error("お問い合わせ送信エラー:", error);
    return NextResponse.json(
      { error: "メール送信に失敗しました" },
      { status: 500 },
    );
  }
}
