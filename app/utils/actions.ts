"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { MyDayType } from "./types";

// id: 1,
// day: 21,
// month: 5,
// year: 2024,

// productive: false,
// broke_rules: false,
// dayPassed: true

export async function createMyDay(data: MyDayType) {
  // console.log("data", data);
  const { id, day, month, year, productive, broke_rules, daypassed } = data;

  console.log(`
    INSERT INTO mydays (day, month, year, productive, broke_rules, daypassed)
  VALUES (${day}, ${month}, ${year}, ${productive === "true"}, ${broke_rules === "true"}, ${daypassed})
    `);
  await sql`
  INSERT INTO mydays (day, month, year, productive, broke_rules, daypassed)
  VALUES (${day}, ${month}, ${year}, ${productive === "true"}, ${broke_rules === "true"}, ${daypassed});
`;

  revalidatePath("/");
  redirect("/?xxx=" + process.env.AUTH_SECRET);
}

// const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// export async function updateInvoice(id: string, formData: FormData) {
//   const { customerId, amount, status } = UpdateInvoice.parse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });

//   const amountInCents = amount * 100;

//   await sql`
//         UPDATE invoices
//         SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//         WHERE id = ${id}
//       `;

//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }

// export async function deleteInvoice(id: string) {
//   await sql`DELETE FROM invoices WHERE id = ${id}`;
//   revalidatePath('/dashboard/invoices');
// }
