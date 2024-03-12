import {
    FileExclamationOutlined,
    InsertRowBelowOutlined,
    PieChartOutlined,
    SnippetsOutlined,
    StopOutlined,
    UserOutlined,
    CalculatorOutlined,
    MenuOutlined,
  } from '@ant-design/icons';
  import { Menu } from 'antd';
  import Sider from 'antd/es/layout/Sider';
  import React, { useEffect, useState } from 'react';
  import { Link, useLocation } from 'react-router-dom';
  import { cn } from '../utils/cn';
  import { useAppSelector } from '../redux/hook';

  const getItem = (label, key, icon, children) => {
    return {
      key,
      icon,
      children,
      label: <Link to={`/${key}`}>{label}</Link>,
    };
  };
  

export default function MySider() {
  const select = useLocation();

  const selected = select.pathname.split("/")[1];
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);

  const data = useAppSelector((state) => state.roleCheck.role);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getConditionalItems = () => {
    switch (data.role) {
      case "admin":
        return [
          getItem("Dashboard", "dashboard", <PieChartOutlined />),
          getItem("Account List", "accountsAd", <SnippetsOutlined />),
          getItem("Product List", "productsAd", <InsertRowBelowOutlined />),
          getItem("Order List", "ordersAd", <FileExclamationOutlined />),
          getItem("Auction List", "auctionsAd", <StopOutlined />),
        ];
      case "manager":
        return [
          getItem("Staff List", "staff", <SnippetsOutlined />),
          getItem("Create Auction", "newAuction", <InsertRowBelowOutlined />),
          getItem("Feedback List", "feedbacks", <CalculatorOutlined />),
          getItem("Profile", "profile", <InsertRowBelowOutlined />),
        ];
      case "staff":
        return [
          getItem("Manage Auction", "manageAuction", <UserOutlined />),
          getItem("Manage Order", "manageOrder", <FileExclamationOutlined />),
          getItem("Review Product", "reviewProduct", <SnippetsOutlined />),
          getItem("Profile", "profile", <InsertRowBelowOutlined />),
        ];
      case "customer":
        return [
          getItem("Home", "home", <UserOutlined />),
          getItem("Product", "products", <FileExclamationOutlined />),
          getItem("Auction", "auctions", <SnippetsOutlined />),
          getItem("Cart", "cart", <InsertRowBelowOutlined />),
          getItem("Order", "order", <InsertRowBelowOutlined />),
          getItem("Profile", "profile", <InsertRowBelowOutlined />),
        ];
      default:
        return [];
    }
  };

  return (
    <>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="overflow-hidden border-r-[1px]"
        trigger={
          <div className="border-t-[1px] border-r-[1px] w-full">
            <MenuOutlined></MenuOutlined>
          </div>
        }
        width={256}
      >
        <div className="demo-logo-vertical border-r-[1px] border-gray-200">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/class-srum.appspot.com/o/Logo.jpg?alt=media&token=becebdc8-8f3d-4eae-8c43-c33d3cdf0822"
            alt="logo"
            className={cn("max-w-[199px] mx-auto py-2 ", {
              hidden: collapsed,
            })}
          />
          <img
            src="https://static-00.iconduck.com/assets.00/ant-design-icon-1024x1023-8uckm0lb.png"
            alt="logo"
            className={cn("max-w-[20px] mx-auto py-2 ", {
              hidden: !collapsed,
            })}
          />
        </div>
        <Menu
          defaultSelectedKeys={[selected]}
          mode="inline"
          items={getConditionalItems()}
        ></Menu>
      </Sider>
    </>
  );
}
