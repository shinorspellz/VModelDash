import DashboardLayout from "../components/General/Dashboard/DashboardLayout";

export const metadata = {
  title: "Jobs- VModel - Discover, Connect, and Collaborate with Brands",
  description: "Discover, Connect, and Collaborate with Brands",
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
