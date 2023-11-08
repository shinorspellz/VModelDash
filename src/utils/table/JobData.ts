const columns = [
  { name: "ID", uid: "id", sortable: true, key: "" },
  { name: "TITLE", uid: "job_title", sortable: true, key: "" },
  { name: "JOB TYPE", uid: "job_type", sortable: true, key: "" },
  { name: "PRICE OPTION", uid: "price_option", sortable: true, key: "" },
  { name: "ADDED BY", uid: "added_by", sortable: true, key: "" },
  { name: "STATUS", uid: "status", sortable: true, key: "" },
  { name: "DATE CREATED", uid: "created_at", sortable: true, key: "" },
  { name: "ACTIONS", uid: "actions", key: "" },
];

const statusOptions = [
  { name: "Approved", uid: "approved" },
  { name: "Rejected", uid: "rejected" },
];

const users: any = [];

export { columns, statusOptions, users };
