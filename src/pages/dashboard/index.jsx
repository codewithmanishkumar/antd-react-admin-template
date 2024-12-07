import React from "react";
import { PageContainer, StatisticCard } from "@ant-design/pro-components";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
const { Statistic, Divider } = StatisticCard;

const Dashboard = () => {
  return (
    <PageContainer content="Welcome to the admin theme dashboard page">
      <StatisticCard.Group direction={"row"}>
        <StatisticCard
          statistic={{
            title: "All Users",
            value: 601986875,
          }}
        />
        <Divider type={"vertical"} />
        <StatisticCard
          color="red"
          statistic={{
            title: "New Users",
            value: 3701928,
            description: (
              <Statistic
                value="61.5%"
                valueStyle={{ color: "#3f8600" }}
                prefix={<CaretUpFilled />}
              />
            ),
          }}
        />
        <StatisticCard
          statistic={{
            title: "Daily Active Users",
            value: 1806062,
            description: (
              <Statistic
                value="38.5%"
                valueStyle={{ color: "#cf1322" }}
                prefix={<CaretDownFilled />}
              />
            ),
          }}
        />
      </StatisticCard.Group>
    </PageContainer>
  );
};

export default Dashboard;
