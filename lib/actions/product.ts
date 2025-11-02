"use server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

const ProductScheme = z.object({
  name: z.string().min(1, "Name is required!"),
  price: z.coerce.number().nonnegative("Price must be non-negative!"),
  quantity: z.coerce.number().int().min(0, "Quantity must be non-negative!"),
  sku: z.string().optional(),
  lowStock: z.coerce.number().int().min(0).optional(),
});

export async function deleteProduct(formData: FormData) {
  const user = await getCurrentUser();
  const id = String(formData.get("id") || "");

  await prisma.product.deleteMany({
    where: {
      id: id,
      userId: user.id,
    },
  });
}

export async function createProduct(formData: FormData) {
  const user = await getCurrentUser();

  const parsed = ProductScheme.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    sku: formData.get("sku") || undefined,
    lowStock: formData.get("lowStock") || undefined,
  });

  if (!parsed.success) {
    throw new Error("Vaidation failed");
  }

  try {
    await prisma.product.create({
      data: { ...parsed.data, userId: user.id },
    });
    redirect("/inventory");
  } catch (error) {
    throw new Error("Failed to create products");
  }
}
