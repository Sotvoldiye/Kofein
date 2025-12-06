import React from 'react'
import ProfileNav from '../components/ProfileNav'

export default function Profiled() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
            <div
              style={{
                display: "flex",
                flex: 1,
                overflow: "hidden",
              }}
            >
              {/* CHAP SIDEBAR */}
              <ProfileNav/>
      </div>
       <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "hidden",
          }}
        >
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
  )
}
