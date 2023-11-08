import { Card, CardHeader } from "@mui/material";
import CardList from "../General/Widget/CardList";
import { CardListItem } from "../General/Widget/CardListItem";

export const UserBasicDetails = (props: any) => {
  const { title, data } = props;

  return (
    <Card>
      {title && <CardHeader title={title} />}

      <CardList>
        {data.length &&
          data.map((item: any, index: any) => (
            <CardListItem
              divider
              label={item?.title}
              value={item?.desc}
              key={index}
            />
          ))}
      </CardList>
    </Card>
  );
};
