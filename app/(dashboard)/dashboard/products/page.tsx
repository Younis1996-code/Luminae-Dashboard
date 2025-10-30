import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProductForm from "@/app/components/ProductForm";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  return <ProductForm />;
}
