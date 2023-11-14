import Image from "next/image";

export const Logo = ({
  isDark,
  isFull,
}: {
  isDark: boolean;
  isFull?: boolean;
}) => {
  return (
    <>
      {isFull ? (
        <Image
          alt="VModel Logo"
          priority
          src={`/assets/images/logo/${
            isDark ? "VModel-Logo-SVG.svg" : "vmodel-logo.svg"
          }`}
          width={64}
          height={64}
          className="rounded-[999px]"
        />
      ) : (
        <Image
          alt="VModel Logo"
          priority
          src={`/assets/images/logo/${
            isDark ? "VModel-Logo-SVG.svg" : "vmodel-logo.svg"
          }`}
          width={64}
          height={64}
          className="rounded-[999px]"
        />
      )}
    </>
  );
};
