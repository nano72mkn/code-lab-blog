import { FC, ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = (props) => {
  console.log(props);
  return <div className="mb-20">{props.children}</div>;
};

export default Layout;
