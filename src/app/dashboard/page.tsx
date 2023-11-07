import React from "react";
import DashboardInnerLayout from "../components/General/Dashboard/DashboardInnerLayout";
import CounterCard from "../components/General/Widget/CounterCard";

import CardData from "@/utils/CardAnalytics.json";
import VMIcons from "@/utils/icons";
import BasicCard from "../components/General/Widget/BasicCard";

const DashboardPage = () => {
  return (
    <DashboardInnerLayout title="Hello, Daniel">
      <div className="grid grid-cols-3 gap-6">
        {CardData.length &&
          CardData.map((cardItem) => (
            <CounterCard
              title={cardItem.title}
              url={cardItem.url}
              counter={cardItem.count}
              icon={<VMIcons iconType={cardItem.icon} />}
              key={cardItem.id}
            />
          ))}
      </div>
      <div className="flex flex-row space-x-6">
        <div className="mt-6 w-[66%]">
          <BasicCard title="Recent Bookings" desc="" options={<></>}>
            <div className="h-[250px]">hello dear</div>
          </BasicCard>
        </div>

        <div className="mt-6 w-[32%]">
          <BasicCard
            title="Trend Setters"
            desc="VModel Top 3 Trend-Setters"
            options={<></>}
          >
            <div className="h-[250px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
              tenetur cupiditate! Veniam modi debitis distinctio quia corrupti
              pariatur rem? Non dolorum voluptatem cum sapiente! Rem, facilis a
              assumenda voluptate earum ullam tenetur accusamus libero hic ab
              expedita omnis eius esse sunt inventore ea quod impedit quisquam
              in quidem obcaecati! Nostrum aperiam, similique fugiat enim
              explicabo maiores nam dolorem nisi rem ad, cumque ducimus ut magni
              facere ullam accusantium consectetur. Maxime nobis consectetur,
              officiis aspernatur, delectus nam odit blanditiis nemo illum eius
              quos nesciunt illo obcaecati? Commodi quam quibusdam ut ad debitis
              id totam, eum voluptate optio sunt error aspernatur unde
              voluptatem. Nulla voluptatum vero assumenda sit. Eligendi a
              necessitatibus est pariatur sequi accusamus magnam officia
              placeat, aspernatur illum porro ipsa vel, dolores harum enim modi
              ea aut aliquam, perspiciatis alias. Dolorum eos laborum rem
              placeat eius enim est impedit modi voluptatibus deserunt aut
              dolores pariatur molestiae, animi ipsum illo qui sed, ratione
              aliquam eum consequuntur quasi nam voluptatem. Magnam minus nisi,
              tempore ut, ipsum necessitatibus possimus delectus eos nulla
              quidem error nemo officia deleniti vero qui nam labore illum
              provident repellat? Minus laborum aperiam odit expedita nobis
              libero ex quaerat quasi similique animi? Corrupti veritatis rerum
              autem assumenda quod quam est, ipsum officiis at debitis ipsam
              beatae magnam voluptates dolorum earum velit. Aliquid amet,
              blanditiis aliquam consequatur perspiciatis accusantium cum,
              facilis quam possimus ut nobis ad culpa asperiores veritatis, ab
              cumque inventore et. Repudiandae magnam magni praesentium totam.
              Inventore adipisci dolorem animi, aliquid facilis, assumenda
              recusandae sapiente, non molestiae cum dolore nam dolores tenetur
              explicabo. Ipsa dolor unde cum, voluptates, eveniet eos optio
              porro distinctio incidunt excepturi soluta mollitia quis at. Saepe
              ut distinctio soluta vero itaque provident libero quae quidem nisi
              impedit facere deleniti ipsum consequuntur, illum molestiae quam
              ratione aut facilis tempore quasi! Eveniet consequuntur fuga vero
              totam!
            </div>
          </BasicCard>
        </div>
      </div>
    </DashboardInnerLayout>
  );
};

export default DashboardPage;
