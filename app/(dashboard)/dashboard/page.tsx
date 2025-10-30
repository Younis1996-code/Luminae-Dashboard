import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Typography, Container } from "@mui/material";
import ProductForm from "@/app/components/ProductForm";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4">Welcome, {session.user?.name}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        This is your private dashboard.
      </Typography>
    </Container>
  );
}
