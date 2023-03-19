import axios from "axios";
import Chart from "chart.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashBoardSection = () => {
    const [data, setData] = useState('');
  const admin = JSON.parse(localStorage.getItem('admin'))
  
  useEffect(() => {
    // get data form backend
    try{
        ( async () => {
            const { data } =await axios.request({
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${admin?.token}`,
                  },
                  method: "get",
                  url: "http://localhost:8080/api/admin/dashboard",
                });
                console.log(data)
                setData(data);
                
                let date = []
                let label = []
                data?.chartData?.forEach((x) => {
                    date.push(x.count)
                    label.push(x._id.day + '-' + x._id.month + '-' + x._id.year)
                  })
                  
                var config = {
                    type: "line",
                    data: {
                      labels: label,
                      datasets: [
                        {
                          
                          backgroundColor: "#3182ce",
                          borderColor: "#3182ce",
                          data: date,
                          fill: false,
                        }
                      ],
                    },
                    options: {
                      maintainAspectRatio: false,
                      responsive: true,
                      title: {
                        display: false,
                        text: "Sales Charts",
                        fontColor: "white",
                      },
                      legend: {
                        display: false
                      },
                      tooltips: {
                        mode: "index",
                        intersect: false,
                      },
                      hover: {
                        mode: "nearest",
                        intersect: true,
                      },
                      scales: {
                        xAxes: [
                          {
                            ticks: {
                              fontColor: "rgba(255,255,255,.7)",
                            },
                            display: true,
                            scaleLabel: {
                              display: false,
                              labelString: "Month",
                              fontColor: "white",
                            },
                            gridLines: {
                              display: false,
                              borderDash: [2],
                              borderDashOffset: [2],
                              color: "rgba(33, 37, 41, 0.3)",
                              zeroLineColor: "rgba(0, 0, 0, 0)",
                              zeroLineBorderDash: [2],
                              zeroLineBorderDashOffset: [2],
                            },
                          },
                        ],
                        yAxes: [
                          {
                            ticks: {
                              fontColor: "rgba(255,255,255,.7)",
                            },
                            display: true,
                            scaleLabel: {
                              display: false,
                              labelString: "Value",
                              fontColor: "white",
                            },
                            gridLines: {
                              borderDash: [3],
                              borderDashOffset: [3],
                              drawBorder: false,
                              color: "rgba(255, 255, 255, 0.15)",
                              zeroLineColor: "rgba(33, 37, 41, 0)",
                              zeroLineBorderDash: [2],
                              zeroLineBorderDashOffset: [2],
                            },
                          },
                        ],
                      },
                    },
                  };
                  var ctx = document.getElementById("line-chart").getContext("2d");
                  window.myLine = new Chart(ctx, config);

                let circle = []
                circle.push(data?.totalUsers)
                circle.push(data?.totalCommunity)
                circle.push(data?.totalVideos)

                var pie = {
                    type: "pie",
                    data: {
                        labels: [
                            'Users',
                            'Communities',
                            'Videos'
                          ],
                          datasets: [{
                            label: 'My First Dataset',
                            data: circle,
                            backgroundColor: [
                              'rgb(255, 99, 132)',
                              'rgb(54, 162, 235)',
                              'rgb(255, 205, 86)'
                            ],
                            hoverOffset: 4
                          }]
                    },
                  };
                  var pieCtx = document.getElementById("pie-chart").getContext("2d");
                  window.myLine = new Chart(pieCtx, pie);
        }) ();
    }
    catch(error){
        console.log(error)
    }
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="gradient__text text-xl font-semibold">Video uploading</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-[50vh]">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:grid-flow-row gap-4">
            <div className="shadow-lg rounded">
            <canvas id="pie-chart"></canvas>
            </div>
            <div className="flex items-center justify-around shadow-lg rounded">
                <div className="">
                <Link to="/admin/user">
                    <div className="shadow-lg rounded p-4">
                        <img className="w-28 h-24" src="\img\9416840.png" alt="" />
                        <h4 className="text-center font-bold gradient__text">Users</h4>
                        <h4 className="text-center text-cyan-600 font-bold">
                            { data?.totalUsers ? data.totalUsers : 0}
                        </h4>
                    </div>
                </Link>
                    <Link to="/admin/live">
                    <div className="shadow-lg rounded p-4">
                        <img className="w-28 h-24" src="\img\live-broadcast.png" alt="" />
                        <h4 className="text-center font-bold gradient__text">Live</h4>
                        <h4 className="text-center text-cyan-600 font-bold">
                            { data?.liveNow ? data.liveNow : 0}
                        </h4>
                    </div>
                </Link>
                </div>
                <div className="">
                <Link to="/admin/communities">
                    <div className="shadow-lg rounded p-4">
                        <img className="w-28 h-24" src="\img\community.png" alt="" />
                        <h4 className="text-center font-bold gradient__text">Communities</h4>
                        <h4 className="text-center text-cyan-600 font-bold">
                            { data?.totalCommunity ? data?.totalCommunity : 0}
                        </h4>
                    </div>
                </Link>
                    <Link to="/admin/videos">
                    <div className="shadow-lg rounded p-4">
                        <img className="w-28 h-24" src="\img\7477009.png" alt="" />
                        <h4 className="text-center font-bold gradient__text">Videos</h4>
                        <h4 className="text-center text-cyan-600 font-bold">
                            { data?.totalVideos ? data.totalVideos : 0 }
                        </h4>
                    </div>
                    </Link>
                </div>
            </div>
      </div>
    </>
  );
};

export default AdminDashBoardSection;
