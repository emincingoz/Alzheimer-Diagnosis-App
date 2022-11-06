import { faTh } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const menuItem = [
    {
      path: "/",
      name: "Alzheimer Tespiti",
      icon: <faTh />,
    },

    {
      path: "/my-patients",
      name: "Hastalarım",
      icon: <faTh />,
    },

    {
      path: "/messages",
      name: "Mesajlar",
      icon: <faTh />,
    },

    {
      path: "/account-settings",
      name: "Hesap Ayarları",
      icon: <faTh />,
    },
  ];

  return (
    <div className="container">
      <div className="sidebar">
        <div className="top_section">
            <h1></h1>
        </div>
      </div>
    </div>
  );
};
