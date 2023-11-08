import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const UserActMore = ({ userData }: any) => {
  return (
    <>
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn
            style={{
              fontSize: "16px",
              color: "#000",
            }}
          >
            Name
          </TableColumn>
          <TableColumn
            style={{
              fontSize: "16px",
              color: "#000",
            }}
          >
            Value
          </TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key={"1"}>
            <TableCell>Total Views</TableCell>
            <TableCell>{userData?.views}</TableCell>
          </TableRow>
          <TableRow key={"2"}>
            <TableCell>Years of Experience</TableCell>
            <TableCell>{userData?.years_of_experience}</TableCell>
          </TableRow>
          <TableRow key={"3"}>
            <TableCell>Services</TableCell>
            <TableCell>{userData?.no_of_services}</TableCell>
          </TableRow>
          <TableRow key={"4"}>
            <TableCell>Posted Jobs</TableCell>
            <TableCell>{userData?.no_of_jobs}</TableCell>
          </TableRow>
          <TableRow key={"5"}>
            <TableCell>Applied Jobs</TableCell>
            <TableCell>{userData?.no_of_job_applications}</TableCell>
          </TableRow>
          <TableRow key={"6"}>
            <TableCell>Coupons</TableCell>
            <TableCell>{userData?.no_of_coupons}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default UserActMore;
