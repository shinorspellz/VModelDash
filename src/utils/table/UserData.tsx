const columns = [
  { name: "ID", uid: "id", sortable: true, key: "" },
  { name: "NAME", uid: "display_name", sortable: true, key: "" },
  { name: "GENDER", uid: "gender", sortable: true, key: "" },
  { name: "PERSONALITY", uid: "personality", sortable: true, key: "" },
  // { name: "PHONE", uid: "phone_number", key: "number" },
  { name: "EMAIL", uid: "email", key: "" },
  { name: "VIEWS", uid: "views", key: "" },
  { name: "BANNED", uid: "is_banned", key: "" },
  { name: "STATUS", uid: "is_verified", sortable: true, key: "" },
  { name: "ACTIONS", uid: "actions", key: "" },
];

const statusOptions = [
  { name: "Verified", uid: "verified" },
  { name: "Not Verified", uid: "not_verified" },
];

const users: any = [];

export { columns, statusOptions, users };
