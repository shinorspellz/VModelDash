import { CounterCardsType } from "@/types/service";
import { Card, CardBody, Skeleton } from "@nextui-org/react";

const CounterCard = ({ title, counter, icon, isLoading }: CounterCardsType) => {
  return (
    <>
      <Card className="vm-shadow-xs">
        <CardBody>
          <div className="p-3 flex justify-between items-center space-x-3">
            <div className="w-[60px] h-[60px] vm-bg-primary-op rounded-full items-center flex justify-center">
              {icon}
            </div>
            <div className="flex-1">
              <h4 className="text-base text-primary-700 opacity-75">{title}</h4>
              <h5 className="text-2xl font-extrabold text-primary-700">
                {isLoading ? (
                  <Skeleton className="h-7 w-[80px] rounded-lg" />
                ) : (
                  counter
                )}
              </h5>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CounterCard;
