import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const MListItem = ({ mName, uName, nFollow, mID }: any) => {
  return (
    <TableRow key={mID}>
      <TableCell>{mName}</TableCell>
      <TableCell>{uName}</TableCell>
      <TableCell>{nFollow}</TableCell>
    </TableRow>
  );
};

const UserActivities = ({ userData }: any) => {
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
            Media Name
          </TableColumn>
          <TableColumn
            style={{
              fontSize: "16px",
              color: "#000",
            }}
          >
            Username
          </TableColumn>
          <TableColumn
            style={{
              fontSize: "16px",
              color: "#000",
            }}
          >
            No. of Followers/Subscribers
          </TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key={"1"}>
            <TableCell>Facebook</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{userData?.no_of_facebook_follows}</TableCell>
          </TableRow>
          <TableRow key={"2"}>
            <TableCell>Instagram</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{userData?.no_of_instagram_follows}</TableCell>
          </TableRow>
          <TableRow key={"3"}>
            <TableCell>Linkedin</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{userData?.no_of_linkedin_follows}</TableCell>
          </TableRow>
          <TableRow key={"4"}>
            <TableCell>Snapchat</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{userData?.no_of_snapchat_follows}</TableCell>
          </TableRow>
          <TableRow key={"5"}>
            <TableCell>Tiktok</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{userData?.no_of_tiktok_follows}</TableCell>
          </TableRow>
          <TableRow key={"6"}>
            <TableCell>Youtube</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{userData?.no_of_youtube_subs}</TableCell>
          </TableRow>
          <TableRow key={"7"}>
            <TableCell>Twitter</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{userData?.no_of_twitter_follows}</TableCell>
          </TableRow>
          <TableRow key={"8"}>
            <TableCell>Patreon</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{userData?.no_of_patreon_follows}</TableCell>
          </TableRow>
          <TableRow key={"9"}>
            <TableCell>Pinterest</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{userData?.no_of_pinterest_follows}</TableCell>
          </TableRow>
          <TableRow key={"10"}>
            <TableCell>Reddit</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{userData?.no_of_reddit_follows}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default UserActivities;
