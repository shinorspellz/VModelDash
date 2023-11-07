import DashboardLayout from "../components/General/Dashboard/DashboardLayout";

export const metadata = {
  title: "Dashboard- VModel - Discover, Connect, and Collaborate with Brands",
  description: "Discover, Connect, and Collaborate with Brands",
};

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
