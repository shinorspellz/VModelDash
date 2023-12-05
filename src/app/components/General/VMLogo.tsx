import Image from "next/image";

export const VMLogo = ({
  isDark,
  isFull,
  width = 64,
  height = 64,
  className,
}: {
  isDark: boolean;
  isFull?: boolean;
  width?: number;
  height?: number;
  className?: string | undefined;
}) => {
  const logoSrc = isDark
    ? isFull
      ? "vmodel-logo-full.png"
      : "vmodel-logo-light.svg"
    : isFull
      ? "vmodel-logo-full.png"
      : "vmodel-logo.svg";
  return (
    <>
      <Image
        alt="VModel Logo"
        priority
        src={`/assets/images/logo/${logoSrc}`}
        width={width}
        height={height}
        className={`rounded-[999px] object-contain max-w-full inline-block align-middle ${
          className ?? ""
        }`}
      />
    </>
  );
};
