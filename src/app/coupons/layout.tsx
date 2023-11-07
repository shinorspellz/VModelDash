import DashboardLayout from "../components/General/Dashboard/DashboardLayout";

export const metadata = {
  title: "Coupons - VModel - Discover, Connect, and Collaborate with Brands",
  description: "Discover, Connect, and Collaborate with Brands",
};

export default function CouponsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
