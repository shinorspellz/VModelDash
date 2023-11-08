import { Card, CardHeader } from "@mui/material";

export const AboutUser = ({ bioData, ...others }: any) => {
  return (
    <Card {...others}>
      <CardHeader title="Bio" />
      <div className="px-6 pb-4">{bioData}</div>
    </Card>
  );
};
