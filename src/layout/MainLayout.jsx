import { Link, Outlet } from "react-router-dom";
import { useGetCategoriesQuery } from "../lib/api/api";
import TopNavbar from "../components/TopNavbar";
import Orders from "../components/Orders";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >

      {/* YUQORI QISM: SIDEBAR + CONTENT (TopNavbar + Outlet) */}
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {/* CHAP SIDEBAR */}
        <Sidebar/>

        {/* O‘NG TOMON: TOP NAVBAR + OUTLET */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "hidden",
          }}
        >
          {/* O‘RTADAGI NAVBAR (QIDIRUV + ISM + AVATAR) */}
          <div
            style={{
              padding: "16px",
              flexShrink: 0,
            }}
          >
            <TopNavbar />
          </div>

          {/* SCROLL BO‘LADIGAN OUTLET */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "30px",
              backgroundColor:'#F1F3F4'
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>

      {/* PASTKI BUYURTMA BLOKI */}
      <div
        style={{
          padding: "16px",
          background: "#F1F3F4",
          flexShrink: 0,
          borderTop:"1px solid #cacbcc"
        }}
      >
        <Orders />
      </div>
    </div>
  );
}
