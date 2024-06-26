import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { usePieQuery } from "../../../redux/api/DashboardApi";
import { UserReducerType } from "../../../types/ReducerTypes";
import { CustomError } from "../../../types/Types";
import Loader from "../../../components/admin/Loader";
import { Navigate } from "react-router-dom";

const PieCharts = () => {
  const { user } = useSelector(
    (state: { UserReducer: UserReducerType }) => state.UserReducer
  );
  const { data, isError, error, isLoading } = usePieQuery(user?._id!);
  if (isError) {
    toast.error((error as CustomError).data.message);

    return <Navigate to={"/admin/dashboard"} />;
  }

  // if (data) {
  //   console.log(data.charts!);
  // }
  const chartData = data?.charts;
console.log(chartData)
  return (
    <div className="admin-container">
      <AdminSidebar />
      {isLoading ? (
        <Loader />
      ) : (
        <main className="chart-container">
          <h1>Pie & Doughnut Charts</h1>
          <section>
            <div>
              <PieChart
                labels={["Processing", "Shipped", "Delivered"]}
                data={[
                  chartData?.orderFullFillment!.Processing!,
                  chartData?.orderFullFillment!.Shipped!,
                  chartData?.orderFullFillment!.Delivered!,
                ]}
                backgroundColor={[
                  `hsl(110,80%, 80%)`,
                  `hsl(110,80%, 50%)`,
                  `hsl(110,40%, 50%)`,
                ]}
                offset={[0, 0, 50]}
              />
            </div>
            <h2>Order Fulfillment Ratio</h2>
          </section>

          <section>
            <div>
              <DoughnutChart
                labels={
                  chartData?.categoryCount.map(
                    (i) => Object.entries(i)[0][0] + `%`!
                  )!
                }
                data={
                  chartData?.categoryCount.map((i) => Object.entries(i)[0][1]!)!
                }
                backgroundColor={
                  chartData?.categoryCount
                    .map((i) => Object.entries(i)[0][1]!)!
                    .map((i) => `hsl(${i * 6 * Math.random()}, ${i}%, 40%)`)!
                }
                legends={false}
                offset={[10, 20, 10, 80]}
              />
            </div>
            <h2>Product Categories Ratio</h2>
          </section>

          <section>
            <div>
              <DoughnutChart
                labels={["In Stock", "Out Of Stock"]}
                data={[
                  chartData?.stockAvailability.inStock!,
                  chartData?.stockAvailability.outOfStock!,
                ]}
                backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                legends={false}
                offset={[0, 80]}
                cutout={"70%"}
              />
            </div>
            <h2> Stock Availability</h2>
          </section>

          <section>
            <div>
              <DoughnutChart
                labels={[
                  "Marketing Cost",
                  "Discount",
                  "Burnt",
                  "Production Cost",
                  "Net Margin",
                ]}
                data={[
                  chartData?.revenueDistributation.marketingCost!,
                  chartData?.revenueDistributation.discount!,
                  chartData?.revenueDistributation.burnt!,
                  chartData?.revenueDistributation.productionCost!,
                  chartData?.revenueDistributation.netMargin!,
                ]}
                backgroundColor={[
                  "hsl(110,80%,40%)",
                  "hsl(19,80%,40%)",
                  "hsl(69,80%,40%)",
                  "hsl(300,80%,40%)",
                  "rgb(53, 162, 255)",
                ]}
                legends={false}
                offset={[20, 30, 20, 30, 80]}
              />
            </div>
            <h2>Revenue Distribution</h2>
          </section>

          <section>
            <div>
              <PieChart
                labels={[
                  "Teenager(Below 20)",
                  "Adult (20-40)",
                  "Older (above 40)",
                ]}
                data={[
                  chartData?.usersAge.teen!,
                  chartData?.usersAge.adult!,
                  chartData?.usersAge.old!,
                ]}
                backgroundColor={[
                  `hsl(10, ${80}%, 80%)`,
                  `hsl(10, ${80}%, 50%)`,
                  `hsl(10, ${40}%, 50%)`,
                ]}
                offset={[0, 0, 50]}
              />
            </div>
            <h2>Users Age Group</h2>
          </section>
        </main>
      )}
    </div>
  );
};

export default PieCharts;
