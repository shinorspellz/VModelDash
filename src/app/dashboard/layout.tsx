import DashboardLayout from "../components/General/DashboardLayout";

export const metadata = {
  title: "Dashboard | VModel",
  description: "Welcome to our Dashboard",
};

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
