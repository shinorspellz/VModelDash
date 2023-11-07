import React from "react";
import {
  Home,
  Profile2User,
  Briefcase,
  Receipt1,
  TicketDiscount,
  ArchiveBook,
  VolumeHigh,
  FavoriteChart,
  KeyboardOpen,
} from "iconsax-react";

const VMIcons = ({ iconType }: { iconType: string }) => {
  const color = "rgba(84, 59, 59, 1)";
  const size = 32;
  const varType = "Bulk";
  return (
    <div>
      {iconType == "home" && (
        <Home size={size} color={color} variant={varType} />
      )}

      {iconType == "users" && (
        <Profile2User size={size} color={color} variant={varType} />
      )}

      {iconType == "business" && (
        <Briefcase size={size} color={color} variant={varType} />
      )}

      {iconType == "receipt" && (
        <Receipt1 size={size} color={color} variant={varType} />
      )}

      {iconType == "ticket" && (
        <TicketDiscount size={size} color={color} variant={varType} />
      )}

      {iconType == "report" && (
        <ArchiveBook size={size} color={color} variant={varType} />
      )}

      {iconType == "speaker" && (
        <VolumeHigh size={size} color={color} variant={varType} />
      )}

      {iconType == "services" && (
        <FavoriteChart size={size} color={color} variant={varType} />
      )}

      {iconType == "app" && (
        <KeyboardOpen size={size} color={color} variant={varType} />
      )}
    </div>
  );
};

export default VMIcons;
